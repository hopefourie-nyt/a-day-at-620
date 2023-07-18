import Phaser from "phaser";
import { Character } from "../classes/character.js";

export default class ElevatorScene extends Phaser.Scene {
  player: Character | undefined;
  constructor() {
    super("ElevatorScene");
  }

  preload() {
    this.load.image("hope", "src/assets/sprites/hope.png");
    this.load.image("elevators_1", "src/assets/backgrounds/elevators.png");
    this.load.tilemapTiledJSON(
      "elevators_map",
      "src/assets/tilemaps/elevator.json"
    );
  }

  create() {
    const x = 300;
    const y = 350;

    this.add.image(350, 250, "elevators");
    this.player = new Character(this, x, y, "hope");

    const hope = this.physics.add.image(400, 100, "hope");
    const map = this.make.tilemap({ key: "elevators_map" });
    const tileset = map.addTilesetImage("elevators_1", "elevators_1");
    const belowLayer = map.createLayer("below player", tileset);
    belowLayer.setCollisionByProperty({ collides: true });
    this.player = new Character(this, x, y, "hope");

    hope.setVelocity(100, 100);
    hope.setBounce(1, 1);
    hope.setCollideWorldBounds(true);

    const nextButton = this.add.text(100, 100, "Next Scene");
    nextButton.setInteractive();
	nextButton.on('pointerover', () => { this.scene.start('StandUp') });


    hope.setVelocity(500, 500);
    hope.setBounce(1, 1);
    hope.setCollideWorldBounds(true);
    this.physics.add.collider(hope, belowLayer);
    this.physics.add.collider(this.player, belowLayer);
    this.physics.add.collider(this.player, hope);

  }
  update(): void {
    this.player?.update();
  }
}
