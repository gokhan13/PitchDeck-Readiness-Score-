
import React from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  id: string;
  maxLength?: number;
}

const TextArea: React.FC<TextAreaProps> = ({ label, id, maxLength, value, ...props }) => {
  const charCount = typeof value === 'string' ? value.length : 0;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        <label htmlFor={id} className="block text-sm font-medium text-brand-light-gray">
          {label}
        </label>
        {maxLength && (
          <span className={`text-sm ${charCount > maxLength ? 'text-brand-red' : 'text-brand-light-gray'}`}>
            {charCount}/{maxLength}
          </span>
        )}
      </div>
      <textarea
        id={id}
        rows={4}
        maxLength={maxLength}
        value={value}
        className="w-full p-3 bg-brand-gray border border-brand-light-gray rounded-md text-white focus:ring-2 focus:ring-brand-red focus:border-brand-red transition"
        {...props}
      />
    </div>
  );
};

export default TextArea;
