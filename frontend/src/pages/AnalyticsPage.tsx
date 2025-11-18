import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { api } from '../config/api'
import { ArrowLeft, Loader2, BarChart3, PieChart, TrendingUp, Activity } from 'lucide-react'
import { Button } from '../components/ui/button'
import ReviewTimelineChart from '../components/analytics/ReviewTimelineChart'
import RatingDistributionChart from '../components/analytics/RatingDistributionChart'
import SentimentAnalysis from '../components/analytics/SentimentAnalysis'
import AdvancedStats from '../components/analytics/AdvancedStats'

export default function AnalyticsPage() {
  const { id } = useParams<{ id: string }>()
  const productId = Number(id)

  const { data, isLoading, error } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => api.getProductReviews(productId),
    enabled: !isNaN(productId)
  })

  if (isNaN(productId)) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Invalid product ID</p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 text-lg">Failed to load analytics data.</p>
        <Link to="/products">
          <Button variant="outline" className="mt-4">
            Back to Products
          </Button>
        </Link>
      </div>
    )
  }

  const { product, reviews } = data

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to={`/products/${productId}`}>
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Product
            </Button>
          </Link>
        </div>
      </div>

      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Analytics: {product.name}
        </h1>
        <p className="text-gray-600">
          Detailed review analytics and insights
        </p>
      </div>

      {/* Advanced Stats */}
      <AdvancedStats reviews={reviews} />

      {/* Charts Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Review Timeline */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Activity className="h-5 w-5 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">Review Timeline</h2>
          </div>
          <ReviewTimelineChart reviews={reviews} />
        </div>

        {/* Rating Distribution */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center space-x-2 mb-4">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">Rating Distribution</h2>
          </div>
          <RatingDistributionChart reviews={reviews} />
        </div>
      </div>

      {/* Sentiment Analysis - Full Width */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center space-x-2 mb-4">
          <PieChart className="h-5 w-5 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-900">Sentiment Analysis</h2>
        </div>
        <SentimentAnalysis reviews={reviews} />
      </div>

      {/* Summary Stats */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-gray-600">Total Reviews</p>
            <p className="text-2xl font-bold text-gray-900">{reviews.length}</p>
          </div>
          <div>
            <p className="text-gray-600">Average Rating</p>
            <p className="text-2xl font-bold text-gray-900">
              {reviews.length > 0 
                ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(2)
                : 'N/A'
              } ⭐
            </p>
          </div>
          <div>
            <p className="text-gray-600">Recommendation Rate</p>
            <p className="text-2xl font-bold text-gray-900">
              {reviews.length > 0
                ? ((reviews.filter(r => r.rating >= 4).length / reviews.length) * 100).toFixed(1)
                : '0'
              }%
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}