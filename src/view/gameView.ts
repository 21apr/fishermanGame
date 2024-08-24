import { Fish } from "../model/fishModel";
import { levelList } from "../model/levelModel";
import { Hook } from "../model/playerModel";
import { size } from "./size";

export class GameView {
  playerElement: HTMLElement;
  hookElement: HTMLElement;
  objectsContainer: HTMLElement;
  scoreElement: HTMLElement;
  timerElement: HTMLElement;
  modalElement: HTMLElement;

  constructor() {
    this.playerElement = document.querySelector("#player")!;
    this.hookElement = document.querySelector("#hook")!;
    this.objectsContainer = document.querySelector(".water")!;
    this.scoreElement = document.querySelector("#score")!;
    this.timerElement = document.querySelector("#timer")!;
    this.modalElement = document.querySelector("#modal")!;
  }

  renderHook(hook: Hook) {
    const fishingRod = document.querySelector("#fishing-rod") as HTMLElement;
    fishingRod.style.display = "block";
    const hookElem = document.querySelector("#hook") as HTMLElement;
    const fishingLine = document.querySelector("#fishing-line") as HTMLElement;

    if (!hook.isMoving) {
      hook.update();
      fishingLine.style.height = `${size.size / 6}px`;
      fishingRod.style.transform = `rotate(${hook.angle}rad)`;
      fishingRod.style.left = `${hook.x}px`;
      hookElem.style.left = `0px`;
      fishingRod.style.top = `${hook.y}px`;
      hookElem.style.top = `0px`;
    } else {
      fishingLine.style.height = `${hook.length + 50}px`;
      if (hook.angle < 0) {
        hookElem.style.left = `${hook.length * Math.sin(0)}px`;
        hookElem.style.top = `${hook.length * Math.cos(0)}px`;
      } else {
        hookElem.style.left = `-${hook.length * Math.sin(0)}px`;
        hookElem.style.top = `${hook.length * Math.cos(0)}px`;
      }
    }
  }

  renderWater(levelNum: number) {
    let html: string = "";
    const level = levelList[levelNum-1];
    const fishes: Fish[] = level.fishes;
    fishes.forEach((fish) => {
      if (fish.direction === "left") {
        html += `<div id="${fish.id}" class="fish" style="left: ${fish.x}%; top: ${fish.y}%; width: ${fish.type.width}px; height: ${fish.type.height}px;"><img src="${fish.type.img}" alt="fish" style="transform: scaleX(-1);"></div>`;
      } else {
        html += `<div id="${fish.id}" class="fish" style="left: ${fish.x}%; top: ${fish.y}%; width: ${fish.type.width}px; height: ${fish.type.height}px;"><img src="${fish.type.img}" alt="fish"></div>`;
      }
      fish.update();
    });
    this.objectsContainer.innerHTML = html;
  }

  updateScore(score: number) {
    this.scoreElement.innerText = `Score: ${score}`;
  }

  updateTimer(timer: number) {
    this.timerElement.innerText = `Time: ${Math.floor(timer)}`;
  }

  updateLevel(level: number) {
    this.timerElement.innerText = `Level: ${level}`;
  }

  updateGoal(goal: number) {
    this.timerElement.innerText = `Goal: ${goal}`;
  }
}

export function renderGame() {
  const html = `
  <div id="modal"></div>
  <div class="header" style="height: ${size.size * 0.55}px; font-size: ${
    size.size / 10
  }px;">
    <div class="div-box">
        <div id="score">Score: 0</div>
        <div id="goalLevel">Goal: 100</div>
    </div>

    <div id="player" style="width: ${size.size}px; height: ${size.size}px;">
      <div id="fishing-rod" style="width: ${size.size / 3}px; height: ${
    size.size / 3
  }px;">
        <div id="fishing-line"></div>
        <div id="hook">
          <div id="grab"></div>
        </div>
      </div>
    </div>

    <div class="div-box">
        <div id="level">Level: 1</div>
        <div id="timer">Timer: 60</div>
    </div>
  </div>
  <div class="water"></div>
  `;
  const game = document.querySelector("#game") as HTMLElement;
  game.innerHTML = html;
}
