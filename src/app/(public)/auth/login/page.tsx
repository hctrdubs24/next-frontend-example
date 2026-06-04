import { LoginFooter, LoginForm } from "@/features/auth/components/login"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"

export default function LoginPage() {
  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <Card className="w-sm">
        <CardHeader className="text-center text-4xl font-bold">
          Login
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter>
          <LoginFooter />
        </CardFooter>
      </Card>
    </main>
  )
}
