'use client'

import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { useEffect } from 'react'

interface ErrorPageProps {
  error: Error
  reset: () => void
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-emerald-900 to-emerald-800 text-white p-4">
      <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
      <h1 className="text-3xl font-bold mb-2">Oops! Something went wrong</h1>
      <p className="text-xl mb-4">We're sorry, but an error occurred while processing your request.</p>
      <div className="flex space-x-4">
        <Button onClick={reset} variant="default" className="text-emerald-50 border-emerald-50 hover:bg-emerald-700">
          Try again
        </Button>
        <Link href="/" passHref>
          <Button variant="ghost" className="hover:bg-emerald-700">
            Go to Homepage
          </Button>
        </Link>
      </div>
      <p className="mt-8 text-sm text-emerald-200">
        If the problem persists, please contact support.
      </p>
    </div>
  )
}
