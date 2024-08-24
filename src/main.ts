import "./style.scss";
import { GameController } from "./controller/gameContr";
import { GameModel } from "./model/gameModel";
import { GameView, renderGame } from "./view/gameView";
import { levelList } from "./model/levelModel";

renderGame();

const model = new GameModel();
const view = new GameView();
const controller = new GameController(model, view);

document.addEventListener("DOMContentLoaded", () => {
  // view.renderModal(model.modalWindow.type);
  // model.modalWindow.open();
  const button = document.querySelector("button") as HTMLButtonElement;
  button.addEventListener("click", () => {
    model.modalWindow.close();
    controller.init();
  });
  console.log("DOM fully loaded and parsed");
});

document.addEventListener("click", (event) => {

  if (event.target!.type === "button") {
    model.timer = 60;
    model.score = 0;
    if (event.target!.innerHTML === "Start Game") {
      console.log("WOOOOOOOOW");
    } else if (event.target!.innerHTML === "Next Level") {
      model.level = levelList[1];
      controller.init();
      model.modalWindow.close();
      view.updateLevel(model.level.number);
      view.updateGoal(model.level.goalScore);
      model.player.hook.retract();
    } else if (event.target!.innerHTML === "Game Again" || event.target!.innerHTML === "Restart Game") {
      model.level = levelList[0];
      controller.init();
      model.modalWindow.close();
    }
  }
  console.dir(event.target);
});

// if (model.modalWindow.type.typeButton === "button") {
//     document.querySelector("button")?.addEventListener("click", () => {
//         model.modalWindow.close();
//     })
// }
// const button = document.querySelector("button") as HTMLButtonElement;
// button.addEventListener("click", () => {
//     model.modalWindow.close();
// })
// document.addEventListener("click", (event) => {
//     // if (event.target.type === "button") {}
//     console.log(event.target)
//     });
// controller.init();

console.log(levelList);