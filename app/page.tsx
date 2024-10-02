import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import Link from "next/link"
import HomeContent from "../components/HomeContent"
import MobileMenu from "../components/MobileMenu"

const whatsappNumber = "+94743193834"
const whatsappMessage = encodeURIComponent("Hello! I'm interested in the Islamic Centre Management System.")
const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

export default function HomePage() {

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <header className="container mx-auto px-4 py-6 relative z-10">
        <nav className="flex justify-between items-center">
          <h1 className="text-xl sm:text-2xl font-bold text-emerald-800">Islamic Center Management System</h1>
          <div className="hidden md:flex space-x-4">
            <Link href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <Button className="bg-green-500 text-white hover:bg-green-600 flex items-center">
                <MessageCircle className="mr-2 h-4 w-4" />
                WhatsApp Us
              </Button>
            </Link>
          </div>
          <MobileMenu whatsappLink={whatsappLink} />
        </nav>
      </header>

      <HomeContent />

      <footer className="py-6 sm:py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm sm:text-base">&copy; 2024 Islamic Centre Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}