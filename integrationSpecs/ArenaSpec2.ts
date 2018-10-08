import { Arena } from '../src/logic/Arena'

describe("33Test arena", () => {
  let arena: Arena;
  beforeAll(() => {
    it("by creating arena", function() {
      arena = new Arena(5, 5, 1);
      arena.print();
    }, 5000);
  });
});
