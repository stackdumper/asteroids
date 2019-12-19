import { Engine } from './engine'
import { AsteroidEntity, BombEntity } from './entities'
import { GravityPlugin, CollisionPlugin, ExplosionPlugin } from './plugins'

window.addEventListener('load', () => {
  const engine = new Engine()

  engine.addPlugin(
    new GravityPlugin({
      intensity: 10,
    }),
  )
  engine.addPlugin(
    new CollisionPlugin({
      percent: 0.1,
      slop: 0.01,
    }),
  )
  engine.addPlugin(new ExplosionPlugin())

  for (let x = 0; x < 15; x++) {
    for (let y = 0; y < 15; y++) {
      engine.addEntity(
        new AsteroidEntity(
          400 + Math.random() * 700,
          200 + Math.random() * 500,
          Math.random() * 4 - 2,
          Math.random() * 4 - 2,
        ),
      )
    }
  }

  window.addEventListener('click', (e) => {
    for (let x = 0; x < 2; x++) {
      for (let y = 0; y < 2; y++) {
        const bomb = new BombEntity(
          e.x + x * 10 - 5,
          e.y + y * 10 - 5,
          0,
          0,
          0xff0000,
          70,
          150,
        )

        // bomb.triggered = true
        engine.addEntity(bomb)
      }
    }
  })

  engine.mount(document.getElementById('root'))
  engine.start()
})
