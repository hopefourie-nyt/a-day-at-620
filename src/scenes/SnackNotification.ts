import Phaser from "phaser";
import { animateText } from "./helpers";

export default class Intro extends Phaser.Scene {
  fist: Phaser.Types.Physics.Arcade.ImageWithDynamicBody | undefined;
  space: any;
  player: any;
  taxi: Phaser.GameObjects.Image | undefined;
    playerImageKey: any;
  constructor() {
    super("SnackNotification");
  }
  init(data: any) {
    this.playerImageKey = data.playerImageKey;

  }
  create() {

    this.add.image(350, 250, "laptop");

    this.add.image(350, 250, "slack-box").setOrigin(.5);
    let text = this.add.text(
      230,
      140,
      "Slack:\nNew message in #snacks...",
      { color: "#000000", fontSize: "14px" }
    );

    animateText(text);
    const NextButton = this.add.text(300, 400, "Go to snacks", {color: '#FFFFFF'});
    NextButton.setInteractive();
    NextButton.on("pointerdown", () => {
        this.time.addEvent({
            delay: 500,
            callback: () => {
              this.scene.start("Snacks", {playerImageKey: this.playerImageKey});
            },
            loop: false,
          });
    });

  }
}
