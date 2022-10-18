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
    },
    {
        field: "array2",
        fieldType: DescribeFieldType.Array,
        name: "array2",
    },
    {
        field: "object1",
        fieldType: DescribeFieldType.Object,
        name: "object1",
        subFields: [
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
            },
            {
                field: "subObject1",
                fieldType: DescribeFieldType.Object,
                name: "subObject1",
                subFields: [
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
                        field: "subSubObject1",
                        fieldType: DescribeFieldType.Object,
                        name: "subSubObject1",
                        subFields: [
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
                            }
                            ]
                    }
                ]
            }
        ]
    }
];

describe('parseObject', () => {
    // it should return an object with the correct keys and values when given an array of strings
    it('should return an object with the correct keys and values when given an array of strings', () => {
        const lines = [
            "  value1: 1",
            "  value2: 2",
            "  value3: 3",
        ];
        const {obj, endLine} = parseObject({lines, currentLine: 0, fields, objectName: "test"});
        expect(obj).toEqual({test: {value1: "1", value2: "2", value3: "3"}});
    });

    // it should return the correct endLine when given an array of strings
    it('should return the correct endLine when given an array of strings', () => {
        const lines = [
            "   value1: 1",
            "   value2: 2",
            "   value3: 3",
        ];
        const {obj, endLine} = parseObject({lines, currentLine: 0, fields, objectName: "test"});
        expect(endLine).toEqual(3);
    });

    // it should return the correct object and endLine when given an array field
    it('should return the correct object and endLine when given an array of strings and array fields', () => {
        const lines = [
            "  array1:",
            "    1",
            "    2",
            "    3",
        ];
        const {obj, endLine} = parseObject({lines, currentLine: 0, fields, objectName: "test"});
        expect(obj).toEqual({test: {array1: ["1", "2", "3"]}});
        expect(endLine).toEqual(4);
    });

    // it should return the correct object and endLine when given multiple array fields
    it('should return the correct object and endLine when given multiple array fields', () => {
        const lines = [
            "  array1:",
            "    1",
            "    2",
            "    3",
            "  array2:",
            "    4",
            "    5",
            "    6",
        ];
        const {obj, endLine} = parseObject({lines, currentLine: 0, fields, objectName: "test"});
        expect(obj).toEqual({test: {array1: ["1", "2", "3"], array2: ["4", "5", "6"]}});
        expect(endLine).toEqual(8);
    });

    // it should return the correct object and endLine when given an array field and value fields
    it('should return the correct object and endLine when given an array field and value fields', () => {
        const lines = [
            "  value1: 1",
            "  value2: 2",
            "  value3: 3",
            "  array1:",
            "    1",
            "    2",
            "    3",
        ];
        const {obj, endLine} = parseObject({lines, currentLine: 0, fields, objectName: "test"});
        expect(obj).toEqual({test: {value1: "1", value2: "2", value3: "3", array1: ["1", "2", "3"]}});
        expect(endLine).toEqual(7);
    });

    // it should return the correct object and endLine when given a mix of array fields and value fields
    it('should return the correct object and endLine when given a mix of array fields and value fields', () => {
        const lines = [
            "  array1:",
            "    1",
            "    2",
            "    3",
            "  value1: 1",
            "  value2: 2",

            "  array2:",
            "    4",
            "    5",
            "    6",
            "  value3: 3"
        ];
        const {obj, endLine} = parseObject({lines, currentLine: 0, fields, objectName: "test"});
        expect(obj).toEqual({
            test: {
                array1: ["1", "2", "3"],
                value1: "1",
                value2: "2",
                value3: "3",
                array2: ["4", "5", "6"]
            }
        });
        expect(endLine).toEqual(11);
    });

    // it should return the correct object and endLine when given an object field
    it('should return the correct object and endLine when given an object field', () => {
        const lines = [
            "  object1:",
            "    value1: 1",
            "    value2: 2",
            "    value3: 3"
        ];
        const {obj, endLine} = parseObject({lines, currentLine: 0, fields, objectName: "test"});
        expect(obj).toEqual({test: {object1: {value1: "1", value2: "2", value3: "3"}}});
        expect(endLine).toEqual(4);
    });

    // it should return the correct object and endLine when given a mix of object fields and value fields
    it('should return the correct object and endLine when given a mix of object fields and value fields', () => {
        const lines = [
            "  value1: 1",
            "  value2: 2",
            "  value3: 3",
            "  object1:",
            "    value1: 1",
            "    value2: 2",
            "    value3: 3"
        ];
        const {obj, endLine} = parseObject({lines, currentLine: 0, fields, objectName: "test"});
        expect(obj).toEqual({
            test: {
                value1: "1",
                value2: "2",
                value3: "3",
                object1: {value1: "1", value2: "2", value3: "3"}
            }
        });
        expect(endLine).toEqual(7);
    });

    // it should return the correct object and endLine when given a mix of object fields and array fields
    it('should return the correct object and endLine when given a mix of object fields and array fields', () => {
        const lines = [
            "  array1:",
            "    1",
            "    2",
            "    3",
            "  object1:",
            "    value1: 1",
            "    value2: 2",
            "    value3: 3"
        ];
        const {obj, endLine} = parseObject({lines, currentLine: 0, fields, objectName: "test"});
        expect(obj).toEqual({test: {array1: ["1", "2", "3"], object1: {value1: "1", value2: "2", value3: "3"}}});
        expect(endLine).toEqual(8);
    });

    // it should return the correct object and endLine when given a mix of object fields, array fields, and value fields
    it('should return the correct object and endLine when given a mix of object fields, array fields, and value fields', () => {
        const lines = [
            "  value1: 1",
            "  value2: 2",
            "  value3: 3",
            "  array1:",
            "    1",
            "    2",
            "    3",
            "  object1:",
            "    value1: 1",
            "    value2: 2",
            "    value3: 3"
        ];
        const {obj, endLine} = parseObject({lines, currentLine: 0, fields, objectName: "test"});
        expect(obj).toEqual({
            test: {
                value1: "1",
                value2: "2",
                value3: "3",
                array1: ["1", "2", "3"],
                object1: {value1: "1", value2: "2", value3: "3"}
            }
        });
        expect(endLine).toEqual(11);
    });

    // it should return the correct object and endLine when given an object field that includes an array field
    it('should return the correct object and endLine when given an object field that includes an array field', () => {
        const lines = [
            "  object1:",
            "    array1:",
            "      1",
            "      2",
            "      3",
        ];
        const {obj, endLine} = parseObject({lines, currentLine: 0, fields, objectName: "test"});
        expect(obj).toEqual({test: {object1: {array1: ["1", "2", "3"]}}});
        expect(endLine).toEqual(5);
    });

    // it should return the correct object and endLine when given an object field that includes an array field and value fields
    it('should return the correct object and endLine when given an object field that includes an array field and value fields', () => {
        const lines = [
            "  object1:",
            "    value1: 1",
            "    value2: 2",
            "    value3: 3",
            "    array1:",
            "      1",
            "      2",
            "      3",
        ];
        const {obj, endLine} = parseObject({lines, currentLine: 0, fields, objectName: "test"});
        expect(obj).toEqual({test: {object1: {value1: "1", value2: "2", value3: "3", array1: ["1", "2", "3"]}}});
        expect(endLine).toEqual(8);
    });

    // it should return the correct object and endLine when given an object field that includes an object field
    it('should return the correct object and endLine when given an object field that includes an object field', () => {
        const lines = [
            "  object1:",
            "    subObject1:",
            "      value1: 1",
            "      value2: 2",
            "      value3: 3",
        ];
        const {obj, endLine} = parseObject({lines, currentLine: 0, fields, objectName: "test"});
        expect(obj).toEqual({test: {object1: {subObject1: {value1: "1", value2: "2", value3: "3"}}}});
        expect(endLine).toEqual(5);
    });

    // it should return the correct object and endLine when given an object field that includes an object field and value fields
    it('should return the correct object and endLine when given an object field that includes an object field and value fields', () => {
        const lines = [
            "  object1:",
            "    value1: 1",
            "    value2: 2",
            "    value3: 3",
            "    subObject1:",
            "      value1: 1",
            "      value2: 2",
            "      value3: 3",
        ];
        const {obj, endLine} = parseObject({lines, currentLine: 0, fields, objectName: "test"});
        expect(obj).toEqual({
            test: {
                object1: {
                    value1: "1",
                    value2: "2",
                    value3: "3",
                    subObject1: {value1: "1", value2: "2", value3: "3"}
                }
            }
        });
        expect(endLine).toEqual(8);
    });

    // it should return the correct object and endLine when given an arbitrary number of nested objects
    it('should return the correct object and endLine when given an arbitrary number of nested objects', () => {
        const lines = [
            "  object1:",
            "    subObject1:",
            "      subSubObject1:",
            "        value1: 1",
            "        value2: 2",
            "        value3: 3",
        ];
        const {obj, endLine} = parseObject({lines, currentLine: 0, fields, objectName: "test"});
        expect(obj).toEqual({test: {object1: {subObject1: {subSubObject1: {value1: "1", value2: "2", value3: "3"}}}}});
        expect(endLine).toEqual(6);
    });
});
