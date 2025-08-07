# Design System

A comprehensive design system for the User Authentication App with support for light and dark themes.

## Overview

This design system provides a consistent, scalable foundation for building user interfaces. It includes:

- **Color System**: Complete color palette with light/dark themes
- **Typography**: Font families, sizes, weights, and line heights
- **Spacing**: Consistent spacing scale and layout utilities
- **Theme Context**: React context for theme management
- **Utilities**: Helper functions for common styling patterns

## Structure

```
App/theme/
├── colors.ts          # Color system and palettes
├── typography.ts      # Typography definitions
├── spacing.ts         # Spacing and layout utilities
├── utils.ts           # Theme utility functions
├── ThemeContext.tsx   # Theme context and provider
├── index.ts           # Main theme exports
└── README.md          # This documentation
```

## Color System

### Base Colors

The design system includes a comprehensive color palette:

- **Primary**: Blue shades for main actions and branding
- **Secondary**: Purple shades for secondary actions
- **Neutral**: Gray shades for text and backgrounds
- **Success**: Green shades for positive states
- **Warning**: Yellow/Orange shades for warnings
- **Error**: Red shades for errors and destructive actions
- **Info**: Blue shades for informational content

### Theme Colors

Each theme (light/dark) provides semantic color tokens:

```typescript
// Light theme colors
lightColors = {
  background: { primary, secondary, tertiary, card, modal },
  surface: { primary, secondary, tertiary, elevated, overlay },
  text: { primary, secondary, tertiary, disabled, inverse, link },
  border: { primary, secondary, tertiary, focus, error, success },
  status: { success, warning, error, info },
  interactive: { primary, secondary, disabled, hover, active },
  shadow: { light, medium, heavy },
}
```

### Usage

```typescript
import { useTheme } from '../theme/ThemeContext';

const MyComponent = () => {
  const { theme } = useTheme();
  
  return (
    <View style={{ backgroundColor: theme.colors.background.primary }}>
      <Text style={{ color: theme.colors.text.primary }}>
        Hello World
      </Text>
    </View>
  );
};
```

## Typography

### Font Families

- **Primary**: System font for most text
- **Secondary**: Alternative font for special cases
- **Monospace**: Courier for code and numbers

### Font Sizes

```typescript
fontSizes = {
  display: { large: 48, medium: 40, small: 32 },
  heading: { h1: 32, h2: 28, h3: 24, h4: 20, h5: 18, h6: 16 },
  body: { large: 18, medium: 16, small: 14, xsmall: 12 },
  caption: { large: 14, medium: 12, small: 10 },
  button: { large: 18, medium: 16, small: 14 },
  input: { large: 18, medium: 16, small: 14 },
}
```

### Font Weights

- **Light**: 300
- **Regular**: 400
- **Medium**: 500
- **Semibold**: 600
- **Bold**: 700
- **Extrabold**: 800

### Usage

```typescript
import { useTheme } from '../theme/ThemeContext';

const MyComponent = () => {
  const { theme } = useTheme();
  
  return (
    <Text style={theme.typography.heading.h1}>
      Main Heading
    </Text>
  );
};
```

## Spacing

### Base Unit

The spacing system uses a 4px base unit for consistency.

### Spacing Scale

```typescript
spacing = {
  none: 0,      // 0px
  xs: 4,        // 4px
  sm: 8,        // 8px
  md: 12,       // 12px
  lg: 16,       // 16px
  xl: 20,       // 20px
  xxl: 24,      // 24px
  xxxl: 32,     // 32px
  huge: 40,     // 40px
  massive: 60,  // 60px
  enormous: 80, // 80px
}
```

### Layout Spacing

Predefined spacing for common layout patterns:

```typescript
layout = {
  screen: { horizontal: 20, vertical: 24 },
  container: { padding: 16, margin: 12 },
  section: { padding: 24, margin: 16 },
  card: { padding: 16, margin: 12, borderRadius: 8 },
  form: { fieldSpacing: 16, groupSpacing: 20, sectionSpacing: 24 },
  button: { padding: { horizontal: 20, vertical: 12 }, margin: 8 },
  input: { padding: { horizontal: 16, vertical: 12 }, margin: 8 },
}
```

### Usage

```typescript
import { useTheme } from '../theme/ThemeContext';

const MyComponent = () => {
  const { theme } = useTheme();
  
  return (
    <View style={{ 
      padding: theme.spacing.lg,
      margin: theme.spacing.md 
    }}>
      Content
    </View>
  );
};
```

## Theme Context

### Setup

Wrap your app with the ThemeProvider:

```typescript
import { ThemeProvider } from './theme/ThemeContext';

function App() {
  return (
    <ThemeProvider followSystem={true}>
      {/* Your app components */}
    </ThemeProvider>
  );
}
```

### Usage

```typescript
import { useTheme, useIsDark } from '../theme/ThemeContext';

const MyComponent = () => {
  const { theme, colorTheme, isDark, toggleTheme } = useTheme();
  const isDarkMode = useIsDark();
  
  return (
    <View>
      <Text>Current theme: {colorTheme}</Text>
      <Button onPress={toggleTheme} title="Toggle Theme" />
    </View>
  );
};
```

