import { Engine, Plugin } from '~/engine'

interface CollisionPluginOptions {
  slop: number
  percent: number
}

export class CollisionPlugin extends Plugin {
  constructor(private options: CollisionPluginOptions) {
    super()
  }

  public update(engine: Engine, dt: number) {
    for (const e1 of engine.entities) {
      const a = e1.aabb.offset(e1.position)

      for (const e2 of engine.entities) {
        if (e1 === e2) continue

        const b = e2.aabb.offset(e2.position)

        if (a.collides(b)) {
          const manifold = b.getManifold(a)

          const relativeVelocity = e2.velocity.clone().subtractVec(e1.velocity)
          const normalVector = relativeVelocity.dot(manifold.normal)

          if (normalVector < 0) continue

          let impulseScalar = (-(0.8 + 1) * normalVector) / 2
          let impulse = manifold.normal.clone().multiply(impulseScalar, impulseScalar)

          // velocity correction
          e1.velocity.subtractVec(impulse)
          e2.velocity.addVec(impulse)

          // position correction
          if (manifold.penetration > this.options.slop) {
            const correction = manifold.normal
              .clone()
              .multiply(manifold.penetration, manifold.penetration)
              .multiply(this.options.percent, this.options.percent)

            e1.position.addVec(correction)
            e2.position.subtractVec(correction)
          }
        }
      }
    }
  }
}
