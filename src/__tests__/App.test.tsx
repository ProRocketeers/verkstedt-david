export function divide(x: number, y: number): number {
  if (y === 0) {
    throw new Error ("You can't divide by zero.");
  }
    return Math. round (x / y);
  }
describe('divide function', () => {
  describe ('when given to integers', () => {
    it ('should return a division result', () => {
    
    })
  })
})
it("should return a division result", () => {
  const [X, y, expected] = [40, 4, 10];
  const result = divide (X, y);
  expect (result). toEqual (expected);
});