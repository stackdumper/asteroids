import { Engine } from './engine'
import { AsteroidEntity, BombEntity } from './entities'
import {
  GravityPlugin,
  CollisionPlugin,
  ExplosionPlugin,
  ControlsPlugin,
} from './plugins'

window.addEventListener('load', () => {
  const engine = new Engine()

  engine.addPlugin(
    new GravityPlugin({
      intensity: 10,
    }),
  )
  engine.addPlugin(
    new CollisionPlugin({
      percent: 0.5,
      slop: 0.1,
    }),
  )
  engine.addPlugin(new ExplosionPlugin())
  engine.addPlugin(new ControlsPlugin())

  for (let x = 0; x < 15; x++) {
    for (let y = 0; y < 15; y++) {
      engine.addEntity(
        new AsteroidEntity(
          300 + Math.random() * 1000,
          150 + Math.random() * 600,
          Math.random() * 4 - 2,
          Math.random() * 4 - 2,
        ),
      )
    }
  }

  window.addEventListener('click', (e) => {
    const scale = 0.7
    const velocity = 1.5
    const mass = 10
    ;[
      [1 * scale, 0, 0, 1 * velocity],
      // [0, 1 * scale, -1 * velocity, 0],
      [-1 * scale, 0, 0, -1 * velocity],
      // [0, -1 * scale, 1 * velocity, 0],
    ].map(([x, y, vx, vy]) => {
      const bomb = new BombEntity(150, 10)

      bomb.velocity.set(vx, vy)
      bomb.position.set(
        (e.x - engine.viewport.x) / engine.viewport.scale.x + x * 20,
        (e.y - engine.viewport.y) / engine.viewport.scale.y + y * 20,
      )
      bomb.mass = mass
      bomb.power = 100

      // bomb.triggered = true
      engine.addEntity(bomb)
    })
  })

  engine.mount(document.getElementById('root'))
  engine.start()
})
