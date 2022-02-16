import { ReactNode, MouseEventHandler } from 'react'

import './button.style.scss'

interface ButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>
  children: ReactNode
  className?: string
  active?: boolean
  disabled?: boolean
}

export default function Button({
  children,
  className,
  active,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`button ${className} ${active ? 'active' : ''}`.trim()}
      {...rest}
    >
      {children}
    </button>
  )
}
