import Phaser from "phaser";
import { Character } from "../classes/character.js";

export default class PreLoader extends Phaser.Scene {
  player: Character | undefined;
  loadText: Phaser.GameObjects.Text | undefined;
    music: Phaser.Sound.BaseSound | undefined;
  constructor() {
    super("PreLoader");
  }

  preload() {
    this.loadText = this.add.text(
      innerWidth * 0.05,
      innerHeight * 0.95,
      "Loading... ",
      {
        fontSize: "24px",
        color: "#FFFFFF",
        fontStyle: "italic",
      }
    );
    // Music
    this.load.audio('lofi',
    "src/assets/music/lofi.mp3")

    // Backgrounds
    this.load.image(
      "conference-room",
      "src/assets/backgrounds/conference-room.png"
    );
    this.load.image("nytb", "src/assets/backgrounds/nytb.png");
    this.load.image("elevators_1", "src/assets/backgrounds/elevators.png");
    this.load.image("subway", "src/assets/backgrounds/subway.png");
    this.load.image("city-1", "src/assets/backgrounds/city-1.png");
    this.load.image("city-2", "src/assets/backgrounds/city-2.png");
    this.load.image("sunset", "src/assets/backgrounds/sunset.png");

    // Tilemaps
    this.load.tilemapTiledJSON(
      "elevators_map",
      "src/assets/tilemaps/elevator.json"
    );
    this.load.tilemapTiledJSON(
      "room_map",
      "src/assets/tilemaps/conference-room.json"
    );

    // Overlays
    this.load.image("panel", "src/assets/backgrounds/panel.png");
    this.load.image("laptop", "src/assets/backgrounds/laptop.png");

    // Sprites
    this.load.image("taxi", "src/assets/sprites/taxi.png");
    this.load.image("elevator-door", "src/assets/sprites/elevator-door.png");
    this.load.image("logo", "src/assets/sprites/logo.png");
    this.load.image("textbox", "src/assets/sprites/textbox.png");
    this.load.image("desk", "src/assets/sprites/desk.png");
    this.load.image("chair", "src/assets/sprites/chair.png");
    this.load.image("big-fist", "src/assets/sprites/big-fist.png");

    // Characters
    this.load.image("julian", "src/assets/sprites/julian.png");
    this.load.image("hope", "src/assets/sprites/hope.png");
    this.load.image("variant", "src/assets/sprites/variant.png");
  }

  create() {
    this.music = this.sound.add('lofi');

    const rect = this.add.rectangle(350, 370, 100, 50, 623873254235);
    const nextButton = this.add.text(325, 363, "Loading...");

    this.add.image(345, 170, "logo").setScale(0.25, 0.25);
    this.add.text(220, 290, " A Day at 620", { fontSize: "32px" });
    nextButton.setText("START");
    rect.setInteractive();

    rect.on("pointerup", () => {
      this.start();
    });
  }
  start() {
    // Need user input for music so I've tied it with starting the game... don't ask :(
    this.music?.play({
        mute: false,
        volume: 0.35,
        loop: true,
      });
    this.scene.start('Intro', {
      music: this.music,
    });
  }
}
