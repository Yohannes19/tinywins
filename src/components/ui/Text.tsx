import React from 'react';
import { Text as RNText, StyleSheet } from 'react-native';
import { typography, colors } from '../../design-system';

type TextVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'bodySmall' | 'caption' | 'button';

interface TextProps {
  variant?: TextVariant;
  children: React.ReactNode;
  style?: any;
  color?: string;
  align?: 'left' | 'center' | 'right';
  numberOfLines?: number;
}

export const Text: React.FC<TextProps> = ({
  variant = 'body',
  children,
  style,
  color,
  align,
  numberOfLines,
}) => {
  return (
    <RNText
      numberOfLines={numberOfLines}
      style={[
        styles[variant],
        color && { color },
        align && { textAlign: align },
        style,
      ]}
    >
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  h1: typography.h1,
  h2: typography.h2,
  h3: typography.h3,
  h4: typography.h4,
  body: typography.body,
  bodySmall: typography.bodySmall,
  caption: typography.caption,
  button: typography.button,
});
