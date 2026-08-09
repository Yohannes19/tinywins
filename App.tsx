import React, { useState } from 'react';
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
} from 'react-native';
import { useAppStore, Task, MicroStep } from './store/appStore';

export default function App() {
  const [inputValue, setInputValue] = useState('');

  const tasks = useAppStore((state) => state.tasks);
  const selectedTaskId = useAppStore((state) => state.selectedTaskId);
  const rewardMessage = useAppStore((state) => state.rewardMessage);
  const addTask = useAppStore((state) => state.addTask);
  const selectTask = useAppStore((state) => state.selectTask);
  const toggleStep = useAppStore((state) => state.toggleStep);
  const clearReward = useAppStore((state) => state.clearReward);

  const selectedTask: Task | undefined = tasks.find(
    (task) => task.id === selectedTaskId
  );

  const handleAddTask = () => {
    if (!inputValue.trim()) return;
    addTask(inputValue);
    setInputValue('');
  };

  const renderTask = ({ item }: { item: Task }) => {
    const doneCount = item.microSteps.filter((step) => step.done).length;
    const totalCount = item.microSteps.length;

    return (
      <TouchableOpacity
        style={styles.taskCard}
        onPress={() => selectTask(item.id)}
        activeOpacity={0.7}
      >
        <Text style={styles.taskTitle}>{item.title}</Text>
        <Text style={styles.taskProgress}>
          {doneCount}/{totalCount} tiny steps done
        </Text>
      </TouchableOpacity>
    );
  };

  const renderMicroStep = (step: MicroStep) => (
    <TouchableOpacity
      key={step.id}
      style={styles.stepRow}
      onPress={() => {
        if (selectedTask) {
          toggleStep(selectedTask.id, step.id);
        }
      }}
      activeOpacity={0.7}
    >
      <Text style={styles.stepCheckbox}>{step.done ? '✅' : '⬜'}</Text>
      <Text style={[styles.stepText, step.done && styles.stepTextDone]}>
        {step.text}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>TinyWins</Text>
        <Text style={styles.subtitle}>
          Turn overwhelming tasks into tiny dopamine wins.
        </Text>
      </View>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="What feels overwhelming right now?"
          placeholderTextColor="#8892a6"
          value={inputValue}
          onChangeText={setInputValue}
          onSubmitEditing={handleAddTask}
          returnKeyType="done"
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderTask}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No tasks yet. Add one small overwhelming thing above.
          </Text>
        }
      />

      <Modal
        visible={!!selectedTask}
        animationType="slide"
        transparent
        onRequestClose={() => selectTask(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedTask && (
              <>
                <Text style={styles.modalTitle}>{selectedTask.title}</Text>
                <Text style={styles.modalSubtitle}>
                  Do not worry about the whole task. Just pick one tiny step.
                </Text>

                <View style={styles.stepsList}>
                  {selectedTask.microSteps.map(renderMicroStep)}
                </View>
              </>
            )}

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => selectTask(null)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d1321',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 14,
    color: '#a6b0c3',
    marginTop: 4,
  },
  inputRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#1b2436',
    color: '#ffffff',
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
  emptyText: {
    color: '#6b7690',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 14,
  },
  taskCard: {
    backgroundColor: '#1b2436',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#141b2c',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 36,
  },
  modalTitle: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '700',
  },
  modalSubtitle: {
    color: '#a6b0c3',
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
  stepCheckbox: {
    fontSize: 18,
    marginRight: 12,
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
});