'use client'
import React from 'react'
import UserList from './components2/UserList2'
import PostList from './components/PostList'
import TodoList from './components/TodoList'
import ActiveInactiveUserList from './components/ActiveInactiveUserList'
import UserDetails from './components2/UserDetails'
import CommentsList from './components/CommentsList'

const HomePage = () => (
  <main className="p-6 space-y-6">
    <h1 className="text-2xl font-bold">🚀 JSONPlaceholder Dashboard</h1>
    <CommentsList id={1} name="mayank sharma" value={2025} />
    <ActiveInactiveUserList />
    <UserList />
    <PostList />
    <TodoList />

    <UserDetails id={2} />
  </main>
)

export default HomePage
