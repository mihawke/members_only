import axios from 'axios';

// Set the Authorization header for every request
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

// Axios interceptor to handle token expiration
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // Token is expired or invalid
      localStorage.removeItem('authToken');  // Clear expired token
      // Redirect user to login page
      window.location.href = '/login';  // Or use history.push('/login') if using react-router
    }
    return Promise.reject(error);
  }
);

export default axios;
