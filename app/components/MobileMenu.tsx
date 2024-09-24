"use client"

import { Button } from "@/components/ui/button"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, MessageCircle } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function MobileMenu({ whatsappLink }: { whatsappLink: string }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <>
            <Button variant="ghost" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <Menu className="h-6 w-6 text-emerald-800" />
            </Button>
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 right-0 top-full bg-white shadow-md z-20 md:hidden"
                    >
                        <div className="container mx-auto px-4 py-4 flex flex-col space-y-2">
                            <Button variant="ghost" className="text-emerald-700">Features</Button>
                            <Button variant="ghost" className="text-emerald-700">About</Button>
                            <Link href={whatsappLink} target="_blank" rel="noopener noreferrer" className="w-full">
                                <Button className="bg-green-500 text-white hover:bg-green-600 flex items-center justify-center w-full">
                                    <MessageCircle className="mr-2 h-4 w-4" />
                                    WhatsApp Us
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}