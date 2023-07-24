import Phaser from "phaser";

export default class LongDay extends Phaser.Scene {
    playerImageKey: any;
    cupcake: any;
  constructor() {
    super("LongDay");
  }
  init(data: any){
    this.playerImageKey = data.playerImageKey 
    this.cupcake = data.cupcake
  }
  create() {
    this.add.rectangle(350,250, 600, 400, 0x84B7B1 ).setOrigin(.5)
    if (this.cupcake === true){
    this.add.text(350, 150, "You got to the snack before anyone else!\n\nIt's been a long day.", {fontSize:"20px", color: '#000000'}).setOrigin(.5)
    } else {
        this.add.text(350, 150, "Someone got the snack before you.\n\nIt's been a long day.", {fontSize:"20px", color: '#000000'}).setOrigin(.5)

    }
    let button = this.add.rectangle(350, 350, 200, 100, 0x333333)
    this.add.text(350, 350, "GO HOME", {fontSize:"32px", color: '#FFFFFF'}).setOrigin(.5)
    button.setInteractive();
    button.on("pointerdown", () => {
      this.scene.start("Subway");
    });
}
  update(): void {
  }
}
