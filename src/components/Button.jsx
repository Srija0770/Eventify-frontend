import React from 'react'

const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary', // bootstrap variants: primary, secondary, outline-primary, etc.
  size, // sm | lg
  disabled = false,
  className = '',
  ariaLabel,
}) => {
  const sizeClass = size ? `btn-${size}` : ''
  const classes = `btn btn-${variant} eventify-btn ${sizeClass} ${className}`.trim()

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}

export default Button
