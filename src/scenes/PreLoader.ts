import Phaser from "phaser";
import { Character } from "../classes/character.js";

export default class PreLoader extends Phaser.Scene {
  player: Character | undefined;
    loadText: Phaser.GameObjects.Text | undefined;
  constructor() {
    super("PreLoader");
  }

  preload() {
    this.loadText = this.add.text(
        innerWidth * 0.05,
        innerHeight * 0.95,
        'Loading... ',
        {
          fontSize: '24px',
          color: '#FFFFFF',
          fontStyle: 'italic',
        }
      );
    this.load.image("panel", "src/assets/backgrounds/panel.png");
    this.load.image("elevator-door", "src/assets/sprites/elevator-door.png");
    this.load.image("julian", "src/assets/sprites/julian.png");
    this.load.image("hope", "src/assets/sprites/hope.png");
    this.load.image("elevators_1", "src/assets/backgrounds/elevators.png");
    this.load.tilemapTiledJSON(
      "elevators_map",
      "src/assets/tilemaps/elevator.json"
    );
    this.load.image("logo", "src/assets/sprites/logo.png");
    this.load.image("variant", "src/assets/sprites/variant.png");
    this.load.image("textbox", "src/assets/sprites/textbox.png");
    this.load.image("hope", "src/assets/sprites/hope.png");
    this.load.image("desk", "src/assets/sprites/desk.png");
    this.load.image("chair", "src/assets/sprites/chair.png");
    this.load.image('conference-room', 'src/assets/backgrounds/conference-room.png')
		this.load.tilemapTiledJSON(
			"room_map",
			"src/assets/tilemaps/conference-room.json"
		  )
  }

  create() {
    const rect = this.add.rectangle(350, 370, 100, 50, 623873254235);
    const nextButton = this.add.text(325, 363, "Loading...");

    this.add.image(345,170,"logo").setScale(.25,.25)
    this.add.text(220, 290, " A Day at 620", {fontSize: '32px'})
    nextButton.setText('START');
    nextButton.setInteractive();

    nextButton.on('pointerup', () => {
        this.scene.start("ElevatorScene");    });
  }
}
