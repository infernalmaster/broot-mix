import reducer, { increase, decrease } from "./counter.js";

it("returns previus state if unknown action", () => {
  let newState = reducer(undefined, { type: "unknown" });
  expect(newState).toEqual({ count: 0 });
});

describe("action increase", () => {
  it("increases count by 1", () => {
    let newState = reducer({ count: 10 }, increase());

    expect(newState).toEqual({
      count: 11
    });
  });

  it("allow to increase by other values", () => {
    expect(reducer(undefined, increase(10))).toEqual({
      count: 10
    });
  });
});

describe("action descrease", () => {
  it("decreaes count by 1", () => {
    let newState = reducer({ count: 10 }, decrease());

    expect(newState).toEqual({
      count: 9
    });
  });

  it("allow to increase by other values", () => {
    expect(reducer(undefined, decrease(10))).toEqual({
      count: -10
    });
  });
});
