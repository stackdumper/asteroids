import * as PIXI from 'pixi.js'
import { Engine } from '~/engine'
import { Vec2, AABB } from '~/math'

export abstract class Entity {
  public position: Vec2 = new Vec2(0, 0)
  public velocity: Vec2 = new Vec2(0, 0)

  public aabb: AABB
  public graphics: PIXI.Graphics
  public mass = 1

  public initialize(engine: Engine) {
    if (!this.graphics) {
      this.graphics = new PIXI.Graphics()
        .beginFill(0xffffff)
        .drawRect(this.aabb.min.x, this.aabb.min.y, this.aabb.max.x, this.aabb.max.y)
        .endFill()
    }
  }

  public deinitialize(engine: Engine) {
    this.graphics.destroy()
  }

  public update(engine: Engine, dt: number) {
    this.position.add(this.velocity.x * dt, this.velocity.y * dt)

    this.graphics.position.set(
      this.position.x - this.aabb.halfMax.x,
      this.position.y - this.aabb.halfMax.y,
    )
  }
}
