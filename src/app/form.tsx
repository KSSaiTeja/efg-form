"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PersonalProfile from "@/app/personal-profile";
import FinancialProfile from "@/app/financial-profile";
import InvestmentProfile from "@/app/investment-profile";
import Goals from "@/app/goals";
import AssetAnalysis from "@/app/asset-analysis";
import Ikigai from "@/app/ikigai";
import SavartOne from "@/app/savart-one";

type FormData = Record<string, unknown>;

interface FormSectionProps {
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
  initialData?: FormData;
}

interface FormSection {
  title: string;
  component: React.ComponentType<FormSectionProps>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function wrapComponent(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: React.ComponentType<any>,
): React.ComponentType<FormSectionProps> {
  // eslint-disable-next-line react/display-name
  return (props: FormSectionProps) => <Component {...props} />;
}

const formSections: FormSection[] = [
  {
    title: "Personal Profile + KYC",
    component: wrapComponent(PersonalProfile),
  },
  { title: "Financial Profile", component: wrapComponent(FinancialProfile) },
  { title: "Investment Profile", component: wrapComponent(InvestmentProfile) },
  { title: "Goals", component: wrapComponent(Goals) },
  { title: "Asset Analysis", component: wrapComponent(AssetAnalysis) },
  { title: "Ikigai", component: wrapComponent(Ikigai) },
  { title: "Savart One", component: wrapComponent(SavartOne) },
];

interface ToastProps {
  message: string;
  type: "success" | "error";
}

const Toast: React.FC<ToastProps> = ({ message, type }) => (
  <div
    className={`fixed bottom-4 right-4 p-4 rounded-md text-white ${
      type === "success" ? "bg-green-500" : "bg-red-500"
    }`}
  >
    {message}
  </div>
);

const MultiStepForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({});
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<ToastProps | null>(null);

  useEffect(() => {
    const savedData = localStorage.getItem("multiStepFormData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleNext = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, formSections.length - 1));
  }, []);

  const handlePrevious = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, []);

  const handleSubmit = useCallback(
    async (data: FormData) => {
      setIsLoading(true);
      try {
        const updatedFormData = { ...formData, ...data };
        setFormData(updatedFormData);
        localStorage.setItem(
          "multiStepFormData",
          JSON.stringify(updatedFormData),
        );
        handleNext();
        setToast({ message: "Section saved successfully", type: "success" });
      } catch (error) {
        console.error("Error saving section:", error);
        setToast({ message: "Error saving section", type: "error" });
      } finally {
        setIsLoading(false);
      }
    },
    [formData, handleNext],
  );

  const CurrentStepComponent = formSections[currentStep].component;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-100">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {formSections[currentStep].title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <CurrentStepComponent
                onSubmit={handleSubmit}
                isLoading={isLoading}
                initialData={formData}
              />
            </motion.div>
          </AnimatePresence>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            variant="outline"
          >
            Previous
          </Button>
          {currentStep === formSections.length - 1 ? (
            <Button onClick={() => console.log("Form submitted:", formData)}>
              Submit
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={currentStep === formSections.length - 1}
            >
              Next
            </Button>
          )}
        </CardFooter>
      </Card>
      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
};

export default MultiStepForm;
