/**
 * TINYWINS 2.0 - DESIGN SYSTEM TOKENS
 * 
 * This file serves as the "Figma Styles" equivalent for the application.
 * All visual decisions are centralized here for consistency.
 * 
 * Design Philosophy: "Soft Focus Productivity"
 * - Clean, airy interfaces with soft shadows (Neomorphism hints)
 * - High contrast for readability
 * - Playful but professional animations
 * - Mobile-first responsive scaling
 */

// ==========================================
// 1. COLOR PALETTE
// ==========================================

export const Colors = {
  // PRIMARY BRAND COLORS
  primary: {
    main: '#5B5FC7',      // Refined periwinkle - Main brand color
    light: '#7B80D9',     // Hover states, active elements
    dark: '#4A4DB8',      // Pressed states, depth
    tint: '#EBEDF7',      // Background tints for primary elements
  },

  // SEMANTIC COLORS (Status & Feedback)
  success: {
    main: '#10B981',      // Emerald green - Completed tasks, positive feedback
    light: '#34D399',
    dark: '#059669',
    tint: '#ECFDF5',
  },
  warning: {
    main: '#F59E0B',      // Amber - Pending tasks, cautions
    light: '#FBBF24',
    dark: '#D97706',
    tint: '#FFFBEB',
  },
  error: {
    main: '#EF4444',      // Red - Errors, deletions
    light: '#F87171',
    dark: '#DC2626',
    tint: '#FEF2F2',
  },
  info: {
    main: '#3B82F6',      // Blue - Info badges, neutral positives
    light: '#60A5FA',
    dark: '#2563EB',
    tint: '#EFF6FF',
  },

  // NEUTRALS (Text & Backgrounds)
  neutral: {
    white: '#FFFFFF',
    bgLight: '#F5F7FA',   // Main app background (Light Mode) - softer gray
    surfaceLight: '#FFFFFF', // Cards, inputs (Light Mode)
    
    bgDark: '#0F1115',    // Main app background (Dark Mode)
    surfaceDark: '#1A1D24', // Cards, inputs (Dark Mode)
    
    textPrimary: '#1A1A2E', // Headings, primary text - deeper navy
    textSecondary: '#5A5A72', // Body text, subtitles - softer
    textTertiary: '#9A9AAF', // Placeholders, disabled text
    textInverse: '#FFFFFF', // Text on dark backgrounds
    
    border: '#E8EAF0',    // Dividers, borders - softer
    borderFocus: '#6C5DD3', // Focused input borders
  },

  // TASK CATEGORY COLORS (Distinct & Accessible)
  categories: {
    clean: { main: '#EF4444', light: '#FEE2E2', icon: '🧹' },
    email: { main: '#06B6D4', light: '#CCFBF1', icon: '📧' },
    tax:   { main: '#F59E0B', light: '#FEF3C7', icon: '📄' },
    laundry:{ main: '#8B5CF6', light: '#EDE9FE', icon: '👕' },
    dishes:{ main: '#F97316', light: '#FFEDD5', icon: '🍽️' },
    shower:{ main: '#3B82F6', light: '#DBEAFE', icon: '🚿' },
    call:  { main: '#EC4899', light: '#FCE7F3', icon: '📞' },
    other: { main: '#6B7280', light: '#F3F4F6', icon: '✨' },
  },

  // AWARD TIERS COLORS
  awards: {
    bronze: '#CD7F32',
    silver: '#C0C0C0',
    gold: '#FFD700',
    platinum: '#E5E4E2',
    diamond: '#B9F2FF',
    legend: '#FF6B6B',
  },
};

// ==========================================
// 2. TYPOGRAPHY SYSTEM
// ==========================================
// Font Families: 
// - Headings: 'Nunito' (Rounded, friendly, approachable)
// - Body: 'Inter' (Clean, highly readable, modern)

