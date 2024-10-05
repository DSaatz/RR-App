import Link from 'next/link'
import { Github } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-green-700 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold">RestaurantRater</h2>
          </div>
          <nav className="flex flex-wrap justify-center md:justify-end space-x-4 md:space-x-6">
            <Link href="/about" className="hover:underline">
              About
            </Link>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
            <Link 
              href="https://github.com/yourusername/restaurantrater" 
              className="flex items-center hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-4 h-4 mr-1" />
              GitHub
            </Link>
          </nav>
        </div>
        <div className="mt-4 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} RestaurantRater. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}