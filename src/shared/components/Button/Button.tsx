import { ReactNode } from 'react'

interface ButtonProps {
  onClick: Function
  children: ReactNode
}

export default function Button(props: ButtonProps) {
  return <button>{props.children}</button>
}
