'use client'
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, MoonStar, Settings, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-500 to-teal-700 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('/mosque-pattern.svg')] opacity-10 animate-pulse"></div>
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="flex justify-center items-center w-fit mx-auto rounded-full backdrop-blur-xl shadow-xl p-4">
            <Image src="/mosque.png" alt="mosque" width={100} height={100} />
          </div>
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-4">
            Welcome to Masjid OS
          </h1>
          <p className="text-xl sm:text-2xl mb-8">
            Streamline your mosque management with our all-in-one solution
          </p>
          <Link
            href="/admin/protected/dashboard"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-emerald-700 bg-white hover:bg-emerald-50 transition duration-150 ease-in-out"
          >
            Get Started as Admin <ArrowRight className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature, index) => (
            <FeatureCard key={feature.name} feature={feature} index={index} />
          ))}
        </motion.div>
      </div>
    </main>
  )
}

interface Feature {
  name: string
  description: string
  icon: React.ElementType
}

const features: Feature[] = [
  {
    name: 'Mosque Management',
    description: 'Efficiently manage your mosque\'s daily operations and resources.',
    icon: MoonStar,
  },
  {
    name: 'Event Scheduling',
    description: 'Easily plan and organize events, prayers, and community gatherings.',
    icon: Calendar,
  },
  {
    name: 'Community Engagement',
    description: 'Foster a strong community with tools for communication and involvement.',
    icon: Users,
  },
  {
    name: 'Customizable Settings',
    description: 'Tailor the system to fit your mosque\'s unique needs and preferences.',
    icon: Settings,
  },
]

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-6 hover:bg-opacity-20 transition duration-300"
    >
      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-emerald-500 text-white mb-4">
        <feature.icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <h3 className="text-lg font-medium">{feature.name}</h3>
      <p className="mt-2 text-base text-emerald-100">{feature.description}</p>
    </motion.div>
  )
}
