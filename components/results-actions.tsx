"use client"

import { Download, Share2, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ResultsActionsProps {
  onExport: (format: "pdf" | "csv" | "json") => void
  onReset: () => void
}

export function ResultsActions({ onExport, onReset }: ResultsActionsProps) {
  return (
    <div className="bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Export & Share Your Campaigns</h3>
          <p className="text-slate-600 text-lg">Download your campaign data or share with your team</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Button 
            variant="outline" 
            className="bg-white/70 hover:bg-white border-slate-200 text-slate-700 px-6 py-3 rounded-xl shadow-sm hover:shadow-md transition-all"
            onClick={() => onExport("pdf")}
          >
            <Download className="w-4 h-4 mr-2" />
            PDF Report
          </Button>
          
          <Button 
            variant="outline" 
            className="bg-white/70 hover:bg-white border-slate-200 text-slate-700 px-6 py-3 rounded-xl shadow-sm hover:shadow-md transition-all"
            onClick={() => onExport("csv")}
          >
            <Download className="w-4 h-4 mr-2" />
            CSV Data
          </Button>
          
          <Button 
            variant="outline" 
            className="bg-white/70 hover:bg-white border-slate-200 text-slate-700 px-6 py-3 rounded-xl shadow-sm hover:shadow-md transition-all"
            onClick={() => onExport("json")}
          >
            <Download className="w-4 h-4 mr-2" />
            JSON Export
          </Button>
          
          <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all">
            <Share2 className="w-4 h-4 mr-2" />
            Share Results
          </Button>
          
          <Button 
            variant="outline" 
            className="bg-white/70 hover:bg-white border-slate-200 text-slate-700 px-6 py-3 rounded-xl shadow-sm hover:shadow-md transition-all"
            onClick={onReset}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            New Campaign
          </Button>
        </div>
      </div>
    </div>
  )
}