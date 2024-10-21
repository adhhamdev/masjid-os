import { getMasjidDetails } from '@/app/actions'
import { FormMessage } from '@/components/form-message'
import IqamathTimeTab from '@/components/IqamathTimeTab'
import MasjidDetailsTab from '@/components/MasjidDetailsTab'
import NightModeTab from '@/components/NightModeTab'
import ThemeTab from '@/components/ThemeTab'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default async function ClockSettings({ searchParams }: { searchParams: { success: string, error: string, message: string } }) {
  const { masjid } = await getMasjidDetails();

  const msg = searchParams.success ? { success: searchParams.success } : searchParams.error ? { error: searchParams.error } : searchParams.message ? { message: searchParams.message } : null

  return (
    <div className='min-h-screen py-8'>
      <main className='container mx-auto'>
        <h2 className='text-2xl font-semibold text-gray-800 mb-4'>
          Clock Settings
        </h2>

        {msg && (
          <div className="mb-4">
            <FormMessage message={msg} />
          </div>
        )}

        <Tabs defaultValue='masjid-details' className='w-full'>
          <div className='overflow-x-auto'>
            <TabsList className='bg-emerald-500 w-max inline-flex'>
              <TabsTrigger value='masjid-details' className='text-white whitespace-nowrap'>
                Masjid Details
              </TabsTrigger>
              <TabsTrigger value='iqamath-time' className='text-white whitespace-nowrap'>
                Iqamath Time
              </TabsTrigger>
              <TabsTrigger value='theme' className='text-white whitespace-nowrap'>
                Theme
              </TabsTrigger>
              <TabsTrigger value='night-mode' className='text-white whitespace-nowrap'>
                Night Mode
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value='masjid-details'>
            <MasjidDetailsTab masjid={masjid} masjidName={masjid?.contact?.masjid_name} />
          </TabsContent>

          <TabsContent value='iqamath-time'>
            <IqamathTimeTab iqamathTime={masjid?.clock_settings?.iqamath_time} clockSettings={masjid?.clock_settings} />
          </TabsContent>

          <TabsContent value='theme'>
            <ThemeTab theme={masjid?.clock_settings?.theme} masjid={masjid} />
          </TabsContent>

          <TabsContent value='night-mode'>
            <NightModeTab nightMode={masjid?.clock_settings?.night_mode} clockSettings={masjid?.clock_settings} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}