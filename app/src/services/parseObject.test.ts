import {parseObject} from './parseObject';
import {DescribeFields, DescribeFieldType} from "../constants/types";

const fields: DescribeFields = [
    {
        field: "value1",
        fieldType: DescribeFieldType.Value,
        name: "value1",
    },
    {
        field: "value2",
        fieldType: DescribeFieldType.Value,
        name: "value2",
    },
    {
        field: "value3",
        fieldType: DescribeFieldType.Value,
        name: "value3",
    },
    {
        field: "array1",
        fieldType: DescribeFieldType.Array,
        name: "array1",
    }
    ];

describe('parseObject', () => {
    // it should return an object with the correct keys and values when given an array of strings
    it('should return an object with the correct keys and values when given an array of strings', () => {
        const lines = [
            "test:",
            "  value1: 1",
            "  value2: 2",
            "  value3: 3",
        ];
        const {obj, endLine} = parseObject(lines, 0, fields);
        expect(obj).toEqual({test: {value1: "1", value2: "2", value3: "3"}});
    });

    // it should return the correct endLine when given an array of strings
    it('should return the correct endLine when given an array of strings', () => {
        const lines = [
            "test:",
            "   value1: 1",
            "   value2: 2",
            "   value3: 3",
        ];
        const {obj, endLine} = parseObject(lines, 0, fields);
        expect(endLine).toEqual(4);
    });

    // it should return the correct object and endLine when given an array of strings and array fields
    it('should return the correct object and endLine when given an array of strings and array fields', () => {
        const lines = [
            "test:",
            "  array1:",
            "    1",
            "    2",
            "    3",
        ];
        const {obj, endLine} = parseObject(lines, 0, fields);
        expect(obj).toEqual({test: {array1: ["1", "2", "3"]}});
        expect(endLine).toEqual(8);
    });
});
