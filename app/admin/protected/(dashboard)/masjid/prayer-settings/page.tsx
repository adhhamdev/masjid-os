import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
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
        <Tabs defaultValue='web' className='w-full'>
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
                    htmlFor='title01'>
                    HISTORY 01
                  </label>
                  <Input
                    id='title01'
                    placeholder='History of Masjid: EST.1992'
                    className='focus-visible:ring-gray-500'
                  />
                </div>
                <div>
                  <label
                    className='block text-sm font-medium mb-1 text-gray-700'
                    htmlFor='desc1'>
                    Description
                  </label>
                  <Textarea
                    id='desc1'
                    placeholder='Enter description here'
                    rows={4}
                    className='focus-visible:ring-gray-500'
                  />
                </div>
                <div>
                  <label
                    className='block text-sm font-medium mb-1 text-gray-700'
                    htmlFor='title02'>
                    HISTORY 02
                  </label>
                  <Input
                    id='title02'
                    placeholder="About Mahallah Peoples' status of education and economy"
                    className='focus-visible:ring-gray-500'
                  />
                </div>
                <div>
                  <label
                    className='block text-sm font-medium mb-1 text-gray-700'
                    htmlFor='desc02'>
                    Description
                  </label>
                  <Textarea
                    id='desc02'
                    placeholder='Enter description here'
                    rows={4}
                    className='focus-visible:ring-gray-500'
                  />
                </div>
                <div>
                  <label
                    className='block text-sm font-medium mb-1 text-gray-700'
                    htmlFor='title03'>
                    HISTORY 03
                  </label>
                  <Input
                    id='title03'
                    placeholder="About Mahallah Peoples' status of education and economy"
                    className='focus-visible:ring-gray-500'
                  />
                </div>
                <div>
                  <label
                    className='block text-sm font-medium mb-1 text-gray-700'
                    htmlFor='desc03'>
                    Description
                  </label>
                  <Textarea
                    id='desc03'
                    placeholder='Enter description here'
                    rows={4}
                    className='focus-visible:ring-gray-500'
                  />
                </div>
                <div>
                  <label
                    className='block text-sm font-medium mb-1 text-gray-700'
                    htmlFor='title04'>
                    HISTORY 04
                  </label>
                  <Input
                    id='title04'
                    placeholder="About Mahallah Peoples' status of education and economy"
                    className='focus-visible:ring-gray-500'
                  />
                </div>
                <div>
                  <label
                    className='block text-sm font-medium mb-1 text-gray-700'
                    htmlFor='desc04'>
                    Description
                  </label>
                  <Textarea
                    id='desc04'
                    placeholder='Enter description here'
                    rows={4}
                    className='focus-visible:ring-gray-500'
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value='iqamath-time'>
            <Card>
              <CardContent className='pt-4'>
                <h3 className='text-lg font-semibold mb-4 text-gray-800'>
                  CONTACT DETAILS
                </h3>
                <div className='space-y-4'>
                  <div>
                    <label
                      className='block text-sm font-medium mb-1 text-gray-700'
                      htmlFor='masjidName'>
                      MASJID NAME
                    </label>
                    <Input
                      id='masjidName'
                      placeholder='YASEER ARAFATH JUMMAH MASJID'
                      className='focus-visible:ring-gray-500'
                    />
                  </div>
                  <div>
                    <label
                      className='block text-sm font-medium mb-1 text-gray-700'
                      htmlFor='address'>
                      ADDRESS
                    </label>
                    <Textarea
                      id='address'
                      placeholder='191/02, Yaseer Arafath Road, Maradhana, Beruwela'
                      rows={2}
                      className='focus-visible:ring-gray-500'
                    />
                  </div>
                  <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
                    <div>
                      <label
                        className='block text-sm font-medium mb-1 text-gray-700'
                        htmlFor='code'>
                        CODE
                      </label>
                      <Select>
                        <SelectTrigger className='border-gray-300 focus:border-gray-500'>
                          <SelectValue placeholder='Select code' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='sri-lanka'>
                            Sri Lanka (+94)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label
                        className='block text-sm font-medium mb-1 text-gray-700'
                        htmlFor='telephone'>
                        TELEPHONE NO
                      </label>
                      <Input
                        id='telephone'
                        placeholder='779925059'
                        className='border-gray-300 focus:border-gray-500'
                      />
                    </div>
                    <div>
                      <label
                        className='block text-sm font-medium mb-1 text-gray-700'
                        htmlFor='fax'>
                        FAX NO
                      </label>
                      <Input
                        id='fax'
                        placeholder='777281718'
                        className='border-gray-300 focus:border-gray-500'
                      />
                    </div>
                    <div>
                      <label
                        className='block text-sm font-medium mb-1 text-gray-700'
                        htmlFor='email'>
                        EMAIL
                      </label>
                      <Input
                        id='email'
                        type='email'
                        placeholder='yaseerarafathjummahmasjidh@gmail.com'
                        className='border-gray-300 focus:border-gray-500'
                      />
                    </div>
                  </div>
                  <div>
                    <label className='block text-sm font-medium mb-1 text-gray-700'>
                      SOCIAL MEDIA LINKS
                    </label>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                      <Input
                        placeholder='www.abc.com/xyz masjid'
                        className='border-gray-300 focus:border-gray-500'
                      />
                      <Input
                        placeholder='www.abc.com/xyz masjid'
                        className='border-gray-300 focus:border-gray-500'
                      />
                      <Input
                        placeholder='www.abc.com/xyz masjid'
                        className='border-gray-300 focus:border-gray-500'
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value='theme'>
            <Card>
              <CardContent className='pt-4'>
                <h3 className='text-lg font-semibold mb-4 text-gray-800'>
                  Prayer Settings
                </h3>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <label
                      className='block text-sm font-medium mb-1 text-gray-700'
                      htmlFor='location'>
                      LOCATION
                    </label>
                    <Select>
                      <SelectTrigger className='border-gray-300 focus:border-gray-500'>
                        <SelectValue placeholder='Select location' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='colombo'>Colombo</SelectItem>
                        <SelectItem value='galle'>Galle</SelectItem>
                        <SelectItem value='kandy'>Kandy</SelectItem>
                        <SelectItem value='jaffna'>Jaffna</SelectItem>
                        <SelectItem value='batticaloa'>Batticaloa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label
                      className='block text-sm font-medium mb-1 text-gray-700'
                      htmlFor='juristic'>
                      JURISTIC
                    </label>
                    <Select>
                      <SelectTrigger className='border-gray-300 focus:border-gray-500'>
                        <SelectValue placeholder='Select juristic' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='shafi-hanbli-maliki'>
                          Shafi, Hanbli, Maliki
                        </SelectItem>
                        <SelectItem value='hanafi'>Hanafi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value='night-mood'>
            <Card>
              <CardContent className='pt-4'>
                <h3 className='text-lg font-semibold mb-4 text-gray-800'>
                  Night Mood
                </h3>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
