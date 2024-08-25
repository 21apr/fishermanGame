import { Fish, fishListToLevels, typeList } from "./fishModel";

export class Level {
  number: number;
  goalScore: number;
  fishes: Fish[];
  constructor(number: number, goalScore: number, fishes: number[] = [0, 1, 2]) {
    this.number = number;
    this.goalScore = goalScore;
    this.fishes = this.createFishList(...fishes);
  }

  createFishList(...numbers: number[]) {
    let fishList: Fish[] = [];
    numbers.forEach((number) => {
      fishList.push(new Fish(typeList[number]));
    });
    return fishList;
  }
}

function createLevelList(qtyLevels: number, goalScore: number) {
  let levelList: Level[] = [];
  let goal = goalScore;
  for (let i = 0; i < qtyLevels; i++) {
    levelList.push(new Level(i + 1, goal, fishListToLevels[i]));
    goal += 100;
  }
  return levelList;
}

export let levelList = createLevelList(3, 100);

export function restartLevelList() {
  levelList = createLevelList(3, 100);
}
