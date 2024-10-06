import Image from 'next/image'
import Link from 'next/link'
import { Home, Star, MapPin, TrendingUp, User, Settings, LogOut } from 'lucide-react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Sidebar() {
  return (
    <Card className="h-screen w-64 flex flex-col bg-white border-r border-gray-200">
      <div className="p-4 flex flex-col items-center border-b border-gray-200">
        <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden mb-2">
          <Image
            src="/placeholder.svg?height=64&width=64"
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
          <SidebarItem href="/near-you" icon={<MapPin size={20} />}>Near You</SidebarItem>
          <SidebarItem href="/trending" icon={<TrendingUp size={20} />}>Trending</SidebarItem>
          <SidebarItem href="/account" icon={<User size={20} />}>Account</SidebarItem>
          <SidebarItem href="/settings" icon={<Settings size={20} />}>Settings</SidebarItem>
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-200">
        <Button
          variant="ghost"
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
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