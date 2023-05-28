'use client'
import styles from './styles.module.css';
import {useMutation} from "react-query";
import {createReview} from "@/api/Reviews";
import {useContext, useState} from "react";
import {ReviewContext} from "@/context/ReviewContext";
import {Review} from "@/models/Review";

export default function Page({params}: { params: { id: number } }) {

  // generate a unique id for the review (number)
  const nId = Math.floor(Math.random() * 1000)


  const {reviews, setReviews} = useContext(ReviewContext)
  const [review, setReview] = useState({
    userName: '',
    text: '',
    rating: 0.0,
    productId: ''
  })

  const {mutate, isLoading} = useMutation(
    'review',
    () => createReview({
      username: review.userName,
      text: review.text,
      rating: Number(review.rating),
      date: new Date().toISOString(),
      id: nId,
    }, params.id),
    {
      onSuccess: () => {
        setReviews([...reviews, {
          userName: review.userName,
          text: review.text,
          rating: Number(review.rating),
          date: new Date().toISOString(),
          id: nId,
        }])
      }
    })

  const submit = async (e: any) => {
    e.preventDefault();
    mutate()
  }

  const handleChange = (e: any) => {
    const {name, value} = e.target;
    setReview({...review, [name]: value})
  }


  return (
    <div className={styles.newCard}>
      <h2>Nueva Review</h2>
      <form onSubmit={submit}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Nombre</label>
          <input type="text" name="userName" id="name" required value={review.userName} onChange={handleChange}/>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="text">Review</label>
          <textarea name="text" id="text" cols={30} rows={10} required value={review.text}
                    onChange={handleChange}></textarea>
        </div>
        <div className={styles.formGroup_h}>
          <div className={styles.formGroup}>
            <label htmlFor="rating">Rating</label>
            <input type="number" name="rating" id="rating" max={5.0} min={0.0} required value={review.rating}
                   onChange={handleChange}/>
          </div>
          <div className={styles.formGroup}>
            <button type="submit">Agregar</button>
          </div>
        </div>
      </form>
    </div>
  )
}