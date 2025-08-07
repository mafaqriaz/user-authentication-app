# User Authentication App

A React Native app with Login and Signup functionality using React Context API to manage authentication state. This app includes form validation, error handling, navigation, and persistent authentication using AsyncStorage.

## Features

### ✅ Implemented Features

1. **Authentication Context Setup**
   - AuthContext using React's Context API for global authentication state
   - Login, signup, and logout functions
   - User state management with TypeScript interfaces
   - Automatic persistence using AsyncStorage

2. **Login Screen**
   - Email and password input fields
   - Form validation (email format, required fields)
   - Error messages for invalid credentials
   - Navigation to Signup screen
   - Password visibility toggle with eye icon

3. **Signup Screen**
   - Name, email, and password input fields
   - Password confirmation field
   - Comprehensive validation (required fields, email format, password length, password match)
   - Error messages for validation failures
   - Navigation to Login screen

4. **Home Screen**
   - Display logged-in user's information (name, email, ID)
   - User avatar with initials
   - Account statistics cards with session tracking
   - Total sessions counter with AsyncStorage persistence
   - Verified account status indicator
   - Logout functionality with confirmation dialog
   - Full dark mode support with theme-aware styling

5. **Navigation**
   - React Navigation with Stack Navigator
   - Conditional rendering based on authentication state
   - Smooth transitions between auth and app stacks

6. **Persistent Authentication**
   - AsyncStorage integration for maintaining login state
   - Automatic token restoration on app restart
   - Loading states during authentication checks

7. **UI/UX Design**
   - Modern, clean interface with consistent styling
   - Responsive layout with proper spacing
   - Loading indicators and error states
   - Keyboard-avoiding behavior
   - Touch feedback on interactive elements

8. **Bonus Features**
   - Password visibility toggle with emoji icons
   - Form validation with error clearing on correct input
   - Confirmation dialogs for important actions
   - Session tracking with persistent count
   - Button-level loading states (no full-screen loaders)
   - Enhanced error visibility and styling

9. **Design System**
   - Comprehensive theme system with light/dark mode support
   - Color system with semantic color tokens for light and dark themes
   - Typography scale with consistent font sizes and weights
   - Spacing system with 4px base unit
   - Theme context for dynamic theme switching
   - Utility functions for common styling patterns
   - Dark mode visibility fixes for all components
   - Consistent input field sizing across the app

## Tech Stack

- **React Native** 0.80.2
- **React** 19.1.0
- **TypeScript** - Type safety throughout the app
- **React Navigation** - Navigation between screens
- **React Context API** - State management
- **AsyncStorage** - Data persistence
- **React Native Gesture Handler** - Enhanced gesture support
- **Design System** - Custom theme system with light/dark mode

## Component Architecture

The app follows a modular component architecture with clear separation of concerns:

### Component Structure
Each component is organized in its own directory with the following structure:
```
ComponentName/
├── index.tsx    # Main component logic
├── types.ts     # TypeScript interfaces and types
└── styles.ts    # Component-specific styles (optional)
```

**Note**: Login and Signup screens use inline styles with the design system, while Home screen uses separate styles.ts file.

### Benefits of This Architecture
- **Separation of Concerns**: Logic, types, and styles are clearly separated
- **Maintainability**: Easy to locate and modify specific aspects of components
- **Reusability**: Components are self-contained and easily reusable
- **Type Safety**: Dedicated type files ensure proper TypeScript integration
- **Scalability**: Consistent structure makes it easy to add new components
- **Performance**: Uses `StyleSheet.flatten()` for optimized style merging
- **Documentation**: Comprehensive JSDoc comments for better code understanding

## Project Structure

