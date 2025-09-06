import Phaser from "phaser";
import { Boot } from "./scenes/Boot";
import { Preloader } from "./scenes/Preloader";
import { Game } from "./scenes/Game";
import { GameOver } from "./scenes/GameOver";
import { MainMenu } from "./scenes/MainMenu";

const config = {
  type: Phaser.AUTO,

  parent: "game-container",
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      gravity: { y: 0 },
    },
  },

  audio: {
    disableWebAudio: false,
  },

  scale: {
    mode: Phaser.Scale.LANDSCAPE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1200,
    height: 800,
  },

  scene: [Boot, MainMenu, Preloader, Game, GameOver],
};

new Phaser.Game(config);
