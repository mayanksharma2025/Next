'use client'
import { useEffect, useState } from "react";

interface UseFetchState<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

export function useFetch<T>(url: string): UseFetchState<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        fetch(url)
            .then((res) => res.json())
            .then((json) => setData(json))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [url]);

    return { data, loading, error };
}
