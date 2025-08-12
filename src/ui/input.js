import React from 'react';

export const Input = ({ 
  type = 'text',
  size = 'md',
  variant = 'default',
  className = '',
  disabled = false,
  error = false,
  ...props 
}) => {
  const baseStyles = 'w-full rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    default: 'border-gray-300 focus:border-blue-500 focus:ring-blue-500',
    filled: 'bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-500 focus:ring-blue-500'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-3 text-base'
  };
  
  const errorStyles = error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : '';
  const disabledStyles = disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : '';
  
  return (
    <input
      type={type}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${errorStyles} ${disabledStyles} ${className}`}
      disabled={disabled}
      {...props}
    />
  );
};

export const Label = ({ children, htmlFor, className = '', ...props }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-sm font-medium text-gray-700 mb-1 ${className}`}
      {...props}
    >
      {children}
    </label>
  );
};

export const FormGroup = ({ children, className = '', ...props }) => {
  return (
    <div className={`space-y-1 ${className}`} {...props}>
      {children}
    </div>
  );
};