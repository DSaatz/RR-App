"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AuthTabs() {
  const [showPassword, setShowPassword] = useState(false)
  const [passwordMatch, setPasswordMatch] = useState(true)

  const togglePasswordVisibility = () => setShowPassword(!showPassword)

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value
    const repeatPassword = e.target.form?.repeatPassword.value
    setPasswordMatch(password === repeatPassword)
  }

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
            <div className="space-y-2">
              <Label htmlFor="login-username">Username or Email</Label>
              <Input id="login-username" placeholder="Enter your username or email" className="transition-all hover:border-green-500 focus:border-green-500 focus:ring-green-500" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="login-password">Password</Label>
              <div className="relative">
                <Input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="pr-10 transition-all hover:border-green-500 focus:border-green-500 focus:ring-green-500"
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
            <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 transition-colors">Login</Button>
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
            <div className="space-y-2">
              <Label htmlFor="register-username">Username</Label>
              <Input id="register-username" placeholder="Choose a username" className="transition-all hover:border-green-500 focus:border-green-500 focus:ring-green-500" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="register-email">Email</Label>
              <Input id="register-email" type="email" placeholder="Enter your email" className="transition-all hover:border-green-500 focus:border-green-500 focus:ring-green-500" />
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
              />
              {!passwordMatch && (
                <p className="text-sm text-red-500">Passwords do not match</p>
              )}
            </div>
            <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 transition-colors">Register</Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}