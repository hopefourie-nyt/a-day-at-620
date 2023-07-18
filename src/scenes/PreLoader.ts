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
    this.load.image("hope", "src/assets/sprites/hope.png");
    this.load.image("elevators_1", "src/assets/backgrounds/elevators.png");
    this.load.tilemapTiledJSON(
      "elevators_map",
      "src/assets/tilemaps/elevator.json"
    );
    this.load.image("variant", "src/assets/sprites/variant.png");
    this.load.image("hope", "src/assets/sprites/hope.png");
    this.load.image("desk", "src/assets/sprites/desk.png");
    this.load.image("chair", "src/assets/sprites/chair.png");
    this.load.image("elevators", "src/assets/backgrounds/conference-room.png");
  }

  create() {
    const nextButton = this.add.text(100, 250, "Loading...");

    nextButton.setText('Loading... Complete: click here to begin.');
    nextButton.setInteractive();

    nextButton.on('pointerup', () => {
        this.scene.start("ElevatorScene");    });
  }
}
