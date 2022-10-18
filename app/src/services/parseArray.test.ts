import {parseArray} from "./parseArray";

// Parse lines of text into an array of strings.
//
// Parameters:
//     lines: string[] - The lines of text to parse.
//     currentLine: number - The current line to start parsing from.
//     position: number - The position to start parsing from. Defaults to 1.
//
describe("parseArray", () => {
// test that parseArray returns an array of strings
    test('parseArray returns an array of strings', () => {
        const lines = [
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
        const {array, endLine} = parseArray(lines, 0);
        expect(array).toEqual(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]);
    });

// test that parseArray returns the correct endLine
    test('parseArray returns the correct endLine', () => {
        const lines = [
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
        const {array, endLine} = parseArray(lines, 0);
        expect(endLine).toEqual(10);
    });

// test that parseArray returns correct array and endLine when there is an initial value
    test('parseArray returns correct array and endLine when there is an initial value', () => {
        const lines = [
            "  1: 1",
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
        const {array, endLine} = parseArray(lines, 0);
        expect(array).toEqual(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]);
        expect(endLine).toEqual(10);
    });

// test that parseArray returns correct array and endLine when there is an initial value and position is 2
    test('parseArray returns correct array and endLine when there is an initial value and position is 2', () => {
        const lines = [
            "  1: 1",
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
        const {array, endLine} = parseArray(lines, 0, 2);
        expect(array).toEqual(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]);
        expect(endLine).toEqual(10);
    });

// test that parseArray returns correct array and endLine when the position is 3 and the next line is not indented
    test('parseArray returns correct array and endLine when the position is 3 and the next line is not indented', () => {
        const lines = [
            "  1: 1",
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
        const {array, endLine} = parseArray(lines, 0, 3);
        expect(array).toEqual(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]);
        expect(endLine).toEqual(10);
    });
});