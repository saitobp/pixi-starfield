import { Application } from 'pixi.js'
import { Scene } from './scene'

export class Manager {
	private constructor() {
		throw new Error('Manager is a static class and cannot be instantiated.')
	}

	/** The application instance */
	private static app: Application

	/** The current scene */
	private static scene: Scene

	/** The width of the game canvas */
	private static w: number

	/** The height of the game canvas */
	private static h: number

	public static get width() {
		return Manager.w
	}

	public static get height() {
		return Manager.h
	}

	/** Use this function ONCE to start the game */
	public static init(w: number, h: number, background: number | string) {
		Manager.w = w
		Manager.h = h

		Manager.app = new Application({
			view: document.querySelector('canvas') as HTMLCanvasElement,
			resolution: window.devicePixelRatio || 1,
			autoDensity: true,
			width: w,
			height: h,
			backgroundColor: background,
			antialias: true,
		})

		Manager.app.ticker.add(Manager.update)

		/** Resize the canvas to fit the screen */
		window.addEventListener('resize', Manager.resize)
		Manager.resize()
	}

	/** Use this function when you want to change the scene */
	public static setScene(scene: Scene) {
		/** Remove old scene */
		if (Manager.scene) {
			Manager.app.stage.removeChild(Manager.scene)
			Manager.scene.destroy()
		}

		/** Add new scene */
		Manager.scene = scene
		Manager.app.stage.addChild(Manager.scene)
	}

	public static update(frames: number) {
		if (Manager.scene) {
			Manager.scene.update(frames)
		}
	}

	public static resize() {
		const clientW = document.documentElement.clientWidth
		const clientH = document.documentElement.clientHeight
		const windowW = window.innerWidth || 0
		const windowH = window.innerHeight || 0
		const screenW = Math.max(clientW, windowW)
		const screenH = Math.max(clientH, windowH)
		const scale = Math.min(screenW / Manager.w, screenH / Manager.h)
		const width = Math.floor(scale * Manager.w)
		const height = Math.floor(scale * Manager.h)
		const marginX = (screenW - width) / 2
		const marginY = (screenH - height) / 2

		if (!Manager.app || !Manager.app.view || !Manager.app.view.style) {
			return
		}

		const view = Manager.app.view as HTMLCanvasElement

		view.style.width = `${width}px`
		view.style.height = `${height}px`
		view.style.marginLeft = view.style.marginRight = `${marginX}px`
		view.style.marginTop = view.style.marginBottom = `${marginY}px`
	}
}
