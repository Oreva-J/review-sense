import axios from "axios"



const API_URL = import.meta.env.VITE_API_URL || ''

export type Review = {
    id: number
    author: string
    rating: number
    comment: string
    createdAt: number
    expireAt: string
}

export type getReviewResponse = {
    summary: string
    reviews: Review[]
}

export type Props = {
    productId: number
}

export type GetSummaryResponse = {
    summary: string
}


export const ReviewsApi = {

    async summeriseReviews (productId: number){
        const { data } = await axios.post<GetSummaryResponse>(`${API_URL}api/products/${productId}/summarize`)
        console.log(data)

        return data
    },

    async fetchReviews (productId: number){
        const {data} = await axios.get<getReviewResponse>(`${API_URL}/api/products/${productId}/reviews`);
      
      return data
    }
}