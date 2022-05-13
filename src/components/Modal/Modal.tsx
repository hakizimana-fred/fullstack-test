import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import styles from './Modal.module.css'

export interface IModalProps {
  show: boolean
  width: string
  height: string
  children: React.ReactChild | React.ReactChild[] | string
}

export default function Modal({ show, width, height, children }: IModalProps) {
  // const el = useRef(document.createElement('div'))
  const [display, setDisplay] = useState(false)

  useEffect(() => {
    const el = document.createElement('div')
    setDisplay(true)
    const modalRoot: HTMLElement | null = document.getElementById('modal-root')
    modalRoot?.appendChild(el)
    return () => {
      modalRoot?.removeChild(el)
    }
  }, [])

  const modal = (
    <div style={{ width, height }} className={styles.modal}>
      {children}
    </div>
  )

  return show && display ? createPortal(modal, document?.body) : null
}
