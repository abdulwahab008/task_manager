import React from 'react';

export const Card = ({ children, className = '' }) => {
  return (
    <div 
      className={`
        bg-white/90 backdrop-blur-lg
        border border-gray-100
        rounded-2xl shadow-xl
        transition-all duration-500
        hover:shadow-2xl hover:shadow-indigo-500/10
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '' }) => {
  return (
    <div 
      className={`
        p-6 border-b border-gray-100
        first:rounded-t-2xl
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export const CardTitle = ({ children, className = '' }) => {
  return (
    <h2 
      className={`
        text-xl font-semibold text-gray-900
        ${className}
      `}
    >
      {children}
    </h2>
  );
};

export const CardContent = ({ children, className = '' }) => {
  return (
    <div 
      className={`
        p-6
        last:rounded-b-2xl
        ${className}
      `}
    >
      {children}
    </div>
  );
};
