'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Post } from '../lib/types'
import apiClient from '../lib/apiClient'

export function usePosts() {
    return useQuery<Post[]>({
        queryKey: ['posts'],
        queryFn: async () => {
            const res = await apiClient.get('/posts')
            return res.data
        },
    })
}

export function usePost(postId: number) {
    return useQuery<Post>({
        queryKey: ['post', postId],
        queryFn: async () => {
            const res = await apiClient.get(`/posts/${postId}`)
            return res.data
        },
        enabled: !!postId,
    })
}

export function useCreatePost() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (newPost: Partial<Post>) => apiClient.post('/posts', newPost),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts'] }),
    })
}

export function useUpdatePost() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: Partial<Post> }) =>
            apiClient.put(`/posts/${id}`, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts'] }),
    })
}


export function useDeletePost() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (postId: number) => apiClient.delete(`/posts/${postId}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] })
        },
    })
}
