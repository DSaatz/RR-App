import { Metadata } from 'next'
import AuthTabs from '@/components/ui/costum/auth-tabs'

export const metadata: Metadata = {
  title: 'Login | RestaurantRater',
  description: 'Log in to your RestaurantRater account',
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-green-700 mb-6">Welcome to RestaurantRater</h1>
        <AuthTabs />
      </div>
    </div>
  )
}