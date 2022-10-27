import camelCase from "lodash.camelcase";

// function parseValue(line: string, separator: string|RegExp): {key: string, value: string}
//
// Parse a line of text into a key and value.
//
// Parameters:
//     line: string - The line of text to parse.
//     separator: string|RegExp - The separator to use when parsing the line. Defaults to ":".
//      If a string is provided, it will be used as the separator.
//      If a regular expression is provided, the first match will be used as the separator.
//      If no match is found, the entire line will be used as the key.
//
//
// Returns:
//     {key: string, value: string} - The key and value parsed from the line.
//     If no match is found, the entire line will be used as the key.
//     key will be camelCased.
export function parseValue(
  line: string,
  separator: string | RegExp = ":"
): { key: string; value: string } {
  const fields = line.split(separator);
  const key = camelCase(fields[0].trim());
  const value = fields
    .slice(1)
    .join(typeof separator == "string" ? separator : ",")
    .trim();
  return { key, value };
}
