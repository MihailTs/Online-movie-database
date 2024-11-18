import { useEffect } from 'react';

export function useAsync<T>(
  loader: () => Promise<T>,
  callback: (arg: T) => void,
  dependencies: any[] = []
) {
  useEffect(() => {
    let isCanceled = false;
    loader().then((data) => {
      if (!isCanceled) {
        callback(data);
      }
    });

    return () => {
      isCanceled = true;
    };
  }, dependencies);
}
