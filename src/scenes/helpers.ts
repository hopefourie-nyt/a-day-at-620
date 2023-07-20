// ELEVATOR PANEL
export let allFloors = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
export const shuffle = (array: number[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const generateNextCommand = (
  correctDoorNum: number,
  command: any,
  wasCorrect: boolean
) => {

  if (wasCorrect) {
    command.setText(
      `You got on the correct elevator, but got off \non the wrong floor! Please go to the elevator going \nto floor ${correctDoorNum}`
    );
  } else {
    
    command.setText(
        `Wrong elevator! Please go to the elevator going \nto floor ${correctDoorNum}`
      );}
};
export const generateElevatorArrays = () => {
  let shuffledArray = shuffle(allFloors);
  return [
    [shuffledArray[1], shuffledArray[2], shuffledArray[3]],
    [shuffledArray[4], shuffledArray[5]],
    [shuffledArray[6], shuffledArray[7], shuffledArray[8]],
    [shuffledArray[9], shuffledArray[10]],
    [shuffledArray[11], shuffledArray[12], shuffledArray[13]],
    [shuffledArray[14], shuffledArray[0]],
  ];
};

// Update Floor Numbers
export const updateFloorNumbers = (
  elevatorArrays: number[][],
  firstDoorFloorText: any,
  secondDoorFloorText: any,
  thirdDoorFloorText: any,
  fourthDoorFloorText: any,
  fifthDoorFloorText: any,
  sixthDoorFloorText: any
) => {
  firstDoorFloorText.setText(`${elevatorArrays[0].join(", ")}`);
  secondDoorFloorText.setText(`${elevatorArrays[1].join(", ")}`);
  thirdDoorFloorText.setText(`${elevatorArrays[2].join(", ")}`);
  fourthDoorFloorText.setText(`${elevatorArrays[3].join(", ")}`);
  fifthDoorFloorText.setText(`${elevatorArrays[4].join(", ")}`);
  sixthDoorFloorText.setText(`${elevatorArrays[5].join(", ")}`);
};

/**
 * Create typewriter animation for text
 * @param {Phaser.GameObjects.Text} target
 * @param {number} [speedInMs=25]
 * @returns {Promise<void>}
 */
export function animateText(target: Phaser.GameObjects.Text | undefined, speedInMs = 25) {
  if(!target){
    console.log("undefined text")
    return;
  }
  // store original text
  const message = target.text;
  const invisibleMessage = message.replace(/[^ ]/g, " ");

  // clear text on screen
  target.text = "";

  // mutable state for visible text
  let visibleText = "";

  // use a Promise to wait for the animation to complete
  return new Promise<void>((resolve) => {
    const timer = target.scene.time.addEvent({
      delay: speedInMs,
      loop: true,
      callback() {
        // if all characters are visible, stop the timer
        if (target.text === message) {
          timer.destroy();
          return resolve();
        }

        // add next character to visible text
        visibleText += message[visibleText.length];

        // right pad with invisibleText
        const invisibleText = invisibleMessage.substring(visibleText.length);

        // update text on screen
        target.text = visibleText + invisibleText;
      },
    });
  });
}
/**
 *
 * @param {Phaser.Scene} scene
 * @param {number} totalWidth
 * @param {string} texture
 * @param {number} scrollFactor
 * @param {number} yIndex
 */
export const createAligned = (
  scene: Phaser.Scene,
  totalWidth: number,
  texture: string,
  scrollFactor: number,
  yIndex: number
) => {
  const w = scene.textures.get(texture).getSourceImage().width;
  const count = Math.ceil(totalWidth / w) * scrollFactor;

  let x = 0;
  for (let i = 0; i < count; ++i) {
    const m = scene.add
      .image(x, yIndex, texture)
      .setOrigin(0, 1)
      .setScrollFactor(scrollFactor);

    x += m.width;
  }
};
