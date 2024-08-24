export const widthScreen = window.innerWidth;

export class Size {
    size: number;
    constructor() {
        this.size = this.getSize();
    }

    getSize() {
        const heightScreen = window.innerHeight;
        if (widthScreen < heightScreen) {
            return heightScreen / 6;
        }
        return widthScreen / 6;
    }

}

export const size = new Size();