import { makeAutoObservable } from "mobx";

import WorldMap from "../types/map";
import Hex from "../types/hex";
import XYCoords from "../types/XYCoords";
import CRCoords from "../types/CRCoords";
import MapModel from "../mapModel/MapModel";

export default class CanvasState {
  private mapModel
  private hexside = 40
  private hexWidth: number
  private hexHeight: number

  constructor(worldMapRaw: WorldMap) {
    makeAutoObservable(this, {}, {autoBind: true})
    this.mapModel = new MapModel(worldMapRaw)
    const { hHex, wHex } = this.getHexSize(this.hexside);
    this.hexWidth = wHex
    this.hexHeight = hHex
  }

  public getHexagonByCoordinates(clickedPoint: XYCoords): Hex | null {
    const crCeiledEstimatedHex = this.getEstimatedHexRC(clickedPoint);
         
    const neighbours = this.getSurroundingsOfHexCR(crCeiledEstimatedHex);

    const crNeighbour = this.getCRofClosestHexInSurrounding(neighbours, clickedPoint);
    
    try {
      const hex = this.mapModel.getMap()[crNeighbour.row - 1][crNeighbour.col - 1]

      if(hex === undefined) {
        console.log("Bad click");
        return null
      }
      return hex
    } catch(e) {
      console.log("Bad click");
      return null
    }
  }

  private getXYfromCenterOfTopLeftHex(clickedPoint: XYCoords): XYCoords {
    let xFromTLHex = clickedPoint.x - this.mapModel.getStartX() + this.hexside - this.hexside / 4;
    let yFromTLHex = clickedPoint.y - this.mapModel.getStartY();
    return { x: xFromTLHex, y: yFromTLHex };
  }

  private getHexSize(side: number) {
    const wHex = side * 1.5;
    const hHex = 2 * Math.sqrt(side ** 2 - (side / 2) ** 2);
    return {hHex,wHex}
  }

  private getCRofClosestHexInSurrounding(neighbours: CRCoords[], clickedPoint: XYCoords): CRCoords {
    let crClosestHex: CRCoords = {row: -1, col: -1}

    let min_distance = this.hexside * 10; // very big number
    
    neighbours.forEach(crNeighbour => {
      const neighbourCenter = this.getXYfromCR(crNeighbour);
      const dist = this.calcDistance(neighbourCenter, clickedPoint);
      
      if (dist < min_distance) {
        min_distance = dist;
        crClosestHex = crNeighbour
      }
    });
    
    return crClosestHex;
  }

  private calcDistance(a: XYCoords, b: XYCoords): number {
    return Math.sqrt((a.y - b.y) ** 2 + (a.x - b.x) ** 2);
  }

  private getXYfromCR(coords: CRCoords): XYCoords {
    const y_center = this.mapModel.getStartY() + (coords.row - 1) * this.hexHeight +
      + ((coords.col % 2 === 1) ?
       0 // The normal column
       :
       (this.hexHeight / 2)); // The column shifted down
    const x_center = this.mapModel.getStartX() + (coords.col - 1) * (this.hexWidth);
    return { x: x_center, y: y_center };
  }

  private getEstimatedHexRC(clickedPoint: XYCoords): CRCoords {
    const XYFromtTopLeft = this.getXYfromCenterOfTopLeftHex(clickedPoint);

    XYFromtTopLeft.x = XYFromtTopLeft.x / this.hexWidth;
    if (XYFromtTopLeft.x % 2 < 1) {
      XYFromtTopLeft.y = XYFromtTopLeft.y + Math.sqrt(this.hexside ** 2 - (this.hexside / 2) ** 2);
    }
    XYFromtTopLeft.y = XYFromtTopLeft.y / this.hexHeight;

    const ceiled_y = Math.ceil(XYFromtTopLeft.y);
    const ceiled_x = Math.ceil(XYFromtTopLeft.x);
    return {row: ceiled_y, col: ceiled_x};
  }

  private getSurroundingsOfHexCR(crHex: CRCoords): Array<CRCoords> {
    const neighbours = [];
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        neighbours.push({col: crHex.col + j, row: crHex.row + i});
      }
    }
    return neighbours;
  }

  public draw(ctx: CanvasRenderingContext2D | null, canvasWidth: number, canvasHeight: number) {
    if(!ctx) {
      console.log('ctx is null')
      return
    }

    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    this.mapModel.draw(ctx, this.hexside)
  }

  public randomizeBySwapping2Hexes(rerender: () => void) {
    let hex1: CRCoords = {col: 1, row: 1}
    let hex2: CRCoords = {col: 2, row: 2}
    let hex1content = this.mapModel.getHex(hex1.col, hex1.row)
    this.mapModel.setHex(this.mapModel.getHex(hex2.col, hex2.row), hex1.col, hex1.row)
    this.mapModel.setHex(hex1content, hex2.col, hex2.row)
    
    
    rerender()
  }
}