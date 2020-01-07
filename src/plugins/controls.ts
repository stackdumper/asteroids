import { Engine, Plugin } from '~/engine'
import { BombEntity } from '~/entities'

export class ControlsPlugin extends Plugin {
  private pressedKeys = new Set()
  private scale = 0

  constructor() {
    super()

    document.addEventListener('keydown', (e) => this.pressedKeys.add(e.keyCode))
    document.addEventListener('keyup', (e) => this.pressedKeys.delete(e.keyCode))
    document.addEventListener('wheel', (e) => {
      this.scale += e.deltaY * 0.0002
    })
  }

  public update(engine: Engine, dt: number) {
    if (this.pressedKeys.has(87)) {
      engine.viewport.position.y += 10
    } else if (this.pressedKeys.has(83)) {
      engine.viewport.position.y -= 10
    }
    if (this.pressedKeys.has(65)) {
      engine.viewport.position.x += 10
    } else if (this.pressedKeys.has(68)) {
      engine.viewport.position.x -= 10
    }
    // if (this.scale !== 0) {
    //   engine.app.stage.scale.x += this.scale
    //   engine.app.stage.scale.y += this.scale
    //   this.scale = 0
    // }
  }
}
