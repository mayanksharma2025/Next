'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { User } from '../lib/types'
import apiClient from '../lib/apiClient'

export function useUsers() {
    return useQuery<User[]>({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await apiClient.get('/users')
            return res.data
        },
    })
}

export function useUser(userId: number) {
    return useQuery<User>({
        queryKey: ['user', userId],
        queryFn: async () => {
            const res = await apiClient.get(`/users/${userId}`)
            return res.data
        },
        enabled: !!userId,
    })
}

export function useCreateUser() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (newUser: Partial<User>) => apiClient.post('/users', newUser),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
    })
}

export function useUpdateUser() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: Partial<User> }) =>
            apiClient.put(`/users/${id}`, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
    })
}
