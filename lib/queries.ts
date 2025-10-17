import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { config } from "./config";
import {
  apiClient,
  BasicCampaignRequest,
  BasicCampaignResponse,
  CampaignStatusResponse,
} from "./api-client";

// Types for basic campaign flow
interface CreateBasicCampaignParams {
  file: File;
  product: {
    name: string;
    description: string;
  };
  target_audience: string;
  platform_preferences: string[];
  budget_range: string;
  target_markets: string[];
  campaign_objectives: string[];
}

// Hook for creating basic campaigns (full flow: upload + campaign creation)
export function useCreateBasicCampaign(options?: {
  onSuccess?: (data: BasicCampaignResponse) => void;
  onError?: (error: Error) => void;
}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      file,
      product,
      target_audience,
      platform_preferences,
      budget_range,
      target_markets,
      campaign_objectives,
    }: CreateBasicCampaignParams): Promise<BasicCampaignResponse> => {
      console.log("DEBUG: Starting campaign creation with params:", {
        file: file
          ? { name: file.name, type: file.type, size: file.size }
          : null,
        product,
        target_audience,
        platform_preferences,
        budget_range,
        target_markets,
        campaign_objectives,
      });

      // Step 1: Get presigned URL
      console.log(
        "DEBUG: Step 1 - Getting presigned URL for:",
        file.name,
        file.type
      );
      const { uploadUrl, imageKey } = await apiClient.getPresignedUrl(
        file.name,
        file.type
      );
      console.log("DEBUG: Got presigned URL response:", {
        uploadUrl: uploadUrl.substring(0, 100) + "...",
        imageKey,
      });

      // Step 2: Upload file to S3
      console.log("DEBUG: Step 2 - Uploading file to S3");
      await apiClient.uploadFileToS3(uploadUrl, file);
      console.log("DEBUG: File uploaded successfully to S3");

      // Step 3: Create campaign with uploaded image
      const imageUrl = `${config.s3.bucketUrl}/${imageKey}`;
      console.log(
        "DEBUG: Step 3 - Creating campaign with image URL:",
        imageUrl
      );

      const campaignData: BasicCampaignRequest = {
        product: {
          ...product,
          imageUrl,
          imageKey,
        },
        target_audience,
        platform_preferences,
        budget_range,
        target_markets,
        campaign_objectives,
      };

      console.log("DEBUG: Campaign data:", campaignData);
      const result = await apiClient.createBasicCampaign(campaignData);
      console.log("DEBUG: Campaign created successfully:", result);

      // Store in localStorage for persistence
      apiClient.storeCampaignData(result.campaign_id, {
        type: "basic",
        status: result.status,
        campaign_data: result.campaign_data,
        created_at: new Date().toISOString(),
      });

      return result;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
      options?.onSuccess?.(data);
    },
    onError: options?.onError,
  });
}

// Hook for getting campaign status (useful for polling if needed)
export function useCampaignStatus(
  campaignId: string | null,
  enabled: boolean = true
) {
  return useQuery({
    queryKey: ["campaign-status", campaignId],
    queryFn: () => apiClient.getCampaignStatus(campaignId!),
    enabled: enabled && !!campaignId,
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      // Don't refetch if campaign is completed or failed
      return ["completed", "failed"].includes(status || "") ? false : 5000;
    },
    refetchIntervalInBackground: true,
  });
}

// Hook for just the presigned URL (useful for upload-only operations)
export function usePresignedUrl() {
  return useMutation({
    mutationFn: ({
      fileName,
      fileType,
    }: {
      fileName: string;
      fileType: string;
    }) => apiClient.getPresignedUrl(fileName, fileType),
  });
}

// Hook for just uploading to S3 (useful when you already have presigned URL)
export function useUploadToS3() {
  return useMutation({
    mutationFn: ({ uploadUrl, file }: { uploadUrl: string; file: File }) =>
      apiClient.uploadFileToS3(uploadUrl, file),
  });
}
