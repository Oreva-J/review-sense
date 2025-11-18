import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { format, parseISO } from 'date-fns'
import type { Review } from '../../config/api'

type Props = {
  reviews: Review[]
}

export default function ReviewTimelineChart({ reviews }: Props) {
  // Group reviews by month
  const reviewsByMonth = reviews.reduce((acc, review) => {
    const month = format(parseISO(review.date), 'MMM yyyy')
    
    if (!acc[month]) {
      acc[month] = { month, count: 0, totalRating: 0 }
    }
    
    acc[month].count++
    acc[month].totalRating += review.rating
    
    return acc
  }, {} as Record<string, { month: string; count: number; totalRating: number }>)

  const data = Object.values(reviewsByMonth)
    .map(item => ({
      month: item.month,
      reviews: item.count,
      avgRating: Number((item.totalRating / item.count).toFixed(2))
    }))
    .sort((a, b) => {
      const dateA = new Date(a.month)
      const dateB = new Date(b.month)
      return dateA.getTime() - dateB.getTime()
    })

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        No review data available
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="month" 
          tick={{ fontSize: 12 }}
        />
        <YAxis 
          yAxisId="left"
          label={{ value: 'Number of Reviews', angle: -90, position: 'insideLeft' }}
        />
        <YAxis 
          yAxisId="right"
          orientation="right"
          domain={[0, 5]}
          label={{ value: 'Average Rating', angle: 90, position: 'insideRight' }}
        />
        <Tooltip />
        <Legend />
        <Line 
          yAxisId="left"
          type="monotone" 
          dataKey="reviews" 
          stroke="#3B82F6" 
          strokeWidth={2}
          name="Review Count"
        />
        <Line 
          yAxisId="right"
          type="monotone" 
          dataKey="avgRating" 
          stroke="#10B981" 
          strokeWidth={2}
          name="Avg Rating"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}