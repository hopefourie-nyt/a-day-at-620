import Phaser from 'phaser'
import {Character} from '../classes/character.js'

export default class StandUp extends Phaser.Scene {
	player: Character | undefined
	constructor() {
		super('StandUp')
	}

	preload() {
		console.log("standup")

		this.load.image('hope', 'src/assets/sprites/hope.png')
		this.load.image('elevators', 'src/assets/backgrounds/conference-room.png')
		
	}


	create() {
		const x = 300
		const y = 350
		this.add.image(350,250, 'elevators')
		this.player = new Character(this, x, y, 'hope')		

		const hope = this.physics.add.image(400, 100, 'hope')

		hope.setVelocity(100, 100)
		hope.setBounce(1, 1)
		hope.setCollideWorldBounds(true)

	}
	update(): void {
		this.player?.update()
	}
}
