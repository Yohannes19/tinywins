import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  StyleSheet,
  Pressable,
  Animated,
  ScrollView,
  Switch,
  StatusBar,
  Dimensions,
  Image,
  Platform,
} from 'react-native';
import { useAppStore, Task, MicroStep } from './store/appStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Storage helpers for cross-platform persistence
const storage = {
  getItem: async (key: string): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem(key);
    } catch {
      return null;
    }
  },
  setItem: async (key: string, value: string): Promise<void> => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch {}
  },
};

// Splash Screen Component
const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [animationPhase, setAnimationPhase] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Initial fade in
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Rotation animation
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      })
    ).start();

    // Phase transitions
    const timers = [
      setTimeout(() => setAnimationPhase(1), 1500),
      setTimeout(() => setAnimationPhase(2), 2500),
      setTimeout(() => {
        // Fade out and complete
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(onComplete);
      }, 4000),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.splashContainer}>
      <Animated.View style={[styles.splashContent, { opacity: fadeAnim }]}>
        <Animated.View style={[styles.logoContainer, { transform: [{ scale: scaleAnim }] }]}>
          <Animated.Text style={[styles.splashLogo, { transform: [{ rotate: spin }] }]}>🎯</Animated.Text>
        </Animated.View>
        
        {animationPhase >= 1 && (
          <Animated.View style={styles.titleContainer}>
            <Text style={styles.splashTitle}>TinyWins</Text>
            <Text style={styles.splashTagline}>Small Steps, Big Wins</Text>
          </Animated.View>
        )}
        
        {animationPhase >= 2 && (
          <View style={styles.featuresPreview}>
            <View style={styles.featureItem}>
              <Text style={styles.featureEmoji}>✨</Text>
              <Text style={styles.featureText}>Break tasks into tiny steps</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureEmoji}>🏆</Text>
              <Text style={styles.featureText}>Earn awards & badges</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureEmoji}>🔥</Text>
              <Text style={styles.featureText}>Build your streak</Text>
            </View>
          </View>
        )}

        <View style={styles.loadingBar}>
          <Animated.View style={[styles.loadingFill, { opacity: fadeAnim }]} />
        </View>
      </Animated.View>
    </View>
  );
};

// Award Badge Component
const AwardBadge = ({ award, size = 'medium' }: { award: Award; size?: 'small' | 'medium' | 'large' }) => {
  const sizeStyles = {
    small: { container: 50, emoji: 24, text: 10 },
    medium: { container: 70, emoji: 32, text: 12 },
    large: { container: 100, emoji: 48, text: 14 },
  };

  const dims = sizeStyles[size];

  return (
    <View style={[styles.awardBadge, { width: dims.container, height: dims.container, backgroundColor: award.color }]}>
      <Text style={{ fontSize: dims.emoji }}>{award.emoji}</Text>
      <Text style={[styles.awardName, { fontSize: dims.text }]} numberOfLines={2}>{award.name}</Text>
    </View>
  );
};

// Awards System
interface Award {
  id: string;
  name: string;
  emoji: string;
  color: string;
  description: string;
  requirement: number;
  unlocked: boolean;
}

const AWARDS_LIST: Award[] = [
  { id: 'first_step', name: 'First Step', emoji: '🌱', color: '#4ecdc4', description: 'Complete your first micro-step', requirement: 1, unlocked: false },
  { id: 'quick_starter', name: 'Quick Starter', emoji: '⚡', color: '#ffd700', description: 'Complete 10 micro-steps', requirement: 10, unlocked: false },
  { id: 'task_master', name: 'Task Master', emoji: '🎯', color: '#ff6b6b', description: 'Complete 50 micro-steps', requirement: 50, unlocked: false },
  { id: 'productivity_pro', name: 'Productivity Pro', emoji: '🚀', color: '#a8e6cf', description: 'Complete 100 micro-steps', requirement: 100, unlocked: false },
  { id: 'unstoppable', name: 'Unstoppable', emoji: '💪', color: '#fd79a8', description: 'Complete 250 micro-steps', requirement: 250, unlocked: false },
  { id: 'legend', name: 'Legend', emoji: '👑', color: '#ffeaa7', description: 'Complete 500 micro-steps', requirement: 500, unlocked: false },
  { id: 'week_warrior', name: 'Week Warrior', emoji: '📅', color: '#74b9ff', description: '7 day streak', requirement: 7, unlocked: false },
  { id: 'month_champion', name: 'Month Champion', emoji: '🏆', color: '#dfe6e9', description: '30 day streak', requirement: 30, unlocked: false },
];

