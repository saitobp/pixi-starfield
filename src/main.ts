import { Manager } from './manager'
import { GameScene } from './scenes/GameScene'
import './style.css'

Manager.init(480, 800, 0x000000)
Manager.setScene(new GameScene())
