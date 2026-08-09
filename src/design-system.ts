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
    main: '#6C5DD3',      // Blurple - Main brand color
    light: '#8B7FEA',     // Hover states, active elements
    dark: '#4F46B5',      // Pressed states, depth
    tint: '#F0EEFC',      // Background tints for primary elements
  },

  // SEMANTIC COLORS (Status & Feedback)
  success: {
    main: '#00D2A0',      // Completed tasks, positive feedback
    light: '#4CE9C6',
    dark: '#00A680',
    tint: '#E6F9F4',
  },
  warning: {
    main: '#FFB800',      // Pending tasks, cautions
    light: '#FFD54F',
    dark: '#CC9500',
    tint: '#FFF8E1',
  },
  error: {
    main: '#FF6B6B',      // Errors, deletions
    light: '#FF8E8E',
    dark: '#E05555',
    tint: '#FFEDED',
  },
  info: {
    main: '#3ECF8E',      // Info badges, neutral positives
    light: '#6EE7B7',
    dark: '#2DA571',
    tint: '#EDFDF5',
  },

  // NEUTRALS (Text & Backgrounds)
  neutral: {
    white: '#FFFFFF',
    bgLight: '#F8F9FE',   // Main app background (Light Mode)
    surfaceLight: '#FFFFFF', // Cards, inputs (Light Mode)
    
    bgDark: '#12141D',    // Main app background (Dark Mode)
    surfaceDark: '#1E2130', // Cards, inputs (Dark Mode)
    
    textPrimary: '#1F2937', // Headings, primary text
    textSecondary: '#6B7280', // Body text, subtitles
    textTertiary: '#9CA3AF', // Placeholders, disabled text
    textInverse: '#FFFFFF', // Text on dark backgrounds
    
    border: '#E5E7EB',    // Dividers, borders
    borderFocus: '#6C5DD3', // Focused input borders
  },

  // TASK CATEGORY COLORS (Distinct & Accessible)
  categories: {
    clean: { main: '#FF6B6B', light: '#FFE3E3', icon: '🧹' },
    email: { main: '#4ECDC4', light: '#E0F7FA', icon: '📧' },
    tax:   { main: '#FFD93D', light: '#FFF9C4', icon: '📄' },
    laundry:{ main: '#A06CD5', light: '#F3E5F5', icon: '👕' },
    dishes:{ main: '#FF8C42', light: '#FFE0B2', icon: '🍽️' },
    shower:{ main: '#4D96FF', light: '#E3F2FD', icon: '🚿' },
    call:  { main: '#FF6B9D', light: '#FCE4EC', icon: '📞' },
    other: { main: '#95A5A6', light: '#ECEFF1', icon: '✨' },
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
    sm: 8,    // Small chips, icons
    md: 12,   // Buttons, inputs
    lg: 16,   // Cards
    xl: 24,   // Large containers, modals
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
// Soft, diffused shadows for a modern "floating" feel

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
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  
  md: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  
  lg: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  
  xl: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 12,
  },
  
  // Colored shadows for specific interactions (e.g., Primary Button)
  primary: {
    shadowColor: Colors.primary.main,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
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

export type ThemeType = typeof Theme;
