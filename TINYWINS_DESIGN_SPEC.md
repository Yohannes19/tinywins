# TinyWins 2.0 - Design Specification Document

## 🎨 Design Philosophy

**Core Principle:** "Small Steps, Big Wins" - Every interaction should feel rewarding and motivating.

### Visual Identity
- **Style:** Modern Neomorphism with soft shadows and depth
- **Mood:** Encouraging, Clean, Professional yet Playful
- **Animation Philosophy:** Smooth, purposeful, celebratory

---

## 🌈 Color System

### Primary Palette
```
Primary:     #6C5DD3 (Blurple) - Main actions, progress
Success:     #00D2A0 (Mint Green) - Completions, positive feedback
Accent:      #FF754C (Coral) - Highlights, notifications
Warning:     #FFB83D (Amber) - Streak warnings
Error:       #FF6B6B (Soft Red) - Errors, deletions
```

### Background Colors
```
Light Mode:
  - Background: #F8F9FE
  - Surface: #FFFFFF
  - Elevated: #FFFFFF with shadow
  
Dark Mode:
  - Background: #12141D
  - Surface: #1E2130
  - Elevated: #25293A with shadow
```

### Text Colors
```
Light Mode:
  - Primary: #1F2937
  - Secondary: #6B7280
  - Tertiary: #9CA3AF
  
Dark Mode:
  - Primary: #F9FAFB
  - Secondary: #D1D5DB
  - Tertiary: #6B7280
```

### Category Colors
```
🧹 Clean:   #4ECDC4 (Turquoise)
📧 Email:   #FFD700 (Gold)
📄 Tax:     #FF6B6B (Coral Red)
👕 Laundry: #A8E6CF (Mint)
🍽️ Dishes:  #FFEAA7 (Soft Yellow)
🚿 Shower:  #74B9FF (Sky Blue)
📞 Call:    #FD79A8 (Pink)
✨ Other:   #DFE6E9 (Silver)
```

---

## 📐 Typography System

### Font Families
```
Headings: Nunito (Rounded, friendly)
Body: Inter (Clean, readable)
Numbers: Nunito (Consistent with headings)
```

### Type Scale
```
Display:   32px - Bold (700) - Splash screen, major celebrations
H1:        28px - SemiBold (600) - Screen titles
H2:        22px - SemiBold (600) - Section headers
H3:        18px - Medium (500) - Card titles
Body:      16px - Regular (400) - Main content
Caption:   14px - Regular (400) - Secondary info
Small:     12px - Medium (500) - Labels, badges
Micro:     10px - Medium (500) - Timestamps, meta
```

### Line Heights
```
Display: 40px (1.25)
H1-H3:   1.3
Body:    1.5 (24px)
Caption: 1.4
```

---

## 📱 Layout & Spacing

### Grid System
```
Columns: 4-column grid
Margins: 20px (mobile), 24px (tablet)
Gutters: 16px
```

### Spacing Scale (8pt grid)
```
xs:   4px
sm:   8px
md:   16px
lg:   24px
xl:   32px
2xl:  48px
3xl:  64px
```

### Border Radius
```
Small:   8px  - Buttons, chips
Medium:  12px - Input fields
Large:   16px - Cards
XLarge:  24px - Modals, sheets
Full:    999px - Pills, avatars
```

### Shadows (Light Mode)
```
Small:  0 2px 8px rgba(0,0,0,0.08)
Medium: 0 4px 16px rgba(0,0,0,0.10)
Large:  0 8px 32px rgba(0,0,0,0.12)
Float:  0 12px 48px rgba(108,93,211,0.20)
```

### Shadows (Dark Mode)
```
Small:  0 2px 8px rgba(0,0,0,0.20)
Medium: 0 4px 16px rgba(0,0,0,0.30)
Large:  0 8px 32px rgba(0,0,0,0.40)
Float:  0 12px 48px rgba(0,0,0,0.50)
```

---

## 🎬 Animation System

### Duration Scale
```
Fast:    150ms - Micro interactions (button press)
Normal:  300ms - Standard transitions
Slow:    500ms - Page transitions, modals
Celebration: 2000ms - Confetti, achievements
```

### Easing Curves
```
Default:    cubic-bezier(0.4, 0.0, 0.2, 1)
Enter:      cubic-bezier(0.0, 0.0, 0.2, 1)
Exit:       cubic-bezier(0.4, 0.0, 1, 1)
Bounce:     cubic-bezier(0.68, -0.55, 0.265, 1.55)
Smooth:     cubic-bezier(0.25, 0.1, 0.25, 1)
```

