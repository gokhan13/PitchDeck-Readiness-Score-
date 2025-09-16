import React from 'react';
import { FormData, Sector, Stage } from '../../types';
import { SECTORS, STAGES } from '../../constants';
import Input from '../ui/Input';
import Select from '../ui/Select';

interface Step1Props {
  data: FormData;
  onFormChange: (field: keyof FormData, value: any) => void;
}

const Step1_BasicInfo: React.FC<Step1Props> = ({ data, onFormChange }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-white">1. Temel Bilgiler</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input 
          label="Startup Adı"
          id="startupName"
          type="text"
          value={data.startupName}
          onChange={(e) => onFormChange('startupName', e.target.value)}
        />
        <Select
          label="Sektör"
          id="sector"
          options={SECTORS}
          value={data.sector}
          onChange={(e) => onFormChange('sector', e.target.value as Sector)}
        />
        <Select
          label="Mevcut Aşama"
          id="stage"
          options={STAGES}
          value={data.stage}
          onChange={(e) => onFormChange('stage', e.target.value as Stage)}
        />
        <Input
          label="Kuruluş Tarihi"
          id="foundingDate"
          type="month"
          value={data.foundingDate}
          onChange={(e) => onFormChange('foundingDate', e.target.value)}
        />
      </div>
    </div>
  );
};

export default Step1_BasicInfo;