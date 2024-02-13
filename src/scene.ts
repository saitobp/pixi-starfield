import { DisplayObject } from 'pixi.js'

export interface Scene extends DisplayObject {
	update(delta: number): void
}
