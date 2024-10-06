"use client"

import { useState, useEffect } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Import Firebase auth helpers
import { login } from "@/lib/authHelpers"
import { auth } from "@/lib/firebase"  // Firebase Auth instance from your setup file
import { onAuthStateChanged, User } from "firebase/auth"  // Firebase listener

export default function AuthTabs() {
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)  // Track logged-in user

  const togglePasswordVisibility = () => setShowPassword(!showPassword)

  // Login form handler
  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault() // Prevent page reload

    const email = e.currentTarget.loginEmail.value
    const password = e.currentTarget.loginPassword.value

    try {
      await login(email, password)
      console.log("Login successful")
      setLoginError(null)  // Reset error on success
    } catch (error) {
      console.error("Login failed:", error)
      setLoginError("Invalid username or password")
    }
  }

  // Track who is logged in (runs on client-side only)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)  // Set the user if logged in
      } else {
        setUser(null)  // User is logged out
      }
    })

    // Cleanup subscription on unmount
    return () => unsubscribe()
  }, [])

  return (
    <Tabs defaultValue="login" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">Login</TabsTrigger>
        <TabsTrigger value="register" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">Register</TabsTrigger>
      </TabsList>
      
      {/* Login Tab */}
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Enter your credentials to access your account.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="loginEmail">Email</Label>
                <Input id="loginEmail" placeholder="Enter your email" className="transition-all hover:border-green-500 focus:border-green-500 focus:ring-green-500" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="loginPassword">Password</Label>
                <div className="relative">
                  <Input
                    id="loginPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="pr-10 transition-all hover:border-green-500 focus:border-green-500 focus:ring-green-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-green-500"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              {loginError && <p className="text-sm text-red-500">{loginError}</p>}
              <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 transition-colors">Login</Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Register Tab (untouched for now) */}
      <TabsContent value="register">
        <Card>
          <CardHeader>
            <CardTitle>Register</CardTitle>
            <CardDescription>Create a new account to get started.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Registration will be handled later.</p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