### Key Animations
1. **Fade In/Out** - Opacity 0→1 or 1→0
2. **Scale Up/Down** - Scale 0.95→1 or 1→0.95
3. **Slide Up/Down** - TranslateY ±20px
4. **Wobble** - Rotation ±5deg
5. **Pulse** - Scale 1→1.05→1
6. **Confetti Fall** - Particles with gravity + wobble

---

## 🖼️ Screen Specifications

### 1. Splash Screen
**Purpose:** First impression, brand establishment

**Layout:**
```
┌─────────────────────────┐
│                         │
│      [Animated Logo]    │
│         🎯              │
│                         │
│      TinyWins           │
│   Small Steps, Big      │
│        Wins             │
│                         │
│   ✨ Break tasks into   │
│      tiny steps         │
│                         │
│   🏆 Earn awards &      │
│      badges             │
│                         │
│   🔥 Build your streak  │
│                         │
│   [Loading Bar]         │
│   ████████░░ 80%        │
│                         │
└─────────────────────────┘
```

**Animations:**
- Logo: Rotate 0→360° continuously
- Title: Fade in + scale 0.5→1
- Features: Staggered fade in (150ms delay each)
- Loading bar: Width 0→100%
- Exit: Fade out 500ms

**Timing:** Total 4 seconds

---

### 2. Main Dashboard
**Purpose:** Overview of progress, quick actions

**Layout:**
```
┌─────────────────────────┐
│ ☰  TinyWins       ⚙️🌙  │
├─────────────────────────┤
│                         │
│   ┌───────────────┐     │
│   │   Progress    │     │
│   │     Ring      │     │
│   │     65%       │     │
│   └───────────────┘     │
│                         │
│   🔥 7 day streak       │
│   📊 156 total steps    │
│   🏆 5 awards earned    │
│                         │
├─────────────────────────┤
│   Recent Awards         │
│   [🌱][⚡][🎯][🚀][💪]  │
├─────────────────────────┤
│   Your Tasks            │
│   ┌─────────────────┐   │
│   │ 🧹 Clean room   │   │
│   │ ████████░░ 80%  │   │
│   └─────────────────┘   │
│   ┌─────────────────┐   │
│   │ 📧 Check emails │   │
│   │ ████░░░░░░ 40%  │   │
│   └─────────────────┘   │
│                         │
│   [+ Add Task]          │
├─────────────────────────┤
│  🏠    📋    🏆    👤   │
│ Home  Tasks Awards Profile│
└─────────────────────────┘
```

**Components:**
- Header: App title, menu, settings, theme toggle
- Progress Ring: Circular progress indicator (120px)
- Stats Row: Streak, total steps, awards
- Recent Awards: Horizontal scroll of unlocked badges
- Task List: Vertical scroll of task cards
- Bottom Nav: 4 tabs (Home, Tasks, Awards, Profile)

---

### 3. Task Detail View
**Purpose:** Focused step completion

**Layout:**
```
┌─────────────────────────┐
│ ←  Clean Room      ⋮    │
├─────────────────────────┤
│                         │
│   🧹 Clean Room         │
│   4/5 steps completed   │
│   ████████████░░ 80%    │
│                         │
├─────────────────────────┤
│   Steps                 │
│                         │
│   ☑️ Pick up clothes    │
│   ☑️ Make bed           │
│   ☐ Vacuum floor        │
│   ☐ Dust surfaces       │
│   ☐ Organize closet     │
│                         │
│   [+ Add Step]          │
│                         │
├─────────────────────────┤
│   💪 You're doing great!│
│   Keep going!           │
└─────────────────────────┘
```

**Interactions:**
- Tap step: Toggle complete with confetti burst
- Swipe left: Delete step
- Long press: Edit step
- Pull down: Refresh

---

### 4. Awards Gallery
**Purpose:** Motivation through achievement display

**Layout:**
```
┌─────────────────────────┐
│ ←  Your Awards         │
├─────────────────────────┤
│                         │
│   🏆 5/8 Awards Earned  │
│                         │
│   UNLOCKED              │
│   ┌───┐ ┌───┐ ┌───┐    │
│   │🌱│ │⚡│ │🎯│       │
│   │1st│ │10 │ │50 │    │
│   └───┘ └───┘ └───┘    │
│   ┌───┐ ┌───┐          │
│   │🚀│ │💪│            │
│   │100│ │250│          │
│   └───┘ └───┘          │
│                         │
│   LOCKED                │
│   ┌───┐ ┌───┐ ┌───┐    │
│   │👑│ │📅│ │🏆│       │
│   │500│ │7d │ │30d│    │
│   └───┘ └───┘ └───┘    │
│   ??? steps   ??? days  │
│                         │
└─────────────────────────┘
```

