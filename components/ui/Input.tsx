
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

const Input: React.FC<InputProps> = ({ label, id, ...props }) => {
  return (
    <div className="w-full">
      <label htmlFor={id} className="block text-sm font-medium text-brand-light-gray mb-1">
        {label}
      </label>
      <input
        id={id}
        className="w-full p-3 bg-brand-gray border border-brand-light-gray rounded-md text-white focus:ring-2 focus:ring-brand-red focus:border-brand-red transition"
        {...props}
      />
    </div>
  );
};

export default Input;
