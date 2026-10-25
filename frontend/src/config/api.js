// Centralized API configuration for local dev and production deployment
export const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export const apiUrl = (path) => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${cleanPath}`;
};
