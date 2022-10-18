export type DescribeValue = {
    value: string;
};

export type DescribeField = {
    name: string;
    field: string;
    fieldType: DescribeFieldType;
    subFields?: DescribeFields;
    description?: string;
    required?: boolean;
}

export enum DescribeFieldType {
    Value = 'value',
    Array = 'array',
    Object = 'object'
}

export type DescribeObject = {
    obj: Map<String,DescribeField>;
}

export type DescribeArray = {
    array: Array<DescribeField>;
}

export type DescribeFields = DescribeField[];
