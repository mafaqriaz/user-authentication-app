import { validateEmail, validatePassword, validateName, validateConfirmPassword } from '../../App/utils/validation';

describe('Validation Utilities', () => {
  describe('validateEmail', () => {
    it('returns true for valid email addresses', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name@domain.co.uk')).toBe(true);
      expect(validateEmail('user+tag@example.org')).toBe(true);
      expect(validateEmail('123@example.com')).toBe(true);
    });

    it('returns false for invalid email addresses', () => {
      expect(validateEmail('invalid-email')).toBe(false);
      expect(validateEmail('test@')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
      expect(validateEmail('test.example.com')).toBe(false);
      expect(validateEmail('')).toBe(false);
      expect(validateEmail('test@example')).toBe(false);
    });

    it('handles edge cases', () => {
      expect(validateEmail('test@example..com')).toBe(false);
      expect(validateEmail('test..user@example.com')).toBe(false);
      expect(validateEmail('test@example.com.')).toBe(false);
    });
  });

  describe('validatePassword', () => {
    it('returns true for valid passwords', () => {
      expect(validatePassword('password123')).toBe(true);
      expect(validatePassword('123456')).toBe(true);
      expect(validatePassword('abcdef')).toBe(true);
      expect(validatePassword('P@ssw0rd')).toBe(true);
      expect(validatePassword('verylongpassword123')).toBe(true);
    });

    it('returns false for passwords shorter than 6 characters', () => {
      expect(validatePassword('12345')).toBe(false);
      expect(validatePassword('abc')).toBe(false);
      expect(validatePassword('')).toBe(false);
      expect(validatePassword('123')).toBe(false);
    });

    it('handles edge cases', () => {
      expect(validatePassword('      ')).toBe(true); // 6 spaces is valid
      expect(validatePassword('123456789012345678901234567890')).toBe(true); // Very long password
    });
  });

  describe('validateName', () => {
    it('returns true for valid names', () => {
      expect(validateName('John')).toBe(true);
      expect(validateName('John Doe')).toBe(true);
      expect(validateName('Mary Jane Smith')).toBe(true);
      expect(validateName('A')).toBe(false); // Single character
      expect(validateName('Ab')).toBe(true); // Two characters
    });

    it('returns false for names shorter than 2 characters', () => {
      expect(validateName('')).toBe(false);
      expect(validateName('A')).toBe(false);
    });

    it('handles edge cases', () => {
      expect(validateName('  John  ')).toBe(true); // Trims whitespace
      expect(validateName('John-Doe')).toBe(true); // Hyphenated names
      expect(validateName('O\'Connor')).toBe(true); // Names with apostrophes
    });
  });

  describe('validateConfirmPassword', () => {
    it('returns true when passwords match', () => {
      expect(validateConfirmPassword('password123', 'password123')).toBe(true);
      expect(validateConfirmPassword('123456', '123456')).toBe(true);
      expect(validateConfirmPassword('', '')).toBe(true);
    });

    it('returns false when passwords do not match', () => {
      expect(validateConfirmPassword('password123', 'password456')).toBe(false);
      expect(validateConfirmPassword('password123', '')).toBe(false);
      expect(validateConfirmPassword('', 'password123')).toBe(false);
      expect(validateConfirmPassword('abc', 'def')).toBe(false);
    });

    it('is case sensitive', () => {
      expect(validateConfirmPassword('Password123', 'password123')).toBe(false);
      expect(validateConfirmPassword('password123', 'Password123')).toBe(false);
    });

    it('handles whitespace differences', () => {
      expect(validateConfirmPassword('password123', ' password123 ')).toBe(false);
      expect(validateConfirmPassword(' password123 ', 'password123')).toBe(false);
    });
  });

  describe('Integration Tests', () => {
    it('validates complete signup form data', () => {
      const validData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        confirmPassword: 'password123'
      };

      expect(validateName(validData.name)).toBe(true);
      expect(validateEmail(validData.email)).toBe(true);
      expect(validatePassword(validData.password)).toBe(true);
      expect(validateConfirmPassword(validData.password, validData.confirmPassword)).toBe(true);
    });

    it('identifies invalid signup form data', () => {
      const invalidData = {
        name: 'J', // Too short
        email: 'invalid-email', // Invalid format
        password: '123', // Too short
        confirmPassword: 'different' // Doesn't match
      };

      expect(validateName(invalidData.name)).toBe(false);
      expect(validateEmail(invalidData.email)).toBe(false);
      expect(validatePassword(invalidData.password)).toBe(false);
      expect(validateConfirmPassword(invalidData.password, invalidData.confirmPassword)).toBe(false);
    });

    it('validates login form data', () => {
      const validLoginData = {
        email: 'user@example.com',
        password: 'password123'
      };

      expect(validateEmail(validLoginData.email)).toBe(true);
      expect(validatePassword(validLoginData.password)).toBe(true);
    });

    it('identifies invalid login form data', () => {
      const invalidLoginData = {
        email: 'invalid-email',
        password: '123' // Too short
      };

      expect(validateEmail(invalidLoginData.email)).toBe(false);
      expect(validatePassword(invalidLoginData.password)).toBe(false);
    });
  });
}); 