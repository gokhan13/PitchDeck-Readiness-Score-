import React, { useState } from 'react';
import { Step, FormData, AnalysisResult } from './types';
import { INITIAL_FORM_DATA, STEPS } from './constants';
import { calculateScore } from './services/scoringService';

import LandingPage from './components/LandingPage';
import MultiStepForm from './components/MultiStepForm';
import LoadingIndicator from './components/LoadingIndicator';
import ReportPage from './components/ReportPage';
import Card from './components/ui/Card';

function App() {
  const [currentStep, setCurrentStep] = useState<Step>(Step.Landing);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    const currentStepIndex = STEPS.findIndex(step => step.id === currentStep);
    if (currentStepIndex !== -1 && currentStepIndex < STEPS.length - 1) {
      setCurrentStep(STEPS[currentStepIndex + 1].id);
    }
  };

  const handleBack = () => {
    const currentStepIndex = STEPS.findIndex(step => step.id === currentStep);
    if (currentStepIndex > 0) {
      setCurrentStep(STEPS[currentStepIndex - 1].id);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Dynamically import the service only when it's needed
      const { getAIAnalysis } = await import('./services/geminiService');
      const baseResult = calculateScore(formData);
      
      const aiAnalysis = await getAIAnalysis(formData);
      
      const finalResult: AnalysisResult = {
        ...baseResult,
        strengths: aiAnalysis.strengths,
        improvements: aiAnalysis.improvements,
      };

      setAnalysisResult(finalResult);
      setCurrentStep(Step.Report);
    } catch (e: any) {
      const errorMessage = e.message || 'Yapay zeka analizi sırasında beklenmedik bir hata oluştu.';
      setError(errorMessage);
      // Even if AI fails, show report with base score
      const baseResult = calculateScore(formData);
      setAnalysisResult(baseResult);
      setCurrentStep(Step.Report);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStart = () => {
    setCurrentStep(Step.BasicInfo);
  };

  const handleRestart = () => {
    setCurrentStep(Step.Landing);
    setFormData(INITIAL_FORM_DATA);
    setAnalysisResult(null);
    setError(null);
    setIsLoading(false);
  };

  const renderContent = () => {
    if (isLoading) {
      return <LoadingIndicator />;
    }

    if (currentStep === Step.Report && analysisResult) {
      return <ReportPage result={analysisResult} onRestart={handleRestart} error={error} />;
    }

    switch (currentStep) {
      case Step.Landing:
        return <LandingPage onStart={handleStart} />;
      // All form steps are handled by MultiStepForm
      case Step.BasicInfo:
      case Step.ProblemSolution:
      case Step.MarketBusinessModel:
      case Step.TractionMetrics:
      case Step.TeamAndFunding:
        return (
          <MultiStepForm
            currentStep={currentStep}
            formData={formData}
            onFormChange={handleFormChange}
            onNext={handleNext}
            onBack={handleBack}
            onSubmit={handleSubmit}
          />
        );
      default:
        // Fallback for any unexpected state
        return (
            <Card>
                <h2 className="text-xl font-bold">Bir hata oluştu</h2>
                <p>Uygulama beklenmedik bir duruma girdi. Lütfen baştan başlamak için sayfayı yenileyin.</p>
            </Card>
        );
    }
  };

  return (
    <div className="bg-brand-dark min-h-screen text-white font-sans">
        <header className="py-6">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-brand-red">ABOA</h1>
                <p className="text-brand-light-gray">Startup Yatırım Hazırlık Analizörü</p>
            </div>
        </header>
        <main className="container mx-auto px-4 pb-12">
            {renderContent()}
        </main>
        <footer className="py-4 mt-8 text-center text-brand-light-gray/50 text-sm border-t border-brand-gray">
            <p>&copy; {new Date().getFullYear()} ABOA. Tüm hakları saklıdır.</p>
        </footer>
    </div>
  );
}

export default App;