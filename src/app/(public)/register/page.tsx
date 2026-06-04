import { RegisterForm } from "@/features/user/components/register-form"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function RegisterPage() {
  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <Card className="w-sm">
        <CardHeader>Register</CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
    </main>
  )
}
