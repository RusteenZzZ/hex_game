import { makeAutoObservable } from "mobx";

import data from '../maps/map1.json';
import WorldMap from "../types/map";
import drawHex from "../utils/hex/drawHex";
import Hex from "../types/hex";

export default class CanvasState {
  private worldMap: WorldMap
  private size = 40

  constructor() {
    makeAutoObservable(this, {}, {autoBind: true})
    this.worldMap = data.worldMap
  }

  getHexagonByCoordinates(x: number, y: number): Hex | null {
    x = x - this.worldMap.startX + this.size - this.size/4
    y = y - this.worldMap.startY
    
    x = x / (this.size * 1.5)
    if(x % 2 < 1) {
      y = y + Math.sqrt(this.size**2 - (this.size/2)**2)
    }

    y = y / (2 * Math.sqrt(this.size**2 - (this.size/2)**2))
    console.log(x, y);
    if(x % 1 < 0.2 || x % 1 > 0.8 || x < 0 || y < 0) {
      console.log("Bad click");
      return null
    }
    console.log(Math.ceil(x), Math.ceil(y));
    
    let hex = null
    try {
      hex = this.worldMap.map[Math.ceil(y) - 1][Math.ceil(x) - 1]
    } catch (e) {
      console.log("Bad click");
      return null
    }

    return hex
  }

  draw(ctx: CanvasRenderingContext2D | null) {
    if(!ctx) {
      console.log('ctx is null')
      return
    }
    
    let x = this.worldMap.startX
    let y = this.worldMap.startY
    const hexHeight = Math.sqrt(this.size**2 - (this.size/2)**2) * 2

    let isLower = false

    this.worldMap.map.forEach((mapColumn, column) => {
      mapColumn.forEach((hex, row) => {       
        drawHex(
          x + row * this.size * 1.5,
          y + column * hexHeight + (isLower ? hexHeight / 2 : 0),
          this.size,
          ctx,
          hex.type
        )
        isLower = !isLower
      })
    })
  }
}