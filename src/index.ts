import { Engine } from './engine'
import { AsteroidEntity } from './entities'
import { GravityPlugin, CollisionPlugin } from './plugins'

window.addEventListener('load', () => {
  const engine = new Engine()

  engine.addPlugin(
    new CollisionPlugin({
      percent: 0.2,
      slop: 0.01,
    }),
  )
  engine.addPlugin(new GravityPlugin())

  for (let x = 0; x < 15; x++) {
    for (let y = 0; y < 15; y++) {
      engine.addEntity(
        new AsteroidEntity(400 + Math.random() * 600, 300 + Math.random() * 400),
      )
    }
  }

  // engine.addEntity(new AsteroidEntity(400, 400))
  // engine.addEntity(new AsteroidEntity(500, 450))

  engine.mount(document.getElementById('root'))
  engine.start()
})
