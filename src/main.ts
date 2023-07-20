import Phaser from 'phaser'

import ElevatorScene from './scenes/ElevatorScene'
import StandUp from './scenes/StandUp'
import PreLoader from './scenes/PreLoader'
import ElevatorPanel from './scenes/ElevatorPanel'
import Laptop from './scenes/Laptop'
import Subway from './scenes/Subway'
import Intro from './scenes/Intro'
import Snacks from './scenes/Snacks'
import LongDay from './scenes/LongDay'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 700,
	height: 500,
	scale: {
		parent: 'game',
		autoCenter: Phaser.Scale.CENTER_BOTH,
	  },
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 },
		},
	},
	scene: [ PreLoader, Intro, ElevatorScene, ElevatorPanel, StandUp, Laptop, Snacks, LongDay, Subway],
}

export default new Phaser.Game(config)
