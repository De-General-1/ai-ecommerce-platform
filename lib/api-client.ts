import { config } from "./config";

// Types for the new backend API
export interface PresignedUrlResponse {
  uploadUrl: string;
  imageHash: string;
  imageKey: string;
  uploadId: string;
}

export interface BasicCampaignRequest {
  product: {
    name: string;
    description: string;
    imageUrl: string;
    imageKey: string;
  };
  target_audience: string;
  platform_preferences: string[];
  budget_range: string;
  target_markets: string[];
  campaign_objectives: string[];
}

export interface BasicCampaignResponse {
  campaign_id: string;
  status: "completed";
  message: string;
  campaign_data: {
    campaign_strategy: any;
    platform_content: any;
    visual_insights: any;
    market_trends: any;
    success_metrics: any;
  };
}

export interface CampaignStatusResponse {
  campaign_id: string;
  status:
    | "processing"
    | "completed"
    | "awaiting_assets"
    | "assets_completed"
    | "failed";
  progress: number;
  created_at: string;
  updated_at: string;
  context_data: any;
  result_data: any;
  visual_assets?: any;
}

// API functions for the new backend
export const apiClient = {
  // Get presigned URL for S3 upload
  async getPresignedUrl(
    fileName: string,
    fileType: string
  ): Promise<PresignedUrlResponse> {
    const response = await fetch(config.api.uploadUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileName, fileType }),
    });

    if (!response.ok) {
      throw new Error(`Presigned URL request failed: ${response.status}`);
    }

    return response.json();
  },

  // Upload file to S3 using presigned URL
  async uploadFileToS3(uploadUrl: string, file: File): Promise<void> {
    const response = await fetch(uploadUrl, {
      method: "PUT",
      headers: { "Content-Type": file.type },
      body: file,
    });

    if (!response.ok) {
      throw new Error(`File upload to S3 failed: ${response.status}`);
    }
  },

  // Create basic campaign
  async createBasicCampaign(
    campaignData: BasicCampaignRequest
  ): Promise<BasicCampaignResponse> {
    const response = await fetch(config.api.campaignUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(campaignData),
    });

    if (!response.ok) {
      throw new Error(`Basic campaign creation failed: ${response.status}`);
    }

    return response.json();
  },

  // Get campaign status
  async getCampaignStatus(campaignId: string): Promise<CampaignStatusResponse> {
    const response = await fetch(
      `${config.api.campaignDetailUrl}/${campaignId}/status`
    );

    if (!response.ok) {
      throw new Error(`Campaign status request failed: ${response.status}`);
    }

    return response.json();
  },

  // Get stored data from localStorage (legacy compatibility)
  getStoredData() {
    const imageHashes = JSON.parse(localStorage.getItem("imageHashes") || "[]");
    const campaigns = JSON.parse(localStorage.getItem("campaigns") || "[]");
    return { imageHashes, campaigns };
  },

  // Store campaign data in localStorage
  storeCampaignData(campaignId: string, campaignData: any) {
    const campaigns = JSON.parse(localStorage.getItem("campaigns") || "[]");
    campaigns.push({
      campaignId,
      ...campaignData,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem("campaigns", JSON.stringify(campaigns));
  },
};
