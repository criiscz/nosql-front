'use client'
import {getProductById} from "@/api/Products";
import {useQuery} from "react-query";
import styles from './style.module.css'
import {Icon} from "@iconify/react";
import ReviewCard from "@/app/[id]/components/ReviewCard/ReviewCard";
import {ReviewContext} from "@/context/ReviewContext";
import Image from "next/image";
import Link from "next/link";
import {useContext} from "react";
export default function LayoutProduct({params, children}: { params: { id: string }, children: any }) {


  const {reviews, setReviews} = useContext(ReviewContext)
  const {data, isLoading} = useQuery(
    'product',
    () => getProductById(params.id),
    {
      enabled: params.id != null,
      onSuccess: (data) => {
        setReviews(data.reviews)
      }
    }
  )


  if (isLoading) {
    return (
      <div className={styles.loading}>
        <Icon icon={'ri:loader-4-fill'} color={'#4bd3c3'} className={styles.loading_icon}/>
      </div>
    )
  }

  return (

    <div className={styles.main}>
      <div className={styles.top}>
        <div className={styles.home}>
          <Link href={'/'}>
            <Icon icon={'ri:arrow-left-line'} className={styles.home_icon}/>
          </Link>
        </div>
        <div className={styles.title}>{data?.productName || data?.product_name}</div>
      </div>
      <div className={styles.header}>
        <div className={styles.header__image}>
          <img src={data!.imageUrl} alt={'Image'} width={300} height={300}/>
        </div>
        <div className={styles.header__data}>
          <div className={styles.header__data_desc}>{data?.description}</div>
          <div className={styles.header__data_badges}>
            <div className={styles.header__data_badges_item}>
              {
                data?.inStock ?
                  <div className={styles.header__data_badges_item_inStock}>
                    <Icon icon={'ri:checkbox-circle-fill'} color={'#4bd37b'}/>
                    <span>En Stock</span>
                  </div>
                  :
                  <div className={styles.header__data_badges_item_outStock}>
                    <Icon icon={'ri:close-circle-fill'} color={'#ce4e4e'}/>
                    <span>Agotado</span>
                  </div>
              }
            </div>
            <div className={styles.header__data_badges_item}>
              <div className={styles.header__data_badges_item_category}>
                <Icon icon={'ri:price-tag-3-fill'} color={'#4bd3c3'}/>
                <span>{data?.category}</span>
              </div>
            </div>
          </div>
          <div className={styles.header__data_info}>
            <div className={styles.header__data_info_rating} title={data!.rating + '' || 'no rating'}>
              Rating
              <div className={styles.header__data_info_rating_stars}>
                {
                  Array.from(Array(Math.floor(data!.rating || 0)).keys()).map((index) => {
                    return <span key={index} className={styles.header__data_info_rating_stars_star}>
                      <Icon icon="ri-star-fill" color={'#FFC702'}/>
                    </span>
                  })
                }
              </div>
            </div>
            <div className={styles.header__data_info_price}>
              Precio
              <span>{data?.price}</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.reviews}>
        <div>
          <div className={styles.reviews__top}>
            <div className={styles.reviews__top_title}>Reviews</div>
            <div className={styles.reviews__top_new}>
              <Link href={`/${params.id}/new`} className={styles.reviews__top_new_button}>
                <Icon icon={'ri:add-circle-fill'}/>
                Crear Nueva Review</Link>
            </div>
          </div>
          <div className={styles.reviews__content}>
            {
              reviews.map((review: any, index: number) => {
                return <ReviewCard key={index} review={review}/>
              })
            }
          </div>
        </div>
        <div className={styles.reviews__new}>
          {children}
        </div>
      </div>
    </div>
  )
}