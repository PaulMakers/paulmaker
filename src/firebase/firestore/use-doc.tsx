
'use client';

import { useEffect, useState } from 'react';
import { DocumentReference, onSnapshot } from 'firebase/firestore';

export function useDoc<T = any>(ref: DocumentReference | null | undefined) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!ref) {
      setIsLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(
      ref,
      (doc) => {
        setData(doc.exists() ? (doc.data() as T) : null);
        setIsLoading(false);
      },
      (err) => {
        setError(err);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [ref?.path]);

  return { data, isLoading, error };
}
