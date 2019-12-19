import { Vec2 } from './vec-2'

interface Manifold {
  penetration: number
  normal: Vec2
}

export class AABB {
  public position: Vec2
  public halfMin: Vec2
  public halfMax: Vec2

  constructor(public min: Vec2, public max: Vec2) {
    this.halfMin = min.clone().divide(2, 2)
    this.halfMax = max.clone().divide(2, 2)
  }

  public offset(vec: Vec2) {
    return new AABB(this.min.clone().addVec(vec), this.max.clone().addVec(vec))
  }

  public collides(other: AABB) {
    return (
      this.min.x < other.max.x &&
      this.max.x > other.min.x &&
      this.min.y < other.max.y &&
      this.max.y > other.min.y
    )
  }

  public getManifold(other: AABB): Manifold {
    const normal = other.max.clone().subtractVec(this.max)

    let extentAX = this.halfMax.x - this.halfMin.x
    let extentBX = other.halfMax.x - other.halfMin.x

    let overlapX = extentAX + extentBX - Math.abs(normal.x)

    if (overlapX > 0) {
      let extentAY = this.halfMax.y - this.halfMin.y
      let extentBY = other.halfMax.y - other.halfMin.y

      let overlapY = extentAY + extentBY - Math.abs(normal.y)

      if (overlapY > 0) {
        if (overlapX < overlapY) {
          return {
            penetration: overlapX,
            normal: normal.x < 0 ? new Vec2(-1, 0) : new Vec2(0, 0),
          }
        } else {
          return {
            penetration: overlapY,
            normal: normal.y < 0 ? new Vec2(0, -1) : new Vec2(0, 1),
          }
        }
      }
    }
  }
}
