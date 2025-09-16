
import React from 'react';
import { STEPS } from '../constants';

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = (current / total) * 100;

  return (
    <div>
        <div className="flex justify-between mb-2">
            {STEPS.map((step, index) => (
                <div key={step.id} className="text-center w-1/5">
                    <span className={`text-xs sm:text-sm ${index + 1 <= current ? 'text-white font-bold' : 'text-brand-light-gray'}`}>{step.title}</span>
                </div>
            ))}
        </div>
      <div className="w-full bg-brand-dark rounded-full h-2.5">
        <div
          className="bg-brand-red h-2.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
