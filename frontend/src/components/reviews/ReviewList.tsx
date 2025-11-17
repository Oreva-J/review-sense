
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { ReviewsApi, type getReviewResponse, type GetSummaryResponse, type Props } from "./reviewsApi"
import LoadingSkeleton from "./LoadingSkeleton"
import StarRating from "./StarRating"
import { HiSparkles } from "react-icons/hi"
import { Button } from "../ui/button"

const ReviewList = ({productId}: Props) => {
    const queryClient = useQueryClient()
    const { data: getReviews, error, isLoading } = useQuery<getReviewResponse>({
      queryKey: ['reviews', productId],
      queryFn: () => ReviewsApi.fetchReviews(productId)
    })

    const summaryMutation = useMutation<GetSummaryResponse>({
      mutationFn: () => ReviewsApi.summeriseReviews(productId),
      onSuccess: () => {
        // Invalidate and refetch the reviews query to get the updated summary from server
        queryClient.invalidateQueries({ queryKey: ['reviews', productId] })
      }
    })

    const currentSummary = getReviews?.summary ?? summaryMutation.data?.summary

    if(isLoading){
      return( <div className="flex flex-col gap-5"> {
        [1,2,3].map((it) =>(
          <LoadingSkeleton key={it}/>
        ))
      }
      </div> )
    }

    if (error) {
      return<div className="text-2xl text-red-600 p-10 m-10">could not fetch reviews, try again</div>
    }

    if(!getReviews?.reviews.length){
      return null
    }


  return (
    <div>
        <div className="mb-2">
        {currentSummary ? <p> {currentSummary} </p> :  <div className="py-3"><Button className="cursor-pointer" onClick={()=> summaryMutation.mutate()} disabled={summaryMutation.isPending}> <HiSparkles /> Summarize </Button> {summaryMutation.isPending && <LoadingSkeleton />}</div>
        }
        {summaryMutation.isError && <p className="text-red-400">could not summarise reviews try again</p> }

      </div>
      <div className="flex flex-col gap-5">{getReviews?.reviews.map((items, index)=>(
        <div key={index} className="">
            <p className="font-semibold">{items.author}</p>
            <p><StarRating value={items.rating} /></p>
            <p  className="py-5">{items.comment}</p>
    
        </div>
      ))}</div>
    </div>
  )
}

export default ReviewList
