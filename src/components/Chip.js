import { StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing } from '../theme';

// Etiqueta pequena usada para dificuldade e tipo de cozinha.
// `tone` escolhe entre o destaque em laranja e a versão neutra.
export default function Chip({ label, tone = 'soft' }) {
  return (
    <View style={[styles.container, tone === 'neutral' && styles.containerNeutral]}>
      <Text style={[styles.label, tone === 'neutral' && styles.labelNeutral]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    paddingHorizontal: spacing.md,
    borderRadius: radius.pill,
    backgroundColor: colors.primarySoft,
  },
  containerNeutral: {
    backgroundColor: colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
    letterSpacing: 0.2,
  },
  labelNeutral: {
    color: colors.textMuted,
  },
});
