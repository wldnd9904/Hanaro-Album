import { useEffect, useState } from "react";

export function useFetch<T>(url: string) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<T>();
  const [error, setError] = useState<string>("");
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    (async () => {
      try {
        const res = await fetch(url, { signal });
        if (!res.ok) throw new Error(`error code ${res.status}`);
        const json = await res.json();
        setData(json as T);
        setError("");
      } catch (error) {
        if (error instanceof Error) setError(error.message);
      } finally {
        setIsLoading(false);
      }
    })();
    return () => controller.abort(); //강제중지
  }, [url]);

  return {
    data: data,
    error: error,
    isLoading: isLoading,
  };
}
