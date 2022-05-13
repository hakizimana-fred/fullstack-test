import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import styles from './Nav.module.css'

interface INavProps {
  next: () => void
  back: () => void
  pages: string
  enabled: boolean[]
}

export default function Nav({ next, back, pages, enabled }: INavProps) {
  return (
    <div className={styles.main}>
      <button
        style={{ visibility: enabled?.[0] ? 'visible' : 'hidden' }}
        type="button"
        className={styles.leftButton}
        onClick={() => {
          back()
        }}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <div>{pages}</div>

      <button
        style={{ visibility: enabled?.[1] ? 'visible' : 'hidden' }}
        type="button"
        className={styles.rightButton}
        onClick={() => {
          next()
        }}>
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </div>
  )
}
