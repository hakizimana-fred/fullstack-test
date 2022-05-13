/* eslint-disable jsx-a11y/no-autofocus */
import React from 'react'
import Modal from '../Modal/Modal'

interface IProps {
  word: string
  show: boolean
  handleClose: () => void
}

export default function WordModal({ word, show, handleClose }: IProps) {
  return (
    <Modal width="100%" height="100%" show={show}>
      <button type="button" autoFocus onBlur={handleClose} tabIndex={0} className="modal">
        {word}
      </button>
    </Modal>
  )
}
