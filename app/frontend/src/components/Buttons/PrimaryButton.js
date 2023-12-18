import React from 'react'

function PrimaryButton({ onClick, children, disabled = false, ...rest }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        bg-pretty-green 
        px-4 py-4 
        text-black 
        no-underline 
        border-0 
        ${
          disabled
            ? 'cursor-not-allowed opacity-50 bg-grey-light'
            : 'hover:bg-light-green active:bg-dark-green'
        } 
        ${rest.className}
    `}
    >
      {children}
    </button>
  )
}

export default PrimaryButton
