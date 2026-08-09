import React, { useState, useEffect } from 'react';
import { View, ScrollView, Dimensions, TouchableOpacity, Modal, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  ScreenContainer, 
  ContentContainer 
} from '../components/layout';
import { 
  Text, 
  Button, 
  Card, 
  ProgressBar, 
  Chip,
  Input,
} from '../components/ui';
import { colors, spacing, typography, shadows, animations } from '../design-system';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const ICONS = {
  trophy: '🏆',
  check: '✅',
  circle: '◯',
  plus: '➕',
  flame: '🔥',
  award: '🏅',
  close: '✖️',
};

interface Task {
  id: string;
  title: string;
  category: string;
  completed: boolean;
  steps: number;
  maxSteps: number;
}

interface Award {
  id: string;
  name: string;
  description: string;
  icon: string;
  threshold: number;
  type: 'steps' | 'streak';
  unlocked: boolean;
  color: string;
}

const CATEGORIES = [
  { id: 'all', name: 'All', color: colors.primary, icon: '✨' },
  { id: 'clean', name: 'Clean', color: colors.category.clean, icon: '🧹' },
  { id: 'email', name: 'Email', color: colors.category.email, icon: '📧' },
  { id: 'tax', name: 'Tax', color: colors.category.tax, icon: '📄' },
  { id: 'laundry', name: 'Laundry', color: colors.category.laundry, icon: '👕' },
  { id: 'dishes', name: 'Dishes', color: colors.category.dishes, icon: '🍽️' },
  { id: 'shower', name: 'Shower', color: colors.category.shower, icon: '🚿' },
  { id: 'call', name: 'Call', color: colors.category.call, icon: '📞' },
  { id: 'other', name: 'Other', color: colors.category.other, icon: '✨' },
];

const AWARDS_DATA: Award[] = [
  { id: 'first_step', name: 'First Step', description: 'Complete your first step', icon: '🌱', threshold: 1, type: 'steps', unlocked: false, color: colors.award.bronze },
  { id: 'quick_starter', name: 'Quick Starter', description: 'Complete 10 steps', icon: '⚡', threshold: 10, type: 'steps', unlocked: false, color: colors.award.silver },
  { id: 'task_master', name: 'Task Master', description: 'Complete 50 steps', icon: '🎯', threshold: 50, type: 'steps', unlocked: false, color: colors.award.gold },
  { id: 'productivity_pro', name: 'Productivity Pro', description: 'Complete 100 steps', icon: '🚀', threshold: 100, type: 'steps', unlocked: false, color: colors.award.platinum },
  { id: 'unstoppable', name: 'Unstoppable', description: 'Complete 250 steps', icon: '💪', threshold: 250, type: 'steps', unlocked: false, color: colors.award.diamond },
  { id: 'legend', name: 'Legend', description: 'Complete 500 steps', icon: '👑', threshold: 500, type: 'steps', unlocked: false, color: colors.award.legend },
  { id: 'week_warrior', name: 'Week Warrior', description: '7 day streak', icon: '📅', threshold: 7, type: 'streak', unlocked: false, color: colors.award.gold },
  { id: 'month_champion', name: 'Month Champion', description: '30 day streak', icon: '🏆', threshold: 30, type: 'streak', unlocked: false, color: colors.award.legend },
];

