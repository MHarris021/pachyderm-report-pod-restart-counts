import {parseObjects} from "./parseObjects";
import {DescribeFields, DescribeFieldType} from "../constants/types";

const worldFields:DescribeFields = [
    {
        field: "World1",
        fieldType: DescribeFieldType.Value,
        name: "world1",
    },
    {
        field: "World2",
        fieldType: DescribeFieldType.Value,
        name: "world2",
    },
    {
        field: "World3",
        fieldType: DescribeFieldType.Value,
        name: "world3",
    }
]
// test that parseObjects returns the correct objects and endLine for value fields
test('parseObjects returns the correct objects and endLine for value fields', () => {
    const lines = [
        "Hello: ",
        "  World1: 1",
        "  World2: 2",
        "  World3: 3",
        ];
    const {objects, endLine} = parseObjects(lines, {name: "Hello", fieldType: DescribeFieldType.Object, field:"world", subFields:worldFields}, 0);
    expect(objects).toEqual([{hello:{world1: "1", world2: "2", world3: "3"}}]);
    expect(endLine).toEqual(10);
});
