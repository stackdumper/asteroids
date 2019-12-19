import * as PIXI from 'pixi.js'
import { Entity } from '~/engine'
import { AABB, Vec2 } from '~/math'

export class AsteroidEntity extends Entity {
  public aabb = new AABB(new Vec2(0, 0), new Vec2(6, 6))

  constructor(x: number, y: number) {
    super()

    this.position.set(x, y)
  }
}
