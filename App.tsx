import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ScreenContainer } from './src/components/layout';
import { Text, Button, ProgressBar, Card } from './src/components/ui';
import { colors, spacing } from './src/design-system';

// Splash Screen Component
const SplashScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [phase, setPhase] = useState(0);
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);

  useEffect(() => {
    // Phase 1: Fade in logo
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Phase 2: Show tagline
    setTimeout(() => setPhase(1), 1200);
    
    // Phase 3: Complete
    setTimeout(() => {
      onComplete();
    }, 3000);
  }, []);

  return (
    <ScreenContainer backgroundColor={colors.primary} ignoreBottomSafeArea>
      <View style={styles.splashContainer}>
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <Text style={styles.logoEmoji}>✨</Text>
          <Text variant="h1" style={styles.appName}>TinyWins</Text>
        </Animated.View>
        
        {phase >= 1 && (
          <Animated.View style={styles.taglineContainer}>
            <Text variant="body" style={styles.tagline}>
              Small steps, big wins
            </Text>
            <View style={styles.loadingBar}>
              <ProgressBar progress={1} color="#FFFFFF" size="small" />
            </View>
          </Animated.View>
        )}
      </View>
    </ScreenContainer>
  );
};

// Main App Component
export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <SplashScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <SafeAreaProvider>
      <ScreenContainer backgroundColor={colors.background}>
        <View style={styles.container}>
          <Text variant="h2">Welcome to TinyWins 2.0</Text>
          <Text variant="body" style={{ marginTop: spacing.md, color: colors.textSecondary }}>
            Your journey to productivity starts here!
          </Text>
          
          <Card style={{ marginTop: spacing.xl }} padding="lg">
            <Text variant="h3">Today's Progress</Text>
            <ProgressBar progress={0.6} style={{ marginTop: spacing.md }} />
            <Text variant="caption" style={{ marginTop: spacing.sm, color: colors.textSecondary }}>
              3 of 5 tasks completed
            </Text>
          </Card>

          <Button 
            onPress={() => {}} 
            style={{ marginTop: spacing.xl }}
            fullWidth
          >
            Add New Task
          </Button>
        </View>
      </ScreenContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
  },
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoEmoji: {
    fontSize: 80,
    marginBottom: spacing.lg,
  },
  appName: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  taglineContainer: {
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  tagline: {
    color: 'rgba(255,255,255,0.9)',
    marginBottom: spacing.md,
  },
  loadingBar: {
    width: 200,
    height: 4,
  },
});
