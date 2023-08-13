import styles from './Background.module.css'

export function Background({src}) {
  return (
    <video className={styles.video} src={src} autoPlay muted loop></video>
  )
}
