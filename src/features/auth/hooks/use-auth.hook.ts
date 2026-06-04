import { removeSessionCookie, setSessionCookie } from "@/features/auth/actions/auth.actions"
import { login, logout } from "@/features/auth/api/auth.api"
import {
  LoginRequest,
  LoginResponse,
  UserSession,
} from "@/features/auth/interfaces/auth.interface"
import { setAuthTokenInMemory } from "@/lib/axios/axios-instance"
import { clearCredentials, setCredentials } from "@/features/auth/store/auth.slice"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { jwtDecode } from "jwt-decode"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { toast } from "sonner"

export function useLogin() {
  const router = useRouter()
  const dispatch = useDispatch()
  const queryClient = useQueryClient()

  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: async (credentials) => await login(credentials),
    onSuccess: async (response) => {
      toast.success("Login successful!")

      const { access_token, refreshToken } = response.data
      setAuthTokenInMemory(access_token)
      await setSessionCookie(refreshToken)
      const decodedUser = jwtDecode<UserSession>(access_token)
      dispatch(setCredentials(decodedUser))

      queryClient.clear()
      router.push("/")
    },
    onError: () =>
      toast.error("Failed to log in, please check your credentials"),
  })
}

export function useLogout() {
  const router = useRouter()
  const dispatch = useDispatch()
  const queryClient = useQueryClient()

  return useMutation<void, Error, void>({
    mutationFn: async () => await logout(),
    onSettled: async () => {
      setAuthTokenInMemory(null)
      await removeSessionCookie()
      dispatch(clearCredentials())

      queryClient.clear()
      router.push("/auth/login")
    },
  })
}
