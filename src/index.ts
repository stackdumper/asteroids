import { Engine } from './engine'
import { AsteroidEntity } from './entities'
import { PhysicsPlugin, GravityPlugin } from './plugins'

window.addEventListener('load', () => {
  const engine = new Engine()

  engine.addPlugin(new PhysicsPlugin())
  engine.addPlugin(new GravityPlugin())

  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      engine.addEntity(new AsteroidEntity(Math.random() * 800, Math.random() * 800))
    }
  }

  engine.mount(document.getElementById('root'))
  engine.start()
})