**Award Details Modal:**
- Large emoji badge
- Award name
- Description
- Progress toward unlock
- Date earned (if unlocked)

---

### 5. Add Task Flow
**Purpose:** Quick task creation

**Modal Layout:**
```
┌─────────────────────────┐
│                         │
│   What's your task?     │
│                         │
│   ┌─────────────────┐   │
│   │ Clean the...    │   │
│   └─────────────────┘   │
│                         │
│   Choose Category       │
│   [🧹][📧][📄][👕]     │
│   [🍽️][🚿][📞][✨]     │
│                         │
│   Add First Step        │
│   ┌─────────────────┐   │
│   │ Pick up items   │   │
│   └─────────────────┘   │
│   [+ Add Another Step]  │
│                         │
│   [Create Task]         │
│                         │
└─────────────────────────┘
```

---

## 🎯 Component Specifications

### Button Styles
```
Primary Button:
  - Height: 56px
  - BorderRadius: 16px
  - Background: #6C5DD3
  - Text: White, 16px SemiBold
  - Shadow: 0 4px 16px rgba(108,93,211,0.3)
  - Pressed: Scale 0.98

Secondary Button:
  - Height: 48px
  - BorderRadius: 12px
  - Border: 2px solid #6C5DD3
  - Text: #6C5DD3, 16px Medium
  - Pressed: Background rgba(108,93,211,0.1)

Icon Button:
  - Size: 44px
  - BorderRadius: 12px
  - Icon: 24px
  - Pressed: Background rgba(0,0,0,0.05)
```

### Input Fields
```
Height: 56px
BorderRadius: 12px
BorderWidth: 2px
BorderColor: #E5E7EB (light), #374151 (dark)
FocusColor: #6C5DD3
Padding: 0 16px
FontSize: 16px
PlaceholderColor: #9CA3AF
```

### Cards
```
Padding: 20px
BorderRadius: 16px
Background: #FFFFFF (light), #1E2130 (dark)
Shadow: 0 4px 16px rgba(0,0,0,0.1)
MarginBottom: 16px
```

### Progress Bars
```
Height: 8px
BorderRadius: 4px
Background: #E5E7EB
Fill: Gradient #6C5DD3 → #00D2A0
Animation: Ease-out 300ms
```

### Chips/Tags
```
Height: 32px
BorderRadius: 16px (full pill)
Padding: 0 16px
FontSize: 14px Medium
Background: #F3F4F6 (light), #374151 (dark)
Selected: #6C5DD3 with white text
```

---

## 🏆 Awards System Details

### Award Tiers

**Step-Based Awards:**
| Award | Emoji | Requirement | Color |
|-------|-------|-------------|-------|
| First Step | 🌱 | 1 step | #4ECDC4 |
| Quick Starter | ⚡ | 10 steps | #FFD700 |
| Task Master | 🎯 | 50 steps | #FF6B6B |
| Productivity Pro | 🚀 | 100 steps | #A8E6CF |
| Unstoppable | 💪 | 250 steps | #FD79A8 |
| Legend | 👑 | 500 steps | #FFEAA7 |

**Streak-Based Awards:**
| Award | Emoji | Requirement | Color |
|-------|-------|-------------|-------|
| Week Warrior | 📅 | 7 days | #74B9FF |
| Month Champion | 🏆 | 30 days | #DFE6E9 |

### Unlock Animation
1. Badge scales from 0 to 1 with bounce
2. Confetti explosion (50 particles)
3. Toast notification slides up
4. Haptic feedback (if available)

---

## 📱 Responsive Guidelines

### Breakpoints
```
Small:  < 375px  (iPhone SE)
Medium: 375-768px (Most phones)
Large:  > 768px  (Tablets)
```

### Scaling Rules
- Font sizes scale by 0.9x on small screens
- Padding/margins reduce by 20% on small
- Increase by 10% on tablets
- Progress ring: 100px (small), 120px (medium), 140px (large)
- Card height: auto-adjust based on content

### Safe Areas
- Use react-native-safe-area-context
- Top inset: Status bar height
- Bottom inset: Home indicator
- Horizontal: Notch areas on modern phones

---

## ♿ Accessibility

### Requirements
- Minimum touch target: 44x44px
- Color contrast ratio: 4.5:1 minimum
- Support dynamic type (font scaling)
- Screen reader labels on all interactive elements
- Focus indicators for keyboard navigation
- Reduce motion option for animations

