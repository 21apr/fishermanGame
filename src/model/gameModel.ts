import {
  congratulations,
  gameOver,
  ModalWindow,
  nextLevel,
} from "./modalWindowModel";
import { size } from "../view/size";
import { Player } from "./playerModel";
import { Level, levelList } from "./levelModel";

export class GameModel {
  player: Player;
  score: number = 0;
  timer: number = 60;
  minScore: number = 100;
  levelCompleted: boolean = false;
  modalWindow: ModalWindow = new ModalWindow();
  level: Level = levelList[0];

  constructor() {
    this.player = new Player("user", -(size.size / 6.1), size.size / 2.6);
  }

  update() {
    const grab = document.querySelector("#grab") as HTMLElement;
    if (this.timer > 1) {
      this.timer -= 1 / 60;
    } else {
      this.checkLevelCompletion();
    }

    this.player.hook.update();

    if (this.player.hook.isMoving) {
      this.level.fishes.forEach((obj, index) => {
        if (this.player.hook.caughtObject(obj)) {
          const fish = document.querySelector(`#${obj.id}`) as HTMLElement;
          grab.appendChild(fish);
          this.player.hook.direction = "backward";
          this.score += obj.type.value;
          this.level.fishes.splice(index, 1);
        }
      });
    }

    if (this.player.hook.length <= 5) {
      this.player.hook.retract();
      if (grab.childNodes.length > 0) {
        grab.innerHTML = "";
        this.player.hook.soundCatch.play();
      }
    }
  }

  checkLevelCompletion() {
    if (this.score >= this.level.goalScore) {
      this.levelCompleted = true;
      if (this.level.number === levelList.length) {
        this.modalWindow.checkType(congratulations);
        console.log("Congratulations! You have completed the game!");
      } else {
        this.modalWindow.checkType(nextLevel);
        console.log("Congratulations! You have completed the level!");
      }
    } else {
      this.modalWindow.checkType(gameOver);
      console.log("The time is up! The level has not been completed.");
    }
  }
}
