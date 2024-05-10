import { testing } from './validators';

const { validateEmail, validatePassword } = testing;

describe('validators', () => {
  describe('validateEmail', () => {
    test('returns true for valid email', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user1234@gmail.com')).toBe(true);
      expect(validateEmail('john.doe@mail.co.uk')).toBe(true);
    });

    test('returns false for invalid email', () => {
      expect(validateEmail('invalid-email')).toBe(false);
      expect(validateEmail('invalid@')).toBe(false);
      expect(validateEmail('invalid@domain')).toBe(false);
      expect(validateEmail('invalid@domain.')).toBe(false);
      expect(validateEmail('@domain.com')).toBe(false);
    });
  });

  describe('validatePassword', () => {
    test('returns true for valid password', () => {
      expect(validatePassword('Password123!')).toBe(true);
      expect(validatePassword('MySuperStrongPassword123!')).toBe(true);
    });

    test('returns false for invalid password', () => {
      // Less than 8 characters
      expect(validatePassword('Pwd123!')).toBe(false);
      // Missing lowercase letter
      expect(validatePassword('PASSWORD123!')).toBe(false);
      // Missing uppercase letter
      expect(validatePassword('password123!')).toBe(false);
      // Missing special character
      expect(validatePassword('Password1234')).toBe(false);
      // Missing digit
      expect(validatePassword('Password!')).toBe(false);
    });
  });
});
