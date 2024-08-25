export class ModalWindow {
    element: HTMLDivElement;
    type: TypeModalWindow = startGame;
    constructor() {
        this.element = document.querySelector("#modal") as HTMLDivElement;
        this.renderModal();
    }

    renderModal() {
        const html = `
            <div class="modal-content">
                <div class="modal-body">
                <h2>${this.type.title}</h2>
                <p>${this.type.text}</p>
                <button type="button">${this.type.textButton}</button>
                </div>
            </div>
        `;
        this.element.innerHTML = html;
        this.open();
    }

    open() {
        this.element.style.display = "block";
    }

    close() {
        this.element.style.display = "none";
    }
}

export class TypeModalWindow {
    title: string;
    text: string;
    typeButton: string;
    textButton: string;
    constructor(title: string, text: string, typeButton: string, textButton: string) {
        this.title = title;
        this.text = text;
        this.typeButton = typeButton;
        this.textButton = textButton;
    }
}

const startGame = new TypeModalWindow("Welcome to the Fishing Game", "Use the space key to control the hook and catch as many fish as you can. Each level has a target score you must reach within one minute to advance. Good luck!", "button", "Start Game");
const nextLevel = new TypeModalWindow("Level Completed", "Your score is high enough to move to the next level", "button", "Next Level");
const congratulations = new TypeModalWindow("Congratulations", "You have completed all levels", "button", "Game Again");
const gameOver = new TypeModalWindow("Game Over", "You didn't score enough points, so the game is over.", "button", "Restart Game");

export { startGame, nextLevel, congratulations, gameOver }