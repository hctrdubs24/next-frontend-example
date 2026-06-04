import {
  RegisterUserRequestDTO,
  RegisterUserResponseDTO,
} from "@/features/user/interfaces/user.interface"
import { api } from "@/lib/axios/axios-instance"

const userEndpoint = "/user"

export async function registerNewUser(user: RegisterUserRequestDTO) {
  const { data } = await api.post<RegisterUserResponseDTO>(userEndpoint, user)

  return data
}
