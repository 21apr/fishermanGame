import "./style.scss";
import { GameController } from "./controller/gameContr";
import { GameModel } from "./model/gameModel";
import { GameView, renderGame } from "./view/gameView";

renderGame();

const model = new GameModel();
const view = new GameView();
const controller = new GameController(model, view);

document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector("button") as HTMLButtonElement;
  button.addEventListener("click", () => {
    model.modalWindow.close();
    controller.init();
  });
});

document.addEventListener("click", (event) => {
  if (event.target!.type === "button") {
    if (event.target!.innerHTML === "Next Level") {
      controller.restartLevel();
    } else if (event.target!.innerHTML === "Game Again" || event.target!.innerHTML === "Restart Game") {
      controller.restartGame();
    }
  }
});