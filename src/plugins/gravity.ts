import { Engine, Plugin } from '~/engine'

export class GravityPlugin extends Plugin {
  private distance = Math.pow(42, 2)

  public update(engine: Engine) {
    for (let i = 0; i < engine.entities.length; i++) {
      const a = engine.entities[i]

      for (let j = 0; j < engine.entities.length; j++) {
        if (i === j) continue

        const b = engine.entities[j]

        let distance = b.position.distanceSquared(a.position)
        if (distance < this.distance) {
          continue
        }

        let direction = b.position
          .clone()
          .subtractVec(a.position)
          .normalize()
          .divide(distance, distance)
          .multiply(10, 10)

        a.velocity.addVec(direction)
      }
    }
  }
}
