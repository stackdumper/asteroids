import * as PIXI from 'pixi.js'
import { Entity } from '~/engine'
import { AABB, Vec2 } from '~/math'

export class BombEntity extends Entity {
  public aabb = new AABB(new Vec2(0, 0), new Vec2(4, 4))
  public triggered = false

  constructor(
    x: number,
    y: number,
    vx: number,
    vy: number,
    color = 0xff0000,
    public power = 25,
    public counter = 100,
  ) {
    super()

    this.position.set(x, y)
    this.velocity.set(vx, vy)
    this.graphics = new PIXI.Graphics()
      .beginFill(color)
      .drawRect(this.aabb.min.x, this.aabb.min.y, this.aabb.max.x, this.aabb.max.y)
      .endFill()
  }

  public update(engine, dt) {
    super.update(engine, dt)

    if (this.triggered && this.counter > 0) {
      this.counter -= 1
    }

    if (this.counter === 0) {
      engine.removeEntity(this)
      console.log('boom')

      for (let i = 0; i < engine.entities.length; i++) {
        const other = engine.entities[i]

        if (this === other) continue

        let distance = this.position.distance(other.position)

        const direction = this.position
          .clone()
          .subtractVec(other.position)
          .normalize()
          .divide(distance, distance)
          .multiply(this.power, this.power)

        other.velocity.subtractVec(direction)
      }
    }
  }
}
