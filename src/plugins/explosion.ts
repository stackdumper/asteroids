import { Engine, Plugin } from '~/engine'
import { BombEntity } from '~/entities'

export class ExplosionPlugin extends Plugin {
  public update(engine: Engine, dt: number) {
    for (const e1 of engine.entities) {
      if (!(e1 instanceof BombEntity)) continue

      const a = e1.aabb.offset(e1.position)

      for (const e2 of engine.entities) {
        if (e1 === e2) continue
        if (e2 instanceof BombEntity) continue

        const b = e2.aabb.offset(e2.position)

        if (a.collides(b)) {
          e1.triggered = true
        }
      }
    }
  }
}