```
App/
├── components/           # Reusable UI components
│   ├── Button/          # Button component
│   │   ├── index.tsx    # Main component
│   │   ├── types.ts     # TypeScript interfaces
│   │   └── styles.ts    # Component styles
│   └── Input/           # Input component
│       ├── index.tsx    # Main component
│       ├── types.ts     # TypeScript interfaces
│       └── styles.ts    # Component styles
├── context/             # React Context providers
│   ├── AuthContext.tsx  # Authentication context and logic
│   └── types.ts         # Context type definitions
├── theme/               # Design system
│   ├── colors.ts        # Color definitions and themes
│   ├── typography.ts    # Typography scale and styles
│   ├── spacing.ts       # Spacing and layout utilities
│   ├── utils.ts         # Theme utility functions
│   ├── ThemeContext.tsx # Theme context and provider
│   └── index.ts         # Design system exports
├── navigation/          # Navigation configuration
│   ├── AuthStack.tsx    # Authentication flow navigation
│   ├── AppStack.tsx     # Authenticated app navigation
│   ├── RootNavigator.tsx # Root navigation controller
│   ├── types.ts         # Navigation type definitions
│   └── index.ts         # Navigation exports
├── screens/             # Screen components
│   ├── auth/            # Authentication screens
│   │   ├── Login/
│   │   │   ├── hooks/
│   │   │   │   └── useLogin.ts    # Login logic hook
│   │   │   ├── index.tsx          # Login screen component
│   │   │   ├── styles.ts          # Login screen styles (legacy)
│   │   │   └── types.ts           # Screen type definitions
│   │   └── Signup/
│   │       ├── hooks/
│   │       │   └── useSignup.ts   # Signup logic hook
│   │       ├── index.tsx          # Signup screen component
│   │       ├── styles.ts          # Signup screen styles (legacy)
│   │       └── types.ts           # Screen type definitions
│   └── authenticated/   # Post-authentication screens
│       └── Home/
│           ├── hooks/
│           │   ├── useHome.ts          # Home screen logic hook
│           │   └── useSessionCount.ts  # Session tracking hook
│           ├── index.tsx               # Home screen component
│           ├── types.ts                # Screen type definitions
│           └── styles.ts               # Home screen styles
├── utils/               # Utility functions
└── index.tsx            # Main app component
```

## Setup Instructions

### Prerequisites

- Node.js (>= 18)
- React Native development environment
- iOS: Xcode (for iOS development)
- Android: Android Studio and SDK (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd UserAuthenticationApp
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **iOS Setup** (if developing for iOS)
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Run the application**

   For iOS:
   ```bash
   yarn ios
   ```

   For Android:
   ```bash
   yarn android
   ```

### Development

- **Start Metro bundler**
  ```bash
  yarn start
  ```

- **Run tests**
  ```bash
  yarn test
  ```

- **Lint code**
  ```bash
  yarn lint
  ```

## Usage

### User Registration and Authentication

The app uses AsyncStorage to persist user credentials locally. Users can:

**Sign Up:**
- Create new accounts with name, email, and password
- All credentials are stored securely in AsyncStorage
- Email uniqueness is enforced

**Login:**
- Use registered email and password to authenticate
- Session persistence across app restarts
- Secure credential validation
- Automatic session count increment on successful login

**Validation Rules:**
- Name (minimum 2 characters)
- Email (valid email format)
- Password (minimum 6 characters)
- Password confirmation (must match password)

## Features in Detail

### Authentication Flow

1. **Initial Load**: App checks AsyncStorage for existing user session
2. **Unauthenticated**: Shows Login/Signup screens
3. **Authentication**: User logs in or signs up
4. **Authenticated**: Shows Home screen with user info and session tracking
5. **Logout**: Clears session and returns to Login screen

### Session Tracking

- **Total Sessions**: Persistent counter showing user's login sessions
- **AsyncStorage Integration**: Session count persists across app restarts
- **Auto-increment**: Count increases on each successful login
- **Real-time Display**: Shows current session count on Home screen
- **Loading States**: Displays "..." while loading session data

### Form Validation

- **On-submit validation**: Errors appear when Login/Signup button is pressed
- **Progressive clearing**: Errors clear when user enters correct values
- **Comprehensive checks**: Email format, password strength, required fields
- **User-friendly messages**: Clear error descriptions

### Error Handling

- **Network errors**: Graceful handling of connection issues
- **Validation errors**: Field validation on form submission with error clearing on correct input
- **Authentication errors**: Clear visibility of login/signup failure messages
- **General errors**: Fallback error messages for unexpected issues
- **Visual feedback**: Enhanced error styling with distinct styling for different error types
- **Glitch prevention**: Smooth error display without UI glitches
- **Button-level loading**: No full-screen loaders, only button spinners
- **Error persistence**: General errors remain visible until user interaction
- **Progressive clearing**: Errors clear automatically when user enters correct values

### Security Features

- **Input sanitization**: Trimming whitespace, lowercase emails
- **Password protection**: Secure text entry with visibility toggle
- **Session management**: Automatic logout capabilities
- **Session tracking**: Secure session count persistence

## Dependencies

### Production Dependencies
- `@react-navigation/native` - Navigation framework
- `@react-navigation/stack` - Stack navigation
- `@react-native-async-storage/async-storage` - Local data persistence
- `react-native-gesture-handler` - Gesture handling
- `react-native-safe-area-context` - Safe area handling
- `react-native-screens` - Native screen components

### Development Dependencies
- `@types/*` - TypeScript type definitions
- `eslint` - Code linting
- `prettier` - Code formatting
- `jest` - Testing framework



## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is for educational purposes and demonstration of React Native authentication patterns.