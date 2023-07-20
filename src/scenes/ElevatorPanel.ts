import Phaser from "phaser";
import { Character } from "../classes/character.js";
import {
  animateText,
  generateElevatorArrays,
  generateNextCommand,
  updateFloorNumbers,
} from "./helpers.js";
import { ElevatorMap } from "../types.js";

export default class ElevatorPanel extends Phaser.Scene {
  player: Character | undefined;
  pausePhysics: boolean | undefined;
  playerImageKey: any;
  constructor() {
    super("ElevatorPanel");
  }
  init(data: any) {
    this.playerImageKey = data.playerImageKey;
  }

  create() {
    const x = 250;
    const y = 350;
    this.pausePhysics = false;
    this.add.image(350, 270, "panel");

    const smallBounds = new Phaser.Geom.Rectangle(70, 50, 560, 380);

    this.player = new Character(this, x, y, this.playerImageKey, 1, 2);
    const bodyody = <Phaser.Physics.Arcade.Body>this.player.body;

    bodyody.customBoundsRectangle = smallBounds;

    // Elevator door group
    const elevatorGroup = this.physics.add.staticGroup();
    const El1 = elevatorGroup.create(150, 170, "elevator-door");
    const El2 = elevatorGroup.create(350, 170, "elevator-door");
    const El3 = elevatorGroup.create(550, 170, "elevator-door");
    const El4 = elevatorGroup.create(150, 380, "elevator-door");
    const El5 = elevatorGroup.create(350, 380, "elevator-door");
    const El6 = elevatorGroup.create(550, 380, "elevator-door");

    let elevatorArrays = generateElevatorArrays();
    // Elevator 1
    this.add.rectangle(150, 105, 93, 20, 0x000000);
    let firstDoorFloorText = this.add.text(
      110,
      100,
      elevatorArrays[0].join(","),
      { color: "#FCFF2A" }
    );
    this.add.text(112, 120, "Elevator", { color: "#000000" });
    this.add.text(120, 130, "1", { color: "#000000", fontSize: "100px" });

    // Elevator 2
    this.add.rectangle(350, 105, 93, 20, 0x000000);
    let secondDoorFloorText = this.add.text(
      330,
      100,
      elevatorArrays[1].join(","),
      { color: "#FCFF2A" }
    );
    this.add.text(312, 120, "Elevator", { color: "#000000" });
    this.add.text(320, 130, "2", { color: "#000000", fontSize: "100px" });

    // Elevator 3
    this.add.rectangle(550, 105, 93, 20, 0x000000);
    let thirdDoorFloorText = this.add.text(
      510,
      100,
      elevatorArrays[2].join(","),
      { color: "#FCFF2A" }
    );
    this.add.text(512, 120, "Elevator", { color: "#000000" });
    this.add.text(520, 130, "3", { color: "#000000", fontSize: "100px" });

    // Elevator 4
    this.add.rectangle(150, 315, 93, 20, 0x000000);
    let fourthDoorFloorText = this.add.text(
      125,
      310,
      elevatorArrays[3].join(","),
      { color: "#FCFF2A" }
    );
    this.add.text(112, 330, "Elevator", { color: "#000000" });
    this.add.text(120, 340, "4", { color: "#000000", fontSize: "100px" });

    // Elevator 5
    this.add.rectangle(350, 315, 93, 20, 0x000000);
    let fifthDoorFloorText = this.add.text(
      310,
      310,
      elevatorArrays[4].join(","),
      { color: "#FCFF2A" }
    );
    this.add.text(312, 330, "Elevator", { color: "#000000" });
    this.add.text(320, 340, "5", { color: "#000000", fontSize: "100px" });

    // Elevator 6
    this.add.rectangle(550, 315, 93, 20, 0x000000);
    let sixthDoorFloorText = this.add.text(
      520,
      310,
      elevatorArrays[5].join(","),
      { color: "#FCFF2A" }
    );
    this.add.text(512, 330, "Elevator", { color: "#000000" });
    this.add.text(520, 340, "6", { color: "#000000", fontSize: "100px" });

    // Try again button
    const tryAgainButton = this.add.rectangle(350, 250, 200, 100, 623873254235);
    const tryAgainText = this.add.text(265, 230, "Try Again", {
      fontSize: "32px",
    });
    tryAgainButton.visible = false;
    tryAgainText.visible = false;

    const correctFloorNum = Math.ceil(Math.random() * 14);

    this.add.rectangle(355, 40, 520, 70, 0x93c3c7).setOrigin(0.5);
    this.add.rectangle(355, 40, 500, 50, 0x57888c).setOrigin(0.5);
    const command = this.add
      .text(
        360,
        40,
        `Please go to the elevator going to floor ${correctFloorNum}`,
        { color: "#000000" }
      )
      .setOrigin(0.5);
    animateText(command);

    // Collision Logic
    for (const door of elevatorGroup.getChildren()) {
      this.physics.add.existing(door);
      this.physics.add.collider(this.player, door, () => collisionHelper(door));
    }
    let counter = 0;
    const collisionHelper = (door: any) => {
      const map: ElevatorMap = {
        0: El1,
        1: El2,
        2: El3,
        3: El4,
        4: El5,
        5: El6,
      };
      let correctElevator: any;
      elevatorArrays.forEach((el, idx) => {
        if (el.includes(correctFloorNum)) correctElevator = map[idx];
      });
      if (counter > 2 && door === correctElevator) {
        this.scene.start("StandUp", {
          playerImageKey: this.playerImageKey,
        });
      } else {
        this.player?.setPosition(350, 270).setOrigin(0.5);
        elevatorArrays = generateElevatorArrays();
        updateFloorNumbers(
          elevatorArrays,
          firstDoorFloorText,
          secondDoorFloorText,
          thirdDoorFloorText,
          fourthDoorFloorText,
          fifthDoorFloorText,
          sixthDoorFloorText
        );
        if (door === correctElevator) {
          generateNextCommand(correctFloorNum, command, true);
          counter++;
        } else {
          generateNextCommand(correctFloorNum, command, false);
        }
      }
    };

    
  }
  update(): void {
    if (this.pausePhysics === false) this.player?.update();
  }
}
