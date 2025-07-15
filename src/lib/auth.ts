export const isAuthenticated = (): boolean => {
  return Boolean(localStorage.getItem('token') && localStorage.getItem('userInfo'));
};

// Optional additional auth utilities
export const setAuthToken = (token: string): void => {
  localStorage.setItem('token', token);
};

export const clearAuthToken = (): void => {
  localStorage.removeItem('token');
};