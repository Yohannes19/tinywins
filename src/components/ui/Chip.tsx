import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Text } from './Text';
import { colors, spacing, borderRadius, typography, shadows } from '../../design-system';

interface ChipProps {
  label: string;
  icon?: React.ReactNode;
  selected?: boolean;
  onPress?: () => void;
  color?: string;
  selectedColor?: string;
  style?: any;
}

export const Chip: React.FC<ChipProps> = ({
  label,
  icon,
  selected = false,
  onPress,
  color,
  selectedColor,
  style,
}) => {
  const selectedStyles = selected
    ? {
        backgroundColor: selectedColor || colors.primary,
        borderColor: selectedColor || colors.primary,
        ...shadows.md,
      }
    : {};

  return (
    <TouchableOpacity
      style={[
        styles.container,
        selected && styles.selected,
        selected && selectedStyles,
        color && !selected && { borderColor: color },
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {icon && <View style={{ marginRight: spacing.xs }}>{icon}</View>}
      <Text
        variant="bodySmall"
        style={[
          styles.text,
          selected && styles.selectedText,
          color && !selected && { color },
          icon && { marginLeft: 0 },
          selected && { fontWeight: '600' },
        ]}
        numberOfLines={1}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    marginRight: spacing.sm,
    height: 36,
  },
  selected: {
    borderWidth: 1.5,
  },
  text: {
    color: colors.textSecondary,
    fontWeight: '500',
    fontSize: 14,
  },
  selectedText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
});
