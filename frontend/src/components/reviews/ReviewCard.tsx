import { formatDistanceToNow } from 'date-fns'
import { User } from 'lucide-react'
import StarRating from './StarRating'
import type { Review } from '../../config/api'

type ReviewCardProps = {
  review: Review
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 space-y-3">
      {/* Author & Rating */}
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 rounded-full p-2">
            <User className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <p className="font-semibold text-gray-900">{review.author}</p>
            <p className="text-sm text-gray-500">
              {formatDistanceToNow(new Date(review.date), { addSuffix: true })}
            </p>
          </div>
        </div>
        <StarRating value={review.rating} />
      </div>

      {/* Comment */}
      {review.comment && (
        <p className="text-gray-700 leading-relaxed">{review.comment}</p>
      )}
    </div>
  )
}