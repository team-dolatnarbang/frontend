import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SeniorStep1Name from './SeniorStep1Name';
import SeniorStep2Phone from './SeniorStep2Phone';
import SeniorStep3Site from './SeniorStep3Site';
import SeniorStep4Consent from './SeniorStep4Consent';

type SeniorFormData = {
  name: string;
  phone: string;
  siteId: string;
  siteName: string;
};

const TOTAL_STEPS = 4;

export default function SeniorRegisterPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<SeniorFormData>({
    name: '',
    phone: '',
    siteId: '',
    siteName: '',
  });

  const next = (patch: Partial<SeniorFormData>) => {
    setFormData((prev) => ({ ...prev, ...patch }));
    setStep((s) => s + 1);
  };

  const back = () => setStep((s) => s - 1);

  const handleComplete = () => {
    navigate('/senior/record', {
      state: {
        contributorName: formData.name,
        siteId: formData.siteId,
        siteName: formData.siteName,
      },
    });
  };

  return (
    <>
      {step === 1 && (
        <SeniorStep1Name
          totalSteps={TOTAL_STEPS}
          currentStep={step}
          defaultValue={formData.name}
          onNext={(name) => next({ name })}
        />
      )}
      {step === 2 && (
        <SeniorStep2Phone
          totalSteps={TOTAL_STEPS}
          currentStep={step}
          defaultValue={formData.phone}
          onBack={back}
          onNext={(phone) => next({ phone })}
        />
      )}
      {step === 3 && (
        <SeniorStep3Site
          totalSteps={TOTAL_STEPS}
          currentStep={step}
          defaultValue={formData.siteId}
          onBack={back}
          onNext={(siteId, siteName) => next({ siteId, siteName })}
        />
      )}
      {step === 4 && (
        <SeniorStep4Consent
          totalSteps={TOTAL_STEPS}
          currentStep={step}
          onBack={back}
          onComplete={handleComplete}
        />
      )}
    </>
  );
}
