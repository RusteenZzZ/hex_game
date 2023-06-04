import { FC, useContext, useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'

import '../styles/canvas.scss'
import { Context } from '..'
import Modal from './Modal'
import GameControls from './GameControls'
import { useRender } from '../hooks/useRender'

const HexCrawler: FC = observer(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const render = useRender()
  const {canvasState} = useContext(Context)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [modalText, setModalText] = useState<string>('')
  
  useEffect(() => {
    const canvas = canvasRef.current || null
    if(canvas) {      
      const clickHandler = (e: MouseEvent) => {
        const hex = canvasState.getHexagonByCoordinates({x: e.pageX - canvas.offsetLeft, y: e.pageY - canvas.offsetTop})
        if(hex) {
          setModalText(hex.description)
          setShowModal(true)
        }
      }
      
      canvasState.draw(canvas.getContext('2d'), canvas.width, canvas.height)
      canvas.onmousedown = clickHandler
    }
  })

  return (
    <>
      {
        showModal
          ? <Modal text={modalText} setShowModal={setShowModal}/>
          : <></>
      }
      <GameControls randomizeHandler={() => {canvasState.randomizeBySwapping2Hexes(render)}}/>
      <div className='canvas'>
        <canvas ref={canvasRef} width={900} height={600}/>
      </div>
    </>
  )
})

export default HexCrawler