export const Typography = {
  fontFamilies: {
    heading: 'Nunito_700Bold', // Bold for impact
    headingSemi: 'Nunito_600SemiBold',
    body: 'Inter_400Regular',
    bodyMedium: 'Inter_500Medium',
    bodyBold: 'Inter_600SemiBold',
    mono: 'SpaceMono_400Regular', // For code/timers if needed
  },

  // Scale based on REM logic (Base 16px)
  sizes: {
    xs: 12,   // Captions, timestamps
    sm: 14,   // Secondary text, buttons
    md: 16,   // Body text, inputs
    lg: 18,   // Subheadings, card titles
    xl: 24,   // Section headers
    xxl: 32,  // Page titles
    hero: 40, // Splash screen, big stats
  },

  lineHeights: {
    tight: 1.2,   // Headings
    normal: 1.5,  // Body text
    relaxed: 1.75,// Long form reading
  },

  letterSpacings: {
    tight: -0.5,  // Large headings
    normal: 0,
    wide: 0.5,    // Uppercase labels
  },

  // Pre-defined Styles (Like Figma Text Styles)
  styles: {
    h1: {
      fontFamily: 'Nunito_700Bold',
      fontSize: 32,
      lineHeight: 38.4, // 1.2
      letterSpacing: -0.5,
      color: Colors.neutral.textPrimary,
    },
    h2: {
      fontFamily: 'Nunito_700Bold',
      fontSize: 24,
      lineHeight: 28.8,
      letterSpacing: -0.3,
      color: Colors.neutral.textPrimary,
    },
    h3: {
      fontFamily: 'Nunito_600SemiBold',
      fontSize: 18,
      lineHeight: 21.6,
      color: Colors.neutral.textPrimary,
    },
    h4: {
      fontFamily: 'Nunito_600SemiBold',
      fontSize: 16,
      lineHeight: 20,
      letterSpacing: -0.2,
      color: Colors.neutral.textPrimary,
    },
    bodyLarge: {
      fontFamily: 'Inter_500Medium',
      fontSize: 16,
      lineHeight: 24,
      color: Colors.neutral.textPrimary,
    },
    body: {
      fontFamily: 'Inter_400Regular',
      fontSize: 16,
      lineHeight: 24,
      color: Colors.neutral.textSecondary,
    },
    bodySmall: {
      fontFamily: 'Inter_400Regular',
      fontSize: 14,
      lineHeight: 20,
      color: Colors.neutral.textSecondary,
    },
    caption: {
      fontFamily: 'Inter_400Regular',
      fontSize: 12,
      lineHeight: 18,
      color: Colors.neutral.textTertiary,
    },
    button: {
      fontFamily: 'Inter_600SemiBold',
      fontSize: 16,
      lineHeight: 24,
      letterSpacing: 0.5,
      textTransform: 'uppercase' as const,
    },
    label: {
      fontFamily: 'Inter_500Medium',
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0.5,
      textTransform: 'uppercase' as const,
      color: Colors.neutral.textTertiary,
    },
  },
};

// ==========================================
// 3. SPACING & LAYOUT GRID
// ==========================================
// Based on 4pt grid system (multiples of 4)
// Base unit: 4px

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

// Screen Margins & Gutters
export const Layout = {
  marginHorizontal: 20, // Standard screen edge margin
  gutter: 16,           // Space between items in a row
  cardPadding: 20,      // Internal padding for cards
  touchTarget: 44,      // Minimum accessible touch size (Apple HIG)
  
  // Responsive Breakpoints (Width in pixels)
  breakpoints: {
    phoneSmall: 320,
    phoneNormal: 375,
    phoneLarge: 414,
    tabletSmall: 600,
    tabletNormal: 768,
    tabletLarge: 1024,
  },
};

// ==========================================
// 4. SHAPES & BORDERS
// ==========================================

export const Borders = {
  radius: {
    none: 0,
    xs: 4,    // Tiny accents
    sm: 8,    // Small chips, icons
    md: 12,   // Buttons, inputs
    lg: 16,   // Cards
    xl: 20,   // Large containers, modals
    xxl: 28,  // Extra large containers
    full: 9999, // Circles (Avatars, floating buttons)
  },
  
  width: {
    thin: 1,
    normal: 2,
    thick: 3,
  },
};

// ==========================================
// 5. SHADOWS & ELEVATION
// ==========================================
// Refined shadows with softer, more diffused feel

