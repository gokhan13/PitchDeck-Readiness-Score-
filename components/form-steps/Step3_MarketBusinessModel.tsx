import React from 'react';
import { FormData, BusinessModel, PricingStrategy } from '../../types';
import { BUSINESS_MODELS, PRICING_STRATEGIES } from '../../constants';
import Input from '../ui/Input';
import Select from '../ui/Select';

interface Step3Props {
  data: FormData;
  onFormChange: (field: keyof FormData, value: any) => void;
}

const Step3_MarketBusinessModel: React.FC<Step3Props> = ({ data, onFormChange }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-white">3. Pazar ve İş Modeli</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Toplam Adreslenebilir Pazar (TAM) - USD"
          id="tam"
          type="number"
          value={data.tam}
          onChange={(e) => onFormChange('tam', parseInt(e.target.value) || 0)}
        />
        <Input
          label="Hizmet Verilebilir Pazar (SAM) - USD"
          id="sam"
          type="number"
          value={data.sam}
          onChange={(e) => onFormChange('sam', parseInt(e.target.value) || 0)}
        />
        <Select
          label="İş Modeli"
          id="businessModel"
          options={BUSINESS_MODELS}
          value={data.businessModel}
          onChange={(e) => onFormChange('businessModel', e.target.value as BusinessModel)}
        />
        <Select
          label="Fiyatlandırma Stratejisi"
          id="pricingStrategy"
          options={PRICING_STRATEGIES}
          value={data.pricingStrategy}
          onChange={(e) => onFormChange('pricingStrategy', e.target.value as PricingStrategy)}
        />
      </div>
    </div>
  );
};

export default Step3_MarketBusinessModel;