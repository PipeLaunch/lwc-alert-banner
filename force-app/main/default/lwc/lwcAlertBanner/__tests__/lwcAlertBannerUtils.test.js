import * as utils from "../utils";

describe("normalizeBoolean", () => {
  test("valid boolean: 1", () => {
    expect(utils.normalizeBoolean(1)).toBe(true);
  });
});


describe("validateIconName", () => {
  test("valid icon", () => {
    expect(utils.normalizeBoolean("utility:down")).toBe("utility:down");
  });

  test("invalid icon", () => {
    expect(utils.normalizeBoolean("invalid:down")).toBe(null);
  });
});
