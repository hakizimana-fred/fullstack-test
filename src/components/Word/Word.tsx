/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react'
import WordModal from '../WordModal/WordModal'
import styles from './Word.module.css'

interface IProps {
  children: string
}

export default function Word({ children }: IProps) {
  const [show, setShow] = useState(false)
  return (
    <>
      <WordModal
        handleClose={() => {
          setShow(false)
        }}
        word={children}
        show={show}
      />
      <span
        className={styles.word}
        onClick={() => {
          setShow(true)
        }}>
        {children}
      </span>
    </>
  )
}
