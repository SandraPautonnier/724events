import { getMonth } from "./index";

describe("Date helper", () => {
  describe("When getMonth is called", () => {
    it("the function returns 'janvier' for a Date of 2022-01-01", () => {
      const date = new Date("2022-01-01");
      const result = getMonth(date);
      expect(result).toBe("janvier");
    });

    it("the function returns 'juillet' for a Date of 2022-07-08", () => {
      const date = new Date("2022-07-08");
      const result = getMonth(date);
      expect(result).toBe("juillet");
    });

    it("the function returns 'février' for a leap year date (2024-02-29)", () => {
      const date = new Date("2024-02-29");
      const result = getMonth(date);
      expect(result).toBe("février");
    });

    it("the function returns 'décembre' for a Date of 2022-12-31", () => {
      const date = new Date("2022-12-31");
      const result = getMonth(date);
      expect(result).toBe("décembre");
    });

    it("the function throws an error when an invalid date is provided", () => {
      const invalidDate = new Date("invalid-date");
      expect(() => getMonth(invalidDate));
    });
  });
});
