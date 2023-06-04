import React, {FC} from 'react'
import Button from './Button'
import { NULL } from 'sass'

interface GameControlsProps {
  randomizeHandler: (arg: any) => any
}

const GameControls: FC<GameControlsProps> = ({randomizeHandler}) => {
  return (
    <div>
      <Button text='Load' onClickHandler={() => {alert('Loaded')}}/>
      <Button text='Save' onClickHandler={() => {alert('saved')}}/>
      <Button text='Randomize' onClickHandler={randomizeHandler}/>
    </div>
  )
}

export default GameControls