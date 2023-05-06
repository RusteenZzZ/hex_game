const drawForestHex = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
  drawTree(ctx, x - size/3, y + size/8, size)
  drawTree(ctx, x, y + size/2, size)
  drawTree(ctx, x + size/3, y + size/8, size)
}

const drawTree = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
  // Line
  ctx.beginPath()
  ctx.moveTo(x, y)
  ctx.lineTo(x, y - size/5)
  ctx.strokeStyle = "rgb(153, 79, 0)"
  ctx.stroke()
  
  // Triangle
  ctx.beginPath()
  ctx.moveTo(x - size/6, y - size/5)
  ctx.lineTo(x, y - size/5 - size/2)
  ctx.lineTo(x + size/6, y - size/5)
  ctx.fillStyle = "rgb(0, 128, 0)"
  ctx.fill()
}

export default drawForestHex