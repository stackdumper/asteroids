import { Engine, Plugin } from '~/engine'

interface GravityPluginOptions {
  intensity: number
}

export class GravityPlugin extends Plugin {
  private distance = Math.pow(18, 2)

  constructor(private options: GravityPluginOptions) {
    super()
  }

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
          .multiply(this.options.intensity, this.options.intensity)
          .multiply(b.mass, b.mass)

        a.velocity.addVec(direction)
      }
    }
  }
}
