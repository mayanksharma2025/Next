import { cookies } from 'next/headers'
import { serverSideFunction } from '@/utils/server-utils'

export default function AboutPage() {
  const cookieStore = cookies()
  const theme = cookieStore.get('theme')
  console.log(theme)
  const result = serverSideFunction()
  return (
    <>
      <h1>About page {new Date().toLocaleTimeString()}</h1>
      <p>{result}</p>
    </>
  )
}

// 'use client'

// import { serverSideFunction } from '../../utils/server-utils'
// import { useEffect, useState } from 'react'

// export default function AboutPage() {
//   const [result, setResult] = useState<string | null>(null)

//   const [time, setTime] = useState('')

//   useEffect(() => {
//     ;(function () {
//       // Run only in browser — avoids hydration mismatch
//       setTime(new Date().toLocaleTimeString())
//       setResult(serverSideFunction())
//     })()
//   }, [])

//   const onSubmit = async () => {
//     const results = await serverSideFunction()
//     setResult(results)
//   }
//   return (
//     <div className="container">
//       <div className="grid md:grid-cols-6 h-full">
//         <div className="min-h-[40rem]">
//           <h1 onClick={onSubmit}>About page {time}</h1>
//           <div>{result}</div>
//         </div>
//       </div>
//     </div>
//   )
// }
