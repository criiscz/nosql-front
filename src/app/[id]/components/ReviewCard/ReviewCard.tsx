import styles from './style.module.css'
import {Review} from "@/models/Review";
import {Icon} from "@iconify/react";
export default function ReviewCard({review}: {review: Review}){

    return(
        <div className={styles.card}>
            <div className={styles.card__top}>
                <div className={styles.card__top_top}>
                    <div className={styles.card__top_id}>#{review.id + 1}</div>
                    <div className={styles.card__top_name}>{review.userName || review.username}</div>
                </div>
                <div className={styles.card__top_date}>{review.date}</div>
            </div>
            <div className={styles.card__content}>
                <p>{review.text}</p>
            </div>
            <div className={styles.card__stars}>
                {
                    Array.from(Array(Math.floor(review.rating)).keys()).map((index) => {
                        return <span key={index} className={styles.card__stars_star}>
                            <Icon icon="ri:star-fill" color={'#FFC702'}/>
                        </span>
                    })
                }
            </div>
        </div>
    )
}