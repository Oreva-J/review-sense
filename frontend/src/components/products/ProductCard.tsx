import { Link } from "react-router-dom";
import { Star, MessageSquare } from "lucide-react";
import type { Product } from "../../config/api";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const avgRating =
    product.reviews && product.reviews.length > 0
      ? (
          product.reviews.reduce((sum, r) => sum + r.rating, 0) /
          product.reviews.length
        ).toFixed(1)
      : "N/A";

  const reviewCount = product.reviews?.length || 0;

  return (
    <Link
      to={`/products/${product.id}`}
      className="block bg-white rounded-lg shadow-sm border hover:shadow-md transition-all duration-200 overflow-hidden group"
    >
      {/* Product Image */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            onError={(e) => {
              // Prevent infinite loop by removing the error handler and showing fallback
              e.currentTarget.onerror = null;
              e.currentTarget.style.display = "none";
              const fallback = e.currentTarget
                .nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = "flex";
            }}
          />
        ) : null}
        <div
          className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600"
          style={{ display: product.imageUrl ? "none" : "flex" }}
        >
          <span className="text-6xl text-white opacity-50">📦</span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5 space-y-3">
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition line-clamp-1">
          {product.name}
        </h3>

        <p className="text-gray-600 text-sm line-clamp-2 min-h-[40px]">
          {product.description || "No description available"}
        </p>

        {/* Price */}
        <p className="text-2xl font-bold text-gray-900">
          ${product.price.toFixed(2)}
        </p>

        {/* Rating and Reviews */}
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center space-x-1">
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold text-gray-900">{avgRating}</span>
          </div>

          <div className="flex items-center space-x-1 text-gray-600">
            <MessageSquare className="h-4 w-4" />
            <span className="text-sm">{reviewCount} reviews</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