### VoiceOver/TalkBack Labels
```
<TaskCard>
  accessibilityLabel="Clean room task, 4 of 5 steps completed, 80 percent"
  accessibilityRole="button"
  accessibilityHint="Double tap to view task details"
</TaskCard>
```

---

## 🎭 Micro-interactions

### Step Completion
1. Checkbox fills with color
2. Strikethrough text animates
3. Small confetti burst (5-10 particles)
4. Progress bar updates smoothly
5. Optional haptic feedback

### Task Creation
1. Modal slides up from bottom
2. Input field auto-focuses
3. Category selection shows ripple
4. Create button pulses when valid
5. Success checkmark animation

### Award Unlock
1. Badge appears with pop
2. Full-screen confetti
3. Toast slides up
4. Sound effect (optional)
5. Haptic pattern

### Theme Toggle
1. Smooth cross-fade (300ms)
2. All colors transition together
3. Icon rotates 180°

---

## 📊 Performance Targets

### Metrics
- Splash screen: < 4 seconds total
- Screen transitions: < 300ms
- List scroll: 60 FPS
- Animation frame rate: 60 FPS
- Initial load: < 3 seconds

### Optimization Strategies
- Use FlatList with proper keys
- Memoize expensive calculations
- Lazy load images/assets
- Debounce search inputs
- Batch state updates

---

## 🛠️ Technical Implementation Notes

### Required Dependencies
```json
{
  "@react-native-async-storage/async-storage": "^2.1.0",
  "react-native-safe-area-context": "^4.x",
  "expo-font": "^12.x",
  "@expo-google-fonts/nunito": "^0.x",
  "@expo-google-fonts/inter": "^0.x",
  "lucide-react-native": "^0.x",
  "expo-linear-gradient": "^13.x",
  "zustand": "^5.0.14"
}
```

### State Management (Zustand)
```typescript
interface AppState {
  // Tasks
  tasks: Task[];
  selectedTaskId: string | null;
  
  // User Progress
  totalCompletedSteps: number;
  streak: number;
  lastCompletionDate: string | null;
  unlockedAwards: Award[];
  
  // UI State
  isDarkMode: boolean;
  currentTab: 'home' | 'tasks' | 'awards' | 'profile';
  
  // Actions
  addTask: (title: string, category: string) => void;
  toggleStep: (taskId: string, stepId: string) => void;
  unlockAward: (award: Award) => void;
  setTheme: (isDark: boolean) => void;
}
```

### Storage Keys
```
'tinywins-tasks'
'tinywins-total-steps'
'tinywins-streak'
'tinywins-last-date'
'tinywins-awards'
'tinywins-theme'
```

---

## 🎨 Design Assets Needed

### Icons (Lucide or Custom)
- Home (outline + filled)
- Tasks/List (outline + filled)
- Trophy/Award (outline + filled)
- Profile/User (outline + filled)
- Settings/Gear
- Moon/Sun (theme toggle)
- Plus/Add
- Check/Checkbox
- Trash/Delete
- Edit/Pencil
- Menu/Hamburger
- Close/X
- Back/Arrow left
- Share
- Notification/Bell

### Illustrations (Optional)
- Empty state illustrations
- Onboarding screens
- Celebration graphics
- Error states

---

## 📋 Next Steps

### Phase 1: Foundation (Week 1)
- [ ] Set up design tokens (colors, typography, spacing)
- [ ] Create theme context
- [ ] Implement base components (Button, Input, Card)
- [ ] Fix SafeAreaView deprecation
- [ ] Set up proper font loading

### Phase 2: Core Screens (Week 2)
- [ ] Redesign Splash Screen
- [ ] Redesign Main Dashboard
- [ ] Redesign Task Detail View
- [ ] Implement new navigation

### Phase 3: Polish (Week 3)
- [ ] Add all animations
- [ ] Implement awards gallery
- [ ] Add haptic feedback
- [ ] Optimize performance
- [ ] Accessibility audit

### Phase 4: Testing & Launch (Week 4)
- [ ] Test on multiple devices
- [ ] Gather user feedback
- [ ] Bug fixes
- [ ] Performance optimization
- [ ] App store assets

---

## 📝 Notes

- Always test in both light and dark modes
- Prioritize smooth animations over complex features
- Keep the "celebration" feeling central to the experience
- Every interaction should motivate the user to continue
- Design for joy, not just utility

---

**Version:** 2.0  
**Last Updated:** 2026  
**Status:** Ready for Implementation
