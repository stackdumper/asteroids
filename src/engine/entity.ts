import * as PIXI from 'pixi.js'
import { Engine } from '~/engine'
import { Vec2 } from '~/math'

export abstract class Entity {
  public graphics: PIXI.Graphics = new PIXI.Graphics()
  public position: Vec2 = new Vec2(0, 0)
  public velocity: Vec2 = new Vec2(0, 0)

  public initialize(engine: Engine) {}

  public deinitialize(engine: Engine) {}

  public update(engine: Engine, dt: number) {
    this.position.add(this.velocity.x * dt, this.velocity.y * dt)

    this.graphics.position.set(this.position.x - 16, this.position.y - 16)
  }

  public collides(other: Entity) {
    const b1 = this.graphics.getBounds()
    const b2 = other.graphics.getBounds()

    return (
      b1.x + b1.width > b2.x &&
      b1.x < b2.x + b2.width &&
      b1.y + b1.height > b2.y &&
      b1.y < b2.y + b2.height
    )
  }
}
