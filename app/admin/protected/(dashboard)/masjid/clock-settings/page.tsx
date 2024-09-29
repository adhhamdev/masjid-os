import { getClockSettings, getMasjidDetails } from '@/app/actions';
import IqamathTime from '@/components/IqamathTime';
import ThemeSelector from '@/components/ThemeSelector';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save } from 'lucide-react';

export default async function PrayerSettings() {
  const { masjid } = await getMasjidDetails();
  const { clockSettings, iqamathTime, nightMode } = await getClockSettings(masjid?.clock_settings);
  console.log(iqamathTime)
  console.log(nightMode)
  return (
    <div className='min-h-screen py-8'>
      <main className='container mx-auto'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-2xl font-semibold text-gray-800'>
            Clock Settings
          </h2>
          <Button className='bg-emerald-500 hover:bg-emerald-600 text-white'>
            <Save className='w-4 h-4 mr-2' />
            Save
          </Button>
        </div>
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
            <Card>
              <CardContent className='space-y-4 pt-4'>
                <div>
                  <label
                    className='block text-sm font-medium mb-1 text-gray-700'
                    htmlFor='masjidName'>
                    Masjid Name
                  </label>
                  <Input
                    id='masjidName'
                    placeholder='Enter Masjid Name'
                    className='focus-visible:ring-gray-500'
                    defaultValue={masjid?.name}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value='iqamath-time'>
            <IqamathTime iqamathTime={iqamathTime} />
          </TabsContent>
          <TabsContent value='theme'>
            <ThemeSelector theme={clockSettings?.theme.toString()} />
          </TabsContent>
          <TabsContent value='night-mode'>
            <Card>
              <CardContent className="space-y-6 pt-4">
                <h3 className='text-lg font-semibold mb-4 text-gray-800'>
                  Night Mode
                </h3>
                <div className='space-y-4'>
                  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                    <div>
                      <label htmlFor='fromTime' className='block text-sm font-medium text-gray-700 mb-1'>
                        From Time
                      </label>
                      <Input
                        id='fromTime'
                        type='time'
                        className='w-full'
                        defaultValue={nightMode?.from}
                      />
                    </div>
                    <div>
                      <label htmlFor='toTime' className='block text-sm font-medium text-gray-700 mb-1'>
                        To Time
                      </label>
                      <Input
                        id='toTime'
                        type='time'
                        className='w-full'
                        defaultValue={nightMode?.to}
                      />
                    </div>
                    <div>
                      <label htmlFor='active' className='block text-sm font-medium text-gray-700 mb-1'>
                        Active
                      </label>
                      <Select defaultValue={nightMode?.active.toString()}>
                        <SelectTrigger id='active' className='w-full'>
                          <SelectValue placeholder='Select' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='true'>Yes</SelectItem>
                          <SelectItem value='false'>No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
