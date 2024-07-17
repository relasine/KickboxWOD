import { useEffect, useState } from "react";

export const useStep = (routine) => {
  const [currentStep, setCurrentStep] = useState(null);

  useEffect(() => {
    if (routine) {
      setCurrentStep(0);
    }
  }, [routine]);

  const advance = () => {
    if (currentStep !== routine.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(null);
    }
  };

  return { currentStep, advance };
};
