import React from 'react';
import { FormData } from '../../types';
import Input from '../ui/Input';

interface Step4Props {
  data: FormData;
  onFormChange: (field: keyof FormData, value: any) => void;
}

const Step4_TractionMetrics: React.FC<Step4Props> = ({ data, onFormChange }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-white">4. Traction ve Metrikler</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Input
          label="Aylık Yinelenen Gelir (MRR) - isteğe bağlı"
          id="mrr"
          type="number"
          placeholder="0"
          value={data.mrr ?? ''}
          onChange={(e) => onFormChange('mrr', e.target.value ? parseInt(e.target.value) : null)}
        />
        <Input
          label="Toplam Müşteri Sayısı"
          id="customerCount"
          type="number"
          value={data.customerCount}
          onChange={(e) => onFormChange('customerCount', parseInt(e.target.value) || 0)}
        />
        <Input
          label="Büyüme Oranı (son 3 ay, %)"
          id="growthRate"
          type="number"
          value={data.growthRate}
          onChange={(e) => onFormChange('growthRate', parseInt(e.target.value) || 0)}
        />
        <Input
          label="Müşteri Edinme Maliyeti (CAC) - isteğe bağlı"
          id="cac"
          type="number"
          placeholder="0"
          value={data.cac ?? ''}
          onChange={(e) => onFormChange('cac', e.target.value ? parseInt(e.target.value) : null)}
        />
        <Input
          label="Yaşam Boyu Değeri (LTV) - isteğe bağlı"
          id="ltv"
          type="number"
          placeholder="0"
          value={data.ltv ?? ''}
          onChange={(e) => onFormChange('ltv', e.target.value ? parseInt(e.target.value) : null)}
        />
      </div>
    </div>
  );
};

export default Step4_TractionMetrics;