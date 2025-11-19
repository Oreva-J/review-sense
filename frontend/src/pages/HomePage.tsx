import { Link } from 'react-router-dom'
import { ArrowRight, BarChart3, Brain, Zap } from 'lucide-react'
import { Button } from '../components/ui/button'

export default function HomePage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-8 md:py-12">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 px-4">
          AI-Powered Review Analytics
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
          Transform customer reviews into actionable insights. 
          Understand sentiment, track trends, and make data-driven decisions.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 px-4">
          <Link to="/products">
            <Button size="lg" className="gap-2 w-full sm:w-auto">
              View Products <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
          <Link to="/admin">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              Admin Dashboard
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-4">
        <FeatureCard
          icon={<Brain className="h-10 w-10 text-blue-600" />}
          title="AI Summarization"
          description="Automatically generate concise summaries of hundreds of reviews in seconds."
        />
        <FeatureCard
          icon={<BarChart3 className="h-10 w-10 text-green-600" />}
          title="Analytics Dashboard"
          description="Visualize review trends, sentiment distribution, and key metrics at a glance."
        />
        <FeatureCard
          icon={<Zap className="h-10 w-10 text-purple-600" />}
          title="Real-time Updates"
          description="Get instant insights as new reviews come in, keeping you always informed."
        />
      </section>

      {/* Stats */}
      <section className="bg-white rounded-lg shadow-sm p-6 md:p-8 mx-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 text-center">
          <StatCard number="500+" label="Reviews Analyzed" />
          <StatCard number="50+" label="Products Tracked" />
          <StatCard number="80%" label="Time Saved" />
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { 
  icon: React.ReactNode
  title: string
  description: string 
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border space-y-3 hover:shadow-md transition-shadow">
      <div>{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <p className="text-3xl md:text-4xl font-bold text-blue-600">{number}</p>
      <p className="text-gray-600 mt-2">{label}</p>
    </div>
  )
}