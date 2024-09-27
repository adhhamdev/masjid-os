import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 text-center">
                <h1 className="mt-6 text-4xl font-extrabold text-white tracking-tight sm:text-5xl">
                    404 - Page Not Found
                </h1>
                <p className="mt-2 text-lg text-emerald-100">
                    Oops! The page you're looking for seems to have wandered off. Let's guide you back to the right path.
                </p>
                <div className="mt-8">
                    <Link href="/admin/protected/dashboard">
                        <Button className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-emerald-700 bg-white hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition duration-150 ease-in-out">
                            <Home className="mr-2 h-5 w-5" />
                            Return to Homepage
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
