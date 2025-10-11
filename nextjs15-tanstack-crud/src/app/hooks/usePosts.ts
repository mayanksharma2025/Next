'use client'

import {
    useQuery,
    useMutation,
    useQueryClient,
    UseQueryResult,
} from '@tanstack/react-query'
import { Post, PaginatedResponse } from '../lib/types'
import apiClient from '../lib/apiClient'

interface FetchPostsOptions {
    page?: number
    limit?: number
    sortBy?: keyof Post
    order?: 'asc' | 'desc'
}


export function usePosts({
    page = 1,
    limit = 5,
    sortBy = 'createdAt',
    order = 'desc',
}: FetchPostsOptions): UseQueryResult<PaginatedResponse<Post>, Error> {
    return useQuery<PaginatedResponse<Post>, Error>({
        queryKey: ['posts', page, limit, sortBy, order],
        queryFn: async () => {
            const res = await apiClient.get<PaginatedResponse<Post>>('/posts', {
                params: { _page: page, _limit: limit, _sort: sortBy, _order: order },
            })
            return res.data // { data: Post[], total: number }
        },
        // keepPreviousData: true, // optional: preserves old data during pagination
    })
}

// export function usePosts({
//     page = 1,
//     limit = 5,
//     sortBy = 'createdAt',
//     order = 'desc',
// }) {
//     return useQuery({
//         queryKey: ['posts', page, limit, sortBy, order],
//         queryFn: async () => {
//             const res = await apiClient.get('/posts', {
//                 params: { _page: page, _limit: limit, _sort: sortBy, _order: order },
//             })
//             return res.data // { data, total }
//         },
//     })
// }

// export function usePosts() {
//     return useQuery<Post[]>({
//         queryKey: ['posts'],
//         queryFn: async () => {
//             const res = await apiClient.get('/posts')
//             return res.data
//         },
//     })
// }

export function usePost(postId: number | string) {
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
        mutationFn: (newPost: Partial<Post>) => apiClient.post('/posts', { ...newPost, id: newPost.id?.toString() }),
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
