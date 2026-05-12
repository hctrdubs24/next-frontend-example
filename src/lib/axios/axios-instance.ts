import axios from "axios"
import "dotenv/config"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000, // 10 seconds timeout
  headers: { "Content-Type": "application/json" },
})

//Interceptors for request and response
