"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AICollaborationProcessing } from "@/components/ai-collaboration-processing";
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
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-end mb-6">
          <Button
            variant="outline"
            onClick={handleNewCampaign}
            className="hover:bg-slate-100"
          >
            <Plus className="w-4 h-4 mr-2" />
            Start New Campaign
          </Button>
        </div>

        <AICollaborationProcessing
          files={campaignData.files}
          description={campaignData.productDescription}
          category={campaignData.category}
          platform={campaignData.targetPlatform}
          selectedGoal={campaignData.goal}
          aiTeam={campaignData.team}
          onComplete={handleComplete}
        />
      </div>
    </div>
  );
}
