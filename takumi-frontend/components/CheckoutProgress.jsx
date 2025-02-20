import React, { useEffect } from 'react';
import { Check } from 'lucide-react';
import { cn } from "@/lib/utils";

const CheckoutProgress = ({ currentStep = 1 }) => {
  const steps = [
    { id: 1, label: 'カート' },
    { id: 2, label: '注文確認' },
    { id: 3, label: '完了' }
  ];

  useEffect(() => {
    localStorage.setItem('checkoutStep', currentStep.toString());
  }, [currentStep]);

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6">
      <div className="relative">
        {/* Progress Bar Background */}
        <div className="absolute top-1/2 left-[20px] right-[20px] h-0.5 bg-muted -translate-y-1/2" />
        
        {/* Active Progress Bar */}
        <div 
          className="absolute top-1/2 left-[20px] h-0.5 bg-primary -translate-y-1/2 transition-all duration-700 ease-in-out"
          style={{ 
            width: `calc(${((currentStep - 1) / (steps.length - 1)) * 100}% - ${currentStep === 1 ? 20 : 0}px)`,
            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        />

        {/* Steps */}
        <div className="relative flex justify-between">
          {steps.map((step) => (
            <div 
              key={step.id}
              className="flex flex-col items-center"
            >
              <div 
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500",
                  "shadow-sm",
                  step.id === currentStep && "border-primary bg-primary text-primary-foreground scale-110",
                  step.id < currentStep && "border-green-500 bg-green-500 text-primary-foreground",
                  step.id > currentStep && "border-muted bg-background text-muted-foreground"
                )}
              >
                <div className={cn(
                  "transition-all duration-500",
                  step.id === currentStep && "scale-100",
                  step.id < currentStep && "scale-100",
                  step.id > currentStep && "scale-90"
                )}>
                  {step.id < currentStep ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-medium">{step.id}</span>
                  )}
                </div>
              </div>
              <span 
                className={cn(
                  "mt-2 text-sm font-medium transition-colors duration-300",
                  step.id === currentStep && "text-black",
                  step.id < currentStep && "text-green-500",
                  step.id > currentStep && "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CheckoutProgress;