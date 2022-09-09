import type * as Silly from "../src/silly"
const { sillyFunction } = jest.requireActual<typeof Silly>("../src/silly")

describe("silly function", () => {
  test("guaranteed random", () => {
    expect(sillyFunction()).toBe(4)
  })
})

export {}