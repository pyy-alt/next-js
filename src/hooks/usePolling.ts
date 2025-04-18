// Copyright (c) 2025 zdb
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function usePolling(searchParam: string | null, ms: number = 60000) {
  const router = useRouter();
  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log('interval running');
      if (!searchParam) {
        console.log('no search param refreshing data');
        router.refresh();
      }
    }, ms);
    return () => clearInterval(intervalId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParam, ms]);
}
