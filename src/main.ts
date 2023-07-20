import Phaser from 'phaser'

import ElevatorScene from './scenes/ElevatorScene'
import StandUp from './scenes/StandUp'
import PreLoader from './scenes/PreLoader'
import ElevatorPanel from './scenes/ElevatorPanel'
import Laptop from './scenes/Laptop'
import Subway from './scenes/Subway'
import Intro from './scenes/Intro'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 700,
	height: 500,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 },
		},
	},
	scene: [ PreLoader, Intro, ElevatorScene, ElevatorPanel, StandUp, Laptop, Subway],
}

export default new Phaser.Game(config)