// Confetti particles component
const Confetti = ({ active }: { active: boolean }) => {
  const [particles] = useState(() =>
    Array.from({ length: 50 }, () => ({
      x: Math.random() * 100,
      y: -20 - Math.random() * 50,
      color: ['#3ecf8e', '#ffd700', '#ff6b6b', '#4ecdc4', '#a8e6cf', '#fd79a8', '#74b9ff'][
        Math.floor(Math.random() * 7)
      ],
      size: 6 + Math.random() * 14,
      rotation: Math.random() * 360,
      speed: 2 + Math.random() * 4,
      wobble: Math.random() * 20 - 10,
    }))
  );

  const animatedValues = particles.map(() => new Animated.Value(0));

  useEffect(() => {
    if (active) {
      const animations = animatedValues.map((anim, i) =>
        Animated.timing(anim, {
          toValue: 1,
          duration: 2000 + i * 50,
          useNativeDriver: true,
        })
      );
      Animated.stagger(30, animations).start();
    } else {
      animatedValues.forEach((anim) => anim.setValue(0));
    }
  }, [active]);

  if (!active) return null;

  return (
    <View style={styles.confettiContainer}>
      {particles.map((particle, i) => (
        <Animated.View
          key={i}
          style={[
            styles.confettiParticle,
            {
              backgroundColor: particle.color,
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              borderRadius: particle.size / 2,
              transform: [
                {
                  translateY: animatedValues[i].interpolate({
                    inputRange: [0, 1],
                    outputRange: [particle.y, SCREEN_HEIGHT + 50],
                  }),
                },
                {
                  translateX: animatedValues[i].interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, particle.wobble],
                  }),
                },
                {
                  rotate: animatedValues[i].interpolate({
                    inputRange: [0, 1],
                    outputRange: [`${particle.rotation}deg`, `${particle.rotation + 1080}deg`],
                  }),
                },
              ],
            },
          ]}
        />
      ))}
    </View>
  );
};

// Progress Ring Component using react-native-svg alternative
const ProgressRing = ({ progress, size = 120, strokeWidth = 8 }: { progress: number; size?: number; strokeWidth?: number }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <View style={[styles.progressRingContainer, { width: size, height: size }]}>
      {/* Background circle */}
      <View style={[
        styles.progressRingBg,
        { 
          width: size, 
          height: size, 
          borderRadius: size / 2,
          borderWidth: strokeWidth,
          borderColor: '#1b2436',
        }
      ]} />
      {/* Progress circle using border trick */}
      <View style={[
        styles.progressRingFill,
        { 
          position: 'absolute',
          width: size, 
          height: size, 
          borderRadius: size / 2,
          borderWidth: strokeWidth,
          borderColor: '#3ecf8e',
          borderLeftColor: progress > 25 ? '#3ecf8e' : 'transparent',
          borderTopColor: progress > 50 ? '#3ecf8e' : 'transparent',
          borderRightColor: progress > 75 ? '#3ecf8e' : 'transparent',
          borderBottomColor: progress > 0 ? '#3ecf8e' : 'transparent',
          transform: [{ rotate: `${-90 + (progress / 100) * 360}deg` }],
        }
      ]} />
      <Text style={styles.progressText}>{Math.round(progress)}%</Text>
    </View>
  );
};

