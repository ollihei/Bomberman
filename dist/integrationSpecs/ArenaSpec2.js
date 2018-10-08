"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Arena_1 = require("../src/logic/Arena");
describe("33Test arena", () => {
    let arena;
    beforeAll(() => {
        it("by creating arena", function () {
            arena = new Arena_1.Arena(5, 5, 1);
            arena.print();
        }, 5000);
    });
});
//# sourceMappingURL=ArenaSpec2.js.map