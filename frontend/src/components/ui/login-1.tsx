import { FcGoogle } from "react-icons/fc"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Login1Props {
  heading?: string
  logo?: {
    url: string
    src: string
    alt: string
    title?: string
  }
  buttonText?: string
  googleText?: string
  signupText?: string
  signupUrl?: string
}

const Login1 = ({
  heading = "Login",
  logo,
  buttonText = "Login",
  googleText = "Sign up with Google",
  signupText = "Don't have an account?",
  signupUrl = "/auth",
}: Login1Props) => {
  return (
    <section className="h-screen flex items-center justify-center">
      <div className="container flex items-center justify-center">
        <div className="mx-auto flex w-full flex-col justify-center gap-6 sm:w-[350px]">
          <div className="flex flex-col items-center gap-2 text-center">
            {logo && (
              <a href={logo.url} className="mb-2">
                <img src={logo.src} alt={logo.alt} className="h-8" />
              </a>
            )}
            {heading && (
              <h1 className="text-2xl font-semibold tracking-tight">
                {heading}
              </h1>
            )}
          </div>
          <div className="grid gap-6">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Input
                  id="email"
                  placeholder="Email"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                />
              </div>
              <div className="grid gap-2">
                <Input
                  id="password"
                  placeholder="Password"
                  type="password"
                  autoComplete="current-password"
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button>{buttonText}</Button>
                <Button variant="outline" className="gap-2">
                  <FcGoogle className="h-4 w-4" />
                  {googleText}
                </Button>
              </div>
            </div>
          </div>
          <div className="text-center text-sm text-muted-foreground">
            <p>{signupText}</p>
            <Link
              to={signupUrl}
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export { Login1 }
