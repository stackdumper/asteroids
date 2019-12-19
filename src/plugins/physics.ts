import { Engine, Entity, Plugin } from '../engine'

export class PhysicsPlugin extends Plugin {
  public update(engine: Engine, dt: number) {
    for (const e1 of engine.entities) {
      for (const e2 of engine.entities) {
        if (e1 === e2) continue

        if (e1.collides(e2)) {
          // swap velocities
          ;[e1.velocity, e2.velocity] = [e2.velocity, e1.velocity]
        }
      }
    }
  }
}
