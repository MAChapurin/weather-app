import styles from './Loader.module.css'

export function Loader() {
  return (
    <div className={styles['lds-ellipsis']}><div></div><div></div><div></div><div></div></div>
  )
}
