import { gameOver, ModalWindow, nextLevel } from "./modalWindowModel";
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
    this.player = new Player("user", -(size.size / 6), size.size / 2);
  }

  update() {
    const grab = document.querySelector("#grab") as HTMLElement;
    if (this.timer >= 0) {
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
      this.player.hook.stopSound(this.player.hook.backwardSound);
      this.modalWindow.type = nextLevel;
      this.modalWindow.renderModal();

    } else {
      this.modalWindow.type = gameOver;
      this.modalWindow.renderModal();

      console.log("The time is up! The level has not been completed.");
    }
  }
}
