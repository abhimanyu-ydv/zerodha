import axios from "axios";

export const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3002";
export const FRONTEND_URL =
  process.env.REACT_APP_FRONTEND_URL || "http://localhost:3000";
export const SIGNUP_URL = `${FRONTEND_URL}/signup`;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// A 401 mid-session means the session expired, so send the user back to log in.
// The initial /me check is skipped here; Home shows a login prompt for it instead.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isSessionCheck = error.config && error.config.url === "/me";
    if (error.response && error.response.status === 401 && !isSessionCheck) {
      window.location.href = SIGNUP_URL;
    }
    return Promise.reject(error);
  }
);

export const getErrorMessage = (error, fallback = "Something went wrong") =>
  (error.response && error.response.data && error.response.data.message) ||
  fallback;

export default api;
