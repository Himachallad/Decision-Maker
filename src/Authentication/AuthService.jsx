export const getToken = () => {
  const token = sessionStorage.getItem('token');
  if (token !== null && token !== undefined) {
    return token;
  }
  return null;
};

export const setToken = (token) => {
  if (token !== null && token !== undefined) {
    sessionStorage.setItem('token', token);
  }
};

export const logout = () => {
  sessionStorage.clear();
};
