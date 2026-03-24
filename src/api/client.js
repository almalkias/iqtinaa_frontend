import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

// 🔹 request interceptor
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// 🔥 response interceptor (correct implementation)
apiClient.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // 👇 this check must stay here
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
          return Promise.reject(error);
        }

        const response = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}accounts/token/refresh/`,
          {
            refresh: refreshToken,
          }
        );

        const newAccessToken = response.data.access;

        // Update the token
        localStorage.setItem("authToken", newAccessToken);

        // Update the original request
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // Retry the request
        return apiClient(originalRequest);

      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);

        // logout
        localStorage.removeItem("authToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("isLoggedIn");

        window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
