'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { NavBar } from "@/components/auth/nav-bar"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ email, password })
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavBar />
      
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-foreground">Login</h1>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Email address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-foreground">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-4 w-4" />
                  ) : (
                    <EyeIcon className="h-4 w-4" />
                  )}
                </button>
              </div>
              <p className="text-xs text-muted-foreground">
                Use 8 or more characters with a mix of letters, numbers & symbols
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="robot"
                className="rounded border-input bg-background"
              />
              <label htmlFor="robot" className="text-sm text-muted-foreground">
                I'm not a robot
              </label>
            </div>

            <Button type="submit" className="w-full">
              Login
            </Button>

            <div className="text-center text-sm">
              <Link href="/auth/signup" className="text-primary hover:underline">
                New to this account? Sign in
              </Link>
            </div>
          </form>

          <div className="text-center text-xs text-muted-foreground">
            <p>
              By creating an account, you agree to our{' '}
              <Link href="/terms" className="text-primary hover:underline">
                Terms of Use
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t bg-card">
        <div className="container flex h-14 items-center">
          <div className="flex gap-4">
            <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
              Home
            </Link>
            <Link href="/institute" className="text-sm text-muted-foreground hover:text-primary">
              Institute
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
