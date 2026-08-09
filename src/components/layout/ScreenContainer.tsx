import React, { ReactNode } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing } from '../../design-system';

interface ScreenContainerProps {
  children: ReactNode;
  backgroundColor?: string;
  ignoreTopSafeArea?: boolean;
  ignoreBottomSafeArea?: boolean;
}

export const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  backgroundColor = colors.background.light,
  ignoreTopSafeArea = false,
  ignoreBottomSafeArea = false,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        { 
          backgroundColor,
          paddingTop: ignoreTopSafeArea ? 0 : insets.top,
          paddingBottom: ignoreBottomSafeArea ? 0 : insets.bottom,
        },
      ]}
    >
      <StatusBar barStyle="light-content" backgroundColor={backgroundColor} />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
