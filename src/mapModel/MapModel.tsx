import Hex from "../types/hex"
import WorldMap from "../types/map"
import drawHex from "../utils/hex/drawHex"

class MapModel {
  private worldMap: WorldMap
  constructor(rawMap: WorldMap) {
    this.worldMap = rawMap
  }

  public getMap() {
    return this.worldMap.map
  }

  public rowCount() {
    return this.worldMap.map.length
  }

  public colCount() {
    return this.worldMap.map[0].length
  }

  public getStartX() {
    return this.worldMap.startX
  }

  public getStartY() {
    return this.worldMap.startY
  }

  public draw(ctx: CanvasRenderingContext2D, hexside: number) {
    const x = this.worldMap.startX
    const y = this.worldMap.startY
    const hexHeight = Math.sqrt(hexside**2 - (hexside/2)**2) * 2

    let isLower = false
    this.worldMap.map.forEach((mapColumn, column) => {
      mapColumn.forEach((hex, row) => {       
        drawHex(
          x + row * hexside * 1.5,
          y + column * hexHeight + (isLower ? hexHeight / 2 : 0),
          hexside,
          ctx,
          hex.type
        )
        isLower = !isLower
      })
    })
  }

  public setHex(hex: Hex, col: number, row: number) {
    this.worldMap.map[row - 1][col - 1] = hex
  }

  public getHex(col: number, row: number) {
    return this.worldMap.map[row - 1][col - 1]
  }
}

export default MapModel