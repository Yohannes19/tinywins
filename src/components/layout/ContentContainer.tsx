import React, { ReactNode } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { spacing } from '../../design-system';

interface ContentContainerProps {
  children: ReactNode;
  scrollable?: boolean;
  contentContainerStyle?: any;
  style?: any;
}

export const ContentContainer: React.FC<ContentContainerProps> = ({
  children,
  scrollable = false,
  contentContainerStyle,
  style,
}) => {
  const insets = useSafeAreaInsets();

  const content = (
    <View
      style={[
        styles.content,
        {
          paddingHorizontal: spacing.lg,
          paddingBottom: insets.bottom + spacing.lg,
          paddingTop: spacing.lg,
        },
        contentContainerStyle,
        style,
      ]}
    >
      {children}
    </View>
  );

  if (scrollable) {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {content}
      </ScrollView>
    );
  }

  return content;
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
});
