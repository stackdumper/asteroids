import * as PIXI from 'pixi.js'
import { Entity } from '~/engine'

export class AsteroidEntity extends Entity {
  public graphics = new PIXI.Graphics()
    .beginFill(0xffffff)
    .drawRect(0, 0, 32, 32)
    .endFill()

  constructor(x: number, y: number) {
    super()

    this.position.set(x, y)
  }
}
