import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../config/api";
import {
  ArrowLeft,
  Star,
  MessageSquare,
  TrendingUp,
  Loader2,
  BarChart3,
} from "lucide-react";
import { Button } from "../components/ui/button";
import StatsCard from "../components/products/StatsCard";
import ReviewCard from "../components/reviews/ReviewCard";
import AISummary from "../components/reviews/AISummary";
import StarRating from "../components/reviews/StarRating";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => api.getProductReviews(productId),
    enabled: !isNaN(productId),
  });

  const summaryMutation = useMutation({
    mutationFn: () => api.generateSummary(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product", productId] });
    },
  });

  // Add debug logging
  //   console.log('Product data:', data)

  if (isNaN(productId)) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Invalid product ID</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error || !data || !data.product) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 text-lg">Failed to load product details.</p>
        <Link to="/products">
          <Button variant="outline" className="mt-4">
            Back to Products
          </Button>
        </Link>
      </div>
    );
  }

  const { product, reviews, summary } = data;

  // ✅ Add this debug log
// console.log('Product data:', product)
// console.log('Product imageUrl:', product.imageUrl)

  // Add null checks for product properties
  const productPrice = product.price ?? 0;
  const productName = product.name ?? "Unknown Product";
  const productDescription = product.description ?? "No description available";

  // Calculate stats
  const avgRating =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews ? reviews.filter((r) => r.rating === rating).length : 0,
    percentage:
      reviews && reviews.length > 0
        ? (reviews.filter((r) => r.rating === rating).length / reviews.length) *
          100
        : 0,
  }));

  const currentSummary = summary ?? summaryMutation.data?.summary ?? null;

  return (
    <div className="space-y-8">
      {/* Back Button & Analytics */}
      <div className="flex items-center justify-between">
        <Link to="/products">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Button>
        </Link>

        <div className="flex space-x-3">
          <Link to={`/admin/products/${productId}/add-review`}>
            <Button variant="outline" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              Add Review
            </Button>
          </Link>
          <Link to={`/analytics/${productId}`}>
            <Button className="gap-2">
              <BarChart3 className="h-4 w-4" />
              View Analytics
            </Button>
          </Link>
        </div>
      </div>

      {/* Product Header */}
      {/* Product Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6 md:p-8">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Product Image Placeholder
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg h-64 md:h-96 flex items-center justify-center">
            <span className="text-6xl md:text-9xl text-white opacity-50">
              📦
            </span>
          </div> */}

          {/* Product Image */}
          <div className="relative rounded-lg overflow-hidden bg-gray-100">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-64 md:h-96 object-cover"
                onError={(e) => {
        
                 // Prevent infinite loop by removing the onError handler after first failure
        e.currentTarget.onerror = null
        // Use a data URL as fallback (always works, no network request)
        e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect width="800" height="600" fill="%23f3f4f6"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24" fill="%239ca3af"%3EImage Not Available%3C/text%3E%3C/svg%3E'
                }}
              />
            ) : (
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 h-64 md:h-96 flex items-center justify-center">
                <span className="text-6xl md:text-9xl text-white opacity-50">
                  📦
                </span>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-4 md:space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {productName}
              </h1>
              <p className="text-gray-600 text-base md:text-lg">
                {productDescription}
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <StarRating value={Math.round(avgRating)} showNumber />
              <span className="text-gray-600 text-sm md:text-base">
                ({reviews?.length || 0}{" "}
                {reviews?.length === 1 ? "review" : "reviews"})
              </span>
            </div>

            <div className="pt-4 border-t">
              <p className="text-3xl md:text-4xl font-bold text-gray-900">
                ${productPrice.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Average Rating"
          value={avgRating.toFixed(1)}
          icon={Star}
          iconColor="text-yellow-500"
        />
        <StatsCard
          title="Total Reviews"
          value={reviews?.length || 0}
          icon={MessageSquare}
          iconColor="text-blue-600"
        />
        <StatsCard
          title="5-Star Reviews"
          value={`${ratingDistribution[0].percentage.toFixed(0)}%`}
          icon={TrendingUp}
          iconColor="text-green-600"
        />
      </div>

      {/* AI Summary */}
      <AISummary
        summary={currentSummary}
        isGenerating={summaryMutation.isPending}
        onGenerate={() => summaryMutation.mutate()}
        error={summaryMutation.isError}
      />

      {/* Rating Distribution */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Rating Distribution
        </h2>
        <div className="space-y-3">
          {ratingDistribution.map(({ rating, count, percentage }) => (
            <div key={rating} className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700 w-12">
                {rating}{" "}
                <Star className="inline h-4 w-4 fill-yellow-400 text-yellow-400" />
              </span>
              <div className="flex-1 bg-gray-200 rounded-full h-4 overflow-hidden">
                <div
                  className="bg-yellow-400 h-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-sm text-gray-600 w-16 text-right">
                {count} ({percentage.toFixed(0)}%)
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">
          Customer Reviews ({reviews?.length || 0})
        </h2>
        {!reviews || reviews.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">
              No reviews yet. Be the first to review!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
