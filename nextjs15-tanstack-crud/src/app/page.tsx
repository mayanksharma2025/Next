'use client'
// interface

interface User {
  id?: number
  name: string
  email: string
}

interface Product {
  id: number
  title: string
  price: number
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div>
      <h2>{product.title}</h2>
      <p>{product.price}</p>
    </div>
  )
}

const UserCard: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <ProductCard product={{ id: 1, title: 'Demo 1', price: 300 }} />
    </div>
  )
}

const User = () => {
  return (
    <UserCard
      user={{ name: 'Mayank Sharma', email: 'mayankee155@gmail.com' }}
    />
  )
}
export default User
