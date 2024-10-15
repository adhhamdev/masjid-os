"use client"

import { useClockLogic } from '@/components/hooks/useClockLogic'
import { getEnglishDate } from '@/lib/utils'
import { ClockProps } from '@/types/clock'
import dynamic from 'next/dynamic'
import { useTemperature } from './hooks/useTemperature'

console.log(getEnglishDate())

const FullDark = dynamic(() => import('@/components/clocks/full-dark'), {
    loading: () => <p>Loading...</p>
})

const FullLight = dynamic(() => import('@/components/clocks/full-light'), {
    loading: () => <p>Loading...</p>
})

const IqamahCountdown = dynamic(() => import('@/components/clocks/iqamath-countdown'), {
    loading: () => <p>Loading...</p>
})

const SwitchOffPhones = dynamic(() => import('@/components/clocks/switch-off-phones'), {
    loading: () => <p>Loading...</p>
})

function Clock({ masjid, clockSettings, prayerSettings, iqamathTime, nightMode, masjidName, globalSettings }: ClockProps) {
    const temperature = useTemperature()
    const {
        time,
        hijriDate,
        nextPrayer,
        showIqamahCountdown,
        showSwitchOffPhones,
        iqamahCountdown,
    } = useClockLogic(prayerSettings, iqamathTime, globalSettings.hijri_adjust)

    function renderClockComponent() {
        if (showIqamahCountdown) {
            return <IqamahCountdown countdown={iqamahCountdown} />
        } else if (showSwitchOffPhones) {
            return <SwitchOffPhones />
        } else {
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
            return clockSettings.theme === '2' ? <FullLight {...commonProps} /> : <FullDark {...commonProps} />
        }
    }

    return <div>{renderClockComponent()}</div>
}

export default Clock
