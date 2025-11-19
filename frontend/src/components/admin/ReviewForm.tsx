import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '../ui/button'
import StarRating from '../reviews/StarRating'
import { useState } from 'react'

const reviewSchema = z.object({
  author: z.string().min(1, 'Author name is required').max(255, 'Name too long'),
  rating: z.number().min(1, 'Rating is required').max(5, 'Rating must be between 1-5'),
  comment: z.string().min(10, 'Comment must be at least 10 characters').optional()
})

type ReviewFormData = z.infer<typeof reviewSchema>

type Props = {
  productId: number
  onSubmit: (data: ReviewFormData) => void
  onCancel: () => void
  isSubmitting?: boolean
}

export default function ReviewForm({ onSubmit, onCancel, isSubmitting }: Props) {
  const [selectedRating, setSelectedRating] = useState(5)
  
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 5
    }
  })

  const handleRatingSelect = (rating: number) => {
    setSelectedRating(rating)
    setValue('rating', rating)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Author */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Author Name *
        </label>
        <input
          {...register('author')}
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="John Doe"
        />
        {errors.author && (
          <p className="text-red-600 text-sm mt-1">{errors.author.message}</p>
        )}
      </div>

      {/* Rating */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Rating *
        </label>
        <input type="hidden" {...register('rating', { valueAsNumber: true })} />
        <div className="flex items-center space-x-4">
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                type="button"
                onClick={() => handleRatingSelect(rating)}
                className="focus:outline-none"
              >
                <span 
                  className={`text-3xl cursor-pointer transition-all ${
                    rating <= selectedRating ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                >
                  ⭐
                </span>
              </button>
            ))}
          </div>
          <span className="text-gray-600 font-medium">{selectedRating} stars</span>
        </div>
        {errors.rating && (
          <p className="text-red-600 text-sm mt-1">{errors.rating.message}</p>
        )}
      </div>

      {/* Comment */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Review Comment *
        </label>
        <textarea
          {...register('comment')}
          rows={6}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Share your experience with this product..."
        />
        {errors.comment && (
          <p className="text-red-600 text-sm mt-1">{errors.comment.message}</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Add Review'}
        </Button>
      </div>
    </form>
  )
}