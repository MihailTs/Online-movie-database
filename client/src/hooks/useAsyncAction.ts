import { useCallback, useEffect, useRef, useState } from 'react';

export function useAsyncAction<Params extends any[], Result>(
  action: (...args: Params) => Promise<Result>
) {
  const [data, setData] = useState<Result>();
  const [error, setError] = useState<unknown>();
  const [loading, setLoading] = useState(false);

  const actionRef = useRef(action);
  actionRef.current = action;

  const requestId = useRef(0);

  const perform = useCallback(async (...args: Params) => {
    requestId.current += 1;
    const myRequestId = requestId.current;

    setLoading(true);

    try {
      const result = await actionRef.current(...args);

      if (myRequestId === requestId.current) {
        setData(result);
        setError(undefined);
      }

      return result;
    } catch (error) {
      if (myRequestId === requestId.current) {
        setError(error);
        setData(undefined);
      }

      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const trigger = useCallback(
    async (...args: Params) =>
      perform(...args).catch(() => {
        // intentionally swallowed. Error is saved in the state
      }),
    []
  );

  useEffect(() => {
    return () => {
      requestId.current += 1;
    };
  }, []);

  return { perform, trigger, data, error, loading };
}
