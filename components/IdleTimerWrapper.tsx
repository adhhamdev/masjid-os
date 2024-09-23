'use client'

import { signOutAction } from '@/app/actions'
import { useRouter } from 'next/navigation'
import { useIdleTimer } from 'react-idle-timer'

const IDLE_TIMEOUT = 5 * 60 * 1000 // 5 minutes (in milliseconds)

export function IdleTimerWrapper({ children }: { children: React.ReactNode }) {
    const router = useRouter()

    const handleOnIdle = async () => {
        await signOutAction()
        router.push('/admin/sign-in?timeout=true')
    }

    const idleTimer = useIdleTimer({
        timeout: IDLE_TIMEOUT,
        onIdle: handleOnIdle,
        debounce: 1000
    })

    return <>{children}</>
}