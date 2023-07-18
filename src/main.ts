import Phaser from 'phaser'

import ElevatorScene from './scenes/ElevatorScene'
import StandUp from './scenes/StandUp'
import PreLoader from './scenes/PreLoader'

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
	scene: [PreLoader, ElevatorScene, StandUp],
}

export default new Phaser.Game(config)
