import { Button } from '../ui/button'
import { Sparkles, RefreshCw } from 'lucide-react'
import LoadingSkeleton from './LoadingSkeleton'

type AISummaryProps = {
  summary: string | null
  isGenerating: boolean
  onGenerate: () => void
  error?: boolean
}

export default function AISummary({ summary, isGenerating, onGenerate, error }: AISummaryProps) {
  if (isGenerating) {
    return (
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Sparkles className="h-5 w-5 text-blue-600 animate-pulse" />
          <h3 className="text-lg font-semibold text-gray-900">Generating AI Summary...</h3>
        </div>
        <LoadingSkeleton />
      </div>
    )
  }

  if (!summary) {
    return (
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 p-6">
        <div className="text-center space-y-4">
          <Sparkles className="h-12 w-12 text-blue-600 mx-auto" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              AI Summary Not Generated Yet
            </h3>
            <p className="text-gray-600 mb-4">
              Generate an AI-powered summary of all customer reviews
            </p>
          </div>
          <Button onClick={onGenerate} size="lg" className="gap-2">
            <Sparkles className="h-5 w-5" />
            Generate AI Summary
          </Button>
          {error && (
            <p className="text-red-600 text-sm mt-2">
              Failed to generate summary. Please try again.
            </p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Sparkles className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">AI Summary</h3>
        </div>
        <Button 
          onClick={onGenerate} 
          variant="outline" 
          size="sm"
          className="gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>
      <p className="text-gray-700 leading-relaxed">{summary}</p>
    </div>
  )
}