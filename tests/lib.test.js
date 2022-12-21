const lib = require("../lib");

describe("absolute  ", () => {
  it("should return a positive number if input is positive", () => {
    const result = lib.absoulte(1);
    expect(result).toBe(1);
  });
  it("should return a positive number if input is negative", () => {
    const result = lib.absoulte(-1);
    expect(result).toBe(1);
  });
  it("should return a 0 if input is 0", () => {
    const result = lib.absoulte(0);
    expect(result).toBe(0);
  });
});

describe("greet", () => {
  it("should return the greeting message", () => {
    const result = lib.greet("Shital");
    expect(result).toMatch(/Shital/);
    expect(result).toContain("Shital");
  });
});


//Testing Arrays
