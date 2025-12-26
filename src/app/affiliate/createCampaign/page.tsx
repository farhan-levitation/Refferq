// src/app/affiliate/createCampaign/page.tsx
"use client";
import { useRouter } from "next/navigation";
import CampaignForm from "@/components/campaign/CampaignForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CreateCampaign() {
  const router = useRouter();

  const handleSuccess = async (data: any) => {
    try {
      // Get existing campaigns from localStorage
      const savedCampaigns = localStorage.getItem("refferq_campaigns");
      const campaigns = savedCampaigns ? JSON.parse(savedCampaigns) : [];

      // Add new campaign with a unique ID
      const newCampaign = { ...data, id: Date.now().toString() };
      const updatedCampaigns = [...campaigns, newCampaign];

      // Save back to localStorage
      localStorage.setItem(
        "refferq_campaigns",
        JSON.stringify(updatedCampaigns)
      );

      // Redirect to campaigns tab after successful submission
      router.push("/affiliate/");
    } catch (error) {
      console.error("Error creating campaign:", error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Create New Campaign</h1>
        <Button variant="outline">
          <Link href="/affiliate/">Back to Campaigns</Link>
        </Button>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <CampaignForm onSuccess={handleSuccess} />
      </div>
    </div>
  );
}
