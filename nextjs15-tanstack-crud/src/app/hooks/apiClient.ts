'use client'
import { useEffect, useState } from 'react'
import { ApiResponse } from '../types/api'

export async function apiFetch<T>(url: string): Promise<ApiResponse<T>> {
    try {
        const res = await fetch(url)
        const data = await res.json()
        return {
            data,
            status: res.status,
        }
    } catch (err) {
        return {
            data: {} as T,
            status: 500,
            error: (err as any).message,
        }
    }
}

export function useFetch<T>(url: string) {
    const [response, setResponse] = useState<ApiResponse<T>>({ data: {} as T, status: 0 })

    useEffect(() => {
        fetch(url)
            .then((res) => res.json().then((data) => ({ data, status: res.status })))
            .then((json) => {
                console.log(json, "json----")
                if (json.status != 200) {
                    setResponse({ data: {} as T, status: json.status, error: "Resources Not found" })
                } else {

                    setResponse(json)
                }
            })
            .catch((err) => {
                setResponse({ data: {} as T, status: 500, error: err.message })
            }
            );
    }, [url]);


    return response
}
