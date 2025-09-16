import React from 'react';

const LoadingIndicator: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 bg-brand-gray rounded-lg">
      <div className="w-16 h-16 border-4 border-brand-red border-t-transparent border-solid rounded-full animate-spin"></div>
      <h2 className="text-2xl font-bold text-white mt-6">Yapay Zeka Analizi Yapılıyor...</h2>
      <p className="text-brand-light-gray mt-2">
        Pitch deck'iniz bir yatırımcı gözüyle inceleniyor. <br />
        Bu işlem genellikle 10-15 saniye sürer, lütfen bekleyin.
      </p>
    </div>
  );
};

export default LoadingIndicator;