// Category definitions
const CATEGORIES = [
  { id: 'clean', name: 'Clean', icon: '🧹', color: '#4ecdc4' },
  { id: 'email', name: 'Email', icon: '📧', color: '#ffd700' },
  { id: 'tax', name: 'Tax', icon: '📄', color: '#ff6b6b' },
  { id: 'laundry', name: 'Laundry', icon: '👕', color: '#a8e6cf' },
  { id: 'dishes', name: 'Dishes', icon: '🍽️', color: '#ffeaa7' },
  { id: 'shower', name: 'Shower', icon: '🚿', color: '#74b9ff' },
  { id: 'call', name: 'Call', icon: '📞', color: '#fd79a8' },
  { id: 'other', name: 'Other', icon: '✨', color: '#dfe6e9' },
];

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showStats, setShowStats] = useState(false);
  const [showAwards, setShowAwards] = useState(false);
  const [streak, setStreak] = useState(0);
  const [lastCompletionDate, setLastCompletionDate] = useState<string | null>(null);
  const [totalCompletedSteps, setTotalCompletedSteps] = useState(0);
  const [unlockedAwards, setUnlockedAwards] = useState<Award[]>([]);

  // Load persisted data on mount
  useEffect(() => {
    const loadData = async () => {
      const [streakData, lastDateData, totalStepsData] = await Promise.all([
        storage.getItem('tinywins-streak'),
        storage.getItem('tinywins-last-date'),
        storage.getItem('tinywins-total-completed'),
      ]);
      if (streakData) setStreak(parseInt(streakData, 10));
      if (lastDateData) setLastCompletionDate(lastDateData);
      if (totalStepsData) setTotalCompletedSteps(parseInt(totalStepsData, 10));
    };
    loadData();
  }, []);

  const tasks = useAppStore((state) => state.tasks);
  const selectedTaskId = useAppStore((state) => state.selectedTaskId);
  const rewardMessage = useAppStore((state) => state.rewardMessage);
  const addTask = useAppStore((state) => state.addTask);
  const selectTask = useAppStore((state) => state.selectTask);
  const toggleStep = useAppStore((state) => state.toggleStep);
  const clearReward = useAppStore((state) => state.clearReward);

  // Check and unlock awards
  useEffect(() => {
    const newAwards = AWARDS_LIST.filter(award => {
      if (award.id.includes('step') || award.id === 'first_step' || award.id === 'quick_starter' || 
          award.id === 'task_master' || award.id === 'productivity_pro' || award.id === 'unstoppable' || award.id === 'legend') {
        return totalCompletedSteps >= award.requirement;
      } else if (award.id.includes('warrior') || award.id.includes('champion')) {
        return streak >= award.requirement;
      }
      return false;
    });
    
    // Find newly unlocked awards
    const newlyUnlocked = newAwards.filter(a => !unlockedAwards.find(u => u.id === a.id));
    if (newlyUnlocked.length > 0) {
      setUnlockedAwards([...unlockedAwards, ...newlyUnlocked]);
      // Show celebration for new awards
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [totalCompletedSteps, streak]);

  // Save total completed steps
  useEffect(() => {
    storage.setItem('tinywins-total-completed', totalCompletedSteps.toString());
  }, [totalCompletedSteps]);

  // Check streak on mount
  useEffect(() => {
    const today = new Date().toDateString();
    if (lastCompletionDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      if (lastCompletionDate !== yesterday) {
        setStreak(0);
      }
    }
  }, []);

  // Save streak
  useEffect(() => {
    storage.setItem('tinywins-streak', streak.toString());
  }, [streak]);

  const selectedTask: Task | undefined = tasks.find(
    (task) => task.id === selectedTaskId
  );

  // Calculate overall progress
  const totalSteps = tasks.reduce((sum, task) => sum + task.microSteps.length, 0);
  const completedSteps = tasks.reduce(
    (sum, task) => sum + task.microSteps.filter((s) => s.done).length,
    0
  );
  const overallProgress = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;

  // Get category for a task
  const getCategoryForTask = (title: string) => {
    const lower = title.toLowerCase();
    for (const cat of CATEGORIES) {
      if (lower.includes(cat.id)) return cat;
    }
    return CATEGORIES.find(c => c.id === 'other')!;
  };

  const handleAddTask = () => {
    if (!inputValue.trim()) return;
    addTask(inputValue);
    setInputValue('');
  };

  const handleToggleStep = useCallback((taskId: string, stepId: string) => {
    const task = tasks.find(t => t.id === taskId);
    const step = task?.microSteps.find(s => s.id === stepId);
    
    // Only increment if not already done
    if (!step?.done) {
      setTotalCompletedSteps(prev => prev + 1);
    }
    
    toggleStep(taskId, stepId);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
    
    // Update streak
    const today = new Date().toDateString();
    if (lastCompletionDate !== today) {
      setStreak(prev => prev + 1);
      setLastCompletionDate(today);
      storage.setItem('tinywins-last-date', today);
    }
  }, [toggleStep, lastCompletionDate, tasks]);

  // Smart suggestions based on time and patterns
  const getSuggestions = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
      return ['Morning routine', 'Check emails', 'Plan your day'];
    } else if (hour < 18) {
      return ['Clean workspace', 'Make that call', 'Review tasks'];
    } else {
      return ['Prepare for tomorrow', 'Quick tidy up', 'Self-care routine'];
    }
  };

  const renderTask = ({ item }: { item: Task }) => {
    const doneCount = item.microSteps.filter((step) => step.done).length;
    const totalCount = item.microSteps.length;
    const progress = totalCount > 0 ? (doneCount / totalCount) * 100 : 0;
    const category = getCategoryForTask(item.title);

    return (
      <TouchableOpacity
        style={[styles.taskCard, { borderLeftColor: category.color }]}
        onPress={() => selectTask(item.id)}
        activeOpacity={0.7}
      >
        <View style={styles.taskHeader}>
          <Text style={styles.taskCategoryIcon}>{category.icon}</Text>
          <View style={styles.taskInfo}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            <Text style={styles.taskProgress}>
              {doneCount}/{totalCount} tiny steps done
            </Text>
          </View>
        </View>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { 
                width: `${progress}%`,
                backgroundColor: category.color 
              }
            ]} 
          />
        </View>
      </TouchableOpacity>
    );
  };

  const renderMicroStep = (step: MicroStep, index: number) => (
    <TouchableOpacity
      key={step.id}
      style={[
        styles.stepRow,
        step.done && styles.stepRowDone,
        { animationDelay: `${index * 50}ms` }
      ]}
      onPress={() => {
        if (selectedTask) {
          handleToggleStep(selectedTask.id, step.id);
        }
      }}
      activeOpacity={0.7}
    >
      <Animated.View style={[
        styles.stepCheckbox,
        step.done && styles.stepCheckboxDone
      ]}>
        <Text>{step.done ? '✅' : '⬜'}</Text>
      </Animated.View>
      <Text style={[styles.stepText, step.done && styles.stepTextDone]}>
        {step.text}
      </Text>
    </TouchableOpacity>
  );

  const theme = isDarkMode ? {
    background: '#0d1321',
    card: '#1b2436',
    text: '#ffffff',
    textSecondary: '#a6b0c3',
    modalBg: '#141b2c',
  } : {
    background: '#f5f6fa',
    card: '#ffffff',
    text: '#2d3436',
    textSecondary: '#636e72',
    modalBg: '#ffffff',
  };

  return (
    <>
      {/* Splash Screen */}
      {showSplash ? (
        <SplashScreen onComplete={() => setShowSplash(false)} />
      ) : (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <Confetti active={showConfetti} />
          
          {/* Header with Stats Toggle */}
          <View style={styles.header}>
            <View style={styles.headerTop}>
              <View>
                <Text style={[styles.title, { color: theme.text }]}>TinyWins</Text>
                <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
                  Turn overwhelming tasks into tiny dopamine wins.
                </Text>
              </View>
              <View style={styles.headerActions}>
                <TouchableOpacity 
                  style={[styles.awardsButton, { backgroundColor: theme.card }]}
                  onPress={() => setShowAwards(true)}
                >
                  <Text style={styles.awardsButtonText}>🏆</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.statsButton, { backgroundColor: theme.card }]}
                  onPress={() => setShowStats(true)}
                >
                  <Text style={styles.statsButtonText}>📊</Text>
                </TouchableOpacity>
                <Switch
                  value={isDarkMode}
                  onValueChange={setIsDarkMode}
                  trackColor={{ false: '#767577', true: '#3ecf8e' }}
                  thumbColor={isDarkMode ? '#0d1321' : '#f4f3f4'}
                />
              </View>
            </View>
            
            {/* Overall Progress Ring */}
            <View style={styles.progressSection}>
              <ProgressRing progress={overallProgress} />
              <View style={styles.progressLabels}>
                <Text style={[styles.progressLabel, { color: theme.textSecondary }]}>Overall Progress</Text>
                <Text style={[styles.progressStats, { color: theme.text }]}>
                  {completedSteps}/{totalSteps} steps completed
                </Text>
              </View>
            </View>
            
            {/* Streak Display */}
            {streak > 0 && (
              <View style={[styles.streakBadge, { backgroundColor: '#ffd700' }]}>
                <Text style={styles.streakText}>🔥 {streak} day streak!</Text>
              </View>
            )}
            
            {/* Recent Awards Preview */}
            {unlockedAwards.length > 0 && (
              <View style={styles.recentAwardsContainer}>
                <Text style={[styles.sectionTitle, { color: theme.text }]}>Your Awards</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={styles.recentAwardsList}>
                    {unlockedAwards.slice(-5).map((award) => (
                      <AwardBadge key={award.id} award={award} size="small" />
                    ))}
                  </View>
                </ScrollView>
              </View>
            )}
          </View>

          {/* Smart Suggestions */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.suggestionsContainer}
            contentContainerStyle={styles.suggestionsContent}
          >
            {getSuggestions().map((suggestion, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.suggestionChip, { backgroundColor: theme.card }]}
                onPress={() => {
                  setInputValue(suggestion);
                }}
              >
                <Text style={[styles.suggestionText, { color: theme.textSecondary }]}>
                  💡 {suggestion}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Category Filter */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesContainer}
            contentContainerStyle={styles.categoriesContent}
          >
            <TouchableOpacity
              style={[
                styles.categoryChip,
                { backgroundColor: selectedCategory === null ? '#3ecf8e' : theme.card }
              ]}
              onPress={() => setSelectedCategory(null)}
            >
              <Text style={[
                styles.categoryChipText,
                { color: selectedCategory === null ? '#0d1321' : theme.text }
              ]}>All</Text>
            </TouchableOpacity>
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.categoryChip,
                  { backgroundColor: selectedCategory === cat.id ? cat.color : theme.card }
                ]}
                onPress={() => setSelectedCategory(cat.id)}
              >
                <Text style={styles.categoryChipIcon}>{cat.icon}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Input Row */}
          <View style={styles.inputRow}>
            <TextInput
              style={[styles.input, { backgroundColor: theme.card, color: theme.text }]}
              placeholder="What feels overwhelming right now?"
              placeholderTextColor={theme.textSecondary}
              value={inputValue}
              onChangeText={setInputValue}
              onSubmitEditing={handleAddTask}
              returnKeyType="done"
            />
            <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>

          {/* Tasks List */}
          <FlatList
            data={tasks.filter(task => {
              if (!selectedCategory) return true;
              const taskCategory = getCategoryForTask(task.title);
              return taskCategory.id === selectedCategory;
            })}
            keyExtractor={(item) => item.id}
            renderItem={renderTask}
            contentContainerStyle={styles.list}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Text style={styles.emptyEmoji}>✨</Text>
                <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
                  No tasks yet. Add one small overwhelming thing above.
                </Text>
              </View>
            }
          />

          {/* Task Detail Modal */}
          <Modal
            visible={!!selectedTask}
            animationType="slide"
            transparent
            onRequestClose={() => selectTask(null)}
          >
            <View style={styles.modalOverlay}>
              <View style={[styles.modalContent, { backgroundColor: theme.modalBg }]}>
                {selectedTask && (
                  <>
                    <View style={styles.modalHeader}>
                      <Text style={[styles.modalTitle, { color: theme.text }]}>
                        {selectedTask.title}
                      </Text>
                      <TouchableOpacity onPress={() => selectTask(null)}>
                        <Text style={styles.closeIcon}>✕</Text>
                      </TouchableOpacity>
                    </View>
                    <Text style={[styles.modalSubtitle, { color: theme.textSecondary }]}>
                      Don't worry about the whole task. Just pick one tiny step.
                    </Text>

                    <View style={styles.stepsList}>
                      {selectedTask.microSteps.map(renderMicroStep)}
                    </View>

                    <TouchableOpacity
                      style={styles.closeButton}
                      onPress={() => selectTask(null)}
                    >
                      <Text style={styles.closeButtonText}>Done for now</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </View>
          </Modal>

          {/* Stats Modal */}
          <Modal
            visible={showStats}
            animationType="fade"
            transparent
            onRequestClose={() => setShowStats(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={[styles.statsModalContent, { backgroundColor: theme.modalBg }]}>
                <View style={styles.statsHeader}>
                  <Text style={[styles.statsTitle, { color: theme.text }]}>Your Progress</Text>
                  <TouchableOpacity onPress={() => setShowStats(false)}>
                    <Text style={styles.closeIcon}>✕</Text>
                  </TouchableOpacity>
                </View>
                
                <View style={styles.statsGrid}>
                  <View style={[styles.statCard, { backgroundColor: theme.card }]}>
                    <Text style={styles.statIcon}>🎯</Text>
                    <Text style={[styles.statValue, { color: theme.text }]}>
                      {completedSteps}
                    </Text>
                    <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
                      Steps Completed
                    </Text>
                  </View>
                  
                  <View style={[styles.statCard, { backgroundColor: theme.card }]}>
                    <Text style={styles.statIcon}>📝</Text>
                    <Text style={[styles.statValue, { color: theme.text }]}>
                      {tasks.length}
                    </Text>
                    <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
                      Total Tasks
                    </Text>
                  </View>
                  
                  <View style={[styles.statCard, { backgroundColor: theme.card }]}>
                    <Text style={styles.statIcon}>🔥</Text>
                    <Text style={[styles.statValue, { color: theme.text }]}>
                      {streak}
                    </Text>
                    <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
                      Day Streak
                    </Text>
                  </View>
                  
                  <View style={[styles.statCard, { backgroundColor: theme.card }]}>
                    <Text style={styles.statIcon}>💪</Text>
                    <Text style={[styles.statValue, { color: theme.text }]}>
                      {Math.round(overallProgress)}%
                    </Text>
                    <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
                      Overall Progress
                    </Text>
                  </View>
                  
                  <View style={[styles.statCard, { backgroundColor: theme.card }]}>
                    <Text style={styles.statIcon}>⭐</Text>
                    <Text style={[styles.statValue, { color: theme.text }]}>
                      {totalCompletedSteps}
                    </Text>
                    <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
                      Lifetime Steps
                    </Text>
                  </View>
                  
                  <View style={[styles.statCard, { backgroundColor: theme.card }]}>
                    <Text style={styles.statIcon}>🏆</Text>
                    <Text style={[styles.statValue, { color: theme.text }]}>
                      {unlockedAwards.length}
                    </Text>
                    <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
                      Awards Earned
                    </Text>
                  </View>
                </View>
                
                <TouchableOpacity
                  style={styles.closeStatsButton}
                  onPress={() => setShowStats(false)}
                >
                  <Text style={styles.closeButtonText}>Keep Going!</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* Awards Modal */}
          <Modal
            visible={showAwards}
            animationType="slide"
            transparent
            onRequestClose={() => setShowAwards(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={[styles.awardsModalContent, { backgroundColor: theme.modalBg }]}>
                <View style={styles.awardsHeader}>
                  <Text style={[styles.awardsTitle, { color: theme.text }]}>Your Awards</Text>
                  <TouchableOpacity onPress={() => setShowAwards(false)}>
                    <Text style={styles.closeIcon}>✕</Text>
                  </TouchableOpacity>
                </View>
                
                <Text style={[styles.awardsSubtitle, { color: theme.textSecondary }]}>
                  Complete tasks and build streaks to unlock awards!
                </Text>
                
                <ScrollView style={styles.awardsScrollView}>
                  <View style={styles.awardsGrid}>
                    {AWARDS_LIST.map((award) => {
                      const isUnlocked = unlockedAwards.find(a => a.id === award.id);
                      return (
                        <View key={award.id} style={styles.awardItemContainer}>
                          <View style={[
                            styles.awardItem,
                            { backgroundColor: theme.card },
                            !isUnlocked && styles.awardLocked
                          ]}>
                            <View style={[
                              styles.awardIconContainer,
                              { backgroundColor: isUnlocked ? award.color : '#2d3748' }
                            ]}>
                              <Text style={styles.awardIconEmoji}>
                                {isUnlocked ? award.emoji : '🔒'}
                              </Text>
                            </View>
                            <View style={styles.awardInfo}>
                              <Text style={[
                                styles.awardItemName,
                                { color: isUnlocked ? theme.text : theme.textSecondary }
                              ]}>
                                {award.name}
                              </Text>
                              <Text style={[
                                styles.awardItemDesc,
                                { color: theme.textSecondary }
                              ]}>
                                {award.description}
                              </Text>
                              {!isUnlocked && (
                                <Text style={styles.awardRequirement}>
                                  Progress: {award.id.includes('step') ? totalCompletedSteps : streak} / {award.requirement}
                                </Text>
                              )}
                            </View>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                </ScrollView>
                
                <TouchableOpacity
                  style={styles.closeAwardsButton}
                  onPress={() => setShowAwards(false)}
                >
                  <Text style={styles.closeButtonText}>Continue</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {rewardMessage && (
            <Pressable style={styles.rewardBanner} onPress={clearReward}>
              <Text style={styles.rewardText}>{rewardMessage}</Text>
            </Pressable>
          )}
        </SafeAreaView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsButtonText: {
    fontSize: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  progressSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 20,
  },
  progressRingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    position: 'absolute',
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
  },
  progressLabels: {
    justifyContent: 'center',
  },
  progressLabel: {
    fontSize: 14,
    textAlign: 'center',
  },
  progressStats: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  streakBadge: {
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 8,
  },
  streakText: {
    color: '#0d1321',
    fontWeight: '700',
    fontSize: 14,
  },
  suggestionsContainer: {
    maxHeight: 50,
    marginBottom: 8,
  },
  suggestionsContent: {
    paddingHorizontal: 20,
    gap: 10,
  },
  suggestionChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  suggestionText: {
    fontSize: 13,
    fontWeight: '500',
  },
  categoriesContainer: {
    maxHeight: 50,
    marginBottom: 8,
  },
  categoriesContent: {
    paddingHorizontal: 20,
    gap: 8,
  },
  categoryChip: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryChipText: {
    fontSize: 13,
    fontWeight: '600',
  },
  categoryChipIcon: {
    fontSize: 20,
  },
  inputRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 10,
  },
  input: {
    flex: 1,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
  },
  addButton: {
    backgroundColor: '#3ecf8e',
    borderRadius: 14,
    paddingHorizontal: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#0d1321',
    fontWeight: '700',
    fontSize: 15,
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  emptyState: {
    alignItems: 'center',
    marginTop: 60,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 14,
  },
  taskCard: {
    backgroundColor: '#1b2436',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
  },
  taskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  taskCategoryIcon: {
    fontSize: 24,
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '600',
  },
  taskProgress: {
    color: '#8892a6',
    fontSize: 13,
    marginTop: 6,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#2d3748',
    borderRadius: 2,
    marginTop: 12,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 36,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  closeIcon: {
    fontSize: 24,
    color: '#8892a6',
    padding: 8,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    flex: 1,
  },
  modalSubtitle: {
    fontSize: 14,
    marginTop: 6,
    marginBottom: 20,
  },
  stepsList: {
    gap: 10,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1b2436',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  stepRowDone: {
    opacity: 0.6,
  },
  stepCheckbox: {
    fontSize: 18,
    marginRight: 12,
  },
  stepCheckboxDone: {
    transform: [{ scale: 1.1 }],
  },
  stepText: {
    color: '#ffffff',
    fontSize: 15,
    flex: 1,
  },
  stepTextDone: {
    color: '#6b7690',
    textDecorationLine: 'line-through',
  },
  closeButton: {
    marginTop: 24,
    backgroundColor: '#3ecf8e',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#0d1321',
    fontWeight: '700',
    fontSize: 15,
  },
  rewardBanner: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: '#3ecf8e',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  rewardText: {
    color: '#0d1321',
    fontWeight: '700',
    fontSize: 15,
  },
  confettiContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
    zIndex: 1000,
  },
  confettiParticle: {
    position: 'absolute',
  },
  statsModalContent: {
    margin: 40,
    borderRadius: 24,
    padding: 24,
    maxHeight: '70%',
  },
  statsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  statsTitle: {
    fontSize: 24,
    fontWeight: '700',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
  },
  statCard: {
    width: '45%',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  closeStatsButton: {
    marginTop: 24,
    backgroundColor: '#3ecf8e',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  // Splash Screen Styles
  splashContainer: {
    flex: 1,
    backgroundColor: '#0d1321',
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashContent: {
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  logoContainer: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  splashLogo: {
    fontSize: 100,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  splashTitle: {
    fontSize: 42,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
  },
  splashTagline: {
    fontSize: 18,
    color: '#a6b0c3',
    textAlign: 'center',
  },
  featuresPreview: {
    width: '100%',
    marginBottom: 40,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  featureEmoji: {
    fontSize: 28,
    marginRight: 16,
  },
  featureText: {
    fontSize: 16,
    color: '#ffffff',
    flex: 1,
  },
  loadingBar: {
    width: 200,
    height: 4,
    backgroundColor: '#1b2436',
    borderRadius: 2,
    overflow: 'hidden',
  },
  loadingFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '100%',
    backgroundColor: '#3ecf8e',
  },
  // Awards Button
  awardsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  awardsButtonText: {
    fontSize: 20,
  },
  // Recent Awards
  recentAwardsContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#1b2436',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  recentAwardsList: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
  },
  // Award Badge
  awardBadge: {
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
  },
  awardName: {
    color: '#0d1321',
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 4,
  },
  // Awards Modal
  awardsModalContent: {
    flex: 1,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    maxHeight: '90%',
  },
  awardsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  awardsTitle: {
    fontSize: 28,
    fontWeight: '700',
  },
  awardsSubtitle: {
    fontSize: 14,
    marginBottom: 20,
  },
  awardsScrollView: {
    flex: 1,
  },
  awardsGrid: {
    gap: 12,
    paddingBottom: 20,
  },
  awardItemContainer: {
    marginBottom: 4,
  },
  awardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    gap: 16,
  },
  awardLocked: {
    opacity: 0.6,
  },
  awardIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  awardIconEmoji: {
    fontSize: 28,
  },
  awardInfo: {
    flex: 1,
  },
  awardItemName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  awardItemDesc: {
    fontSize: 13,
    marginBottom: 4,
  },
  awardRequirement: {
    fontSize: 12,
    color: '#8892a6',
  },
  closeAwardsButton: {
    marginTop: 16,
    backgroundColor: '#3ecf8e',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
});