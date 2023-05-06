import React, { FC } from 'react'

import '../styles/modal.scss'

interface ModalProps {
  text: string
  setShowModal: (arg: boolean) => any
}

const Modal: FC<ModalProps> = ({text, setShowModal}) => {

  const clickOnBackgroundHandler = () => {
    setShowModal(false)
  }

  const clickOnModalHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }

  return (
    <div className="modal" onClick={clickOnBackgroundHandler}>
      <div className="modalBody" onClick={clickOnModalHandler}>
        {text}
      </div>
    </div>
  )
}

export default Modal