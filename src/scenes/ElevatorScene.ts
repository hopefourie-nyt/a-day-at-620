import Phaser from 'phaser'

export default class HelloWorldScene extends Phaser.Scene {
	constructor() {
		super('hello-world')
	}

	preload() {

		this.load.image('hope', 'src/assets/hope.png')
		this.load.image('elevators', 'src/assets/elevators.png')
		
	}

	create() {

		this.add.image(350,250, 'elevators')

		const hope = this.physics.add.image(400, 100, 'hope')

		hope.setVelocity(100, 100)
		hope.setBounce(1, 1)
		hope.setCollideWorldBounds(true)

	}
}
