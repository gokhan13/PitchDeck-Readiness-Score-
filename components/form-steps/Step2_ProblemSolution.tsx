import React from 'react';
import { FormData } from '../../types';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';

interface Step2Props {
  data: FormData;
  onFormChange: (field: keyof FormData, value: any) => void;
}

const Step2_ProblemSolution: React.FC<Step2Props> = ({ data, onFormChange }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-white">2. Problem ve Çözüm</h3>
      <TextArea
        label="Çözdüğünüz spesifik problem nedir?"
        id="problem"
        maxLength={200}
        value={data.problem}
        onChange={(e) => onFormChange('problem', e.target.value)}
      />
      <TextArea
        label="Ürününüz/hizmetiniz bu problemi nasıl çözüyor?"
        id="solution"
        maxLength={200}
        value={data.solution}
        onChange={(e) => onFormChange('solution', e.target.value)}
      />
      <Input
        label="Benzersiz Değer Teklifiniz (tek cümlede) nedir?"
        id="uvp"
        type="text"
        value={data.uvp}
        onChange={(e) => onFormChange('uvp', e.target.value)}
      />
      <Input
        label="En önemli 3 rakibiniz kimler? (virgülle ayırın)"
        id="competitors"
        type="text"
        value={data.competitors}
        onChange={(e) => onFormChange('competitors', e.target.value)}
      />
    </div>
  );
};

export default Step2_ProblemSolution;