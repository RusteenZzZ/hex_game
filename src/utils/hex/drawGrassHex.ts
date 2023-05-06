const drawGrassHex = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
  drawHorizontalGrass(ctx, x - size/2, y, size)
  drawHorizontalGrass(ctx, x, y, size)
  drawHorizontalGrass(ctx, x + size/2, y, size)
  drawHorizontalGrass(ctx, x - size/5, y + size/2, size)
  drawHorizontalGrass(ctx, x + size/5, y + size/2, size)
}

const drawHorizontalGrass = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
  ctx.beginPath()
  ctx.moveTo(x, y)
  ctx.lineTo(x, y - size/4)
  ctx.strokeStyle = "rgb(0, 102, 0)"
  ctx.stroke()
}

export default drawGrassHex