"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { EnthusiasticProcessing } from "@/components/enthusiastic-processing";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function CampaignProcessingPage() {
  const router = useRouter();
  const [campaignData, setCampaignData] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem("campaignData");
    console.log("DEBUG: Raw localStorage data:", data);
    if (data) {
      const parsedData = JSON.parse(data);
      console.log("DEBUG: Parsed campaignData:", parsedData);
      console.log("DEBUG: parsedData.files:", parsedData.files);
      setCampaignData(parsedData);
    } else {
      console.log("DEBUG: No campaignData in localStorage, redirecting");
      router.push("/campaign");
    }
  }, [router]);

  const handleComplete = (results: any) => {
    localStorage.setItem("campaignResults", JSON.stringify(results));
    router.push("/campaign/results");
  };

  const handleNewCampaign = () => {
    localStorage.removeItem("campaignData");
    localStorage.removeItem("campaignResults");
    router.push("/campaign");
  };

  if (!campaignData) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-slate-900">
              Loading Campaign Data
            </h3>
            <p className="text-slate-600">
              Preparing your marketing campaign...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="fixed top-4 right-4 z-50">
        <Button
          variant="outline"
          onClick={handleNewCampaign}
          className="bg-white/90 backdrop-blur-sm hover:bg-white hover:text-slate-900 shadow-lg"
        >
          <Plus className="w-4 h-4 mr-2" />
          Start New Campaign
        </Button>
      </div>

      <EnthusiasticProcessing
        selectedGoal={campaignData.goal}
        onComplete={handleComplete}
        files={campaignData.files}
        description={campaignData.productDescription}
        category={campaignData.category}
        platform={campaignData.targetPlatform}
      />
    </>
  );
}
