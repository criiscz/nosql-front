import styles from './style.module.css';

export default function SearchBar(props: SearchBarProps) {
  return (
    <div className={props.className || styles.main}>
      <input type="text" placeholder={props.placeholder} onInput={(e) => {
        props.onChange(e.currentTarget.value)
      }}/>
    </div>
  )
}

interface SearchBarProps {
  placeholder: string
  className?: string
  onChange: (name: string) => void
}