export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('skills-hub-auth') === 'true';
}

export function logout() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('skills-hub-auth');
}
