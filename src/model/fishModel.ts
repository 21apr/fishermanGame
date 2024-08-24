import { size } from "../view/size";

export class Fish {
    id: string;
    x: number;
    y: number;
    type: Type = typeFish1;
    direction: "left" | "right";
    constructor(type: Type) {
        this.id = `id-${crypto.randomUUID()}`;
        this.y = this.type.addDepth() || 0;
        this.x =(Math.random() * 100);
        this.type = type;
        this.direction = Math.random() > 0.5 ? "right" : "left";
    }

    update() {

        if (this.direction === "right" && this.x < 100) {
            this.x += this.type.speed;
        } else if (this.direction === "left" && this.x > 0) {
            this.x -= this.type.speed;
        } else if (this.x <= 10) {
            this.direction = "right";
        } else if (this.x >= 100 - 10) {
            this.direction = "left";
        }
    }
}

export class Type {
    width: number;
    height: number;
    img: string;
    value: number;
    speed: number = 0.08;
    depth: number[];
    constructor(width: number, height: number, img: string, value: number, speed: number, depth: number[]) {
        this.width = width;
        this.height = height;
        this.img = img;
        this.value = value;
        this.speed = speed;
        this.depth = depth;
    }

    addDepth() {
        const min = this.depth[0];
        const max = this.depth[1];
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

export const fishList: Fish[] = [];

export const typeList: Type[] = [];

const typeFish1 = new Type(size.size/3, size.size/3, "./src/assets/fish5.png", 20, 0.08, [15, 35]);
const typeFish2 = new Type(size.size/3, size.size/3, "./src/assets/fish6.png", 25, 0.16, [20, 75]);
const typeFish3 = new Type(size.size, size.size, "./src/assets/fish8.png", 25, 0.08, [75, 95]);
const shoe = new Type(size.size/3, size.size/3, "./src/assets/shoe.png", 0, 0, [95, 100]);

typeList.push(typeFish1, typeFish2, typeFish3, shoe);

// function addFish(level: number = 1) {

//     for (let i = 0; i < 30 / level; i++) {
//         typeList.push(new Type(size.size/3, size.size/3, "./src/assets/fish5.png", 20, 0.08, [15, 35]));
//         typeList.push(new Type(size.size/2.8, size.size/2.8, "./src/assets/fish6.png", 25, 0.10, [20, 75]));
//     }
// }

// addFish();

for (let i = 0; i < typeList.length; i++) {
    fishList.push(new Fish(typeList[i]));
}

export const fishListToLevels = [
    // [0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 3, 3],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 3, 3],
]