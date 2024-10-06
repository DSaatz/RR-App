"use client"

import { useState } from 'react'
import { Menu } from 'lucide-react'
import Sidebar from './sidebar'
import Footer from './footer'
import { Button } from "@/components/ui/button"

interface StandardLayoutProps {
  children: React.ReactNode
  pageTitle: string
}

export default function StandardLayout({ children, pageTitle }: StandardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        {/* Sidebar for larger screens */}
        <div className={`hidden md:block w-64 ${isSidebarOpen ? 'block' : 'hidden'}`}>
          <Sidebar />
        </div>

        {/* Main content area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleSidebar}
            >
              <Menu className="h-6 w-6" />
            </Button>
            <h1 className="text-2xl font-bold text-green-700">{pageTitle}</h1>
            {/* You can add additional header content here if needed */}
          </header>

          {/* Mobile sidebar */}
          {isSidebarOpen && (
            <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={toggleSidebar}>
              <div className="w-64 h-full bg-white" onClick={(e) => e.stopPropagation()}>
                <Sidebar />
              </div>
            </div>
          )}

          {/* Page content */}
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}