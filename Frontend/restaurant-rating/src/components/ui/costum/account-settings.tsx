"use client"

import { useState, useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { changeUsername, changePassword, deleteUser, updateProfilePicture, getUserProfilePictureUrl } from '@/lib/APIHelpers'
import { useToast } from "@/hooks/use-toast"
import { getCurrentUser } from '@/lib/userHelpers'
import { useRouter } from 'next/navigation'
import { FileUpload } from '@/components/ui/costum/FileUpload'
import { uploadProfilePicture } from '@/lib/firebaseHelpers'

export default function AccountSettings() {
  const [newUsername, setNewUsername] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null)
  const [profilePicture, setProfilePicture] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const user = await getCurrentUser()
        if (user && user.email) {
          setCurrentUserEmail(user.email)
          fetchProfilePicture(user.email)
        } else {
          toast({ title: "Error", description: "Unable to fetch user information", variant: "destructive" })
        }
      } catch (error) {
        console.error('Error fetching current user:', error)
        toast({ title: "Error", description: "An error occurred while fetching user information", variant: "destructive" })
      }
    }

    fetchCurrentUser()
  }, [toast])

  const fetchProfilePicture = async (email: string) => {
    try {
      const profilePictureUrl = await getUserProfilePictureUrl(email)
      setProfilePicture(profilePictureUrl)
      console.log('Profile picture URL:', profilePictureUrl)
    } catch (error) {
      console.error('Error fetching profile picture:', error)
      toast({ title: "Error", description: "Failed to fetch profile picture", variant: "destructive" })
    }
  }

  const handleUsernameChange = async () => {
    if (!currentUserEmail) {
      toast({ title: "Error", description: "User not logged in", variant: "destructive" })
      return
    }
    try {
      const response = await changeUsername(currentUserEmail, newUsername)
      if (response && response.status === 200) {
        toast({ title: "Success", description: "Username updated successfully" })
        setNewUsername('')
      } else if (response && response.status === 422) {
        toast({ title: "Error", description: response.data.detail || "Invalid username format", variant: "destructive" })
      } else {
        toast({ title: "Error", description: "Failed to update username", variant: "destructive" })
      }
    } catch (error) {
      console.error('Error changing username:', error)
      toast({ title: "Error", description: "An unexpected error occurred", variant: "destructive" })
    }
  }

  const handlePasswordChange = async () => {
    if (!currentUserEmail) {
      toast({ title: "Error", description: "User not logged in", variant: "destructive" })
      return
    }
    if (newPassword !== confirmPassword) {
      toast({ title: "Error", description: "Passwords do not match", variant: "destructive" })
      return
    }
    try {
      const response = await changePassword(currentUserEmail, newPassword)
      if (response && response.status === 200) {
        toast({ title: "Success", description: "Password updated successfully" })
        setNewPassword('')
        setConfirmPassword('')
      } else if (response && response.status === 422) {
        toast({ title: "Error", description: response.data.detail || "Invalid password format", variant: "destructive" })
      } else {
        toast({ title: "Error", description: "Failed to update password", variant: "destructive" })
      }
    } catch (error) {
      console.error('Error changing password:', error)
      toast({ title: "Error", description: "An unexpected error occurred", variant: "destructive" })
    }
  }

  const handleDeleteAccount = async () => {
    if (!currentUserEmail) {
      toast({ title: "Error", description: "User not logged in", variant: "destructive" })
      return
    }
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      try {
        const response = await deleteUser(currentUserEmail)
        if (response && response.status === 200) {
          toast({ title: "Success", description: "Account deleted successfully" })
          router.push('/login')
        } else {
          toast({ title: "Error", description: "Failed to delete account", variant: "destructive" })
        }
      } catch (error) {
        console.error('Error deleting account:', error)
        toast({ title: "Error", description: "An unexpected error occurred", variant: "destructive" })
      }
    }
  }

  const handleFileSelect = async (file: File) => {
    setIsUploading(true)
    try {
      const downloadURL = await uploadProfilePicture(file)
      
      if (currentUserEmail) {
        const response = await updateProfilePicture(currentUserEmail, downloadURL)
        if (response && response.status === 200) {
          setProfilePicture(downloadURL)
          toast({ title: "Success", description: "Profile picture updated successfully" })
        } else {
          toast({ title: "Error", description: "Failed to update profile picture in the database", variant: "destructive" })
        }
      }
    } catch (error) {
      console.error('Error uploading file:', error)
      toast({ title: "Error", description: "Failed to upload profile picture", variant: "destructive" })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-green-700">Account Settings</CardTitle>
        <CardDescription>Manage your account settings and preferences.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="w-32 h-32">
            <AvatarImage src={profilePicture || "/placeholder-avatar.jpg"} alt="User avatar" />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
          <FileUpload onFileSelect={handleFileSelect} />
          {isUploading && <p className="text-sm text-green-600">Uploading...</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="username" className="text-sm font-medium text-green-700">Change Username</Label>
          <Input 
            id="username" 
            placeholder="Enter new username" 
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            className="border-green-300 focus:border-green-500 focus:ring-green-500"
          />
          <Button onClick={handleUsernameChange} className="bg-green-600 hover:bg-green-700 text-white">Update Username</Button>
        </div>
        <div className="space-y-2">
          <Label htmlFor="new-password" className="text-sm font-medium text-green-700">Change Password</Label>
          <Input 
            id="new-password" 
            type="password" 
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border-green-300 focus:border-green-500 focus:ring-green-500"
          />
          <Input 
            id="confirm-password" 
            type="password" 
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border-green-300 focus:border-green-500 focus:ring-green-500"
          />
          <Button onClick={handlePasswordChange} className="bg-green-600 hover:bg-green-700 text-white">Update Password</Button>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="destructive" onClick={handleDeleteAccount} className="bg-red-600 hover:bg-red-700 text-white">Delete Account</Button>
      </CardFooter>
    </Card>
  )
}