import Phaser from "phaser";
import { Character } from "../classes/character";
import { animateText } from "./helpers";

export default class Snacks extends Phaser.Scene {
  fist: Phaser.Types.Physics.Arcade.ImageWithDynamicBody | undefined;
  space: any;
  player: any;
  taxi: Phaser.GameObjects.Image | undefined;
    playerImageKey: any;
  constructor() {
    super("Snacks");
  }
  init(data: any) {
    this.playerImageKey = data.playerImageKey 
  }
  create() {
    const x = 550;
    const y = 430;

    
    // Background
    this.add.image(350, 100, "nytb").setScale(1 / 2);

    this.player = new Character(this, 350, 250, this.playerImageKey)
  }
  update(): void {
    this.player?.update();
  }
}
