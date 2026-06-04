"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export const LoginFooter = () => {
  const router = useRouter()

  return (
    <div className="flex w-full flex-row items-center justify-center">
      <p>Don't have an account?</p>
      <Button
        variant={"link"}
        className="hover:text-blue-400"
        onClick={() => router.push("/register")}
      >
        Register here
      </Button>
    </div>
  )
}
