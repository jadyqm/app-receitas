import { CaretLeft } from 'phosphor-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, radius, spacing } from '../theme';

// Cabeçalho reutilizado pelas duas telas.
// Quando recebe `onBack`, mostra o botão voltar e usa o título compacto.
export default function Header({ title, subtitle, onBack }) {
  const insets = useSafeAreaInsets();
  const compact = Boolean(onBack);

  return (
    <View style={[styles.container, { paddingTop: insets.top + spacing.md }]}>
      <View style={styles.row}>
        {onBack ? (
          <Pressable
            onPress={onBack}
            accessibilityRole="button"
            accessibilityLabel="Voltar"
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            style={({ pressed }) => [styles.backButton, pressed && styles.backButtonPressed]}
          >
            <CaretLeft size={20} weight="bold" color={colors.primary} />
          </Pressable>
        ) : null}

        <View style={styles.titleGroup}>
          <Text
            style={[styles.title, compact && styles.titleCompact]}
            numberOfLines={compact ? 1 : 2}
          >
            {title}
          </Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: radius.pill,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonPressed: {
    opacity: 0.6,
  },
  titleGroup: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: -0.5,
  },
  titleCompact: {
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textMuted,
  },
});
