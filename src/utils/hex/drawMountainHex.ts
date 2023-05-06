const drawMountainHex = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
  drawTriangularMountain(ctx, x - size/6, y, size)
  drawTriangularMountain(ctx, x + size/6, y + size/8, size)
}

const drawTriangularMountain = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
  ctx.beginPath()
  ctx.strokeStyle = "rgb(36, 35, 31)"
  ctx.moveTo(x - size/2, y + size/4);
  ctx.lineTo(x, y - size/2)
  ctx.lineTo(x + size/2, y + size/4)
  ctx.stroke()
  ctx.fillStyle = "rgb(100, 100, 100)"
  ctx.strokeStyle = "rgb(100, 100, 100)"
  ctx.closePath()
  ctx.fill()
}

export default drawMountainHex