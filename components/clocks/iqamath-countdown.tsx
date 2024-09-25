"use client"
import { useEffect, useState } from 'react';

export default function IqamahCountdown({ iqamahTime }: { iqamahTime: string }) {

    const [countdown, setCountdown] = useState(0)
    useEffect(() => {
        console.log(iqamahTime)
    }, [iqamahTime])

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prevCount: number) => (prevCount > 0 ? prevCount - 1 : 0))
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            width: '100vw',
            backgroundColor: '#1a202c',
            fontFamily: 'sans-serif',
            color: 'white',
            overflow: 'hidden'
        }}>
            <div style={{
                backgroundColor: '#2d3748',
                padding: '1vh',
                textAlign: 'center',
                fontSize: 'clamp(1rem, 4vw, 2.5rem)',
                fontWeight: 'bold',
                borderBottom: '2px solid #4a5568'
            }}>
                IQAMATH COUNT DOWN
            </div>
            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#edf2f7',
                padding: '2vh'
            }}>
                <div style={{
                    color: '#e53e3e',
                    fontSize: 'clamp(3rem, 20vw, 12rem)',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
                }}>
                    {countdown.toString().padStart(2, '0')}
                </div>
            </div>
            <div style={{
                backgroundColor: '#e2e8f0',
                padding: '1vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div style={{
                    width: 'clamp(2rem, 8vw, 4rem)',
                    height: 'clamp(2rem, 8vw, 4rem)',
                    backgroundColor: '#e53e3e',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '1rem'
                }}>
                    <span style={{ color: 'white', fontSize: 'clamp(1rem, 5vw, 2.5rem)' }}>🚫</span>
                </div>
                <p style={{
                    color: 'black',
                    fontSize: 'clamp(0.8rem, 3vw, 1.5rem)',
                    fontWeight: '600',
                    textAlign: 'left',
                    lineHeight: '1.2'
                }}>
                    Please Turn off Your<br />Mobile Phones
                </p>
            </div>
        </div>
    )
}