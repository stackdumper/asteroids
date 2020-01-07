import { Engine, Plugin } from '~/engine'
import { BombEntity } from '~/entities'

export class ExplosionPlugin extends Plugin {
  public update(engine: Engine, dt: number) {
    for (let i = 0; i < engine.entities.length; i++) {
      const e1 = engine.entities[i]
      if (!(e1 instanceof BombEntity)) continue

      const a = e1.aabb.offset(e1.position)

      for (let j = 0; j < engine.entities.length; j++) {
        const e2 = engine.entities[j]

        if (i === j) continue
        if (e2 instanceof BombEntity) continue

        const b = e2.aabb.offset(e2.position)

        if (a.collides(b)) {
          // @ts-ignore
          engine.entities[i].triggered = true
        }
      }
    }
  }
}
