import { forwardRef } from 'react'

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <input
        ref={ref}
        {...props}
        className={`w-full rounded-md border border-gray-300 px-3 py-2 text-sm
        focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      />
    )
  }
)

Input.displayName = 'Input'
