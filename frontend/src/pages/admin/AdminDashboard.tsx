import { useQuery } from '@tanstack/react-query'
import { api } from '../../config/api'
import { Link } from 'react-router-dom'
import { Plus, Package, MessageSquare, TrendingUp, Loader2 } from 'lucide-react'
import { Button } from '../../components/ui/button'
import StatsCard from '../../components/products/StatsCard'

export default function AdminDashboard() {
  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: api.getProducts
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  const totalProducts = products?.length || 0
  const totalReviews = products?.reduce((sum, p) => sum + (p.reviews?.length || 0), 0) || 0
  const avgRating = products && products.length > 0
    ? products.reduce((sum, p) => {
        const productAvg = p.reviews && p.reviews.length > 0
          ? p.reviews.reduce((s, r) => s + r.rating, 0) / p.reviews.length
          : 0
        return sum + productAvg
      }, 0) / products.length
    : 0

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage products and reviews</p>
        </div>
        <Link to="/admin/products/new">
          <Button className="gap-2">
            <Plus className="h-5 w-5" />
            Add Product
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Total Products"
          value={totalProducts}
          icon={Package}
          iconColor="text-blue-600"
        />
        <StatsCard
          title="Total Reviews"
          value={totalReviews}
          icon={MessageSquare}
          iconColor="text-green-600"
        />
        <StatsCard
          title="Average Rating"
          value={avgRating.toFixed(2)}
          icon={TrendingUp}
          iconColor="text-yellow-600"
        />
      </div>

      {/* Recent Products */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Products</h2>
            <Link to="/admin/products">
              <Button variant="outline" size="sm">
                Manage All
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reviews
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products?.slice(0, 5).map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-500 truncate max-w-md">
                        {product.description}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-900">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-gray-900">
                    {product.reviews?.length || 0}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <Link to={`/products/${product.id}`}>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </Link>
                      <Link to={`/admin/products/${product.id}/edit`}>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}