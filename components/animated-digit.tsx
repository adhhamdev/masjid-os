import { AnimatePresence, motion } from "framer-motion"

export default function AnimatedDigit({ digit }: { digit: string }) {
    return (
        <div className="relative w-[0.65em] h-[1em] overflow-hidden">
            <AnimatePresence mode="popLayout">
                <motion.span
                    key={digit}
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '-100%' }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <span suppressHydrationWarning>{digit}</span>
                </motion.span>
            </AnimatePresence>
        </div>
    )
}