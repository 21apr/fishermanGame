import { size } from "../view/size";

export class Fish {
    id: string;
    x: number;
    y: number;
    type: Type;
    direction: "left" | "right";
    constructor(type: Type) {
        this.id = `id-${crypto.randomUUID()}`;
        this.x =(Math.random() * 100);
        this.type = type;
        this.direction = Math.random() > 0.5 ? "right" : "left";
        this.y = this.type.addDepth();
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
    depths: number[];
    constructor(width: number, height: number, img: string, value: number, speed: number, depths: number[]) {
        this.width = width;
        this.height = height;
        this.img = img;
        this.value = value;
        this.speed = speed;
        this.depths = depths;
    }

    addDepth() {
        const min = this.depths[0];
        const max = this.depths[1];
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

export const typeList: Type[] = [];

const typeFish1 = new Type(size.size/3, size.size/3, "./src/assets/fish5.png", 20, 0.08, [15, 75]);
const typeFish2 = new Type(size.size/3, size.size/3, "./src/assets/fish6.png", 25, 0.16, [55, 75]);
const typeFish3 = new Type(size.size/1.5, size.size/1.5, "./src/assets/fish8.png", 100, 0.08, [75, 95]);
const shoe = new Type(size.size/3, size.size/3, "./src/assets/shoe.png", 0, 0, [95, 96]);

typeList.push(typeFish1, typeFish2, typeFish3, shoe);

export const fishListToLevels = [
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 3, 3],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 3, 3],
]