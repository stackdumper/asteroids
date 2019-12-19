import * as PIXI from 'pixi.js'
import { Entity } from '~/engine'
import { AABB, Vec2 } from '~/math'

export class AsteroidEntity extends Entity {
  public aabb = new AABB(new Vec2(0, 0), new Vec2(4, 4))

  constructor(x: number, y: number, vx: number, vy: number, color = 0xffffff) {
    super()

    this.position.set(x, y)
    this.velocity.set(vx, vy)
    this.graphics = new PIXI.Graphics()
      .beginFill(color)
      .drawRect(this.aabb.min.x, this.aabb.min.y, this.aabb.max.x, this.aabb.max.y)
      .endFill()
  }
}
