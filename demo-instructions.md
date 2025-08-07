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
3. **Test logout** - Tap the "Logout" button and confirm

### Testing Persistence
1. **Sign up with a new account**
2. **Login successfully**
3. **Close the app completely**
4. **Reopen the app** - You should remain logged in
5. **Test credential storage** - Try logging in with the same credentials after logout

## Features to Demonstrate

### 🔐 Authentication Features
- [x] Context API state management
- [x] Form validation with error messages
- [x] Login/logout functionality
- [x] User session persistence

### 📱 UI/UX Features
- [x] Password visibility toggle (👁️/🙈)
- [x] Loading states during authentication
- [x] Error handling and user feedback
- [x] Responsive keyboard handling
- [x] Modern, clean interface

### 🔧 Technical Features
- [x] TypeScript implementation
- [x] React Navigation integration
- [x] AsyncStorage for persistence
- [x] Reusable component architecture
- [x] Custom hooks for business logic

## Test Scenarios

### Happy Path
1. Open app → Login screen appears
2. Enter valid credentials → Login successful
3. Home screen shows user info
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

## Screenshots Opportunities

### Login Screen
- Clean input fields with labels
- Password toggle functionality
- Error state display
- Test credentials helper

### Signup Screen
- Multi-field form validation
- Password confirmation matching
- Real-time error clearing

### Home Screen
- User avatar with initials
- Information cards layout
- Professional dashboard feel

### Navigation Flow
- Smooth transitions between screens
- Conditional navigation based on auth state