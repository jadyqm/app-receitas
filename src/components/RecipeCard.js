import { Clock, Fire } from 'phosphor-react-native';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radius, shadows, spacing } from '../theme';
import { formatTime } from '../utils/format';

// Item da FlatList da tela inicial: foto + nome + resumo. Clicável.
export default function RecipeCard({ recipe, onPress }) {
  const totalTime = (recipe.prep_time || 0) + (recipe.cook_time || 0);

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Abrir receita ${recipe.name}`}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <Image source={{ uri: recipe.image }} style={styles.image} resizeMode="cover" />

      {recipe.difficulty ? (
        <View style={styles.tag}>
          <Text style={styles.tagText}>{recipe.difficulty}</Text>
        </View>
      ) : null}

      <View style={styles.body}>
        <Text style={styles.name} numberOfLines={2}>
          {recipe.name}
        </Text>

        <View style={styles.metaRow}>
          <View style={styles.meta}>
            <Clock size={15} weight="bold" color={colors.textMuted} />
            <Text style={styles.metaText}>{formatTime(totalTime)}</Text>
          </View>

          <View style={styles.metaDivider} />

          <View style={styles.meta}>
            <Fire size={15} weight="bold" color={colors.textMuted} />
            <Text style={styles.metaText}>{recipe.calories_per_serving} kcal</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    ...shadows.card,
  },
  cardPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },
  image: {
    width: '100%',
    height: 180,
    backgroundColor: colors.border,
  },
  tag: {
    position: 'absolute',
    top: spacing.md,
    left: spacing.md,
    backgroundColor: colors.surface,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: radius.pill,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
    textTransform: 'capitalize',
  },
  body: {
    padding: spacing.lg,
    gap: spacing.sm,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    letterSpacing: -0.2,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  metaText: {
    fontSize: 13,
    color: colors.textMuted,
  },
  metaDivider: {
    width: StyleSheet.hairlineWidth,
    height: 14,
    backgroundColor: colors.border,
  },
});
