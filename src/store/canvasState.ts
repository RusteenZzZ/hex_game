import { makeAutoObservable } from "mobx";

import data from '../maps/map1.json';
import WorldMap from "../types/map";
import drawHex from "../utils/hex/drawHex";
import Hex from "../types/hex";

export default class CanvasState {
  private worldMap: WorldMap
  private size = 60

  constructor() {
    makeAutoObservable(this, {}, {autoBind: true})
    this.worldMap = data.worldMap
  }

  getHexagonByCoordinates(x: number, y: number): Hex | null {
    let est_x = x - this.worldMap.startX + this.size - this.size/4
    let est_y = y - this.worldMap.startY

    let calculated_y = -1
    let calculated_x = -1
    
    const hexWidth = this.size * 1.5
    const hexHeight = 2 * Math.sqrt(this.size**2 - (this.size/2)**2)

    est_x = est_x / hexWidth
    if(est_x % 2 < 1) {
      est_y = est_y + Math.sqrt(this.size**2 - (this.size/2)**2)
    }
    est_y = est_y / hexHeight

    const ceiled_y = Math.ceil(est_y)
    const ceiled_x = Math.ceil(est_x)
      
    const neighbours = []
    for(let i = -1; i <= 1; i++) {
      for(let j = -1; j <= 1; j++) {
        neighbours.push([ceiled_y + i, ceiled_x + j])
      }
    }
    
    let min_distance = this.size * 4
    console.log(ceiled_x, ceiled_y);
    
    neighbours.forEach(coords => {
      const y_center = this.worldMap.startY + ((coords[1] % 2 == 1) ? ((coords[0] - 1) * hexHeight) : ((coords[0] - 1) * hexHeight + hexHeight/2))
      const x_center = this.worldMap.startX + (coords[1] - 1) * hexWidth
      console.log(coords[1] + " " + coords[0] + " || " + x_center + " " + y_center + " || " + x + " " + y);
      const dist = Math.sqrt((y_center - y)**2 - (x_center - x)**2)
      if(dist < min_distance) {
        min_distance = dist
        calculated_y = ceiled_y
        calculated_x = ceiled_x
      }
    })
    console.log(calculated_x, calculated_y);
    
    try {
      return this.worldMap.map[calculated_y - 1][calculated_x - 1]
    } catch(e) {
      console.log("Bad click");
      return null
    }
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