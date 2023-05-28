import styles from './styles.module.css'

export default function LoadingPage() {
  return (
    <div className={styles.loading}>
      <div className={styles.loading__content}>

        <div className={styles.dot_spinner}>
          <div className={styles.dot_spinner__dot}></div>
          <div className={styles.dot_spinner__dot}></div>
          <div className={styles.dot_spinner__dot}></div>
          <div className={styles.dot_spinner__dot}></div>
          <div className={styles.dot_spinner__dot}></div>
          <div className={styles.dot_spinner__dot}></div>
          <div className={styles.dot_spinner__dot}></div>
          <div className={styles.dot_spinner__dot}></div>
        </div>
        <div className={styles.loading__content_title}>
          <h1>Cargando</h1>
        </div>

      </div>
    </div>
  )
}