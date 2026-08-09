import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius } from '../../design-system';

interface ProgressBarProps {
  progress: number; // 0 to 1
  size?: 'small' | 'medium' | 'large';
  color?: string;
  showLabel?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  size = 'medium',
  color,
  showLabel = false,
}) => {
  const clampedProgress = Math.min(Math.max(progress, 0), 1);
  
  return (
    <View style={styles.container}>
      <View style={[styles.track, styles[size]]}>
        <View
          style={[
            styles.fill,
            styles[size],
            { 
              width: `${clampedProgress * 100}%`,
              backgroundColor: color || colors.primary,
            },
          ]}
        />
      </View>
      {showLabel && (
        <View style={styles.labelContainer}>
          {/* Label would be added here if needed */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  track: {
    backgroundColor: colors.border,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  fill: {
    borderRadius: borderRadius.full,
  },
  small: {
    height: 4,
  },
  medium: {
    height: 8,
  },
  large: {
    height: 12,
  },
  labelContainer: {
    marginTop: spacing.xs,
  },
});
