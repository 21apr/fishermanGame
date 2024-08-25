import { GameModel } from "../model/gameModel";
import { levelList, restartLevelList } from "../model/levelModel";
import { GameView } from "../view/gameView";

export class GameController {
  model: GameModel;
  view: GameView;
  intervalId: number | undefined;

  constructor(model: GameModel, view: GameView) {
    this.model = model;
    this.view = view;
    this.intervalId = undefined;
  }

  init() {
    document.addEventListener("keydown", (event) => this.handleKeyPress(event));
    this.intervalId = setInterval(() => this.gameLoop(), 1000 / 60);
  }

  stop() {
    if (this.intervalId) {
      this.model.player.hook.stopSound(this.model.player.hook.backwardSound);
      this.model.player.hook.stopSound(this.model.player.hook.forwardSound);
      clearInterval(this.intervalId);
      console.log("Game Stopped");
    }
  }

  handleKeyPress(event: KeyboardEvent) {
    if (event.key === " " && !this.model.levelCompleted) {
      if (!this.model.player.hook.isMoving) {
        this.model.player.hook.launch();
      }
    }
  }

  gameLoop() {
    this.model.update();
    this.view.renderHook(this.model.player.hook);
    this.view.renderWater(this.model.level.number);
    this.view.updateScore(this.model.score);
    this.view.updateTimer(this.model.timer);

    if (this.model.timer < 1) {
      this.stop();
      clearInterval(this.intervalId);
      this.model.checkLevelCompletion();
    }
  }

  restartLevel() {
    this.stop();
    this.model.modalWindow.close();
    this.model.levelCompleted = false;
    this.model.timer = 60;
    this.model.score = 0;
    this.model.player.hook.retract();
    const index = levelList.indexOf(this.model.level);
    this.model.level = levelList[index + 1];
    if (this.model.level !== undefined) {
      this.view.updateLevel(this.model.level.number);
      this.view.updateGoal(this.model.level.goalScore);
    }

    this.init();
  }

  restartGame() {
    this.stop();
    this.restartLevel();
    restartLevelList();
    this.model.level = levelList[0];
    this.view.updateLevel(this.model.level.number);
    this.view.updateGoal(this.model.level.goalScore);
  }
}
