import { removeSessionCookie, setSessionCookie } from "@/features/auth/actions/auth.actions"
import { refreshToken } from "@/features/auth/api/auth.api"
import { UserSession } from "@/features/auth/interfaces/auth.interface"
import { setAuthTokenInMemory } from "@/lib/axios/axios-instance"
import { setCredentials, clearCredentials } from "@/features/auth/store/auth.slice"
import { jwtDecode } from "jwt-decode"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/lib/redux/store"

export function useAuthProvider() {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  )
  const [isInitializing, setIsInitializing] =
    useState<boolean>(!isAuthenticated)
  const router = useRouter()

  const initializeAuth = useCallback(async () => {
    try {
      const { access_token: newAccessToken, refreshToken: newRefreshToken } =
        await refreshToken()

      setAuthTokenInMemory(newAccessToken)
      await setSessionCookie(newRefreshToken)

      const decodedUser = jwtDecode<UserSession>(newAccessToken)
      dispatch(setCredentials(decodedUser))
    } catch (error) {
      setAuthTokenInMemory(null)
      dispatch(clearCredentials())
      await removeSessionCookie()

      router.replace("/auth/login")
    } finally {
      setIsInitializing(false)
    }
  }, [dispatch, router])

  useEffect(() => {
    if (isInitializing && !isAuthenticated) {
      initializeAuth()
    }
  }, [initializeAuth, isAuthenticated, isInitializing])

  return { isInitializing }
}
