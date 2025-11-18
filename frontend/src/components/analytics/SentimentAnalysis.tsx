import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import type { Review } from '../../config/api'

type Props = {
  reviews: Review[]
}

const SENTIMENT_COLORS = {
  positive: '#22C55E',
  neutral: '#EAB308',
  negative: '#EF4444'
}

export default function SentimentAnalysis({ reviews }: Props) {
  // Simple sentiment analysis based on rating
  const sentiments = reviews.reduce((acc, review) => {
    if (review.rating >= 4) {
      acc.positive++
    } else if (review.rating === 3) {
      acc.neutral++
    } else {
      acc.negative++
    }
    return acc
  }, { positive: 0, neutral: 0, negative: 0 })

  const data = [
    { name: 'Positive', value: sentiments.positive, color: SENTIMENT_COLORS.positive },
    { name: 'Neutral', value: sentiments.neutral, color: SENTIMENT_COLORS.neutral },
    { name: 'Negative', value: sentiments.negative, color: SENTIMENT_COLORS.negative }
  ].filter(item => item.value > 0)

  const total = sentiments.positive + sentiments.neutral + sentiments.negative

  return (
    <div className="space-y-4">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-green-600">{sentiments.positive}</p>
          <p className="text-sm text-green-700">Positive</p>
          <p className="text-xs text-green-600 mt-1">
            {total > 0 ? ((sentiments.positive / total) * 100).toFixed(1) : 0}%
          </p>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-yellow-600">{sentiments.neutral}</p>
          <p className="text-sm text-yellow-700">Neutral</p>
          <p className="text-xs text-yellow-600 mt-1">
            {total > 0 ? ((sentiments.neutral / total) * 100).toFixed(1) : 0}%
          </p>
        </div>
        <div className="bg-red-50 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-red-600">{sentiments.negative}</p>
          <p className="text-sm text-red-700">Negative</p>
          <p className="text-xs text-red-600 mt-1">
            {total > 0 ? ((sentiments.negative / total) * 100).toFixed(1) : 0}%
          </p>
        </div>
      </div>
    </div>
  )
}