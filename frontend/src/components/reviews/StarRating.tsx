import { FaRegStar, FaStar } from 'react-icons/fa'

type Props={
    value: number
}
const StarRating = ({value}: Props) => {
    const placeholders = [0,1,2,3,4,5]
  return (
    <div className='flex gap-1 text-yellow-400'>
      {
        placeholders.map(r =>(
             r < value? <FaStar key={r} />: <FaRegStar key={r} />
        ))
      }
    </div>
  )
}

export default StarRating
