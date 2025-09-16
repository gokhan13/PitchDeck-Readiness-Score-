import React from 'react';
import { FormData, Step } from '../types';
import { STEPS } from '../constants';

import ProgressBar from './ProgressBar';
import Step1_BasicInfo from './form-steps/Step1_BasicInfo';
import Step2_ProblemSolution from './form-steps/Step2_ProblemSolution';
import Step3_MarketBusinessModel from './form-steps/Step3_MarketBusinessModel';
import Step4_TractionMetrics from './form-steps/Step4_TractionMetrics';
import Step5_TeamAndFunding from './form-steps/Step5_TeamAndFunding';
import Button from './ui/Button';

interface MultiStepFormProps {
  currentStep: Step;
  formData: FormData;
  onFormChange: (field: keyof FormData, value: any) => void;
  onNext: () => void;
  onBack: () => void;
  onSubmit: () => void;
}

const MultiStepForm: React.FC<MultiStepFormProps> = ({ currentStep, formData, onFormChange, onNext, onBack, onSubmit }) => {
  const totalSteps = STEPS.length;
  const currentStepIndex = STEPS.findIndex(step => step.id === currentStep);

  const renderStep = () => {
    switch (currentStep) {
      case Step.BasicInfo:
        return <Step1_BasicInfo data={formData} onFormChange={onFormChange} />;
      case Step.ProblemSolution:
        return <Step2_ProblemSolution data={formData} onFormChange={onFormChange} />;
      case Step.MarketBusinessModel:
        return <Step3_MarketBusinessModel data={formData} onFormChange={onFormChange} />;
      case Step.TractionMetrics:
        return <Step4_TractionMetrics data={formData} onFormChange={onFormChange} />;
      case Step.TeamAndFunding:
        return <Step5_TeamAndFunding data={formData} onFormChange={onFormChange} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-brand-gray p-6 sm:p-8 rounded-lg shadow-2xl">
      <ProgressBar current={currentStepIndex + 1} total={totalSteps} />
      <div className="mt-8">
        {renderStep()}
      </div>
      <div className="mt-10 flex justify-between items-center">
        <Button onClick={onBack} variant="secondary" disabled={currentStep === Step.BasicInfo}>
          Geri
        </Button>
        {currentStep === Step.TeamAndFunding ? (
          <Button onClick={onSubmit} variant="primary">
            Skorumu Hesapla
          </Button>
        ) : (
          <Button onClick={onNext} variant="primary">
            İleri
          </Button>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;