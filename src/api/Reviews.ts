import { Review } from '@/models/Review';

const API_URL = 'https://flask-production-cb7c.up.railway.app';
export const createReview = async (review: any, id: number) => {
    console.log(review)
    const response = await fetch(API_URL + `/review/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(review)
    });
    return await response.json();
}