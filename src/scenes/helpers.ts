// ELEVATOR PANEL
export let allFloors = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
export const shuffle = (array: number[]) => { 
    for (let i = array.length - 1; i > 0; i--) { 
      const j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]]; 
    } 
    return array; 
  }; 

export const generateNextCommand = (correctDoorNum: number, command:any) => {
  correctDoorNum = Math.ceil(Math.random() * 14);
  command.setText(`Please go to the elevator going to floor ${correctDoorNum}`);
};
export const generateElevatorArrays = () => {
  let shuffledArray = shuffle(allFloors);
  console.log("allfloors", allFloors)
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
export const updateFloorNumbers = (firstDoorFloorText: any, secondDoorFloorText: any, thirdDoorFloorText: any, fourthDoorFloorText: any, fifthDoorFloorText: any, sixthDoorFloorText: any) => {
    let newElevatorArrays = generateElevatorArrays();
    firstDoorFloorText.setText(`${newElevatorArrays[0].join(", ")}`);
    secondDoorFloorText.setText(`${newElevatorArrays[1].join(", ")}`);
    thirdDoorFloorText.setText(`${newElevatorArrays[2].join(", ")}`);
    fourthDoorFloorText.setText(`${newElevatorArrays[3].join(", ")}`);
    fifthDoorFloorText.setText(`${newElevatorArrays[4].join(", ")}`);
    sixthDoorFloorText.setText(`${newElevatorArrays[5].join(", ")}`);
  };
