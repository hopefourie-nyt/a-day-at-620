import Phaser from "phaser";
import { Character } from "../classes/character";
import { animateText, createAligned } from "./helpers";

export default class Subway extends Phaser.Scene {
  fist: Phaser.Types.Physics.Arcade.ImageWithDynamicBody | undefined;
  space: any;
  player: any;
  constructor() {
    super("Subway");
  }

  create() {
    const x = 550;
    const y = 480;

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
    this.player = new Character(this, x, y, "hope", 2, 1).setScrollFactor(0);

    // let box = this.add.rectangle(200, 200, 300, 200, 0x000000, 60000).setOrigin(0.5).setScrollFactor(0)
    let credits = this.add
      .text(275, 450, "\n Created by \n Hope Fourie and Julian Meltzer", {
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
