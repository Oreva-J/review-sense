import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import type { Review } from '../../config/api'

type Props = {
  reviews: Review[]
}

export default function AdvancedStats({ reviews }: Props) {
  if (reviews.length === 0) {
    return <div className="text-gray-500">No data available</div>
  }

  // Sort reviews by date
  const sortedReviews = [...reviews].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  )

  // Split into two halves
  const midpoint = Math.floor(sortedReviews.length / 2)
  const firstHalf = sortedReviews.slice(0, midpoint)
  const secondHalf = sortedReviews.slice(midpoint)

  const avgRatingFirstHalf = firstHalf.length > 0
    ? firstHalf.reduce((sum, r) => sum + r.rating, 0) / firstHalf.length
    : 0

  const avgRatingSecondHalf = secondHalf.length > 0
    ? secondHalf.reduce((sum, r) => sum + r.rating, 0) / secondHalf.length
    : 0

  const ratingTrend = avgRatingSecondHalf - avgRatingFirstHalf

  // Calculate median rating
  const ratings = reviews.map(r => r.rating).sort((a, b) => a - b)
  const medianRating = ratings.length > 0
    ? ratings[Math.floor(ratings.length / 2)]
    : 0

  // Most common rating (mode)
  const ratingCounts = reviews.reduce((acc, r) => {
    acc[r.rating] = (acc[r.rating] || 0) + 1
    return acc
  }, {} as Record<number, number>)
  
  const mostCommonRating = Object.entries(ratingCounts)
    .sort(([, a], [, b]) => b - a)[0]?.[0] || 0

  // Average review length
  const avgReviewLength = reviews.filter(r => r.comment).length > 0
    ? Math.round(
        reviews
          .filter(r => r.comment)
          .reduce((sum, r) => sum + (r.comment?.length || 0), 0) / 
        reviews.filter(r => r.comment).length
      )
    : 0

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {/* Rating Trend */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <p className="text-sm text-gray-600 mb-2">Rating Trend</p>
        <div className="flex items-center space-x-2">
          {ratingTrend > 0.1 ? (
            <TrendingUp className="h-6 w-6 text-green-600" />
          ) : ratingTrend < -0.1 ? (
            <TrendingDown className="h-6 w-6 text-red-600" />
          ) : (
            <Minus className="h-6 w-6 text-gray-600" />
          )}
          <p className={`text-2xl font-bold ${
            ratingTrend > 0.1 ? 'text-green-600' : 
            ratingTrend < -0.1 ? 'text-red-600' : 
            'text-gray-600'
          }`}>
            {ratingTrend > 0 ? '+' : ''}{ratingTrend.toFixed(2)}
          </p>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {ratingTrend > 0.1 ? 'Improving' : ratingTrend < -0.1 ? 'Declining' : 'Stable'}
        </p>
      </div>

      {/* Median Rating */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <p className="text-sm text-gray-600 mb-2">Median Rating</p>
        <p className="text-2xl font-bold text-gray-900">{medianRating} ⭐</p>
        <p className="text-xs text-gray-500 mt-1">Middle value</p>
      </div>

      {/* Most Common */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <p className="text-sm text-gray-600 mb-2">Most Common</p>
        <p className="text-2xl font-bold text-gray-900">{mostCommonRating} ⭐</p>
        <p className="text-xs text-gray-500 mt-1">
          {ratingCounts[Number(mostCommonRating)] || 0} reviews
        </p>
      </div>

      {/* Avg Review Length */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <p className="text-sm text-gray-600 mb-2">Avg Review Length</p>
        <p className="text-2xl font-bold text-gray-900">{avgReviewLength}</p>
        <p className="text-xs text-gray-500 mt-1">characters</p>
      </div>
    </div>
  )
}