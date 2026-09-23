<#
    Busca as receitas na Recipe API, procura uma foto para cada uma
    e grava tudo em data/recipes.json.

    Uso (a partir da pasta do projeto):

        .\scripts\fetch-recipes.ps1 -ApiKey "sk_live_..." -Ingredient "flank steak" -Page 1

    A chave sai da aba Overview do seu Dashboard em https://recipeapi.io/

    As fotos vêm da Wikipedia / Wikimedia Commons (licença livre, ok para
    trabalho acadêmico). O script valida cada URL antes de gravar e evita
    repetir a mesma foto em duas receitas.
#>

param(
    [Parameter(Mandatory = $true)][string]$ApiKey,
    [string]$Ingredient = 'flank steak',
    [int]$Page = 1,
    [string]$OutFile = (Join-Path $PSScriptRoot '..\data\recipes.json')
)

$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

# O Wikimedia exige um User-Agent identificável, senão devolve 429.
$userAgent = 'AppReceitas-Trabalho-Faculdade/1.0 (projeto academico)'

# Segundos de espera entre as chamadas ao Wikimedia, para não tomar 429.
$requestDelay = 4

# Foto usada só se nenhuma busca encontrar nada.
$fallbackImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Good_Food_Display_-_NCI_Visuals_Online.jpg/960px-Good_Food_Display_-_NCI_Visuals_Online.jpg'

# Buscar pelo nome cru da receita traz resultados ruins em alguns casos
# ("Asador" cai na fachada de um restaurante) e repete a mesma foto nas
# variações de carne asada. Aqui damos um termo melhor para esses casos.
$searchOverrides = @{
    'Flank Steak Marinated'                      = 'Beefsteak'
    'Flank Steak with Shallots'                  = 'Steak au poivre'
    'Carne Asada Burrito'                        = 'Burrito'
    'Sonora Carne Asada (Sonoran Grilled Steak)' = 'Taco'
    'Northern Mexico Carne Asada Party'          = 'Asado'
    'Asador (Grill Restaurant Feast)'            = 'Churrasco'
}

# Chamada HTTP com repetição em caso de 429 (Too Many Requests).
function Invoke-WithRetry {
    param([scriptblock]$Action, [int]$MaxAttempts = 4)

    for ($attempt = 1; $attempt -le $MaxAttempts; $attempt++) {
        try {
            return & $Action
        } catch {
            $isLast = $attempt -eq $MaxAttempts
            $isRateLimit = $_.Exception.Message -match '429'

            if ($isLast -or -not $isRateLimit) { throw }

            Start-Sleep -Seconds ([Math]::Pow(2, $attempt) * 5)
        }
    }
}

function Test-ImageUrl {
    param([string]$Url)

    if ([string]::IsNullOrWhiteSpace($Url)) { return $false }

    # Thumbnails gerados a partir de SVG são diagramas, não fotos de comida.
    if ($Url -match '\.svg\.png$') { return $false }

    try {
        $response = Invoke-WebRequest -Uri $Url -Method Head -UseBasicParsing -TimeoutSec 20 `
                                      -Headers @{ 'User-Agent' = $userAgent } -ErrorAction Stop
        return ($response.Headers['Content-Type'] -join ' ') -match 'image'
    } catch {
        return $false
    }
}

# Retorna até $Limit URLs de foto para um termo de busca, da melhor para a pior.
function Get-WikipediaImages {
    param([string]$Term, [int]$Limit = 4)

    $url = 'https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=' +
           [uri]::EscapeDataString($Term) +
           "&gsrlimit=$Limit&prop=pageimages&piprop=thumbnail&pithumbsize=960&format=json"

    try {
        $result = Invoke-WithRetry {
            Invoke-RestMethod -Uri $url -TimeoutSec 30 -Headers @{ 'User-Agent' = $userAgent } -ErrorAction Stop
        }
    } catch {
        return @()
    }

    if (-not $result.query) { return @() }

    return @(
        $result.query.pages.PSObject.Properties.Value |
            Sort-Object index |
            ForEach-Object { if ($_.thumbnail.source) { ($_.thumbnail.source -split '\?')[0] } }
    )
}

Write-Host "Buscando receitas com o ingrediente '$Ingredient' (pagina $Page)..." -ForegroundColor Cyan

$endpoint = "https://recipeapi.io/api/v1/recipes?ingredients=$([uri]::EscapeDataString($Ingredient))&page=$Page"
$payload = Invoke-RestMethod -Uri $endpoint -Headers @{ Authorization = "Bearer $ApiKey" } -TimeoutSec 60

if (-not $payload.data) { throw 'A API nao retornou receitas. Confira a chave, o ingrediente e a pagina.' }

Write-Host "$($payload.data.Count) receitas recebidas. Procurando as fotos..." -ForegroundColor Cyan

$usedImages = @{}

foreach ($recipe in $payload.data) {
    $term = $searchOverrides[$recipe.name]
    if (-not $term) { $term = ($recipe.name -replace '\s*\(.*?\)', '').Trim() }

    $image = $null

    foreach ($candidate in (Get-WikipediaImages $term)) {
        if ($usedImages.ContainsKey($candidate)) { continue }
        if (-not (Test-ImageUrl $candidate)) { continue }

        $image = $candidate
        break
    }

    if (-not $image) { $image = $fallbackImage }
    $usedImages[$image] = $true

    $recipe | Add-Member -NotePropertyName image -NotePropertyValue $image -Force
    Write-Host ("  - {0,-44} {1}" -f $recipe.name, $image)

    Start-Sleep -Seconds $requestDelay
}

$directory = Split-Path -Parent $OutFile
if (-not (Test-Path $directory)) { New-Item -ItemType Directory -Path $directory | Out-Null }

# WriteAllText com UTF8Encoding($false) grava sem BOM — o Metro (bundler do
# Expo) não lê JSON com BOM no começo do arquivo.
$json = $payload | ConvertTo-Json -Depth 20
[System.IO.File]::WriteAllText(
    [System.IO.Path]::GetFullPath($OutFile),
    $json,
    (New-Object System.Text.UTF8Encoding $false)
)

Write-Host "Pronto: $OutFile" -ForegroundColor Green
