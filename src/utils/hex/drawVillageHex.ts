const drawVillageHex = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
  drawHouse(ctx, x - size/2, y, size)
  drawHouse(ctx, x + size/4, y, size)
  drawHouse(ctx, x - size/10, y - size/2, size)
}

const drawHouse = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
  // Rectangle (House block)
  ctx.beginPath()
  ctx.rect(x, y, size/3, size/3)
  ctx.fillStyle = "rgb(225, 225, 225)"
  ctx.strokeStyle = "rgb(225, 225, 225)"
  ctx.fill()

  // Triangle (Roof)
  ctx.beginPath()
  ctx.moveTo(x - size/24, y)
  ctx.lineTo(x + size/6, y - size/6)
  ctx.lineTo(x + size/3 + size/24, y)
  ctx.closePath()
  ctx.fillStyle = "rgb(77, 40, 0)"
  ctx.fill()

  // Rectangle (Door)
  ctx.beginPath()
  ctx.rect(x + size/5 - size/24, y + size/12, size/3 - size/4.7, size/3 - size/12)
  ctx.fillStyle = "rgb(179, 92, 0)"
  ctx.fill()
}

export default drawVillageHex