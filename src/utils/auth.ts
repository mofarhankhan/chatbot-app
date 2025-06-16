export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token; // Just checks if token exists (add JWT decode if needed)
};
