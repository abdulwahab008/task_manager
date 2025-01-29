import React from 'react';

const Input = ({ type = 'text', value, onChange, placeholder = '', className = '', ...props }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`
        w-full
        px-4 py-3
        bg-white/80 
        border border-gray-200
        rounded-xl
        shadow-sm
        transition-all duration-300
        placeholder:text-gray-400
        focus:outline-none 
        focus:ring-2 
        focus:ring-indigo-500/20
        focus:border-indigo-500 
        hover:border-gray-300
        disabled:opacity-50 
        disabled:cursor-not-allowed
        ${className}
      `}
      {...props}
    />
  );
};

export default Input;
