'use client'
import React from 'react'
import UserList from './components/UserList'
import PostList from './components/PostList'
import TodoList from './components/TodoList'

const HomePage = () => (
  <main className="p-6 space-y-6">
    <h1 className="text-2xl font-bold">🚀 JSONPlaceholder Dashboard</h1>
    <UserList />
    <PostList />
    <TodoList />
  </main>
)

export default HomePage
