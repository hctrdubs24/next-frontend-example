import { LoginRequest, LoginResponse } from "@/features/auth/interfaces/auth.interface"
import { api } from "@/lib/axios/axios-instance"

const authEndpoint = "/auth"

export async function login(credentials: LoginRequest) {
  const { data } = await api.post<LoginResponse>(
    authEndpoint.concat("/login"),
    credentials
  )
  return data
}

export async function logout() {
  await api.post(authEndpoint.concat("/logout"))
}

export async function refreshToken() {
  const { data } = await api.post<LoginResponse>(
    authEndpoint.concat("/refresh"),
    {},
    { withCredentials: true }
  )

  return data.data
}
