import { Link, Outlet } from 'react-router-dom'
import { BarChart3, Home, Settings } from 'lucide-react'

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <BarChart3 className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">ReviewSense</span>
            </Link>
            
            <nav className="flex space-x-8">
              <Link 
                to="/products" 
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition"
              >
                <Home className="h-5 w-5" />
                <span>Products</span>
              </Link>
              <Link 
                to="/admin" 
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition"
              >
                <Settings className="h-5 w-5" />
                <span>Admin</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500 text-sm">
            © 2024 ReviewSense. AI-Powered Review Analytics.
          </p>
        </div>
      </footer>
    </div>
  )
}