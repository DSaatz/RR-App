"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from 'next/navigation'
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { login, sendPasswordResetEmail } from "@/lib/authHelpers"
import { auth } from "@/lib/firebase"  
import { onAuthStateChanged, User } from "firebase/auth"

import { registerUser } from "@/lib/APIHelpers"

export default function AuthTabs() {
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null)
  const [resetEmailSent, setResetEmailSent] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [passwordMatch, setPasswordMatch] = useState(true)
  const router = useRouter()
  const loginEmailRef = useRef<HTMLInputElement>(null)

  const togglePasswordVisibility = () => setShowPassword(!showPassword)

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const email = e.currentTarget.loginEmail.value
    const password = e.currentTarget.loginPassword.value

    try {
      await login(email, password)
      console.log("Login successful")
      setLoginError(null)
      router.push('/home')
    } catch (error) {
      console.error("Login failed:", error)
      setLoginError("Invalid username or password")
    }
  }

  const handleForgotPassword = async () => {
    const email = loginEmailRef.current?.value

    if (!email) {
      setLoginError("Please enter your email address")
      return
    }

    try {
      await sendPasswordResetEmail(email)
      setResetEmailSent(true)
      setLoginError(null)
    } catch (error) {
      console.error("Password reset failed:", error)
      setLoginError("Failed to send password reset email. Please try again.")
    }
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.currentTarget.value
    const repeatPassword = e.currentTarget.form?.['register-repeat-password'].value

    if (e.currentTarget.form?.['register-password'] && repeatPassword && password !== repeatPassword) {
      setPasswordMatch(false)
    } else {
      setPasswordMatch(true)
    }
  }

  const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const username = e.currentTarget["register-username"].value;
    const email = e.currentTarget["register-email"].value;
    const password = e.currentTarget["register-password"].value;
    const repeatPassword = e.currentTarget["register-repeat-password"].value;
  
    if (password !== repeatPassword) {
      setPasswordMatch(false);
      return;
    }
  
    setPasswordMatch(true);
  
    try {
      await registerUser(username, email, password);
      console.log("Registration successful");
      setLoginError(null);
      // Automatically log in the user after successful registration
      await login(email, password);
      router.push('/home')
    } catch (error) {
      if (error instanceof Error) {
        console.error("Registration failed:", error.message);
        setLoginError(error.message);
      } else {
        console.error("Unexpected error:", error);
        setLoginError("An unknown error occurred");
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
        localStorage.setItem('user', JSON.stringify({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        }))
        router.push('/home')
      } else {
        setUser(null)
        localStorage.removeItem('user')
      }
    })

    return () => unsubscribe()
  }, [router])

  return (
    <Tabs defaultValue="login" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">Login</TabsTrigger>
        <TabsTrigger value="register" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">Register</TabsTrigger>
      </TabsList>

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
                <Input 
                  id="loginEmail" 
                  ref={loginEmailRef}
                  placeholder="Enter your email" 
                  className="transition-all hover:border-green-500 focus:border-green-500 focus:ring-green-500" 
                  required 
                />
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
              {resetEmailSent && <p className="text-sm text-green-500">Password reset email sent. Please check your inbox.</p>}
              <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 transition-colors">Login</Button>
            </form>
            <div className="text-center">
              <Button
                variant="link"
                onClick={handleForgotPassword}
                className="text-sm text-green-600 hover:text-green-700"
              >
                Forgot Password?
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="register">
        <Card>
          <CardHeader>
            <CardTitle>Register</CardTitle>
            <CardDescription>Create a new account to get started.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="register-username">Username</Label>
                <Input id="register-username" placeholder="Choose a username" className="transition-all hover:border-green-500 focus:border-green-500 focus:ring-green-500" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <Input id="register-email" type="email" placeholder="Enter your email" className="transition-all hover:border-green-500 focus:border-green-500 focus:ring-green-500" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-password">Password</Label>
                <div className="relative">
                  <Input
                    id="register-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Choose a password"
                    className="pr-10 transition-all hover:border-green-500 focus:border-green-500 focus:ring-green-500"
                    onChange={handlePasswordChange}
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
              <div className="space-y-2">
                <Label htmlFor="register-repeat-password">Repeat Password</Label>
                <Input
                  id="register-repeat-password"
                  name="repeatPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Repeat your password"
                  className={`transition-all hover:border-green-500 focus:border-green-500 focus:ring-green-500 ${
                    !passwordMatch ? "border-red-500" : ""
                  }`}
                  onChange={handlePasswordChange}
                  required
                />
                {!passwordMatch && (
                  <p className="text-sm text-red-500">Passwords do not match</p>
                )}
              </div>
              {loginError && <p className="text-sm text-red-500">{loginError}</p>}
              <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 transition-colors">Register</Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}