import * as PIXI from 'pixi.js'
import { Entity, Plugin } from '.'

export class Engine {
  public app: PIXI.Application
  public entities: Entity[]
  public plugins: Plugin[]

  constructor() {
    // initialize app
    this.app = new PIXI.Application({
      antialias: true,
      resolution: 1,
    })

    // initialize entities and plugins
    this.entities = []
    this.plugins = []
  }

  public mount(element: HTMLElement) {
    element.appendChild(this.app.view)

    this.app.resizeTo = element

    this.app.resize()
  }

  public update(dt: number) {
    for (const entity of this.entities) {
      entity.update(this, dt)
    }

    // physics
    for (const plugin of this.plugins) {
      plugin.update(this, dt)
    }
  }

  public start() {
    this.app.ticker.add(this.update.bind(this))
  }

  public addEntity(entity: Entity) {
    entity.initialize(this)

    this.entities.push(entity)

    this.app.stage.addChild(entity.graphics)
  }

  public removeEntity(entity: Entity) {
    entity.deinitialize(this)

    this.entities = this.entities.filter((e) => e !== entity)
  }

  public addPlugin(plugin: Plugin) {
    plugin.initialize(this)

    this.plugins.push(plugin)
  }

  public removePlugin(plugin: Plugin) {
    plugin.deinitialize(this)

    this.plugins = this.plugins.filter((p) => p !== plugin)
  }
}
