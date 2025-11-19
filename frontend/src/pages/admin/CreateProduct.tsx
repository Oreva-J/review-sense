import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate, Link } from 'react-router-dom'
import { api, type CreateProductInput, } from '../../config/api'
import { toast } from 'sonner'
import { ArrowLeft } from 'lucide-react'
import { Button } from '../../components/ui/button'
import ProductForm from '../../components/admin/ProductForm'

export default function CreateProduct() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const createMutation = useMutation({
    mutationFn: api.createProduct,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      toast.success('Product created successfully!')
      navigate(`/products/${data.id}`)
    },
    onError: () => {
      toast.error('Failed to create product')
    }
  })

  const handleSubmit = (formData: CreateProductInput) => {
    createMutation.mutate(formData)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <Link to="/admin/products">
          <Button variant="ghost" className="gap-2 mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Create New Product</h1>
        <p className="text-gray-600 mt-1">Add a new product to your catalog</p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <ProductForm
          onSubmit={handleSubmit}
          onCancel={() => navigate('/admin/products')}
          isSubmitting={createMutation.isPending}
        />
      </div>
    </div>
  )
}