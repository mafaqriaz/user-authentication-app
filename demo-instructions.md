# App Demonstration Instructions

## Quick Start Demo

Follow these steps to quickly test the User Authentication App:

### 1. Start the Metro Bundler
```bash
yarn start
```

### 2. Run on iOS Simulator
```bash
yarn ios
```

### 3. Run on Android Emulator
```bash
yarn android
```

### 4. Run Tests (Optional)
```bash
yarn test
```

## Demo Flow

### Testing Login
1. **Open the app** - You'll see the Login screen
2. **First, create an account** - Use the Sign Up link to register
3. **Test with registered credentials:**
   - Use the email and password you just registered
4. **Test validation:**
   - Try submitting with empty fields
   - Try invalid email formats
   - Try wrong credentials

### Testing Signup
1. **Navigate to Signup** - Tap "Sign Up" link from Login screen
2. **Fill out the form:**
   - Full Name: `Test User`
   - Email: `test@example.com`
   - Password: `password123`
   - Confirm Password: `password123`
3. **Test validation:**
   - Try submitting with empty fields
   - Try invalid email formats
   - Try passwords less than 6 characters
   - Try mismatched password confirmation

### Testing Home Screen
1. **After successful login/signup** - You'll see the Home screen
2. **View user information** - Name, email, and user ID are displayed
3. **Test session tracking** - Check the "Total Sessions" counter
4. **Test logout** - Tap the "Logout" button and confirm

### Testing Persistence
1. **Sign up with a new account**
2. **Login successfully**
3. **Close the app completely**
4. **Reopen the app** - You should remain logged in
5. **Test credential storage** - Try logging in with the same credentials after logout

### Testing Theme Features
1. **Toggle dark/light mode** - Use the theme toggle if available
2. **Check responsive design** - Test on different screen sizes
3. **Verify accessibility** - Test with different font sizes

## Features to Demonstrate

### 🔐 Authentication Features
- [x] Context API state management
- [x] Form validation with error messages
- [x] Login/logout functionality
- [x] User session persistence
- [x] Session count tracking

### 📱 UI/UX Features
- [x] Password visibility toggle (👁️/🙈)
- [x] Loading states during authentication
- [x] Error handling and user feedback
- [x] Responsive keyboard handling
- [x] Modern, clean interface
- [x] Dark/light theme support

### 🔧 Technical Features
- [x] TypeScript implementation
- [x] React Navigation integration
- [x] AsyncStorage for persistence
- [x] Reusable component architecture
- [x] Custom hooks for business logic
- [x] Comprehensive test suite (39 tests)

### 🧪 Testing Features
- [x] Validation utility tests
- [x] Component interaction tests
- [x] Hook functionality tests
- [x] Theme management tests
- [x] Jest configuration with React Native support

## Test Scenarios

### Happy Path
1. Open app → Login screen appears
2. Enter valid credentials → Login successful
3. Home screen shows user info and session count
4. Logout → Returns to login screen

### Error Handling
1. Invalid email format → Shows email error
2. Wrong credentials → Shows authentication error
3. Empty fields → Shows required field errors
4. Network simulation → Graceful error handling

### Edge Cases
1. App restart → User remains logged in
2. Rapid form submission → Loading states prevent double submission
3. Keyboard interactions → Proper scrolling and focus management
4. Theme switching → Smooth transitions between light/dark modes

## Screenshots Opportunities

### Login Screen
- Clean input fields with labels
- Password toggle functionality
- Error state display
- Navigation to signup

### Signup Screen
- Multi-field form validation
- Password confirmation matching
- Real-time error clearing
- Navigation to login

### Home Screen
- User avatar with initials
- Information cards layout
- Session count display
- Professional dashboard feel

### Navigation Flow
- Smooth transitions between screens
- Conditional navigation based on auth state
- Theme-aware styling throughout

## Testing the Test Suite

### Run All Tests
```bash
yarn test
```

### Run Specific Test Categories
```bash
# Validation tests
yarn test __tests__/utils/validation.test.ts

# Component tests
yarn test __tests__/components/

# Hook tests
yarn test __tests__/hooks/

# Theme tests
yarn test __tests__/theme/
```

### Test Coverage
- **39 total tests** across all categories
- **100% pass rate** for implemented functionality
- **Comprehensive coverage** of core features