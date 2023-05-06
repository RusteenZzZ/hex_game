import drawDesertHex from "./drawDesertHex"
import drawForestHex from "./drawForestHex"
import drawGrassHex from "./drawGrassHex"
import drawMountainHex from "./drawMountainHex"
import drawVillageHex from "./drawVillageHex"

const drawHex = (x: number, y: number, size: number, ctx: CanvasRenderingContext2D, type: string) => {
  let draw = null
  switch(type) {
    case "sea":
      return
    case "mountain":
      ctx.fillStyle = "rgb(100, 100, 100)"
      draw = drawMountainHex
      break
    case "grass":
      ctx.fillStyle = "rgb(70, 180, 90)"
      draw = drawGrassHex
      break
    case "desert":
      ctx.fillStyle = "rgb(200, 200, 50)"
      draw = drawDesertHex
      break
    case "village":
      ctx.fillStyle = "rgb(70, 180, 90)"
      draw = drawVillageHex
      break
    case "forest":
      ctx.fillStyle = "rgb(70, 180, 90)"
      draw = drawForestHex
      break
    default:
      console.log("Not recognised type...")
      return
  }

  ctx.beginPath();
  ctx.moveTo(x + size * Math.cos(0), y + size * Math.sin(0));

  for (let i = 0; i < 7; i++) {
    ctx.lineTo(x + size * Math.cos(i * 2 * Math.PI / 6), y + size * Math.sin(i * 2 * Math.PI / 6));
  }
  
  ctx.fill()
  ctx.lineWidth = 4
  ctx.strokeStyle = "rgb(58, 58, 58)"
  ctx.stroke()

  draw(ctx, x, y, size)
}

export default drawHex