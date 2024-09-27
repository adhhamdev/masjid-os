import ThemeSelector from '@/components/ThemeSelector';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save } from 'lucide-react';

export default function PrayerSettings() {
  return (
    <div className='min-h-screen py-8'>
      <main className='container mx-auto'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-2xl font-semibold text-gray-800'>
            Prayer Settings
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
              <TabsTrigger value='night-mood' className='text-white whitespace-nowrap'>
                Night Mood
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
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value='iqamath-time'>
            <Card>
              <CardContent className='space-y-4 pt-4'>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Prayers</TableHead>
                      <TableHead>Azan Time</TableHead>
                      <TableHead>Iqamath Time after Azan</TableHead>
                      <TableHead>Fixed Iqamath Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'].map((prayer) => (
                      <TableRow key={prayer}>
                        <TableCell>{prayer}</TableCell>
                        <TableCell>
                          <Input
                            type='time'
                            className='w-full'
                            placeholder='Azan Time'
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type='number'
                            className='w-full'
                            placeholder='Minutes after Azan'
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type='time'
                            className='w-full'
                            placeholder='Fixed Iqamath Time'
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value='theme'>
            <ThemeSelector />
          </TabsContent>
          <TabsContent value='night-mood'>
            <Card>
              <CardContent className='pt-4'>
                <h3 className='text-lg font-semibold mb-4 text-gray-800'>
                  Night Mood
                </h3>
                <div className='space-y-4'>
                  <div className='flex items-center space-x-4'>
                    <div>
                      <label htmlFor='fromTime' className='block text-sm font-medium text-gray-700 mb-1'>
                        From Time
                      </label>
                      <Input
                        id='fromTime'
                        type='time'
                        className='w-full'
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
                      />
                    </div>
                    <div>
                      <label htmlFor='active' className='block text-sm font-medium text-gray-700 mb-1'>
                        Active
                      </label>
                      <Select>
                        <SelectTrigger id='active' className='w-[120px]'>
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
