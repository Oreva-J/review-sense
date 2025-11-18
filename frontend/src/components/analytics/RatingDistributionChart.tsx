import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import type { Review } from '../../config/api'

type Props = {
  reviews: Review[]
}

const COLORS = ['#EF4444', '#F97316', '#EAB308', '#84CC16', '#22C55E']

export default function RatingDistributionChart({ reviews }: Props) {
  const distribution = [5, 4, 3, 2, 1].map(rating => ({
    rating: `${rating} ⭐`,
    count: reviews.filter(r => r.rating === rating).length,
    percentage: reviews.length > 0 
      ? ((reviews.filter(r => r.rating === rating).length / reviews.length) * 100).toFixed(1)
      : 0
  }))

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={distribution.reverse()}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="rating" />
        <YAxis label={{ value: 'Number of Reviews', angle: -90, position: 'insideLeft' }} />
        <Tooltip 
          formatter={(value: number) => [
            `${value} reviews`,
            'Count'
          ]}
        />
        <Bar dataKey="count" radius={[8, 8, 0, 0]}>
          {distribution.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}