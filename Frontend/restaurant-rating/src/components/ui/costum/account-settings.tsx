"use client"

import { useState } from 'react'
import { Camera, Save, Trash2 } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface AccountSettingsProps {
  username: string
  avatarUrl: string
}

export default function AccountSettings({ username, avatarUrl }: AccountSettingsProps) {
  const [newUsername, setNewUsername] = useState(username)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Handle avatar file upload here
    console.log("Avatar file selected:", event.target.files?.[0])
  }

  const handleSaveChanges = () => {
    // Handle saving changes here
    console.log("Saving changes:", { newUsername, newPassword })
  }

  const handleDeleteAccount = () => {
    // Handle account deletion here
    console.log("Deleting account")
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-green-700 mb-4">Account Settings</CardTitle>
        <div className="relative w-32 h-32 mx-auto mb-4">
          <Avatar className="w-full h-full">
            <AvatarImage src={avatarUrl} alt={username} />
            <AvatarFallback>{username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <Label
            htmlFor="avatar-upload"
            className="absolute bottom-0 right-0 bg-green-500 rounded-full p-2 cursor-pointer hover:bg-green-600 transition-colors"
          >
            <Camera className="w-5 h-5 text-white" />
          </Label>
          <Input
            id="avatar-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            className="border-green-300 focus:border-green-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="new-password">New Password</Label>
          <Input
            id="new-password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border-green-300 focus:border-green-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirm New Password</Label>
          <Input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border-green-300 focus:border-green-500"
          />
        </div>
        <Button onClick={handleSaveChanges} className="w-full bg-green-500 hover:bg-green-600">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="w-full">
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Account
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure you want to delete your account?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteAccount} className="bg-red-500 hover:bg-red-600">
                Yes, delete my account
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  )
}