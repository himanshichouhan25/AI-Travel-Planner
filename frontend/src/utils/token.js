const TOKEN_KEY = "access_token";

// Save JWT Token
export const saveToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

// Get JWT Token
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

// Remove JWT Token
export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!getToken();
};