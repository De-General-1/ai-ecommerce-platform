"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Check,
  Loader2,
  Upload,
  Brain,
  Sparkles,
  BarChart3,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCreateBasicCampaign } from "@/lib/queries";

interface ProcessingStepProps {
  files: File[];
  description: string;
  category: string;
  platform: string;
  onComplete: (results: any) => void;
}

const processingSteps = [
  {
    id: "upload",
    title: "Uploading Images",
    description: "Securely uploading your product images to cloud storage",
    icon: Upload,
  },
  {
    id: "analysis",
    title: "AI Image Analysis",
    description: "Analyzing visual elements, colors, and composition",
    icon: Brain,
  },
  {
    id: "generation",
    title: "Generating Campaigns",
    description: "Creating platform-specific marketing content and strategies",
    icon: Sparkles,
  },
  {
    id: "optimization",
    title: "Optimizing Results",
    description: "Fine-tuning campaigns for maximum engagement",
    icon: BarChart3,
  },
];

export function ProcessingStep({
  files,
  description,
  category,
  platform,
  onComplete,
}: ProcessingStepProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [simulatedProgress, setSimulatedProgress] = useState(0);
  const hasStarted = useRef(false);

  // Use the new basic campaign creation hook
  const createCampaignMutation = useCreateBasicCampaign({
    onSuccess: (data) => {
      // Campaign completed successfully
      setCurrentStepIndex(3);
      setProgress(100);
      setSimulatedProgress(100);
      setCompletedSteps(["upload", "analysis", "generation", "optimization"]);
      onComplete(data);
    },
    onError: (error) => {
      console.error("Campaign creation failed:", error);
    },
  });

  // No legacy hooks needed - using new createCampaignMutation only

  const handleProgress = useCallback((step: string, stepProgress: number) => {
    const stepIndex = processingSteps.findIndex((s) => s.id === step);
    if (stepIndex !== -1) {
      setCurrentStepIndex(stepIndex);
      setProgress(stepProgress);
      if (stepProgress === 100) {
        setCompletedSteps((prev) => [...prev, step]);
        setProgress(0);
      }
    }
  }, []);

  // Simulate smooth progress for analysis and generation steps
  useEffect(() => {
    if (
      currentStepIndex > 0 &&
      currentStepIndex < 3 &&
      !completedSteps.includes(processingSteps[currentStepIndex].id)
    ) {
      const interval = setInterval(() => {
        setSimulatedProgress((prev) => {
          const increment = Math.random() * 3 + 1; // 1-4% increments
          const newProgress = Math.min(prev + increment, 85); // Cap at 85% until real completion
          return newProgress;
        });
      }, 200 + Math.random() * 300); // Vary interval timing

      return () => clearInterval(interval);
    }
  }, [currentStepIndex, completedSteps]);

  // Start campaign creation on mount
  useEffect(() => {
    if (!hasStarted.current && files.length > 0) {
      hasStarted.current = true;

      // Simulate upload step
      setCurrentStepIndex(0);
      setProgress(0);

      const uploadInterval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 5;
          if (newProgress >= 100) {
            clearInterval(uploadInterval);
            setCompletedSteps(["upload"]);
            setCurrentStepIndex(1);
            setProgress(0);
            setSimulatedProgress(0);

            // Start the actual campaign creation
            setTimeout(() => {
              createCampaignMutation.mutate({
                file: files[0], // Use first file for now
                product: {
                  name: `${category} Product`, // Generate a name from category
                  description: description,
                },
                target_audience:
                  "Target audience based on product category and description",
                platform_preferences: [platform, "Instagram", "TikTok"], // Include selected platform plus defaults
                budget_range: "$5,000 - $15,000",
                target_markets: ["United States", "Germany", "Japan"],
                campaign_objectives: ["brand_awareness", "product_launch"],
              });
            }, 1000);

            return 100;
          }
          return newProgress;
        });
      }, 200);

      return () => clearInterval(uploadInterval);
    }
  }, [files, description, category, platform, createCampaignMutation]);

  // Handle campaign creation progress
  useEffect(() => {
    if (createCampaignMutation.isPending && currentStepIndex >= 1) {
      // Simulate analysis and generation progress
      const progressInterval = setInterval(() => {
        setSimulatedProgress((prev) => {
          const increment = Math.random() * 2 + 1; // 1-3% increments
          const newProgress = Math.min(prev + increment, 90); // Cap at 90% until completion

          // Move through steps based on progress
          if (
            newProgress > 30 &&
            currentStepIndex === 1 &&
            !completedSteps.includes("analysis")
          ) {
            setCompletedSteps((prev) => [...prev, "analysis"]);
            setCurrentStepIndex(2);
            return 0; // Reset progress for next step
          }

          if (
            newProgress > 60 &&
            currentStepIndex === 2 &&
            !completedSteps.includes("generation")
          ) {
            setCompletedSteps((prev) => [...prev, "generation"]);
            setCurrentStepIndex(3);
            return 0; // Reset progress for final step
          }

          return newProgress;
        });
      }, 300 + Math.random() * 200); // Vary interval timing

      return () => clearInterval(progressInterval);
    }
  }, [createCampaignMutation.isPending, currentStepIndex, completedSteps]);

  const error = createCampaignMutation.error;
  const isProcessing = createCampaignMutation.isPending;

  const handleRetry = useCallback(() => {
    setCurrentStepIndex(0);
    setProgress(0);
    setSimulatedProgress(0);
    setCompletedSteps([]);
    hasStarted.current = false;
    createCampaignMutation.reset();

    // Restart the process after a short delay
    setTimeout(() => {
      hasStarted.current = true;
    }, 100);
  }, [createCampaignMutation]);

  return (
    <div className="max-w-5xl mx-auto">
      <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-md overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-8 text-white">
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold mb-2">
              AI Processing Your Campaign
            </CardTitle>
            <p className="text-blue-100 text-lg">
              Our advanced AI is analyzing your product and creating
              personalized marketing strategies
            </p>
          </div>
        </div>
        <CardContent className="p-8 space-y-8">
          {/* Error State */}
          {error && (
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-red-900 text-lg">
                    Processing Failed
                  </h4>
                  <p className="text-red-700">
                    Something went wrong during the AI analysis
                  </p>
                </div>
              </div>
              <p className="text-red-800 mb-6 bg-red-100 p-4 rounded-xl">
                {error?.message || "An unexpected error occurred"}
              </p>
              <Button
                onClick={handleRetry}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl"
              >
                <Loader2 className="w-4 h-4 mr-2" />
                Retry Processing
              </Button>
            </div>
          )}

          {/* Processing Steps */}
          <div className="space-y-6">
            {processingSteps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = completedSteps.includes(step.id);
              const isCurrent =
                index === currentStepIndex && !isCompleted && isProcessing;
              const isPending = index > currentStepIndex && !isCompleted;

              return (
                <div key={step.id} className="relative">
                  {/* Connection line */}
                  {index < processingSteps.length - 1 && (
                    <div className="absolute left-8 top-16 w-0.5 h-12 bg-gradient-to-b from-slate-200 to-transparent"></div>
                  )}

                  <div className="flex items-start gap-6 p-6 rounded-2xl bg-gradient-to-r from-slate-50 to-blue-50/50 hover:shadow-lg transition-all duration-300">
                    <div
                      className={cn(
                        "w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-500 relative z-10",
                        isCompleted
                          ? "bg-gradient-to-br from-green-500 to-emerald-600 text-white scale-110"
                          : isCurrent
                          ? "bg-gradient-to-br from-indigo-500 to-purple-600 text-white animate-pulse scale-105"
                          : error && index === currentStepIndex
                          ? "bg-gradient-to-br from-red-500 to-red-600 text-white"
                          : "bg-white border-2 border-slate-200 text-slate-400"
                      )}
                    >
                      {isCompleted ? (
                        <Check className="w-7 h-7" />
                      ) : isCurrent ? (
                        <Loader2 className="w-7 h-7 animate-spin" />
                      ) : error && index === currentStepIndex ? (
                        <AlertCircle className="w-7 h-7" />
                      ) : (
                        <Icon className="w-7 h-7" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3
                          className={cn(
                            "text-xl font-bold transition-colors",
                            isCompleted || isCurrent
                              ? "text-slate-900"
                              : "text-slate-500"
                          )}
                        >
                          {step.title}
                        </h3>
                        {isCompleted && (
                          <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                            <Check className="w-4 h-4" />
                            Complete
                          </div>
                        )}
                        {isCurrent && (
                          <div className="flex items-center gap-2 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Processing...
                          </div>
                        )}
                        {error && index === currentStepIndex && (
                          <div className="flex items-center gap-2 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                            <AlertCircle className="w-4 h-4" />
                            Failed
                          </div>
                        )}
                      </div>
                      <p
                        className={cn(
                          "text-base transition-colors mb-4",
                          isCompleted || isCurrent
                            ? "text-slate-600"
                            : "text-slate-400"
                        )}
                      >
                        {step.description}
                      </p>

                      {isCurrent && !error && (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-600 font-medium">
                              Progress
                            </span>
                            <span className="text-indigo-600 font-bold">
                              {Math.round(
                                index === 0 ? progress : simulatedProgress
                              )}
                              %
                            </span>
                          </div>
                          <div className="relative">
                            <Progress
                              value={index === 0 ? progress : simulatedProgress}
                              className="h-3 bg-slate-200"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full opacity-20 animate-pulse"></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Processing Summary */}
          <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-6 border border-slate-200">
            <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
              Processing Details
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
              <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                <div className="text-2xl font-bold text-slate-900 mb-1">
                  {files.length}
                </div>
                <div className="text-sm text-slate-600 font-medium">Images</div>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                <div className="text-lg font-bold text-slate-900 mb-1 capitalize">
                  {category}
                </div>
                <div className="text-sm text-slate-600 font-medium">
                  Category
                </div>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                <div className="text-lg font-bold text-slate-900 mb-1 capitalize">
                  {platform}
                </div>
                <div className="text-sm text-slate-600 font-medium">
                  Platform
                </div>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                <div
                  className={cn(
                    "text-lg font-bold mb-1",
                    error
                      ? "text-red-600"
                      : completedSteps.length === processingSteps.length
                      ? "text-green-600"
                      : "text-indigo-600"
                  )}
                >
                  {error
                    ? "Error"
                    : completedSteps.length === processingSteps.length
                    ? "Complete"
                    : "Processing"}
                </div>
                <div className="text-sm text-slate-600 font-medium">Status</div>
              </div>
            </div>

            {/* Show processing info */}
            {createCampaignMutation.isPending && (
              <div className="border-t border-slate-200 pt-4">
                <h5 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-500" />
                  AI Analysis in Progress
                </h5>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-2 bg-indigo-100 text-indigo-700 text-sm font-medium rounded-full border border-indigo-200">
                    Image Analysis
                  </span>
                  <span className="px-3 py-2 bg-purple-100 text-purple-700 text-sm font-medium rounded-full border border-purple-200">
                    Market Research
                  </span>
                  <span className="px-3 py-2 bg-blue-100 text-blue-700 text-sm font-medium rounded-full border border-blue-200">
                    Campaign Generation
                  </span>
                  <span className="px-3 py-2 bg-green-100 text-green-700 text-sm font-medium rounded-full border border-green-200">
                    Content Optimization
                  </span>
                </div>
              </div>
            )}

            {/* Show success info when completed */}
            {createCampaignMutation.isSuccess && (
              <div className="border-t border-slate-200 pt-4">
                <h5 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  Campaign Generated Successfully
                </h5>
                <p className="text-slate-600">
                  Your AI-powered marketing campaign has been created with
                  platform-specific strategies and content recommendations.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
