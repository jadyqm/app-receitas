import { StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing } from '../theme';

// Cartão pequeno com ícone + valor + rótulo (serve, tempo, calorias).
// `icon` é o próprio componente do Phosphor, ex.: <InfoBadge icon={Clock} ... />
export default function InfoBadge({ icon: Icon, value, label }) {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <Icon size={20} weight="duotone" color={colors.primary} />
      </View>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: radius.pill,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  value: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  label: {
    fontSize: 12,
    color: colors.textMuted,
  },
});
