"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const safeEval = require("safe-eval");
/**
* Class for Ui object.
*/
class Ui {
    constructor() {
        this.doNothingMove = { direction: 0, leaveBomb: false };
    }
    makeMove(arena, location) {
        const context = {
            uiArena: arena.getUiArena(),
            location: location,
            uiStore: this.uiStore
        };
        const code = ' { direction: 1, leaveBomb: true }';
        const playerMove = safeEval(code, context);
        if (!playerMove || !playerMove.leaveBomb || !playerMove.direction) {
            return this.doNothingMove;
        }
        return playerMove;
    }
}
exports.Ui = Ui;
//# sourceMappingURL=Ui.js.map