import * as PIXI from 'pixi.js'
import { Entity } from '~/engine'
import { AABB, Vec2 } from '~/math'

export class AsteroidEntity extends Entity {
  public aabb = new AABB(new Vec2(0, 0), new Vec2(16, 16))

  constructor(x: number, y: number, vx: number, vy: number, color = 0xffffff) {
    super()

    this.position.set(x, y)
    this.velocity.set(vx, vy)
    this.graphics = new PIXI.Graphics()
      .lineStyle(2, 0xffffff)
      .beginFill(0xe8eef2)
      .drawRoundedRect(
        this.aabb.min.x,
        this.aabb.min.y,
        this.aabb.max.x,
        this.aabb.max.y,
        2,
      )
      .endFill()
  }
}
