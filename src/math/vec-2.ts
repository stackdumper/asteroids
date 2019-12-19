export class Vec2 {
  constructor(public x: number, public y: number) {}

  public add = (x: number, y: number) => {
    this.x += x
    this.y += y

    return this
  }

  public subtract = (x: number, y: number) => {
    this.x -= x
    this.y -= y

    return this
  }

  public multiply = (x: number, y: number) => {
    this.x *= x
    this.y *= y

    return this
  }

  public divide = (x: number, y: number) => {
    this.x /= x
    this.y /= y

    return this
  }

  public set = (x: number, y: number) => {
    this.x = x
    this.y = y

    return this
  }

  public magintudeSquared() {
    return this.x * this.x + this.y * this.y
  }

  public magnitude() {
    return Math.sqrt(this.magintudeSquared())
  }

  public normalize() {
    const mag = this.magnitude()

    this.x = this.x / mag || 0
    this.y = this.y / mag || 0

    return this
  }

  public distanceSquared(vec: Vec2) {
    return Math.pow(vec.x - this.x, 2) + Math.pow(vec.y - this.y, 2)
  }

  public distance(vec: Vec2) {
    return Math.sqrt(this.distanceSquared(vec))
  }

  public clone() {
    return new Vec2(this.x, this.y)
  }
}
