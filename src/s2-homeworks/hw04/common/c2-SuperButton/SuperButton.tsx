import React, { ButtonHTMLAttributes, DetailedHTMLProps, useState } from 'react'
import s from './SuperButton.module.css'

type DefaultButtonPropsType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

type SuperButtonPropsType = DefaultButtonPropsType & {
  xType?: string
}

const SuperButton: React.FC<SuperButtonPropsType> = ({
  xType,
  className,
  disabled,
  children,
  ...restProps
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isActive, setIsActive] = useState(false)

  const typeClass = disabled
    ? s.disabled
    : xType === 'red'
    ? s.red
    : xType === 'secondary'
    ? s.secondary
    : s.default

  const finalClassName =
    s.button + ' ' + typeClass + (className ? ' ' + className : '')

  return (
    <button
      className={finalClassName}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setIsActive(false)
      }}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      {...restProps}
    >
      {isActive ? 'При нажатии' : isHovered ? 'При наведении' : children}
    </button>
  )
}

export default SuperButton
