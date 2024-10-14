import { getTemperature } from '@/lib/utils';
import { useEffect, useState } from 'react';

export function useTemperature() {
  const [temperature, setTemperature] = useState<string>('');

  useEffect(() => {
    async function fetchTemperature() {
      const temp = await getTemperature();
      setTemperature(temp);
    }
    fetchTemperature();
  }, []);

  return temperature;
}
