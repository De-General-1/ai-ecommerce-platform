"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  Loader2,
  AlertCircle,
  MessageSquare,
  Brain,
  Users,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AICollaborationProcessingProps {
  files: File[];
  description: string;
  category: string;
  platform: string;
  selectedGoal: any;
  aiTeam: any[];
  onComplete: (results: any) => void;
}

export function AICollaborationProcessing({
  files,
  description,
  category,
  platform,
  selectedGoal,
  aiTeam,
  onComplete,
}: AICollaborationProcessingProps) {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [agentStates, setAgentStates] = useState<Record<string, any>>({});
  const [agentMessages, setAgentMessages] = useState<any[]>([]);

  const hasStarted = useRef(false);

  const [isProcessing, setIsProcessing] = useState(false);
  const [apiError, setApiError] = useState<Error | null>(null);

  // Direct API call function - no React Query complexity
  const directCreateCampaign = async (
    file: File,
    product: { name: string; description: string }
  ) => {
    try {
      console.log("DEBUG: directCreateCampaign called with file:", file);
      console.log("DEBUG: file instanceof File:", file instanceof File);
      console.log("DEBUG: file.name:", file?.name);
      console.log("DEBUG: file.type:", file?.type);
      console.log("DEBUG: file.size:", file?.size);
      console.log("DEBUG: product:", product);

      // Validate file
      if (!file) {
        throw new Error("No file provided to directCreateCampaign");
      }

      if (!file.name) {
        throw new Error("File name is missing");
      }

      if (!file.type) {
        throw new Error("File type is missing");
      }

      // Step 1: Get presigned URL - DIRECT FETCH CALL
      const payload = {
        fileName: file.name,
        fileType: file.type,
      };

      console.log("DEBUG: Payload being sent to presigned URL:", payload);
      console.log("DEBUG: Making direct fetch to presigned URL endpoint");

      const presignedResponse = await fetch(
        "https://a5s7rnwjm0.execute-api.eu-west-1.amazonaws.com/dev/api/upload/presigned-url",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Origin: "http://localhost:3000",
          },
          mode: "cors",
          body: JSON.stringify(payload),
        }
      );

      console.log(
        "DEBUG: Presigned URL response status:",
        presignedResponse.status
      );

      if (!presignedResponse.ok) {
        const errorText = await presignedResponse.text();
        console.error("DEBUG: Presigned URL error:", errorText);
        throw new Error(
          `Presigned URL failed: ${presignedResponse.status} - ${errorText}`
        );
      }

      const { uploadUrl, imageKey } = await presignedResponse.json();
      console.log("DEBUG: Got presigned URL:", {
        uploadUrl: uploadUrl.substring(0, 100) + "...",
        imageKey,
      });

      // Step 2: Upload to S3
      console.log("DEBUG: Uploading file to S3");
      const uploadResponse = await fetch(uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });

      if (!uploadResponse.ok) {
        throw new Error(`S3 upload failed: ${uploadResponse.status}`);
      }

      console.log("DEBUG: File uploaded successfully to S3");

      // Step 3: Create campaign - use comprehensive endpoint for "Go Viral Globally"
      const isComprehensiveCampaign = selectedGoal?.title?.trim() === "Go Viral Globally";
      const endpoint = isComprehensiveCampaign 
        ? "https://a5s7rnwjm0.execute-api.eu-west-1.amazonaws.com/dev/api/comprehensive-campaign"
        : "https://a5s7rnwjm0.execute-api.eu-west-1.amazonaws.com/dev/api/campaigns";

      const campaignData = {
        product: {
          ...product,
          imageUrl: `https://degenerals-mi-dev-images.s3.eu-west-1.amazonaws.com/${imageKey}`,
          imageKey,
        },
        target_audience:
          "Target audience based on product category and description",
        platform_preferences: [platform, "Instagram", "TikTok"],
        budget_range: "$5,000 - $15,000",
        target_markets: ["United States", "Germany", "Japan"],
        campaign_objectives: ["brand_awareness", "product_launch"],
        ...(isComprehensiveCampaign && {
          s3_image_key: imageKey,
          image_url: `https://degenerals-mi-dev-images.s3.eu-west-1.amazonaws.com/${imageKey}`
        })
      };

      console.log(`DEBUG: Selected goal title: "${selectedGoal?.title}"`);  
      console.log(`DEBUG: Is comprehensive campaign: ${isComprehensiveCampaign}`);
      console.log(`DEBUG: Creating ${isComprehensiveCampaign ? 'comprehensive' : 'basic'} campaign with data:`, campaignData);
      const campaignResponse = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Origin: "http://localhost:3000",
          },
          mode: "cors",
          body: JSON.stringify(campaignData),
        }
      );

      if (!campaignResponse.ok) {
        const errorText = await campaignResponse.text();
        console.error("DEBUG: Campaign creation error:", errorText);
        throw new Error(
          `Campaign creation failed: ${campaignResponse.status} - ${errorText}`
        );
      }

      const result = await campaignResponse.json();
      console.log("DEBUG: Campaign created successfully:", result);

      setIsProcessing(false);
      onComplete(result);
    } catch (error) {
      console.error("DEBUG: directCreateCampaign error:", error);
      setApiError(error as Error);
      setIsProcessing(false);
    }
  };

  const phases = [
    {
      title: "Initializing AI Team",
      description: "Setting up secure collaboration environment",
      duration: 2000,
    },
    {
      title: "Image Analysis Phase",
      description: "AI agents analyzing your product images",
      duration: 3000,
    },
    {
      title: "Market Research Phase",
      description: "Gathering competitive intelligence and trends",
      duration: 4000,
    },
    {
      title: "Strategy Development",
      description: "Creating personalized campaign strategies",
      duration: 3500,
    },
    {
      title: "Content Generation",
      description: "Generating platform-specific content",
      duration: 4500,
    },
    {
      title: "Final Optimization",
      description: "Optimizing campaigns for maximum impact",
      duration: 2000,
    },
  ];

  // Simulate agent messages and collaboration
  const agentMessageTemplates = {
    "campaign-strategist": [
      "Analyzing product positioning and brand messaging...",
      "Identifying key value propositions for your audience...",
      "Developing creative campaign concepts...",
      "Finalizing strategic recommendations...",
    ],
    "cultural-expert": [
      "Researching cultural preferences for target markets...",
      "Adapting messaging for local audiences...",
      "Ensuring cultural sensitivity across campaigns...",
      "Optimizing for regional preferences...",
    ],
    "market-researcher": [
      "Scanning competitor landscape and trends...",
      "Analyzing audience behavior patterns...",
      "Identifying market opportunities...",
      "Compiling actionable market insights...",
    ],
    "creative-director": [
      "Generating engaging content concepts...",
      "Optimizing for platform-specific formats...",
      "Creating viral-worthy content ideas...",
      "Finalizing creative assets...",
    ],
    "performance-analyst": [
      "Setting up performance tracking metrics...",
      "Analyzing optimization opportunities...",
      "Configuring A/B testing strategies...",
      "Preparing performance forecasts...",
    ],
  };

  useEffect(() => {
    if (!hasStarted.current) {
      hasStarted.current = true;

      // Initialize agent states
      const initialStates = aiTeam.reduce(
        (acc, agent) => ({
          ...acc,
          [agent.id]: {
            status: "initializing",
            progress: 0,
            currentTask: "Preparing...",
          },
        }),
        {}
      );
      setAgentStates(initialStates);

      // Start direct API call
      console.log("DEBUG: Component props:", {
        files: files?.length
          ? files.map((f) => ({ name: f.name, type: f.type, size: f.size }))
          : "No files",
        description,
        category,
        platform,
      });
      console.log("DEBUG: files array:", files);
      console.log("DEBUG: files.length:", files?.length);
      console.log("DEBUG: files[0]:", files?.[0]);

      // Handle the case where files were lost during localStorage serialization
      if (
        !files ||
        files.length === 0 ||
        !files[0] ||
        typeof files[0] !== "object" ||
        !files[0].name
      ) {
        console.warn(
          "Files were lost during localStorage serialization. Creating mock file for testing."
        );

        // For now, create a mock file to test the API call
        // In production, we should store files differently or pass them directly
        const mockFile = new File(["mock content"], "test-product.jpg", {
          type: "image/jpeg",
        });

        console.log("DEBUG: Using mock file:", {
          name: mockFile.name,
          type: mockFile.type,
          size: mockFile.size,
        });

        setIsProcessing(true);
        setApiError(null);

        // Direct API call with mock file
        directCreateCampaign(mockFile, {
          name: `${category} Product`,
          description: description,
        });

        return;
      }

      const file = files[0];
      console.log("DEBUG: Selected file:", file);
      console.log("DEBUG: Selected file properties:", {
        name: file.name,
        type: file.type,
        size: file.size,
        constructor: file.constructor.name,
      });

      setIsProcessing(true);
      setApiError(null);

      // Direct API call - bypass React Query for debugging
      directCreateCampaign(file, {
        name: `${category} Product`,
        description: description,
      });

      // Simulate agent collaboration
      // simulateAgentCollaboration();
    }
  }, []);

  // Handle completion is now handled in the direct API call

  const error = apiError;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
          <Users className="w-4 h-4" />
          Team Collaboration
        </div>
        <h2 className="text-4xl lg:text-5xl font-bold text-slate-900">
          Your Marketing Team Is
          <span className="block bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
            Collaborating
          </span>
        </h2>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          Watch your marketing specialists work together to create the perfect
          campaign for "{selectedGoal.title}"
        </p>
      </div>

      {/* Current Phase */}
      <Card className="border-0 shadow-xl bg-blue-50">
        <CardContent className="p-8">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 rounded-full shadow-lg">
              <Brain className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-slate-900">
                {phases[currentPhase]?.title}
              </span>
            </div>
            <p className="text-lg text-slate-600">
              {phases[currentPhase]?.description}
            </p>
            <div className="flex items-center justify-center gap-2 text-blue-600">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span className="font-medium">
                Phase {currentPhase + 1} of {phases.length}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* AI Team Status */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-6 h-6" />
            Team Status
          </h3>

          <div className="space-y-4">
            {aiTeam.map((agent, index) => {
              const Icon = agent.icon;
              const state = agentStates[agent.id] || {
                status: "initializing",
                progress: 0,
                currentTask: "Preparing...",
              };

              return (
                <Card
                  key={index}
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-14 h-14 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg ${
                          state.status === "active" ? "animate-pulse" : ""
                        }`}
                      >
                        {Icon && <Icon className="w-7 h-7 text-white" />}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold text-slate-900">
                            {agent.name}
                          </h4>
                          <Badge
                            className={cn(
                              state.status === "complete"
                                ? "bg-green-100 text-green-700 border-green-200"
                                : state.status === "active"
                                ? "bg-blue-100 text-blue-700 border-blue-200"
                                : "bg-slate-100 text-slate-600 border-slate-200"
                            )}
                          >
                            {state.status === "complete" && (
                              <Check className="w-3 h-3 mr-1" />
                            )}
                            {state.status === "active" && (
                              <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                            )}
                            {state.status === "complete"
                              ? "Complete"
                              : state.status === "active"
                              ? "Working"
                              : "Preparing"}
                          </Badge>
                        </div>

                        <p className="text-sm text-slate-600 mb-3">
                          {state.currentTask}
                        </p>

                        {state.status !== "initializing" && (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-slate-600">Progress</span>
                              <span className="font-medium text-slate-900">
                                {Math.round(state.progress)}%
                              </span>
                            </div>
                            <Progress value={state.progress} className="h-2" />
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Agent Messages */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <MessageSquare className="w-6 h-6" />
            Team Communication
          </h3>

          <Card className="border-0 shadow-lg h-96 overflow-hidden">
            <CardContent className="p-0 h-full">
              <div className="h-full overflow-y-auto p-4 space-y-3">
                {agentMessages.map((message) => {
                  const Icon = message.icon;
                  return (
                    <div
                      key={message.id}
                      className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg"
                    >
                      <div
                        className={`w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0`}
                      >
                        {Icon && <Icon className="w-4 h-4 text-white" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-slate-900 text-sm">
                            {message.agentName}
                          </span>
                          <span className="text-xs text-slate-500">
                            {message.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600">
                          {message.message}
                        </p>
                      </div>
                    </div>
                  );
                })}

                {agentMessages.length === 0 && (
                  <div className="text-center py-8 text-slate-500">
                    <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Team communication will appear here...</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <Card className="border-0 shadow-xl bg-red-50 border-red-200">
          <CardContent className="p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h4 className="font-bold text-red-900 text-lg">
                  Collaboration Error
                </h4>
                <p className="text-red-700">
                  Something went wrong during the AI team collaboration
                </p>
              </div>
            </div>
            <p className="text-red-800 mb-6 bg-red-100 p-4 rounded-xl">
              {error?.message || "An unexpected error occurred"}
            </p>
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              <Loader2 className="w-4 h-4 mr-2" />
              Restart Collaboration
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
