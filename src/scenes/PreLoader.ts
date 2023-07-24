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
    "music/lofi.mp3")

    // Backgrounds
    this.load.image(
      "conference-room",
      "backgrounds/conference-room.png"
    );
    this.load.image("nytb", "backgrounds/nytb.png");
    this.load.image("elevators_1", "backgrounds/elevators.png");
    this.load.image("subway", "backgrounds/subway.png");
    this.load.image("city-1", "backgrounds/city-1.png");
    this.load.image("city-2", "backgrounds/city-2.png");
    this.load.image("sunset", "backgrounds/sunset.png");

    // Tilemaps
    this.load.tilemapTiledJSON(
      "elevators_map",
      "tilemaps/elevator.json"
    );
    this.load.tilemapTiledJSON(
      "room_map",
      "tilemaps/conference-room.json"
    );

    // Overlays
    this.load.image("panel", "backgrounds/panel.png");
    this.load.image("laptop", "backgrounds/laptop.png");

    // Sprites
    this.load.image("corridor", "sprites/corridor.png");
    this.load.image("snack", "sprites/snack.png");

    this.load.image("stairs", "sprites/stairs.png");
    this.load.image("union-bug", "sprites/union-bug.png");
    this.load.image("eric", "sprites/eric.png");
    this.load.image("sam", "sprites/sam.png");
    this.load.image("ken", "sprites/ken.png");
    this.load.image("tristan", "sprites/tristan.png");
    this.load.image("stair", "sprites/stair.png");

    this.load.image("taxi", "sprites/taxi.png");
    this.load.image("elevator-door", "sprites/elevator-door.png");
    this.load.image("logo", "sprites/logo.png");
    this.load.image("textbox", "sprites/textbox.png");
    this.load.image("desk", "sprites/desk.png");
    this.load.image("chair", "sprites/chair.png");
    this.load.image("big-fist", "sprites/big-fist.png");

    // Characters
    this.load.image("julian", "sprites/julian.png");
    this.load.image("hope", "sprites/hope.png");
    this.load.image("variant", "sprites/variant.png");
    this.load.image('conference-room', 'backgrounds/conference-room.png')
		this.load.tilemapTiledJSON(
			"room_map",
			"tilemaps/conference-room.json"
		  )
    this.load.image("big-fist", 'sprites/big-fist.png');
    this.load.image("fly", 'sprites/fly.png');
    this.load.image("slack-box", 'sprites/slack-box.png');

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
