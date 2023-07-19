import Phaser from "phaser";
import { Character } from "../classes/character.js";

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
    function shuffle(array: number[]): number[] {
      let currentIndex = array.length,
        randomIndex;

      // While there remain elements to shuffle.
      while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ];
      }

      return array;
    }
    const generateElevatorArrays = () => {
      let shuffledArray = shuffle(allFloors);
      return [
        [shuffledArray.pop(), shuffledArray.pop(), shuffledArray.pop()],
        [shuffledArray.pop(), shuffledArray.pop()],
        [shuffledArray.pop(), shuffledArray.pop(), shuffledArray.pop()],
        [shuffledArray.pop(), shuffledArray.pop()],
        [shuffledArray.pop(), shuffledArray.pop(), shuffledArray.pop()],
        [shuffledArray.pop(), shuffledArray.pop()],
      ];
    };

    // Elevator door group
    const elevatorGroup = this.physics.add.staticGroup();
    elevatorGroup.create(150, 150, "elevator-door");
    elevatorGroup.create(350, 150, "elevator-door");
    elevatorGroup.create(550, 150, "elevator-door");
    elevatorGroup.create(150, 360, "elevator-door");
    elevatorGroup.create(350, 360, "elevator-door");
    elevatorGroup.create(550, 360, "elevator-door");
    console.log(elevatorGroup.getChildren());

    // Elevator 1
    this.add.rectangle(150, 85, 93, 20, 0x000000);
    let firstDoorFloorText = this.add.text(110, 80, "2, 5, 14", { color: "#FCFF2A" });
    this.add.text(112, 100, "Elevator", { color: "#000000" });
    this.add.text(120, 110, "1", { color: "#000000", fontSize: "100px" });

    // Elevator 2
    this.add.rectangle(350, 85, 93, 20, 0x000000);
    let secondDoorFloorText = this.add.text(330, 80, "1, 7", { color: "#FCFF2A" });
    this.add.text(312, 100, "Elevator", { color: "#000000" });
    this.add.text(320, 110, "2", { color: "#000000", fontSize: "100px" });

    // Elevator 3
    this.add.rectangle(550, 85, 93, 20, 0x000000);
    let thirdDoorFloorText = this.add.text(510, 80, "3, 9, 15", { color: "#FCFF2A" });
    this.add.text(512, 100, "Elevator", { color: "#000000" });
    this.add.text(520, 110, "3", { color: "#000000", fontSize: "100px" });

    // Elevator 4
    this.add.rectangle(150, 295, 93, 20, 0x000000);
    let fourthDoorFloorText = this.add.text(125, 290, "8, 11", { color: "#FCFF2A" });
    this.add.text(112, 310, "Elevator", { color: "#000000" });
    this.add.text(120, 320, "4", { color: "#000000", fontSize: "100px" });

    // Elevator 5
    this.add.rectangle(350, 295, 93, 20, 0x000000);
    let fifthDoorFloorText = this.add.text(310, 290, "4, 6, 12", { color: "#FCFF2A" });
    this.add.text(312, 310, "Elevator", { color: "#000000" });
    this.add.text(320, 320, "5", { color: "#000000", fontSize: "100px" });

    // Elevator 6
    this.add.rectangle(550, 295, 93, 20, 0x000000);
    let sixthDoorFloorText = this.add.text(520, 290, "10, 13", { color: "#FCFF2A" });
    this.add.text(512, 310, "Elevator", { color: "#000000" });
    this.add.text(520, 320, "6", { color: "#000000", fontSize: "100px" });

    // Update Floor Numbers
    const updateFloorNumbers = () => {
        let newElevatorArrays = generateElevatorArrays()
        firstDoorFloorText.setText(``)
    }


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

    const generateNextCommand = () => {
      const correctDoorNum = Math.floor(Math.random() * 15);
      //command.updateText = `Please go to the elevator going to floor ${correctDoorNum}`;
    };
    const collisionHelper = (idx: number) => {
      if (idx === correctDoorNum) {
        console.log("first", idx);
        generateNextCommand();
      } else {
        console.log("second", idx);

        tryAgainButton.visible = true;
        tryAgainText.visible = true;
        tryAgainButton.setInteractive();
        this.pausePhysics = true;
        console.log("in collisionHelper", this.pausePhysics);

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
      this.physics.add.collider(this.player, door, () =>
        collisionHelper(counter)
      );
      counter++;
    }

    // elevatorGroup.getChildren().forEach((door, idx)=>{
    //     this.physics.world.collide(this.player, door, collisionHelper(idx));
    // })

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
    console.log("in update", this.pausePhysics);
    if (this.pausePhysics === false) this.player?.update();
  }
}
