import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { UserSession } from "@/features/auth/interfaces/auth.interface"

interface AuthState {
  user: UserSession | null
  isAuthenticated: boolean
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<UserSession>) => {
      state.user = action.payload
      state.isAuthenticated = true
    },
    clearCredentials: (state) => {
      state.user = null
      state.isAuthenticated = false
    },
  },
})

export const { setCredentials, clearCredentials } = authSlice.actions
export default authSlice.reducer
