import React, {FC} from 'react'

interface ButtonProps {
  text: string
  onClickHandler: (arg: any) => any
}

const Button: FC<ButtonProps> = ({text, onClickHandler}) => {
  return (
    <div>
      <button onClick={onClickHandler}>{text}</button>
    </div>
  )
}

export default Button