## Theme Utilities

### Button Styles

```typescript
import { createButtonStyles } from '../theme/utils';

const MyButton = ({ variant, size, disabled }) => {
  const { theme } = useTheme();
  const styles = createButtonStyles(theme, variant, size, disabled);
  
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.text}>Button</Text>
    </TouchableOpacity>
  );
};
```

### Input Styles

```typescript
import { createInputStyles } from '../theme/utils';

const MyInput = ({ state, size }) => {
  const { theme } = useTheme();
  const styles = createInputStyles(theme, state, size);
  
  return (
    <TextInput style={styles.container} />
  );
};
```

### Error Styles

```typescript
import { createErrorStyles } from '../theme/utils';

const MyError = ({ type }) => {
  const { theme } = useTheme();
  const styles = createErrorStyles(theme, type);
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Error message</Text>
    </View>
  );
};
```

### Spacing Utilities

```typescript
import { createSpacingUtils } from '../theme/utils';

const MyComponent = () => {
  const { theme } = useTheme();
  const spacing = createSpacingUtils(theme);
  
  return (
    <View style={spacing.margin('lg')}>
      <Text style={spacing.padding('md')}>Content</Text>
    </View>
  );
};
```

### Typography Utilities

```typescript
import { createTypographyUtils } from '../theme/utils';

const MyComponent = () => {
  const { theme } = useTheme();
  const typography = createTypographyUtils(theme);
  
  return (
    <Text style={typography.heading('h1')}>Heading</Text>
  );
};
```

## Dark Mode Support

The design system automatically supports dark mode with:

- **System Detection**: Automatically detects system theme
- **Manual Toggle**: Allows manual theme switching
- **Consistent Colors**: All colors adapt to theme
- **Smooth Transitions**: Theme changes are smooth

### Dark Mode Colors

```typescript
darkColors = {
  background: {
    primary: '#121212',
    secondary: '#1e1e1e',
    tertiary: '#2d2d2d',
  },
  text: {
    primary: '#ffffff',
    secondary: '#b3b3b3',
    tertiary: '#808080',
  },
  // ... other dark theme colors
}
```

## Best Practices

### 1. Use Theme Context

Always use the theme context instead of hardcoded values:

```typescript
// ✅ Good
const { theme } = useTheme();
<View style={{ backgroundColor: theme.colors.background.primary }}>

// ❌ Bad
<View style={{ backgroundColor: '#ffffff' }}>
```

### 2. Use Semantic Colors

Use semantic color tokens instead of specific colors:

```typescript
// ✅ Good
theme.colors.text.primary
theme.colors.status.error

// ❌ Bad
'#1a1a1a'
'#f44336'
```

### 3. Use Spacing Scale

Use the spacing scale for consistent layouts:

```typescript
// ✅ Good
theme.spacing.lg
theme.spacing.md

// ❌ Bad
16
12
```

### 4. Use Typography Scale

Use predefined typography styles:

```typescript
// ✅ Good
theme.typography.heading.h1
theme.typography.body.medium

// ❌ Bad
{ fontSize: 32, fontWeight: 'bold' }
{ fontSize: 16 }
```

### 5. Use Theme Utilities

Use theme utilities for common patterns:

```typescript
// ✅ Good
createButtonStyles(theme, 'primary', 'medium')
createInputStyles(theme, 'default', 'medium')

// ❌ Bad
// Manually creating styles
```

## Migration Guide

### From Hardcoded Styles

1. **Replace hardcoded colors**:
   ```typescript
   // Before
   backgroundColor: '#007AFF'
   
   // After
   backgroundColor: theme.colors.interactive.primary
   ```

2. **Replace hardcoded spacing**:
   ```typescript
   // Before
   padding: 16
   
   // After
   padding: theme.spacing.lg
   ```

3. **Replace hardcoded typography**:
   ```typescript
   // Before
   fontSize: 16, fontWeight: 'bold'
   
   // After
   ...theme.typography.heading.h4
   ```

### From StyleSheet.create

```typescript
// Before
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    padding: 16,
  },
});

// After
const MyComponent = () => {
  const { theme } = useTheme();
  
  return (
    <View style={{
      backgroundColor: theme.colors.background.primary,
      padding: theme.spacing.lg,
    }}>
      Content
    </View>
  );
};
```

## Contributing

When adding new design tokens:

1. **Colors**: Add to the appropriate color palette in `colors.ts`
2. **Typography**: Add to the typography scale in `typography.ts`
3. **Spacing**: Add to the spacing scale in `spacing.ts`
4. **Utilities**: Add helper functions in `utils.ts`
5. **Documentation**: Update this README with examples

## Examples

See the component files for real-world usage examples:

- `App/components/Button/` - Button component with theme support
- `App/components/Input/` - Input component with theme support
- `App/screens/auth/Login/` - Login screen with theme support
- `App/screens/auth/Signup/` - Signup screen with theme support 