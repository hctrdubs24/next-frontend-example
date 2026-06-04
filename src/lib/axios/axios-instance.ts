import axios from "axios"
import "dotenv/config"

const API_URL = process.env.NEXT_PUBLIC_API_URL

let memoriToken: string | null = null

export const setAuthTokenInMemory = (token: string | null) => {
  memoriToken = token
}

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000, // 10 seconds timeout
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
})

//Interceptors for request and response
api.interceptors.request.use(
  (config) => {
    if (memoriToken && config.headers) {
      config.headers.Authorization = `Bearer ${memoriToken}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

let isRefreshing = false
let failedQueue: Array<{
  resolve: (token: string) => void
  reject: (error: unknown) => void
}> = []

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (token) {
      prom.resolve(token)
    } else {
      prom.reject(error)
    }
  })
  failedQueue = []
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (!error.response) return Promise.reject(error)

    if (error.response.status === 401 && !originalRequest._retry) {
      if (
        originalRequest.url.includes("/auth/login") ||
        originalRequest.url.includes("/auth/refresh")
      ) {
        return Promise.reject(error)
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`
            return api(originalRequest)
          })
          .catch((err) => Promise.reject(err))
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const response = await axios.post<{
          success: boolean
          data: { access_token: string }
        }>(`${API_URL}/auth/refresh`, {}, { withCredentials: true })

        const newAccessToken = response.data.data.access_token
        setAuthTokenInMemory(newAccessToken)

        processQueue(null, newAccessToken)
        isRefreshing = false

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        return api(originalRequest)
      } catch (refreshError) {
        processQueue(refreshError, null)
        isRefreshing = false
        setAuthTokenInMemory(null)
        window.dispatchEvent(new Event("auth-logout"))
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)
