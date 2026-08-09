import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from './Text';
import { colors, spacing, borderRadius, typography } from '../design-system';

interface ChipProps {
  label: string;
  icon?: React.ReactNode;
  selected?: boolean;
  onPress?: () => void;
  color?: string;
}

export const Chip: React.FC<ChipProps> = ({
  label,
  icon,
  selected = false,
  onPress,
  color,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        selected && styles.selected,
        color && !selected && { borderColor: color },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {icon && <>{icon}</>}
      <Text
        variant="bodySmall"
        style={[
          styles.text,
          selected && styles.selectedText,
          color && !selected && { color },
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
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    marginRight: spacing.sm,
  },
  selected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  text: {
    marginLeft: icon ? spacing.xs : 0,
    color: colors.textSecondary,
  },
  selectedText: {
    color: '#FFFFFF',
  },
});
