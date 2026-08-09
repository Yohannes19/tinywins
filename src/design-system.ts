/**
 * TINYWINS 2.0 - DESIGN SYSTEM TOKENS
 * 
 * This file serves as the "Figma Styles" equivalent for the application.
 * All visual decisions are centralized here for consistency.
 * 
 * Design Philosophy: "Mastercard-Inspired Professional Productivity"
 * - Clean, professional interfaces with bold color contrasts
 * - Dark green and white primary palette
 * - Modern, geometric sans-serif typography
 * - Strong visual hierarchy with overlapping circular elements
 */

// ==========================================
// 1. COLOR PALETTE
// ==========================================

export const Colors = {
  // PRIMARY BRAND COLORS (Mastercard-inspired)
  primary: {
    main: '#0A5C36',      // Deep forest green - Main brand color (Mastercard-style)
    light: '#1B7A4E',     // Lighter green for hover states
    dark: '#063D24',      // Darker green for pressed states
    tint: '#E8F5ED',      // Background tints for primary elements
  },

  // SECONDARY ACCENT (Mastercard orange/red inspired)
  secondary: {
    main: '#EB6841',      // Warm coral/orange - Accent color
    light: '#F08969',     // Lighter coral
    dark: '#C94A2B',      // Darker coral
    tint: '#FEF2EF',      // Background tints
  },

  // SEMANTIC COLORS (Status & Feedback)
  success: {
    main: '#0A5C36',      // Forest green - Completed tasks, positive feedback
    light: '#2D8A5A',
    dark: '#063D24',
    tint: '#E8F5ED',
  },
  warning: {
    main: '#F59E0B',      // Amber - Pending tasks, cautions
    light: '#FBBF24',
    dark: '#D97706',
    tint: '#FFFBEB',
  },
  error: {
    main: '#EB6841',      // Coral red - Errors, deletions
    light: '#F08969',
    dark: '#C94A2B',
    tint: '#FEF2EF',
  },
  info: {
    main: '#0A5C36',      // Forest green - Info badges
    light: '#2D8A5A',
    dark: '#063D24',
    tint: '#E8F5ED',
  },

  // NEUTRALS (Text & Backgrounds)
  neutral: {
    white: '#FFFFFF',
    bgLight: '#FAFBFA',   // Main app background (Light Mode) - subtle green tint
    surfaceLight: '#FFFFFF', // Cards, inputs (Light Mode)
    
    bgDark: '#0A1410',    // Main app background (Dark Mode) - very dark green
    surfaceDark: '#14201A', // Cards, inputs (Dark Mode)
    
    textPrimary: '#0A1410', // Headings, primary text - almost black with green undertone
    textSecondary: '#3D4A42', // Body text, subtitles - dark gray-green
    textTertiary: '#6B7A72', // Placeholders, disabled text
    textInverse: '#FFFFFF', // Text on dark backgrounds
    
    border: '#E0E5E2',    // Dividers, borders - soft green-gray
    borderFocus: '#0A5C36', // Focused input borders
  },

  // TASK CATEGORY COLORS (Refined to match brand)
  categories: {
    clean: { main: '#EB6841', light: '#FEF2EF', icon: '🧹' },
    email: { main: '#0A5C36', light: '#E8F5ED', icon: '📧' },
    tax:   { main: '#F59E0B', light: '#FFFBEB', icon: '📄' },
    laundry:{ main: '#5B7A8C', light: '#EEF4F7', icon: '👕' },
    dishes:{ main: '#EB6841', light: '#FEF2EF', icon: '🍽️' },
    shower:{ main: '#4A9FA8', light: '#ECF7F8', icon: '🚿' },
    call:  { main: '#8B5A7A', light: '#F5EEF2', icon: '📞' },
    other: { main: '#6B7A72', light: '#F0F3F1', icon: '✨' },
  },

  // AWARD TIERS COLORS (Metallic tones)
  awards: {
    bronze: '#CD7F32',
    silver: '#C0C0C0',
    gold: '#FFD700',
    platinum: '#E5E4E2',
    diamond: '#B9F2FF',
    legend: '#EB6841',
  },
};

// ==========================================
// 2. TYPOGRAPHY SYSTEM
// ==========================================
// Font Families: 
// - Headings: 'Inter' or 'Helvetica Neue' (Clean, geometric, professional - Mastercard-style)
// - Body: 'Inter' (Highly readable, modern sans-serif)

export const Typography = {
  fontFamilies: {
    heading: 'Inter_700Bold', // Bold, geometric for impact
    headingSemi: 'Inter_600SemiBold',
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
    tight: 1.15,  // Headings - tighter for professional look
    normal: 1.5,  // Body text
    relaxed: 1.75,// Long form reading
  },

  letterSpacings: {
    tight: -0.8,  // Large headings - tighter tracking like Mastercard
    normal: 0,
    wide: 0.8,    // Uppercase labels
  },

  // Pre-defined Styles (Like Figma Text Styles)
  styles: {
    h1: {
      fontFamily: 'Inter_700Bold',
      fontSize: 32,
      lineHeight: 36.8, // 1.15
      letterSpacing: -0.8,
      color: Colors.neutral.textPrimary,
    },
    h2: {
      fontFamily: 'Inter_700Bold',
      fontSize: 24,
      lineHeight: 27.6,
      letterSpacing: -0.5,
      color: Colors.neutral.textPrimary,
    },
    h3: {
      fontFamily: 'Inter_600SemiBold',
      fontSize: 18,
      lineHeight: 21.6,
      letterSpacing: -0.3,
      color: Colors.neutral.textPrimary,
    },
    h4: {
      fontFamily: 'Inter_600SemiBold',
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
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0.8,
      textTransform: 'uppercase' as const,
    },
    label: {
      fontFamily: 'Inter_500Medium',
      fontSize: 12,
      lineHeight: 18,
      letterSpacing: 0.8,
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
// Clean, professional shadows with subtle depth

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
    shadowColor: '#0A1410',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  
  md: {
    shadowColor: '#0A1410',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  
  lg: {
    shadowColor: '#0A1410',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 8,
  },
  
  xl: {
    shadowColor: '#0A1410',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.16,
    shadowRadius: 36,
    elevation: 12,
  },
  
  // Colored shadows for primary brand elements (green)
  primary: {
    shadowColor: '#0A5C36',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
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
  secondary: Colors.secondary.main,
  secondaryLight: Colors.secondary.light,
  secondaryDark: Colors.secondary.dark,
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
