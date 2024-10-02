import { Button } from "@/components/ui/button"
import { Book, Calendar, DollarSign, Home, MessageCircle, Shield, Users } from "lucide-react"
import Link from "next/link"

const whatsappNumber = "+94743193834"
const whatsappMessage = encodeURIComponent("Hello! I'm interested in the Islamic Centre Management System.")
const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

export default function HomeContent() {

    return (
        <main className="container mx-auto px-4 py-8 sm:py-16">
            <section className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold text-emerald-900 mb-4">Welcome to Islamic Center Management System</h2>
                <p className="text-lg sm:text-xl text-emerald-700 mb-6 sm:mb-8">Streamline Your Masjid Management with Our Comprehensive System</p>
                <div className="flex justify-center space-x-4">
                    <Link href={whatsappLink} target="_blank" rel="noopener noreferrer">
                        <Button className="bg-green-500 text-white hover:bg-green-600 flex items-center justify-center">
                            <MessageCircle className="mr-2 h-4 w-4" />
                            WhatsApp Us
                        </Button>
                    </Link>
                    <Link href="/admin/protected/dashboard">
                        <Button className="bg-emerald-600 text-white hover:bg-emerald-700 flex items-center justify-center">
                            <Home className="mr-2 h-4 w-4" />
                            Go to Admin Portal
                        </Button>
                    </Link>
                </div>
            </section>

            <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
                <FeatureCard
                    icon={<Home className="mx-auto mb-4 text-emerald-500" size={48} />}
                    title="Prayer Times"
                    description="Easily manage and display accurate prayer times for your community."
                />
                <FeatureCard
                    icon={<Users className="mx-auto mb-4 text-emerald-500" size={48} />}
                    title="Community Management"
                    description="Efficiently organize and engage with your Islamic Centre's community members."
                />
                <FeatureCard
                    icon={<Calendar className="mx-auto mb-4 text-emerald-500" size={48} />}
                    title="Event Scheduling"
                    description="Plan and promote Islamic Centre events with our intuitive calendar system."
                />
                <FeatureCard
                    icon={<Shield className="mx-auto mb-4 text-emerald-500" size={48} />}
                    title="Secure Data"
                    description="Keep your community's information safe with our robust security measures."
                />
                <FeatureCard
                    icon={<Book className="mx-auto mb-4 text-emerald-500" size={48} />}
                    title="Resource Management"
                    description="Organize and share Islamic literature and educational materials easily."
                />
                <FeatureCard
                    icon={<DollarSign className="mx-auto mb-4 text-emerald-500" size={48} />}
                    title="Donation Tracking"
                    description="Manage and track donations transparently with our integrated system."
                />
            </section>

            <section className="mb-12 sm:mb-16">
                <h3 className="text-2xl sm:text-3xl font-bold text-emerald-900 mb-6 text-center">Why Choose Our System?</h3>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h4 className="text-xl font-semibold mb-4 text-emerald-800">Streamlined Management</h4>
                        <p className="text-emerald-600 mb-4">Our system centralizes all aspects of Islamic Centre management, saving you time and reducing administrative burden.</p>
                        <ul className="list-disc list-inside text-emerald-600">
                            <li>Automated prayer time updates</li>
                            <li>Easy event creation and management</li>
                            <li>Efficient community member database</li>
                        </ul>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h4 className="text-xl font-semibold mb-4 text-emerald-800">Enhanced Community Engagement</h4>
                        <p className="text-emerald-600 mb-4">Foster a more connected and engaged community with our communication tools and features.</p>
                        <ul className="list-disc list-inside text-emerald-600">
                            <li>Announcement broadcasts</li>
                            <li>Community forums</li>
                            <li>Volunteer management</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* <section className="mb-12 sm:mb-16">
                <h3 className="text-2xl sm:text-3xl font-bold text-emerald-900 mb-6 text-center">Testimonials</h3>
                <div className="grid md:grid-cols-2 gap-8">
                    <Testimonial
                        quote="This system has revolutionized how we manage our Islamic Centre. It's user-friendly and comprehensive!"
                        author="Imam Abdullah, Masjid Al-Noor"
                    />
                    <Testimonial
                        quote="The prayer time management and event scheduling features have made our administrative tasks so much easier."
                        author="Fatima Hassan, Community Organizer"
                    />
                </div>
            </section> */}

            <section className="text-center">
                <h3 className="text-2xl sm:text-3xl font-bold text-emerald-900 mb-6">Ready to Transform Your Islamic Centre Management?</h3>
                <Link href={whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-block">
                    <Button className="bg-green-500 text-white hover:bg-green-600 flex items-center justify-center">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        WhatsApp Us
                    </Button>
                </Link>
            </section>
        </main>
    )
}

interface FeatureCardProps {
    icon: JSX.Element
    title: string
    description: string
    className?: string
}

function FeatureCard({ icon, title, description, className = "" }: FeatureCardProps) {
    return (
        <div className={`bg-white p-6 rounded-lg shadow-md text-center ${className}`}>
            {icon}
            <h3 className="text-xl font-semibold mb-2 text-emerald-800">{title}</h3>
            <p className="text-emerald-600">{description}</p>
        </div>
    )
}

interface TestimonialProps {
    quote: string
    author: string
}

function Testimonial({ quote, author }: TestimonialProps) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-emerald-600 italic mb-4">"{quote}"</p>
            <p className="text-emerald-800 font-semibold">- {author}</p>
        </div>
    )
}