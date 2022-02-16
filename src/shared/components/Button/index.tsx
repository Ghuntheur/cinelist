import { ReactNode, MouseEventHandler } from 'react'

import './button.style.scss'

interface ButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>
  children: ReactNode
  className: string
}

export default function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button className={`button ${className}`.trim()} {...rest}>
      {children}
    </button>
  )
}
