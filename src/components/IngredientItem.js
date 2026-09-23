import { StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing } from '../theme';
import { formatAmount } from '../utils/format';

// Linha da FlatList de ingredientes: nome à esquerda, quantidade + unidade à direita.
export default function IngredientItem({ ingredient }) {
  return (
    <View style={styles.row}>
      <View style={styles.bullet} />

      <Text style={styles.name}>
        {ingredient.name}
        {ingredient.optional ? <Text style={styles.optional}> (opcional)</Text> : null}
      </Text>

      <Text style={styles.amount}>{formatAmount(ingredient)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.surface,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
  },
  name: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
  },
  optional: {
    fontSize: 13,
    color: colors.textMuted,
    fontStyle: 'italic',
  },
  amount: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
    backgroundColor: colors.primarySoft,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.sm,
    overflow: 'hidden',
  },
});
