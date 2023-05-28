'use client'
import styles from './style.module.css'
import SearchBar from "@/app/components/SearchBar/SearchBar";
import {Icon} from '@iconify/react';
import {useEffect, useState} from "react";
import {useQuery} from "react-query";
import {getAllProducts} from "@/api/Products";
import {Product} from "@/models/Product";
import dynamic from "next/dynamic";
import ProgressBar from "@/app/components/LoadingBar/ProgressBar";
import {useRouter} from "next/navigation";
import Link from "next/link";


const Card = dynamic(() => import("@/app/components/CardProduct/Card"), {ssr: false});

export default function Home() {

  const router = useRouter()

  const [products, setProducts] = useState(
    typeof window!=='undefined' && localStorage.getItem('products')
      ? JSON.parse(localStorage.getItem('products') || '')
      : []
  )

  const [filteredProducts, setFilteredProducts] = useState(products)
  const [search, setSearch] = useState('')
  const [progressValue, setProgressValue] = useState(0)

  const {isFetching} = useQuery(
    'products',
    () => getAllProducts(),
    {
      onSuccess: (data) => {
        setProducts(data)
        setFilteredProducts(data)
        localStorage.setItem('products', JSON.stringify(data))
      },
    }
  )

  useEffect(() => {
    if (products.length <= 0) {
      calculateProgress()
    }
    document.title = 'Productos'
  }, [products])

  const searchProduct = (name: string) => {
    if (name == '') {
      setFilteredProducts(products)
      return
    }
    const filteredProducts = products.filter((product: Product) => {
      if (product.product_name === undefined && product.productName === undefined) return false
      if (product.product_name?.toLowerCase().includes(name.toLowerCase()) ||
        product.productName?.toLowerCase().includes(name.toLowerCase())
      ) return true
    })
    setFilteredProducts(filteredProducts)
  }

  const calculateProgress = () => {
    const percent = 1
    let progress = 0
    const interval = setInterval(() => {
      progress += percent
      console.log(percent)
      setProgressValue(progress)
      if (progress >= 100) {
        clearInterval(interval)
      }
    }, 85)
  }

  const selectProduct = (id: number) => {
    router.push(`/${id}`)
  }

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1>Buscar Productos</h1>
        <SearchBar placeholder={'Buscar Productos'} onChange={searchProduct}/>
      </header>
      <section className={styles.body}>
        <Link href={'/new-product'} className={styles.body__createProduct}>
          <Icon icon={'ri:add-circle-fill'}/>
          <span>Crear Producto</span>
        </Link>
        <div className={styles.body__products}>
          {
            (isFetching && products.length == 0) && (
              <ProgressBar value={progressValue} maxValue={100} minValue={0} label={'Cargando productos'}/>) ||
            (filteredProducts.length == 0 && search.length > 0) && <div>No se encontraron productos</div> ||
            filteredProducts.slice(0, 1500).map((product: Product) => {
              return <Card key={product.index} product={product} onClick={selectProduct}/>
            })
          }
        </div>
      </section>
    </main>
  )
}

