import { useState } from "react"

export const useRender = () => {
  const [T, setT] = useState<boolean>(false)

  const render = () => {
    setT(!T)
  }
  
  return render
}