"use client"

import { getTemperature } from '@/lib/utils'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const FullDark = dynamic(() => import('@/components/clocks/full-dark'), {
    loading: () => <p>Loading...</p>
})

const Poster = dynamic(() => import('@/components/clocks/poster'), {
    loading: () => <p>Loading...</p>
})

const IqamahCountdown = dynamic(() => import('@/components/clocks/iqamath-countdown'), {
    loading: () => <p>Loading...</p>
})

const Clock = ({ masjid, clockSettings, prayerSettings, iqamathTime, nightMode }: any) => {
    const [temperature, setTemperature] = useState<string>('')

    useEffect(() => {
        (async () => {
            const temp = await getTemperature()
            setTemperature(temp)
        })()
    }, [])

    return (
        <div>
            <FullDark
                iqamathTime={iqamathTime}
                masjidName={clockSettings?.masjid_name}
                temperature={temperature}
                clockSettings={clockSettings}
                prayerSettings={prayerSettings}
            />
        </div>
    )
}

export default Clock