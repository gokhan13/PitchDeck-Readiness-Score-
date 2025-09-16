import React from 'react';
import { FormData } from '../../types';
import Input from '../ui/Input';

interface Step5Props {
  data: FormData;
  onFormChange: (field: keyof FormData, value: any) => void;
}

const Step5_TeamAndFunding: React.FC<Step5Props> = ({ data, onFormChange }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-white">5. Takım ve Yatırım</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Kurucu Sayısı"
          id="founderCount"
          type="number"
          value={data.founderCount}
          onChange={(e) => onFormChange('founderCount', parseInt(e.target.value) || 0)}
        />
        <Input
          label="Tam Zamanlı Çalışan Sayısı"
          id="fullTimeEmployees"
          type="number"
          value={data.fullTimeEmployees}
          onChange={(e) => onFormChange('fullTimeEmployees', parseInt(e.target.value) || 0)}
        />
         <div className="md:col-span-2">
            <label className="block text-sm font-medium text-brand-light-gray mb-2">
            Daha önce yatırım aldınız mı?
            </label>
            <div className="flex items-center space-x-4">
                <label className="flex items-center">
                    <input type="radio" name="hasPriorFunding" checked={data.hasPriorFunding} onChange={() => onFormChange('hasPriorFunding', true)} className="form-radio h-4 w-4 text-brand-red bg-brand-gray border-brand-light-gray focus:ring-brand-red"/>
                    <span className="ml-2 text-white">Evet</span>
                </label>
                <label className="flex items-center">
                    <input type="radio" name="hasPriorFunding" checked={!data.hasPriorFunding} onChange={() => onFormChange('hasPriorFunding', false)} className="form-radio h-4 w-4 text-brand-red bg-brand-gray border-brand-light-gray focus:ring-brand-red"/>
                    <span className="ml-2 text-white">Hayır</span>
                </label>
            </div>
        </div>
        <Input
          label="Ne kadar yatırım arıyorsunuz? (USD)"
          id="fundingAsk"
          type="number"
          value={data.fundingAsk}
          onChange={(e) => onFormChange('fundingAsk', parseInt(e.target.value) || 0)}
        />
        <Input
          label="E-postanız (raporu almak için)"
          id="email"
          type="email"
          value={data.email}
          onChange={(e) => onFormChange('email', e.target.value)}
        />
      </div>
    </div>
  );
};

export default Step5_TeamAndFunding;