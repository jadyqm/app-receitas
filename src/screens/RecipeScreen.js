import { Clock, Fire, ForkKnife, ListNumbers, Users } from 'phosphor-react-native';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

import Header from '../components/Header';
import InfoBadge from '../components/InfoBadge';
import IngredientItem from '../components/IngredientItem';
import { colors, radius, spacing } from '../theme';
import { formatTime } from '../utils/format';

// Título de seção com ícone, usado em "Modo de preparo" e "Ingredientes".
function SectionTitle({ icon: Icon, children }) {
  return (
    <View style={styles.sectionTitleRow}>
      <Icon size={18} weight="bold" color={colors.primary} />
      <Text style={styles.sectionTitle}>{children}</Text>
    </View>
  );
}

export default function RecipeScreen({ navigation, route }) {
  const { recipe } = route.params;

  const prepTime = recipe.prep_time || 0;
  const cookTime = recipe.cook_time || 0;
  const totalTime = prepTime + cookTime;

  // A FlatList de ingredientes é a lista principal da tela; todo o resto do
  // conteúdo vai no ListHeaderComponent. Assim evitamos aninhar uma FlatList
  // dentro de uma ScrollView (o que o React Native desaconselha).
  const details = (
    <View>
      <Image source={{ uri: recipe.image }} style={styles.hero} resizeMode="cover" />

      <View style={styles.section}>
        <Text style={styles.name}>{recipe.name}</Text>
        <Text style={styles.description}>{recipe.description}</Text>
      </View>

      <View style={styles.badgeRow}>
        <InfoBadge icon={Users} value={`${recipe.servings}`} label="pessoas" />
        <InfoBadge icon={Clock} value={formatTime(totalTime)} label="preparo" />
        <InfoBadge icon={Fire} value={`${recipe.calories_per_serving}`} label="kcal/porção" />
      </View>

      <View style={styles.timeBreakdown}>
        <Text style={styles.timeBreakdownText}>
          Preparação {formatTime(prepTime)} · Cozimento {formatTime(cookTime)}
        </Text>
      </View>

      <View style={styles.section}>
        <SectionTitle icon={ListNumbers}>Modo de preparo</SectionTitle>

        <View style={styles.steps}>
          {recipe.instructions.map((step, index) => (
            <View key={index} style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{index + 1}</Text>
              </View>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <SectionTitle icon={ForkKnife}>
          Ingredientes ({recipe.ingredients.length})
        </SectionTitle>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title={recipe.name} onBack={() => navigation.goBack()} />

      <FlatList
        data={recipe.ingredients}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <IngredientItem ingredient={item} />}
        ListHeaderComponent={details}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListFooterComponent={<View style={styles.footer} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  hero: {
    width: '100%',
    height: 240,
    backgroundColor: colors.border,
  },
  section: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    gap: spacing.sm,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: -0.4,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.textMuted,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
  },
  timeBreakdown: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  timeBreakdownText: {
    fontSize: 13,
    color: colors.textMuted,
    textAlign: 'center',
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
  },
  steps: {
    gap: spacing.lg,
  },
  step: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  stepNumber: {
    width: 26,
    height: 26,
    borderRadius: radius.pill,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
  },
  stepText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    color: colors.text,
    paddingTop: 2,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
    marginLeft: spacing.lg,
  },
  footer: {
    height: spacing.xxl,
  },
});
