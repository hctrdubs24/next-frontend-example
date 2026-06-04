"use client"

import Link from "next/link"
import { Button, buttonVariants } from "@/components/ui/button"
import { useSelector } from "react-redux"
import { RootState } from "@/lib/redux/store"
import { useLogout } from "@/features/auth/hooks/use-auth.hook"

export const Header = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)
  const { mutate: logout, isPending } = useLogout()

  return (
    <header className="flex items-center justify-between">
      <h1 className="text-4xl font-bold">NestNextApp</h1>
      <Link
        href="/products/new"
        className={buttonVariants({ variant: "default", size: "default" })}
      >
        Create Product
      </Link>

      {isAuthenticated ? (
        <Button
          disabled={isPending}
          onClick={() => logout()}
          variant={"destructive"}
        >
          {isPending ? "Logging out..." : "Log out"}
        </Button>
      ) : (
        <Link
          href={"/auth/login"}
          className={buttonVariants({ variant: "default", size: "default" })}
        >
          Login
        </Link>
      )}
    </header>
  )
}
