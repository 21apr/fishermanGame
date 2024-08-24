import { Fish, fishListToLevels, typeList } from "./fishModel";

export class Level {
  number: number = 1;
  goalScore: number = 100;
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

export function createLevelList(qtyLevels: number, goalScore: number) {
  let levelList: Level[] = [];
  for (let i = 0; i < qtyLevels; i++) {
    if (i === 0) {
      levelList.push(new Level(i + 1, goalScore, fishListToLevels[i]));
    }
    levelList.push(new Level(i + 1, goalScore + 100, fishListToLevels[i]));
  }
  return levelList;
}

export const levelList = createLevelList(3, 100);
