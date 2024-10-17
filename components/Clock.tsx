"use client"

import { useClockLogic } from '@/components/hooks/useClockLogic'
import { getEnglishDate } from '@/lib/utils'
import { ClockProps } from '@/types/clock'
import dynamic from 'next/dynamic'
import { useTemperature } from './hooks/useTemperature'

const FullDark = dynamic(() => import('@/components/clocks/full-dark'), {
    loading: () => <p>Loading...</p>
})

const FullLight = dynamic(() => import('@/components/clocks/full-light'), {
    loading: () => <p>Loading...</p>
})

const IqamahCountdown = dynamic(() => import('@/components/clocks/iqamath-countdown'), {
    loading: () => <p>Loading...</p>
})

const IshrakScreen = dynamic(() => import('@/components/clocks/ishrak-screen'), {
    loading: () => <p>Loading...</p>
})

const NightModeScreen = dynamic(() => import('@/components/clocks/night-mode-screen'), {
    loading: () => <p>Loading...</p>
})

function Clock({ masjid, clockSettings, prayerSettings, iqamathTime, nightMode, masjidName, globalSettings }: ClockProps) {
    const temperature = useTemperature()
    const {
        time,
        hijriDate,
        nextPrayer,
        showIqamahCountdown,
        showIshrak,
        iqamahCountdown,
        isNightModeActive,
    } = useClockLogic(prayerSettings, iqamathTime, globalSettings.hijri_adjust, nightMode)

    function renderClockComponent() {
        const commonProps = {
            hijriDate,
            time,
            nextPrayer,
            iqamathTime,
            masjidName,
            temperature,
            clockSettings,
            prayerSettings,
            getEnglishDate,
        }
        if (nightMode.active && isNightModeActive) {
            return <NightModeScreen />
        } else if (showIshrak) {
            return <IshrakScreen />
        } else if (showIqamahCountdown) {
            return <IqamahCountdown countdown={iqamahCountdown} />
        } else {
            return clockSettings.theme === '2' ? <FullLight {...commonProps} /> : <FullDark {...commonProps} />
        }
    }

    return <div>{renderClockComponent()}</div>
}

export default Clock
