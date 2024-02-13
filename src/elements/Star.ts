import { Container, Graphics } from 'pixi.js'
import { Manager } from '../manager'
import { random } from '../utils/random'
import { map } from '../utils/map'

export class Star {
	public container: Container
	private x: number
	private y: number
	private z: number

	/** The current speed */
	private speed: number

	/** The previous z */
	private pz: number

	constructor() {
		this.x = random(-Manager.width, Manager.width)
		this.y = random(-Manager.height, Manager.height)
		this.z = random(Manager.width)
		this.pz = this.z
		this.speed = 10
		this.container = new Container()
	}

	public update() {
		this.z -= this.speed

		if (this.z < 1) {
			this.x = random(-Manager.width, Manager.width)
			this.y = random(-Manager.height, Manager.height)
			this.z = Manager.width
			this.pz = this.z
		}
	}

	public draw() {
		const offsetX = Manager.width / 2
		const offsetY = Manager.height / 2
		const sx = map(this.x / this.z, 0, 1, 0, Manager.width) + offsetX
		const sy = map(this.y / this.z, 0, 1, 0, Manager.height) + offsetY
		const r = map(this.z, 0, Manager.width, 8, 0)
		const elipse = new Graphics()

		elipse.beginFill(0xffffff)
		elipse.drawCircle(sx, sy, r)
		elipse.endFill()

		const px = map(this.x / this.pz, 0, 1, 0, Manager.width) + offsetX
		const py = map(this.y / this.pz, 0, 1, 0, Manager.height) + offsetY
		this.pz = this.z

		const line = new Graphics()
		line.lineStyle(1, 0xffffff)
		line.moveTo(px, py)
		line.lineTo(sx, sy)

		this.container.removeChildren()
		this.container.addChild(elipse, line)
	}

	public setSpeed(speed: number) {
		this.speed = speed
	}
}