export default function DashboardScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [totalSteps, setTotalSteps] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(0);
  const [streak, setStreak] = useState(0);
  const [awards, setAwards] = useState<Award[]>(AWARDS_DATA);
  const [showAwardsModal, setShowAwardsModal] = useState(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState('other');
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    loadData();
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: animations.duration.medium,
      useNativeDriver: true,
    }).start();
  }, []);

  const loadData = async () => {
    try {
      const savedTasks = await AsyncStorage.getItem('tinywins_tasks');
      const savedStats = await AsyncStorage.getItem('tinywins_stats');
      
      if (savedTasks) {
        const parsedTasks = JSON.parse(savedTasks);
        setTasks(parsedTasks);
        calculateStats(parsedTasks);
      }
      
      if (savedStats) {
        const stats = JSON.parse(savedStats);
        setStreak(stats.streak || 0);
        checkAwards(stats.totalSteps || 0, stats.streak || 0);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const calculateStats = (taskList: Task[]) => {
    const total = taskList.reduce((sum, task) => sum + task.maxSteps, 0);
    const completed = taskList.reduce((sum, task) => {
      return sum + (task.completed ? task.maxSteps : 0);
    }, 0);
    setTotalSteps(total);
    setCompletedSteps(completed);
  };

  const checkAwards = (totalStepsCount: number, currentStreak: number) => {
    const updatedAwards = awards.map(award => {
      const threshold = award.type === 'steps' ? totalStepsCount : currentStreak;
      return {
        ...award,
        unlocked: threshold >= award.threshold
      };
    });
    setAwards(updatedAwards);
  };

  const saveData = async (updatedTasks: Task[]) => {
    try {
      await AsyncStorage.setItem('tinywins_tasks', JSON.stringify(updatedTasks));
      calculateStats(updatedTasks);
      
      const stats = {
        totalSteps: updatedTasks.reduce((sum, task) => sum + task.maxSteps, 0),
        completedSteps: updatedTasks.reduce((sum, task) => {
          return sum + (task.completed ? task.maxSteps : 0);
        }, 0),
        streak
      };
      await AsyncStorage.setItem('tinywins_stats', JSON.stringify(stats));
      checkAwards(stats.totalSteps, streak);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const toggleStep = async (taskId: string) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        const newCompleted = !task.completed;
        return { ...task, completed: newCompleted };
      }
      return task;
    });
    
    if (tasks.find(t => t.id === taskId)?.completed === false) {
      // Just completed a task - check for new awards
      const newTotalSteps = completedSteps + 1;
      const newAwards = awards.map(award => {
        if (!award.unlocked && award.type === 'steps' && newTotalSteps >= award.threshold) {
          return { ...award, unlocked: true };
        }
        return award;
      });
      setAwards(newAwards);
    }
    
    setTasks(updatedTasks);
    saveData(updatedTasks);
  };

  const addTask = () => {
    if (!newTaskTitle.trim()) return;
    
    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      category: newTaskCategory,
      completed: false,
      steps: 0,
      maxSteps: 1
    };
    
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveData(updatedTasks);
    setNewTaskTitle('');
    setShowAddTaskModal(false);
  };

  const filteredTasks = selectedCategory === 'all' 
    ? tasks 
    : tasks.filter(task => task.category === selectedCategory);

  const progressPercentage = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;
  const unlockedAwardsCount = awards.filter(a => a.unlocked).length;

  const getCategoryColor = (categoryId: string) => {
    const category = CATEGORIES.find(c => c.id === categoryId);
    return category?.color || colors.category.other;
  };

  const getCategoryIcon = (categoryId: string) => {
    const category = CATEGORIES.find(c => c.id === categoryId);
    return category?.icon || '✨';
  };

  return (
    <ScreenContainer backgroundColor={colors.background.light}>
      <ContentContainer style={{ flex: 1 }}>
        <Animated.View style={{ opacity: fadeAnim, flex: 1 }}>
          {/* Header */}
          <View style={{ 
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: spacing.lg 
          }}>
            <View>
              <Text variant="h1" style={{ color: colors.text.primary }}>
                TinyWins
              </Text>
              <Text variant="body" style={{ color: colors.text.secondary }}>
                Small steps, big wins
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity 
                onPress={() => setShowAwardsModal(true)}
                style={{
                  backgroundColor: colors.background.card,
                  padding: spacing.md,
                  borderRadius: 16,
                  ...shadows.sm,
                }}
              >
                <Text variant="h4" style={{ color: colors.award.gold }}>
                  {ICONS.trophy}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => setShowAddTaskModal(true)}
                style={{
                  backgroundColor: colors.primary,
                  padding: spacing.md,
                  borderRadius: 16,
                  ...shadows.md,
                  marginLeft: spacing.sm,
                }}
              >
                <Text variant="h4" style={{ color: colors.text.inverse }}>
                  {ICONS.plus}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Progress Ring & Stats */}
          <Card elevation="md" style={{ 
            marginBottom: spacing.lg,
            padding: spacing.lg 
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ 
                width: 80, 
                height: 80, 
                borderRadius: 40,
                borderWidth: 6,
                borderColor: colors.border,
                marginRight: spacing.lg,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Text variant="h3" style={{ color: colors.primary }}>
                  {Math.round(progressPercentage)}%
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text variant="h4" style={{ color: colors.text.primary, marginBottom: spacing.xs }}>
                  Today's Progress
                </Text>
                <ProgressBar 
                  progress={progressPercentage / 100} 
                  color={colors.primary}
                  height={8}
                  style={{ marginBottom: spacing.sm }}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text variant="caption" style={{ color: colors.text.secondary }}>
                    {completedSteps}/{totalSteps} steps
                  </Text>
                  {streak > 0 && (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text variant="caption" style={{ color: colors.accent.coral, marginRight: spacing.xs }}>
                        {ICONS.flame}
                      </Text>
                      <Text variant="caption" style={{ color: colors.accent.coral, fontWeight: '600' }}>
                        {streak} day streak
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
          </Card>

          {/* Category Filters */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={{ marginBottom: spacing.lg }}
            contentContainerStyle={{ paddingRight: spacing.sm }}
          >
            {CATEGORIES.map(category => (
              <Chip
                key={category.id}
                label={`${category.icon || ''} ${category.name}`}
                selected={selectedCategory === category.id}
                onPress={() => setSelectedCategory(category.id)}
                selectedColor={category.color}
              />
            ))}
          </ScrollView>

          {/* Tasks List */}
          <View style={{ flex: 1 }}>
            {filteredTasks.length === 0 ? (
              <View style={{ 
                flex: 1, 
                justifyContent: 'center', 
                alignItems: 'center',
                padding: spacing.xl 
              }}>
                <Text variant="h4" style={{ color: colors.text.secondary, textAlign: 'center' }}>
                  No tasks yet! 👋
                </Text>
                <Text variant="body" style={{ color: colors.text.tertiary, textAlign: 'center', marginTop: spacing.sm }}>
                  Tap the + button to add your first tiny win
                </Text>
              </View>
            ) : (
              <ScrollView showsVerticalScrollIndicator={false}>
                {filteredTasks.map(task => (
                  <Card 
                    key={task.id} 
                    elevation="sm" 
                    style={{ 
                      marginBottom: spacing.md,
                      borderLeftWidth: 4,
                      borderLeftColor: getCategoryColor(task.category),
                      padding: spacing.md,
                      backgroundColor: colors.background.card,
                    }}
                  >
                    <TouchableOpacity 
                      onPress={() => toggleStep(task.id)}
                      style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                      {task.completed ? (
                        <Text variant="h4" style={{ color: colors.success }}>
                          {ICONS.check}
                        </Text>
                      ) : (
                        <Text variant="h4" style={{ color: colors.text.tertiary }}>
                          {ICONS.circle}
                        </Text>
                      )}
                      <View style={{ flex: 1, marginLeft: spacing.md }}>
                        <Text 
                          variant="body" 
                          style={{ 
                            color: task.completed ? colors.text.tertiary : colors.text.primary,
                            textDecorationLine: task.completed ? 'line-through' : 'none'
                          }}
                        >
                          {getCategoryIcon(task.category)} {task.title}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </Card>
                ))}
              </ScrollView>
            )}
          </View>
        </Animated.View>
      </ContentContainer>

      {/* Awards Modal */}
      <Modal
        visible={showAwardsModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAwardsModal(false)}
      >
        <View style={{ 
          flex: 1, 
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'flex-end'
        }}>
          <Card elevation="lg" style={{ 
            maxHeight: '80%',
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            padding: spacing.lg
          }}>
            <View style={{ 
              flexDirection: 'row', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: spacing.lg 
            }}>
              <Text variant="h3" style={{ color: colors.text.primary }}>
                Your Awards ({unlockedAwardsCount}/{awards.length})
              </Text>
              <TouchableOpacity onPress={() => setShowAwardsModal(false)}>
                <Text variant="h4" style={{ color: colors.text.secondary }}>
                  {ICONS.close}
                </Text>
              </TouchableOpacity>
            </View>
            
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.awardList}>
                {awards.map(award => (
                  <Card 
                    key={award.id}
                    elevation={award.unlocked ? "sm" : "none"}
                    style={{ 
                      padding: spacing.md,
                      opacity: award.unlocked ? 1 : 0.6,
                      backgroundColor: award.unlocked ? `${award.color}15` : colors.background.card
                    }}
                  >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <View style={{ 
                        width: 50, 
                        height: 50, 
                        borderRadius: 25,
                        backgroundColor: award.color,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: spacing.md
                      }}>
                        <Text variant="h3">{award.icon}</Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text variant="body" style={{ 
                          color: colors.text.primary,
                          fontWeight: '600'
                        }}>
                          {award.name}
                        </Text>
                        <Text variant="caption" style={{ color: colors.text.secondary }}>
                          {award.description}
                        </Text>
                      </View>
                      {award.unlocked ? (
                        <Text variant="h4" style={{ color: award.color }}>
                          {ICONS.award}
                        </Text>
                      ) : (
                        <View style={{ 
                          paddingHorizontal: spacing.sm,
                          paddingVertical: spacing.xs,
                          backgroundColor: colors.background.light,
                          borderRadius: 12
                        }}>
                          <Text variant="caption" style={{ color: colors.text.tertiary }}>
                            🔒 {award.threshold} {award.type}
                          </Text>
                        </View>
                      )}
                    </View>
                  </Card>
                ))}
              </View>
            </ScrollView>
          </Card>
        </View>
      </Modal>

      {/* Add Task Modal */}
      <Modal
        visible={showAddTaskModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAddTaskModal(false)}
      >
        <View style={{ 
          flex: 1, 
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'center',
          alignItems: 'center',
          padding: spacing.lg
        }}>
          <Card elevation="lg" style={{ 
            width: '100%',
            maxWidth: 400,
            padding: spacing.lg
          }}>
            <View style={{ 
              flexDirection: 'row', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: spacing.lg 
            }}>
              <Text variant="h3" style={{ color: colors.text.primary }}>
                Add New Task
              </Text>
              <TouchableOpacity onPress={() => setShowAddTaskModal(false)}>
                <Text variant="h4" style={{ color: colors.text.secondary }}>
                  {ICONS.close}
                </Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.modalSection}>
              <View style={styles.modalRow}>
                <Text variant="body" style={{ color: colors.text.primary, marginBottom: spacing.sm }}>
                  Task Title
                </Text>
                <Input
                  label="Task Title"
                  placeholder="e.g., Morning meditation"
                  value={newTaskTitle}
                  onChangeText={setNewTaskTitle}
                  style={{ backgroundColor: colors.background.light, borderColor: colors.borderLight }}
                />
              </View>
              
              <View style={styles.modalRow}>
                <Text variant="body" style={{ color: colors.text.primary, marginBottom: spacing.sm }}>
                  Category
                </Text>
                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ paddingRight: spacing.sm }}
                >
                  {CATEGORIES.filter(c => c.id !== 'all').map(category => (
                    <Chip
                      key={category.id}
                      label={`${category.icon || ''} ${category.name}`}
                      selected={newTaskCategory === category.id}
                      onPress={() => setNewTaskCategory(category.id)}
                      selectedColor={category.color}
                    />
                  ))}
                </ScrollView>
              </View>
              
              <Button 
                variant="primary" 
                onPress={addTask}
                disabled={!newTaskTitle.trim()}
                style={{ marginTop: spacing.md }}
              >
                Add Task
              </Button>
            </View>
          </Card>
        </View>
      </Modal>
    </ScreenContainer>
  );
}

const styles = {
  awardList: {
    paddingBottom: spacing.lg,
  },
  modalSection: {
    paddingBottom: spacing.lg,
  },
  modalRow: {
    marginBottom: spacing.lg,
  },
};
