export function checkPasswordStrength(password: string): number {
  let score = 0;
  if (!password) return 0;

  // Case 1: Does the password contain a capital letter?
  if (/[A-Z]/.test(password)) {
    score += 1;
  }

  // Case 2: Is there any number and a lowercase letter?
  if (/[a-z]/.test(password) && /[0-9]/.test(password)) {
    score += 1;
  }

  // Case 3: Any special character?
  if (/[?!@#$%^&*(),.?":{}|<>]/.test(password)) {
    score += 1;
  }

  // Case 4: Does it have more than 8 characters?
  if (password.length > 8) {
    score += 1;
  }
  return score;
}
