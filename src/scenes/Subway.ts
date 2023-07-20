import Phaser from "phaser";
import { Character } from "../classes/character";
import { animateText, createAligned } from "./helpers";

export default class Subway extends Phaser.Scene {
  fist: Phaser.Types.Physics.Arcade.ImageWithDynamicBody | undefined;
  space: any;
  player: any;
    playerImageKey: any;
  constructor() {
    super("Subway");
  }
  init(data: any) {
    this.playerImageKey = data.playerImageKey 
  }

  create() {

    const width = this.scale.width;
    const height = this.scale.height;
    const totalWidth = width * 50;

    // Background

    createAligned(this, totalWidth, "sunset", 0.02, 600);
    createAligned(this, totalWidth, "city-1", 0.1, 370);
    createAligned(this, totalWidth, "city-2", 0.25, 380);

    this.add
      .image(350, 250, "subway")
      .setScale(5.7 / 8)
      .setScrollFactor(0);

    // Character
    let hope = new Character(this, 450, 480, "hope", 3, 2).setScrollFactor(0);
    hope.flipX = true
    new Character(this, 620, 480, "julian", 3, 2).setScrollFactor(0);

    let credits = this.add
      .text(195, 450, "\n Created by \n Hope Fourie and Julian Meltzer", {
        fontSize: "20px",
        color: "#FFFFFF",
      })
      .setScrollFactor(0)
      .setOrigin(0.5);

    animateText(credits);
  }
  update(): void {
    const cam = this.cameras.main;
    const speed = 3;
    cam.scrollX += speed;
  }
}
