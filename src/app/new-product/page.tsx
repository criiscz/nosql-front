'use client'
import styles from './styles.module.css';
import {Icon} from "@iconify/react";
import Link from "next/link";
import {useState} from "react";
import {Product} from "@/models/Product";
import {createProduct} from "@/api/Products";
import {useMutation} from "react-query";
import {useRouter} from "next/navigation";
import {DotSpinner} from "@uiball/loaders";

export default function Page() {

  const nId = Math.floor((Math.random() * 100000) + 2000)

  const router = useRouter()

  const [product, setProduct] = useState({
    product_name: '',
    price: 0,
    description: '',
    imageUrl: '',
    index: nId,
    reviews: [],
    inStock: false,
    category: 'Home',
    rating: 0,
    features: []
  })

  const categories = ["Electronics", "Clothing", "Beauty", "Home", "Sports", "Toys"]

  const {mutate } = useMutation(
    'product',
    () => createProduct(product),
    {
      onSuccess: (data) => {
        router.push('/')
      }
    })
  const handleChange = (e: any) => {
    const {name, value} = e.target
    if (name == 'inStock') {
      setProduct({...product, [name]: !product.inStock})
      return
    }
    setProduct({...product, [name]: value})
  }

  const submit = (e: any) => {
    e.preventDefault()
    console.log(product)
    mutate()
  }

  return (
    <div className={styles.main}>
      <div className={styles.top}>

        <Link href={'/'}>
          <Icon icon={'ri:arrow-left-line'} className={styles.home_icon}/>
        </Link>
        <div className={styles.title}>Nuevo Producto</div>
      </div>
      <form className={styles.form} onSubmit={submit}>
        <div className={styles.form__group}>
          <label htmlFor="name">Nombre</label>
          <input type="text" id={'name'} name={'product_name'} placeholder={'Nombre'} onChange={handleChange}
                 value={product.product_name} required/>
        </div>
        <div className={styles.form__group}>
          <label htmlFor="price">Precio</label>
          <input type="number" id={'price'} name={'price'} placeholder={'Precio'} onChange={handleChange}
                 value={product.price} required min={0}/>
        </div>
        <div className={styles.form__group}>
          <label htmlFor="description">Descripción</label>
          <textarea name="description" id="description" cols={30} rows={10} placeholder={'Descripción'}
                    onChange={handleChange} value={product.description} required></textarea>
        </div>
        <div className={styles.form__group}>
          <label htmlFor="category">Categoría</label>
          <select name="category" id="category" onChange={handleChange} value={product.category} required>
            {
              categories.map((category, index) => {
                return <option key={index} value={category}>{category}</option>
              })
            }
          </select>
        </div>
        <div className={styles.form__group}>
          <label htmlFor="image">Imagen</label>
          <input type="text" id={'image'} name={'imageUrl'} placeholder={'Imagen'} onChange={handleChange}
                  value={product.imageUrl} required/>
        </div>
        <div className={styles.form__group}>
          <label htmlFor="stock">Disponible</label>
          <input type="checkbox" id={'stock'} name={'inStock'} onChange={handleChange} required checked={product.inStock}/>
        </div>
        <div className={styles.form__group}>
          <label htmlFor="rating">Rating</label>
          <input type="number" id={'rating'} name={'rating'} placeholder={'Rating'} required onChange={handleChange}
                  value={product.rating} min={0} max={5}/>
        </div>
        <div className={styles.form__group}>
          <button type={'submit'}>Guardar</button>
        </div>
      </form>
    </div>
  )
}