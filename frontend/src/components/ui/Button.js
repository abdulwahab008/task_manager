import React from 'react';

const Button = ({ children, onClick, type = 'button', variant = 'primary', size = 'md', className = '', ...props }) => {
  const baseStyles = `
    px-4 py-2.5 rounded-xl font-medium
    transition-all duration-300 ease-in-out
    transform hover:-translate-y-0.5
    disabled:opacity-50 disabled:cursor-not-allowed
    disabled:hover:transform-none
  `;

  const variants = {
    primary: `
      bg-gradient-to-r from-indigo-600 to-violet-600
      hover:from-indigo-700 hover:to-violet-700
      text-white shadow-lg shadow-indigo-500/25
    `,
    secondary: `
      bg-white text-gray-700 border border-gray-200
      hover:bg-gray-50 hover:border-gray-300
      shadow-sm
    `,
    danger: `
      bg-gradient-to-r from-red-500 to-rose-600
      hover:from-red-600 hover:to-rose-700
      text-white shadow-lg shadow-red-500/25
    `,
    // Add the blue variant from TaskManager
    blue: `
      bg-gradient-to-r from-blue-500 to-indigo-500
      hover:from-blue-600 hover:to-indigo-600
      text-white shadow-lg shadow-blue-500/25
    `
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;