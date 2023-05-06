import React, { FC, useContext, useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'

import '../styles/canvas.scss'
import { Context } from '..'
import Modal from './Modal'

const Canvas: FC = observer(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const {canvasState} = useContext(Context)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [modalText, setModalText] = useState<string>('')

  useEffect(() => {
    const canvas = canvasRef.current || null
    if(canvas) {

      const clickHandler = (e: MouseEvent) => {
        const hex = canvasState.getHexagonByCoordinates(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop)
        if(hex) {
          setModalText(hex.description)
          setShowModal(true)
        }
      }
      
      canvasState.draw(canvas.getContext('2d'))
      canvas.onmousedown = clickHandler

    }
  }, [])

  

  return (
    <>
      {
        showModal
          ? <Modal text={modalText} setShowModal={setShowModal}/>
          : <></>
      }
      <div className='canvas'>
        
        <canvas ref={canvasRef} width={900} height={600}/>
      </div>
    </>
  )
})

export default Canvas