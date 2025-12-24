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
  onSuccess: (data: any) => void;
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

export default function CampaignForm({ onSuccess }: CampaignFormProps) {
  const [step, setStep] = useState(1);
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

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

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
    try {
      onSuccess(formData);
    } catch (error) {
      console.error("Error submitting form:", error);
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

        {step < 5 ? (
          <Button
            type="button"
            onClick={nextStep}
            className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-3xl"
          >
            Next
          </Button>
        ) : (
          <Button type="submit">Create Campaign</Button>
        )}
      </div>
    </form>
  );
}
