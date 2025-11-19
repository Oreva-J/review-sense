import { useParams, useNavigate, Link } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api, type CreateReviewInput } from '../../config/api'
import { toast } from 'sonner'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Button } from '../../components/ui/button'
import ReviewForm from '../../components/admin/ReviewForm'

export default function AddReview() {
  const { id } = useParams<{ id: string }>()
  const productId = Number(id)
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => api.getProductReviews(productId),
    enabled: !isNaN(productId)
  })

  const createMutation = useMutation({
    mutationFn: (input: CreateReviewInput) => api.createReview(productId, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product', productId] })
      toast.success('Review added successfully!')
      navigate(`/products/${productId}`)
    },
    onError: () => {
      toast.error('Failed to add review')
    }
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
        <p className="text-red-600 text-lg">Failed to load product.</p>
        <Link to="/products">
          <Button variant="outline" className="mt-4">
            Back to Products
          </Button>
        </Link>
      </div>
    )
  }

  const handleSubmit = (formData: CreateReviewInput) => {
    createMutation.mutate(formData)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <Link to={`/products/${productId}`}>
          <Button variant="ghost" className="gap-2 mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Product
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Add Review</h1>
        <p className="text-gray-600 mt-1">
          Add a review for <span className="font-semibold">{data.product.name}</span>
        </p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <ReviewForm
          productId={productId}
          onSubmit={handleSubmit}
          onCancel={() => navigate(`/products/${productId}`)}
          isSubmitting={createMutation.isPending}
        />
      </div>
    </div>
  )
}