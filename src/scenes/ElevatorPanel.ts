import Phaser from "phaser";
import { Character } from "../classes/character.js";
import {
  generateElevatorArrays,
  generateNextCommand,
  updateFloorNumbers,
} from "./helpers.js";
import { ElevatorMap } from "../types.js";

export default class ElevatorPanel extends Phaser.Scene {
  player: Character | undefined;
  pausePhysics: boolean | undefined;
  constructor() {
    super("ElevatorPanel");
  }

  create() {
    const x = 250;
    const y = 350;
    this.pausePhysics = false;
    console.log(this.pausePhysics);
    this.add.image(350, 250, "panel");

    const smallBounds = new Phaser.Geom.Rectangle(70, 50, 560, 380);

    this.player = new Character(this, x, y, "hope", 1, 2);
    const bodyody = <Phaser.Physics.Arcade.Body>this.player.body;

    bodyody.customBoundsRectangle = smallBounds;

    const allFloors = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

    // Elevator door group
    const elevatorGroup = this.physics.add.staticGroup();
    const El1 = elevatorGroup.create(150, 150, "elevator-door");
    const El2 = elevatorGroup.create(350, 150, "elevator-door");
    const El3 = elevatorGroup.create(550, 150, "elevator-door");
    const El4 = elevatorGroup.create(150, 360, "elevator-door");
    const El5 = elevatorGroup.create(350, 360, "elevator-door");
    const El6 = elevatorGroup.create(550, 360, "elevator-door");

    const elevatorArrays = generateElevatorArrays();
    // Elevator 1
    this.add.rectangle(150, 85, 93, 20, 0x000000);
    let firstDoorFloorText = this.add.text(
      110,
      80,
      elevatorArrays[0].join(","),
      { color: "#FCFF2A" }
    );
    this.add.text(112, 100, "Elevator", { color: "#000000" });
    this.add.text(120, 110, "1", { color: "#000000", fontSize: "100px" });

    // Elevator 2
    this.add.rectangle(350, 85, 93, 20, 0x000000);
    let secondDoorFloorText = this.add.text(
      330,
      80,
      elevatorArrays[1].join(","),
      { color: "#FCFF2A" }
    );
    this.add.text(312, 100, "Elevator", { color: "#000000" });
    this.add.text(320, 110, "2", { color: "#000000", fontSize: "100px" });

    // Elevator 3
    this.add.rectangle(550, 85, 93, 20, 0x000000);
    let thirdDoorFloorText = this.add.text(
      510,
      80,
      elevatorArrays[2].join(","),
      { color: "#FCFF2A" }
    );
    this.add.text(512, 100, "Elevator", { color: "#000000" });
    this.add.text(520, 110, "3", { color: "#000000", fontSize: "100px" });

    // Elevator 4
    this.add.rectangle(150, 295, 93, 20, 0x000000);
    let fourthDoorFloorText = this.add.text(
      125,
      290,
      elevatorArrays[3].join(","),
      { color: "#FCFF2A" }
    );
    this.add.text(112, 310, "Elevator", { color: "#000000" });
    this.add.text(120, 320, "4", { color: "#000000", fontSize: "100px" });

    // Elevator 5
    this.add.rectangle(350, 295, 93, 20, 0x000000);
    let fifthDoorFloorText = this.add.text(
      310,
      290,
      elevatorArrays[4].join(","),
      { color: "#FCFF2A" }
    );
    this.add.text(312, 310, "Elevator", { color: "#000000" });
    this.add.text(320, 320, "5", { color: "#000000", fontSize: "100px" });

    // Elevator 6
    this.add.rectangle(550, 295, 93, 20, 0x000000);
    let sixthDoorFloorText = this.add.text(
      520,
      290,
      elevatorArrays[5].join(","),
      { color: "#FCFF2A" }
    );
    this.add.text(512, 310, "Elevator", { color: "#000000" });
    this.add.text(520, 320, "6", { color: "#000000", fontSize: "100px" });

    // Try again button
    const tryAgainButton = this.add.rectangle(350, 250, 200, 100, 623873254235);
    const tryAgainText = this.add.text(265, 230, "Try Again", {
      fontSize: "32px",
    });
    tryAgainButton.visible = false;
    tryAgainText.visible = false;

    const correctDoorNum = Math.ceil(Math.random() * 14);

    this.add.rectangle(350, 40, 500, 30, 0x000000);
    const command = this.add.text(
      140,
      30,
      `Please go to the elevator going to floor ${correctDoorNum}`,
      { color: "#FFFFFF" }
    );

    // Collision Logic
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
        if (el.includes(correctDoorNum)) correctElevator = map[idx];
      });
      if (door === correctElevator) {
        generateElevatorArrays();
        updateFloorNumbers(
          firstDoorFloorText,
          secondDoorFloorText,
          thirdDoorFloorText,
          fourthDoorFloorText,
          fifthDoorFloorText,
          sixthDoorFloorText
        );
        generateNextCommand(correctDoorNum, command);
      } else {
        tryAgainButton.visible = true;
        tryAgainText.visible = true;
        tryAgainButton.setInteractive();
        this.pausePhysics = true;
        tryAgainButton.on("pointerup", () => {
          this.pausePhysics = false;
          tryAgainButton.visible = false;
          tryAgainText.visible = false;
        });
      }
    };

    let counter: number = 1;
    for (const door of elevatorGroup.getChildren()) {
      this.physics.add.existing(door);
      this.physics.add.collider(this.player, door, () => collisionHelper(door));
      counter++;
    }

    // Resume Scene Button
    const ResumeButton = this.add.text(550, 450, "Resume Scene", {
      color: "000000",
    });
    ResumeButton.setInteractive();
    ResumeButton.on("pointerdown", () => {
      this.scene.resume("ElevatorScene");
      this.scene.stop();
    });
  }
  update(): void {
    if (this.pausePhysics === false) this.player?.update();
  }
}
