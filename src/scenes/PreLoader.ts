import Phaser from "phaser";
import { Character } from "../classes/character.js";

export default class PreLoader extends Phaser.Scene {
  player: Character | undefined;
  loadText: Phaser.GameObjects.Text | undefined;
    music: Phaser.Sound.BaseSound | undefined;
  constructor() {
    super("PreLoader");
  }

  preload() {
    this.loadText = this.add.text(
      innerWidth * 0.05,
      innerHeight * 0.95,
      "Loading... ",
      {
        fontSize: "24px",
        color: "#FFFFFF",
        fontStyle: "italic",
      }
    );
    // Music
    this.load.audio('lofi',
    "src/assets/music/lofi.mp3")

    // Backgrounds
    this.load.image(
      "conference-room",
      "src/assets/backgrounds/conference-room.png"
    );
    this.load.image("nytb", "src/assets/backgrounds/nytb.png");
    this.load.image("elevators_1", "src/assets/backgrounds/elevators.png");
    this.load.image("subway", "src/assets/backgrounds/subway.png");
    this.load.image("city-1", "src/assets/backgrounds/city-1.png");
    this.load.image("city-2", "src/assets/backgrounds/city-2.png");
    this.load.image("sunset", "src/assets/backgrounds/sunset.png");

    // Tilemaps
    this.load.tilemapTiledJSON(
      "elevators_map",
      "src/assets/tilemaps/elevator.json"
    );
    this.load.tilemapTiledJSON(
      "room_map",
      "src/assets/tilemaps/conference-room.json"
    );

    // Overlays
    this.load.image("panel", "src/assets/backgrounds/panel.png");
    this.load.image("laptop", "src/assets/backgrounds/laptop.png");

    // Sprites
    this.load.image("corridor", "src/assets/sprites/corridor.png");
    this.load.image("snack", "src/assets/sprites/snack.png");

    this.load.image("stairs", "src/assets/sprites/stairs.png");
    this.load.image("union-bug", "src/assets/sprites/union-bug.png");
    this.load.image("eric", "src/assets/sprites/eric.png");
    this.load.image("sam", "src/assets/sprites/sam.png");
    this.load.image("ken", "src/assets/sprites/ken.png");
    this.load.image("tristan", "src/assets/sprites/tristan.png");
    this.load.image("stair", "src/assets/sprites/stair.png");

    this.load.image("taxi", "src/assets/sprites/taxi.png");
    this.load.image("elevator-door", "src/assets/sprites/elevator-door.png");
    this.load.image("logo", "src/assets/sprites/logo.png");
    this.load.image("textbox", "src/assets/sprites/textbox.png");
    this.load.image("desk", "src/assets/sprites/desk.png");
    this.load.image("chair", "src/assets/sprites/chair.png");
    this.load.image("big-fist", "src/assets/sprites/big-fist.png");

    // Characters
    this.load.image("julian", "src/assets/sprites/julian.png");
    this.load.image("hope", "src/assets/sprites/hope.png");
    this.load.image("variant", "src/assets/sprites/variant.png");
    this.load.image('conference-room', 'src/assets/backgrounds/conference-room.png')
		this.load.tilemapTiledJSON(
			"room_map",
			"src/assets/tilemaps/conference-room.json"
		  )
    this.load.image("big-fist", 'src/assets/sprites/big-fist.png');
    this.load.image("fly", 'src/assets/sprites/fly.png');
    this.load.image("slack-box", 'src/assets/sprites/slack-box.png');

  }

  create() {
    this.music = this.sound.add('lofi');
    this.add.image(620, 460, "union-bug").setScale(0.04, 0.04).setOrigin(.5);

    this.add.rectangle(350, 350, 360, 170, 0x727230423).setOrigin(.5)
    const hope = this.add.sprite(250, 370, "hope").setOrigin(.5);
    const julian = this.add.sprite(450, 370, "julian").setOrigin(.5);

    const startText = this.add.text(350, 290, "Loading...").setOrigin(.5);
    this.add.image(350, 100, "logo").setScale(0.25, 0.25).setOrigin(.5);
    this.add.text(220, 210, " A Day at 620", { fontSize: "32px" });
    startText.setText("Select a character to start your day").setOrigin(.5);
    

    hope.setInteractive();
    julian.setInteractive();

    hope.on("pointerup", () => {
      this.start("hope");
    });
    julian.on("pointerup", () => {
        this.start("julian");
      });
  }
  start(character:string) {
    // Need user input for music so I've tied it with starting the game... don't ask :(
    this.music?.play({
        mute: false,
        volume: 0.35,
        loop: true,
      });
    this.scene.start('Intro', {
      music: this.music,
      playerImageKey: character  });
  }
}
