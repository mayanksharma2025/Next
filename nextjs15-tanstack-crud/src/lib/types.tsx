export interface Education {
  school: string
  degree: string
  year: number
}

export interface Experience {
  company: string
  role: string
  from: number
  to: number
}

export interface User {
  id: number
  name: string
  email: string
  age: number
  phone: string
  photos: string[]
  educations: Education[]
  experiences: Experience[]
}

export interface Post {
  id: number
  userId: number
  title: string
  description: string
  images: string[]
  createdAt: string
}
