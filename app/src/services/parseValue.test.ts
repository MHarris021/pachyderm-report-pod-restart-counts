import {parseValue} from "./parseValue";

test('Check that parseValue works', () => {
    const {key, value} = parseValue("Hello: World");
    expect(key).toBe("hello");
    expect(value).toBe("World");
});

// Test that parseValue works on multiple whitespace characters
test('Test that parseValue works on multiple whitespace characters', () => {
  const text = "Hello:                            World";
    const {key, value} = parseValue(text);
    expect(key).toBe("hello");
    expect(value).toBe("World");
});

// Test that parseValue works when multiple ':' characters are present
test('Test that parseValue works when multiple ":" characters are present', () => {
    const text = "Hello: World: Hello";
        const {key, value} = parseValue(text);
        expect(key).toBe("hello");
        expect(value).toBe("World: Hello");
});

// Test that parseValue works for time values
test('Test that parseValue works for time values', () => {
    const text = "Time: 2020-01-01T00:00:00.000Z";
        const {key, value} = parseValue(text);
        expect(key).toBe("time");
        expect(value).toBe("2020-01-01T00:00:00.000Z");
});