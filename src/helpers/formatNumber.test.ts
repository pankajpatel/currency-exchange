import formatNumber from "./formatNumber";

describe("Helper - Format Number", () => {
  test("no input", () => {
    expect(formatNumber()).toBe("0.0000");
  });

  test("null input", () => {
    expect(formatNumber(null, 2)).toBe("0.00");
  });

  test("number with two precision input", () => {
    expect(formatNumber(2, 2)).toBe("2.00");
  });

  test("number with 4 precision input", () => {
    expect(formatNumber(5, 4)).toBe("5.0000");
  });

  test("Float number with 4 precision input", () => {
    expect(formatNumber(5.123446, 4)).toBe("5.1234");
    expect(formatNumber(5.1234, 4)).toBe("5.1234");
  });
});
