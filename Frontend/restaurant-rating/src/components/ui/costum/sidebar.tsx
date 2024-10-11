"use client"

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Home, Star, MapPin, TrendingUp, User, Settings, LogOut } from 'lucide-react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { logout } from "@/lib/authHelpers"
import { getUserByMail } from '@/lib/APIHelpers' 
import { useState, useEffect } from 'react'

export default function Sidebar() {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<{ username: string } | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userString = localStorage.getItem('user');
        console.log('User from localStorage:', userString);
        if (!userString) {
          console.log('No user found in localStorage');
          return;
        }

        const user = JSON.parse(userString);
        console.log('User parsed from localStorage:', user);

        if (!user || !user.email) {
          console.log('Invalid user data in localStorage');
          return;
        }

        const userData = await getUserByMail(user.email);
        console.log('User data from API:', userData);

        if (userData && userData.username) {
          setCurrentUser(userData);
        } else {
          console.log('No valid user data returned from API');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await logout() // Call your logout function
      console.log("Logout successful")
      router.push('/') // Redirect to the login page
    } catch (error) {
      console.error("Logout failed:", error)
      // Handle the error (e.g., show a toast message)
    }
  }

  return (
    <Card className="h-screen w-64 flex flex-col bg-white border-r border-gray-200">
      <div className="p-4 flex flex-col items-center border-b border-gray-200">
        <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden mb-2">
          <Image
            src="/icon/icon.png?height=64&width=64"
            alt="Logo"
            width={64}
            height={64}
          />
        </div>
        <h2 className="text-xl font-semibold">RestaurantRater</h2>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul className="p-2 space-y-2">
          <SidebarItem href="/home" icon={<Home size={20} />}>Home</SidebarItem>
          <SidebarItem href="/add-rating" icon={<Star size={20} />}>Add Rating</SidebarItem>
          <SidebarItem href="/category/near-you" icon={<MapPin size={20} />}>Near You</SidebarItem>
          <SidebarItem href="/category/trending" icon={<TrendingUp size={20} />}>Trending</SidebarItem>
          {currentUser && (
            <SidebarItem href={`/account/${currentUser.username}`} icon={<User size={20} />}>Account</SidebarItem>
          )}
          <SidebarItem href="/settings" icon={<Settings size={20} />}>Settings</SidebarItem>
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-200">
        <Button
          variant="ghost"
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={handleLogout}
        >
          <LogOut size={20} className="mr-2" />
          Log out
        </Button>
      </div>
    </Card>
  )
}

function SidebarItem({ href, icon, children }: { href: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="flex items-center p-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
        {icon}
        <span className="ml-3">{children}</span>
      </Link>
    </li>
  )
}