export function validateEmail(email: string) {
  const regex = /[a-z0-9]+@[a-z]+\.[a-z]+/;
  return regex.test(email);
}

export function validatePassword(password: string) {
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
  return regex.test(password);
}

export const testing = {
  validateEmail,
  validatePassword,
};
