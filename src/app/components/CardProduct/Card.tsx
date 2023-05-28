import styles from './style.module.css';
import {Product} from "@/models/Product";
import {Icon} from "@iconify/react";

export default function Card({product, onClick}: { product: Product , onClick: (arg:any) => void}) {

  return (
    <div className={styles.card} onClick={() => onClick(product.index)}>
      <div className={styles.card__top_top}>
        <div className={styles.card__top}>
          <div className={styles.card__top_title}>
            <h3>{product.productName || product.product_name}</h3>
          </div>
          <div className={styles.card__top_desc}>
            <p>{product.description}</p>
          </div>
        </div>
        <div className={styles.card__badges}>
          <div className={product.inStock ? styles.card__badges_inStock : styles.card__badges_inStock_out}>
            {product.inStock ? <><Icon icon={'ri:checkbox-circle-fill'} color={'#4bd37b'}/><span>Disponible</span></>  :
              <><Icon icon={'ri:close-circle-fill'} color={'#d34b4b'}/><span>Agotado</span></>}
          </div>
          <div className={styles.card__badges_category}>
            <span>{product.category}</span>
          </div>
        </div>
      </div>
      <div className={styles.card__bottom}>
        <div className={styles.card__bottom_rating}>
          <div className={styles.card__bottom_rating_stars}>{
            Array.from(Array(Math.floor(product.rating)).keys()).map((index) => {
              return <span key={index} className={styles.card__botton_rating_stars_star}>
                <Icon icon="ri-star-fill" color={'#FFC702'}/>
              </span>
            })
          }</div>
          <div className={styles.card__bottom_rating_reviews}>
            <span><span className={styles.card__bottom_rating_number}>{product.reviews?.length || 0}</span> Reviews</span>
          </div>
        </div>
        <div className={styles.card__bottom_price}>
          <span>{product.price}</span>
        </div>
      </div>
    </div>
  )
}