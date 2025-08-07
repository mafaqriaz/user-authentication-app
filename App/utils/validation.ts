/**
 * Validates email format using regex pattern
 * @param email - Email string to validate
 * @returns boolean - True if email is valid, false otherwise
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const trimmedEmail = email.trim();
  
  // Additional checks for edge cases
  if (trimmedEmail.includes('..') || trimmedEmail.endsWith('.')) {
    return false;
  }
  
  return emailRegex.test(trimmedEmail);
};

/**
 * Validates password length (minimum 6 characters)
 * @param password - Password string to validate
 * @returns boolean - True if password meets requirements, false otherwise
 */
export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

/**
 * Validates name length (minimum 2 characters)
 * @param name - Name string to validate
 * @returns boolean - True if name meets requirements, false otherwise
 */
export const validateName = (name: string): boolean => {
  return name.trim().length >= 2;
};

/**
 * Validates that confirm password matches the original password
 * @param password - Original password
 * @param confirmPassword - Confirmation password
 * @returns boolean - True if passwords match, false otherwise
 */
export const validateConfirmPassword = (password: string, confirmPassword: string): boolean => {
  return password === confirmPassword;
}; 