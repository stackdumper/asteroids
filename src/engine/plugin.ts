import { Engine } from './engine'

export abstract class Plugin {
  public initialize(engine: Engine) {}
  public deinitialize(engine: Engine) {}
  public update(engine: Engine, dt) {}
}
