/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import PersonalProfile from "./personal-profile";
import FinancialProfile from "./financial-profile";
import InvestmentProfile from "./investment-profile";
import Goals from "./goals";
import AssetAnalysis from "./asset-analysis";
import Ikigai from "./ikigai";
import SavartOne from "./savart-one";
import SubmitScreen from "./submit-screen";

const steps = [
  "Personal Profile",
  "Financial Profile",
  "Investment Profile",
  "Goals",
  "Asset Analysis",
  "IKIGAI",
  "Savart One",
] as const;

type Step = (typeof steps)[number];

type FormData = {
  personalprofile?: any;
  financialprofile?: any;
  investmentprofile?: any;
  goals?: any;
  assetanalysis?: any;
  ikigai?: any;
  savartone?: any;
};

export default function Home() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [formData, setFormData] = useState<FormData>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleNext = async (data: unknown) => {
    const updatedFormData = {
      ...formData,
      [steps[currentStep].toLowerCase().replace(" ", "")]: data,
    };
    setFormData(updatedFormData);

    if (currentStep === steps.length - 1) {
      setIsLoading(true);
      try {
        const response = await fetch("/api/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedFormData),
        });

        if (!response.ok) {
          throw new Error("Failed to submit form data");
        }

        setIsSubmitted(true);
      } catch (error) {
        console.error("Error submitting form data:", error);
        // Handle error (e.g., show error message to user)
      } finally {
        setIsLoading(false);
      }
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const renderStep = () => {
    const currentStepKey = steps[currentStep]
      .toLowerCase()
      .replace(" ", "") as keyof FormData;
    const commonProps = {
      onSubmit: handleNext,
      onPrevious: handlePrevious,
      isLoading: isLoading,
      initialData: formData[currentStepKey],
      isRequired: true,
    };

    switch (currentStep) {
      case 0:
        return <PersonalProfile {...commonProps} />;
      case 1:
        return <FinancialProfile {...commonProps} />;
      case 2:
        return <InvestmentProfile {...commonProps} />;
      case 3:
        return <Goals {...commonProps} />;
      case 4:
        return <AssetAnalysis {...commonProps} />;
      case 5:
        return <Ikigai {...commonProps} />;
      case 6:
        return <SavartOne {...commonProps} />;
      default:
        return null;
    }
  };

  if (isSubmitted) {
    return <SubmitScreen formData={formData} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Savart EFG Analysis Form
          </h1>
        </div>
      </header>
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white shadow-xl rounded-lg w-full max-w-4xl p-8">
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">{steps[currentStep]}</h2>
            <div className="flex justify-between mb-2">
              {steps.map((step, index) => (
                <div
                  key={step}
                  className={`w-full h-2 ${
                    index <= currentStep ? "bg-blue-500" : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="min-h-[60vh] flex items-center justify-center">
            {renderStep()}
          </div>
        </div>
      </main>
    </div>
  );
}
