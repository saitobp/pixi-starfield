import { Container } from 'pixi.js'
import { Scene } from '../scene'
import { Star } from '../elements/Star'
import { Manager } from '../manager'

export class GameScene extends Container implements Scene {
	private stars: Star[] = []

	constructor() {
		super()

		for (let i = 0; i < 500; i++) {
			const star = new Star()
			this.stars.push(star)
			this.addChild(star.container)
		}

		this.height = Manager.height
		this.width = Manager.width
	}

	public update() {
		for (const star of this.stars) {
			star.update()
			star.draw()
		}
	}
}
