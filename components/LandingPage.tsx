import React from 'react';
import Button from './ui/Button';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="text-center py-10 sm:py-20">
      <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
        Pitch Deck'iniz Yatırıma Ne Kadar Hazır?
      </h2>
      <p className="max-w-3xl mx-auto text-lg sm:text-xl text-brand-light-gray mb-8">
        Bir yatırımcının gözünden objektif bir puan alın. Startup'ınızı 50'den fazla kritik veri noktasına göre analiz ederek ayrıntılı bir rapor ve eyleme geçirilebilir geri bildirimler sunuyoruz.
      </p>
      <Button onClick={onStart} variant="primary" className="text-xl px-10 py-4">
        Ücretsiz Analize Başla
      </Button>
      <div className="mt-10 text-brand-light-gray">
        <p>✓ 1.000'den fazla startup tarafından güveniliyor ✓ Ücretsiz, anında ve gizli</p>
      </div>
    </div>
  );
};

export default LandingPage;