export const Shadows = {
  // Format: { shadowColor, shadowOffset, shadowOpacity, shadowRadius, elevation (Android) }
  
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  
  sm: {
    shadowColor: '#1A1A2E',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  
  md: {
    shadowColor: '#1A1A2E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 4,
  },
  
  lg: {
    shadowColor: '#1A1A2E',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 20,
    elevation: 8,
  },
  
  xl: {
    shadowColor: '#1A1A2E',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 32,
    elevation: 12,
  },
  
  // Colored shadows for specific interactions (e.g., Primary Button)
  primary: {
    shadowColor: '#5B5FC7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
};

// ==========================================
// 6. ANIMATION SPECIFICATIONS
// ==========================================
// Durations in milliseconds, Curves as bezier values

export const Animation = {
  duration: {
    instant: 100,
    fast: 200,
    normal: 300,
    medium: 300,
    slow: 500,
    deliberate: 800,
  },
  
  easing: {
    easeInOut: [0.42, 0, 0.58, 1], // Standard smooth
    easeOut: [0.0, 0.0, 0.58, 1.0], // Natural exit
    easeIn: [0.42, 0, 1.0, 1.0],   // Accelerating entry
    bounce: [0.68, -0.55, 0.265, 1.55], // Playful bounce
    spring: [0.175, 0.885, 0.32, 1.275], // Springy effect
  },
  
  // Pre-defined Animation Presets
  presets: {
    fadeIn: {
      from: { opacity: 0 },
      to: { opacity: 1 },
      duration: 300,
      easing: 'easeInOut',
    },
    slideUp: {
      from: { translateY: 20, opacity: 0 },
      to: { translateY: 0, opacity: 1 },
      duration: 400,
      easing: 'easeOut',
    },
    scaleIn: {
      from: { scale: 0.9, opacity: 0 },
      to: { scale: 1, opacity: 1 },
      duration: 300,
      easing: 'spring',
    },
    pop: {
      from: { scale: 1 },
      to: { scale: 1.1 },
      duration: 100,
      easing: 'easeOut',
      reverse: { scale: 1, duration: 100 },
    },
    shake: {
      keyframes: [
        { translateX: 0 },
        { translateX: -5 },
        { translateX: 5 },
        { translateX: -5 },
        { translateX: 5 },
        { translateX: 0 },
      ],
      duration: 400,
    },
  },
};

// ==========================================
// 7. Z-INDEX LAYERS
// ==========================================

export const ZIndex = {
  base: 0,
  overlay: 10,    // Simple overlays
  dropdown: 20,   // Menus, tooltips
  sticky: 30,     // Sticky headers
  modal: 40,      // Modal backgrounds
  toast: 50,      // Notifications
  popup: 60,      // Popups, pickers
};

// ==========================================
// EXPORT COMBINED THEME OBJECT
// ==========================================

export const Theme = {
  colors: Colors,
  typography: Typography,
  spacing: Spacing,
  layout: Layout,
  borders: Borders,
  shadows: Shadows,
  animation: Animation,
  zIndex: ZIndex,
};

export const colors = {
  primary: Colors.primary.main,
  primaryLight: Colors.primary.light,
  primaryDark: Colors.primary.dark,
  primaryTint: Colors.primary.tint,
  secondary: Colors.primary.light,
  success: Colors.success.main,
  warning: Colors.warning.main,
  error: Colors.error.main,
  info: Colors.info.main,
  background: {
    light: Colors.neutral.bgLight,
    card: Colors.neutral.surfaceLight,
    dark: Colors.neutral.bgDark,
    surface: Colors.neutral.surfaceDark,
  },
  surface: Colors.neutral.surfaceLight,
  text: {
    primary: Colors.neutral.textPrimary,
    secondary: Colors.neutral.textSecondary,
    tertiary: Colors.neutral.textTertiary,
    inverse: Colors.neutral.textInverse,
  },
  textPrimary: Colors.neutral.textPrimary,
  textSecondary: Colors.neutral.textSecondary,
  textTertiary: Colors.neutral.textTertiary,
  textInverse: Colors.neutral.textInverse,
  border: Colors.neutral.border,
  borderFocus: Colors.neutral.borderFocus,
  borderLight: Colors.neutral.border,
  accent: {
    coral: Colors.error.main,
    gold: Colors.awards.gold,
  },
  category: {
    clean: Colors.categories.clean.main,
    email: Colors.categories.email.main,
    tax: Colors.categories.tax.main,
    laundry: Colors.categories.laundry.main,
    dishes: Colors.categories.dishes.main,
    shower: Colors.categories.shower.main,
    call: Colors.categories.call.main,
    other: Colors.categories.other.main,
  },
  categoryLight: {
    clean: Colors.categories.clean.light,
    email: Colors.categories.email.light,
    tax: Colors.categories.tax.light,
    laundry: Colors.categories.laundry.light,
    dishes: Colors.categories.dishes.light,
    shower: Colors.categories.shower.light,
    call: Colors.categories.call.light,
    other: Colors.categories.other.light,
  },
  categoryIcon: {
    clean: Colors.categories.clean.icon,
    email: Colors.categories.email.icon,
    tax: Colors.categories.tax.icon,
    laundry: Colors.categories.laundry.icon,
    dishes: Colors.categories.dishes.icon,
    shower: Colors.categories.shower.icon,
    call: Colors.categories.call.icon,
    other: Colors.categories.other.icon,
  },
  award: Colors.awards,
};

export const typography = Typography.styles;
export const spacing = Spacing;
export const borderRadius = Borders.radius;
export const shadows = Shadows;
export const animations = Animation;

export type ThemeType = typeof Theme;
