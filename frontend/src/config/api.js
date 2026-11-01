// Centralized API configuration for local dev and production deployment
// In production, connects directly to the live Render backend
export const API_BASE_URL = 
  import.meta.env.VITE_API_URL || 
  (import.meta.env.PROD ? 'https://modshine-j90i.onrender.com' : '');

export const apiUrl = (path) => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${cleanPath}`;
};
