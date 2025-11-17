import type { LucideIcon } from "lucide-react"



type StatsCardProps = {
  title: string
  value: string | number
  icon: LucideIcon
  iconColor?: string
}

export default function StatsCard({ title, value, icon: Icon, iconColor = 'text-blue-600' }: StatsCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <Icon className={`h-12 w-12 ${iconColor} opacity-75`} />
      </div>
    </div>
  )
}