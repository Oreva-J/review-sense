import { Routes, Route, Navigate } from 'react-router-dom'
import AdminDashboard from './AdminDashboard'
import ProductsManagement from './ProductsManagement'
import CreateProduct from './CreateProduct'
import EditProduct from './EditProduct'
import AddReview from './AddReview'

export default function AdminPage() {
  return (
    <Routes>
      <Route index element={<AdminDashboard />} />
      <Route path="products" element={<ProductsManagement />} />
      <Route path="products/new" element={<CreateProduct />} />
      <Route path="products/:id/edit" element={<EditProduct />} />
      <Route path="products/:id/add-review" element={<AddReview />} />
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  )
}