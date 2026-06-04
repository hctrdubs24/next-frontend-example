import { registerNewUser } from "@/features/user/api/user.api"
import {
  RegisterUserFormDTO,
  RegisterUserFormSchema,
  RegisterUserRequestDTO,
  RegisterUserResponseDTO,
} from "@/features/user/interfaces/user.interface"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

export function useRegister() {
  const queryClient = useQueryClient()
  const router = useRouter()

  const { control, handleSubmit } = useForm<RegisterUserFormDTO>({
    resolver: zodResolver(RegisterUserFormSchema),
    defaultValues: { email: "", name: "", password: "", confirmPassword: "" },
  })

  const {
    mutate: registerUser,
    isPending,
    error,
  } = useMutation<RegisterUserResponseDTO, Error, RegisterUserRequestDTO>({
    mutationFn: async (user) => await registerNewUser(user),
    onSuccess: async () => {
      toast.success("User registered successfully")
      queryClient.clear()
      router.push("/auth/login")
    },
    onError: () => toast.error("Failed to register user"),
  })

  const onSubmit = ({
    confirmPassword,
    ...backendData
  }: RegisterUserFormDTO): void => {
    registerUser(backendData)
  }

  return {
    isPending,
    error,
    control,
    handleSubmit,
    onSubmit,
    router,
  }
}
