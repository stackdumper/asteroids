import { Engine, Plugin } from '~/engine'

export class GravityPlugin extends Plugin {
  private distance = Math.pow(42, 2)

  public update(engine: Engine) {
    for (let i = 0; i < engine.entities.length; i++) {
      const e1 = engine.entities[i]

      for (let j = 0; j < engine.entities.length; j++) {
        if (i === j) continue

        const e2 = engine.entities[j]

        let distance = e2.position.distanceSquared(e1.position)
        if (distance < this.distance) {
          continue
        }

        let direction = e2.position
          .clone()
          .subtract(e1.position.x, e1.position.y)
          .normalize()
          .divide(distance, distance)
          .multiply(25, 25)

        e1.velocity.add(direction.x, direction.y)
      }
    }
  }
}
