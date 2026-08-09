import { create } from 'zustand';

export type MicroStep = {
  id: string;
  text: string;
  done: boolean;
};

export type Task = {
  id: string;
  title: string;
  microSteps: MicroStep[];
  createdAt: number;
};

export type AppState = {
  tasks: Task[];
  selectedTaskId: string | null;
  rewardMessage: string | null;
  addTask: (title: string) => void;
  selectTask: (id: string | null) => void;
  toggleStep: (taskId: string, stepId: string) => void;
  clearReward: () => void;
};

let idCounter = 0;
function generateId(prefix: string): string {
  idCounter += 1;
  return `${prefix}-${Date.now()}-${idCounter}`;
}

function makeSteps(texts: string[]): MicroStep[] {
  return texts.map((text) => ({
    id: generateId('step'),
    text,
    done: false,
  }));
}

export function generateMicroSteps(title: string): MicroStep[] {
  const lower = title.toLowerCase();

  if (lower.includes('clean')) {
    return makeSteps([
      'Pick up 5 things off the floor.',
      'Clear one small surface.',
      'Put one item back where it belongs.',
      'Set a 2-minute timer and tidy.',
      'Stop after that if you need to.',
    ]);
  }

  if (lower.includes('email')) {
    return makeSteps([
      'Open your email app.',
      'Find the email you need to reply to.',
      'Write just one sentence.',
      'Read it once, imperfect is fine.',
      'Hit send.',
    ]);
  }

  if (lower.includes('tax')) {
    return makeSteps([
      'Find one tax document.',
      'Open the tax website or folder.',
      'Fill in just one field.',
      'Set a 2-minute timer and continue.',
      'Stop after that if you need to.',
    ]);
  }

  if (lower.includes('laundry')) {
    return makeSteps([
      'Pick up one piece of dirty laundry.',
      'Carry the laundry basket to the machine.',
      'Put in one load.',
      'Press start.',
      'Stop after that if you need to.',
    ]);
  }

  if (lower.includes('dishes')) {
    return makeSteps([
      'Pick up one dirty dish.',
      'Rinse just that one dish.',
      'Put it in the rack or dishwasher.',
      'Set a 2-minute timer and continue.',
      'Stop after that if you need to.',
    ]);
  }

  if (lower.includes('shower')) {
    return makeSteps([
      'Walk to the bathroom.',
      'Turn on the water.',
      'Step in.',
      'Wash for 30 seconds.',
      'Step out when ready.',
    ]);
  }

  if (lower.includes('call')) {
    return makeSteps([
      'Find the phone number.',
      'Open your phone app.',
      'Dial the number.',
      'Say one opening sentence.',
      'Stop after that if you need to.',
    ]);
  }

  return makeSteps([
    'Name the very first physical action.',
    'Do it for 30 seconds.',
    'Set a 2-minute timer.',
    'Do one imperfect step.',
    'Stop after that if you need to.',
  ]);
}

export const useAppStore = create<AppState>((set) => ({
  tasks: [],
  selectedTaskId: null,
  rewardMessage: null,

  addTask: (title: string) => {
    const trimmed = title.trim();
    if (!trimmed) return;

    const newTask: Task = {
      id: generateId('task'),
      title: trimmed,
      microSteps: generateMicroSteps(trimmed),
      createdAt: Date.now(),
    };

    set((state) => ({
      tasks: [newTask, ...state.tasks],
    }));
  },

  selectTask: (id: string | null) => {
    set({ selectedTaskId: id });
  },

  toggleStep: (taskId: string, stepId: string) => {
    set((state) => {
      let justCompleted = false;

      const tasks = state.tasks.map((task) => {
        if (task.id !== taskId) return task;

        const microSteps = task.microSteps.map((step) => {
          if (step.id !== stepId) return step;

          const nextDone = !step.done;
          if (nextDone) {
            justCompleted = true;
          }
          return { ...step, done: nextDone };
        });

        return { ...task, microSteps };
      });

      return {
        tasks,
        rewardMessage: justCompleted ? 'Tiny win secured 🎉' : state.rewardMessage,
      };
    });
  },

  clearReward: () => {
    set({ rewardMessage: null });
  },
}));