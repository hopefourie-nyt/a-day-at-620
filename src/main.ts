import Phaser from 'phaser'

import ElevatorScene from './scenes/ElevatorScene'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 700,
	height: 500,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 },
		},
	},
	scene: [ElevatorScene],
}

export default new Phaser.Game(config)
