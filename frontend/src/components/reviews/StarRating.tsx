import { Star } from 'lucide-react'

type Props = {
    value: number
    showNumber?: boolean
}

const StarRating = ({ value, showNumber = false }: Props) => {
    const stars = [1, 2, 3, 4, 5]
    
    return (
        <div className='flex items-center gap-1'>
            <div className="flex gap-0.5">
                {stars.map(star => (
                    <Star 
                        key={star}
                        className={`h-5 w-5 ${
                            star <= value 
                                ? 'fill-yellow-400 text-yellow-400' 
                                : 'text-gray-300'
                        }`}
                    />
                ))}
            </div>
            {showNumber && (
                <span className="text-sm font-semibold text-gray-700 ml-1">
                    {value.toFixed(1)}
                </span>
            )}
        </div>
    )
}

export default StarRating