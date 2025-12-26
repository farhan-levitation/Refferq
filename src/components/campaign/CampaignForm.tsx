// src/components/campaign/CampaignForm.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import BasicsStep from "@/components/campaign/steps/BasicsStep";
import RewardsStep from "@/components/campaign/steps/RewardsStep";
import ConditionsStep from "@/components/campaign/steps/ConditionsStep";
import RulesStep from "@/components/campaign/steps/RulesStep";
import ReviewStep from "@/components/campaign/steps/ReviewStep";

interface CampaignFormProps {
  onSuccess: (data: FormData) => Promise<void> | void;
  initialData?: FormData | null;
}

export type FormData = {
  // Make sure all fields have proper types and default values
  campaignName: string;
  status: string;
  startDate: string;
  endDate: string;
  rewardRecipients: string;
  // Add other fields with proper types
  referrerRewardType?: string;
  referrerRewardValue?: number;
  referredRewardType?: string;
  referredRewardValue?: number;
  minOrderValue?: number;
  eligibleProducts?: string[];
  usageType?: string;
  rewardExpiryDays?: number;
  rewardIssuance?: string;
  rewardIssuanceDays?: number;
  returnPolicy?: string;
};

const stepNames = [
  "Campaign Basics",
  "Rewards",
  "Conditions",
  "Rules",
  "Review & Create",
];

export default function CampaignForm({ onSuccess }: CampaignFormProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    campaignName: "",
    status: "draft",
    startDate: "",
    endDate: "",
    rewardRecipients: "both",
    // Initialize all other fields with default values
    referrerRewardType: "fixed",
    referrerRewardValue: 0,
    referredRewardType: "fixed",
    referredRewardValue: 0,
    minOrderValue: 0,
    eligibleProducts: [],
    usageType: "one_time",
    rewardExpiryDays: 30,
    rewardIssuance: "after_completion",
    rewardIssuanceDays: 7,
    returnPolicy: "void",
  });

  const nextStep = () => {
    if (step <= 5) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;

    // Handle different input types
    if (type === "number") {
      setFormData((prev) => ({
        ...prev,
        [name]: value === "" ? "" : Number(value),
      }));
    } else if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSuccess(formData);
      // The redirection will be handled by the parent component
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    const commonProps = {
      formData,
      onChange: handleChange,
    };

    switch (step) {
      case 1:
        return <BasicsStep {...commonProps} />;
      case 2:
        return <RewardsStep {...commonProps} />;
      case 3:
        return <ConditionsStep {...commonProps} />;
      case 4:
        return <RulesStep {...commonProps} />;
      case 5:
        return <ReviewStep formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Left Sidebar */}
      <div className="w-full md:w-64 flex-shrink-0">
        <div className="space-y-6">
          {stepNames.map((name, index) => (
            <div
              key={index}
              className={`flex items-start p-3 rounded-lg transition-colors ${
                step === index + 1
                  ? "bg-blue-50 border-l-4 border-teal-600"
                  : "hover:bg-gray-50"
              }`}
            >
              <div
                className={`flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full ${
                  step > index + 1
                    ? "bg-emerald-500 text-white"
                    : step === index + 1
                      ? "bg-teal-600 text-white"
                      : "bg-gray-200 text-gray-600"
                }`}
              >
                {index + 1}
              </div>
              <div
                className={`ml-3 ${
                  step > index + 1
                    ? "text-emerald-600"
                    : step === index + 1
                      ? "text-teal-600 font-medium"
                      : "text-gray-500"
                }`}
              >
                <div className="text-sm font-medium">{name}</div>
                {step === index + 1 && (
                  <div className="text-xs text-teal-500 mt-1">In progress</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <form onSubmit={handleSubmit} className="space-y-6">
          {renderStep()}

          <div className="flex justify-between mt-8">
            <Button
              type="button"
              onClick={prevStep}
              disabled={step === 1}
              variant="outline"
            >
              Previous
            </Button>

            {step < 4 ? (
              <Button
                type="button"
                onClick={nextStep}
                className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-3xl"
              >
                Next
              </Button>
            ) : step === 4 ? (
              <Button
                type="button"
                onClick={nextStep}
                className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-3xl"
              >
                Review & Create
              </Button>
            ) : (
              <div className="space-x-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-3xl"
                >
                  {isSubmitting ? "Creating..." : "Create Campaign"}
                </Button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
