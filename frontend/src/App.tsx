import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import AdminPage from "./pages/admin/AdminPage";
import Layoutt from "./components/layout/Layoutt";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layoutt />}>
        <Route index element={<HomePage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/:id" element={<ProductDetailPage />} />
        <Route path="analytics/:id" element={<AnalyticsPage />} />
        <Route path="admin/*" element={<AdminPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
