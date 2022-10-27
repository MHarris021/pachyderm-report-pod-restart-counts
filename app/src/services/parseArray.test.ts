import { parseArray } from "./parseArray";

describe("parseArray", () => {
  // test that parseArray returns an array of strings
  test("parseArray returns an array of strings", () => {
    const lines = [
      "array1:",
      "  1",
      "  2",
      "  3",
      "  4",
      "  5",
      "  6",
      "  7",
      "  8",
      "  9",
      "  10",
    ];
    const { array, endLine } = parseArray({ lines, currentLine: 0 });
    expect(array).toEqual(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]);
  });

  // test that parseArray returns the correct endLine
  test("parseArray returns the correct endLine", () => {
    const lines = [
      "array1:",
      "  1",
      "  2",
      "  3",
      "  4",
      "  5",
      "  6",
      "  7",
      "  8",
      "  9",
      "  10",
    ];
    const { array, endLine } = parseArray({ lines, currentLine: 0 });
    expect(endLine).toEqual(11);
  });

  // test that parseArray returns correct array and endLine when there is an initial value
  test("parseArray returns correct array and endLine when there is an initial value", () => {
    const lines = [
      "  array1: 1",
      "  2",
      "  3",
      "  4",
      "  5",
      "  6",
      "  7",
      "  8",
      "  9",
      "  10",
    ];
    const { array, endLine } = parseArray({ lines, currentLine: 0 });
    expect(array).toEqual(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]);
    expect(endLine).toEqual(10);
  });

  // test that parseArray returns correct array and endLine when there is an initial value and position is 2
  test("parseArray returns correct array and endLine when there is an initial value and position is 2", () => {
    const lines = [
      "  array1: 1",
      "    2",
      "    3",
      "    4",
      "    5",
      "    6",
      "    7",
      "    8",
      "    9",
      "    10",
    ];
    const { array, endLine } = parseArray({
      lines,
      currentLine: 0,
      position: 2,
    });
    expect(array).toEqual(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]);
    expect(endLine).toEqual(10);
  });

  // test that parseArray returns correct array and endLine when the position is 3 and the next line is not indented
  test("parseArray returns correct array and endLine when the position is 3 and the next line is not indented", () => {
    const lines = [
      "  array1: 1",
      "    2",
      "    3",
      "    4",
      "    5",
      "    6",
      "    7",
      "    8",
      "    9",
      "    10",
      "   11",
    ];
    const { array, endLine } = parseArray({
      lines,
      currentLine: 0,
      position: 3,
    });
    expect(array).toEqual(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]);
    expect(endLine).toEqual(10);
  });
});
