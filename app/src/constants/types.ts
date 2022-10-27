export interface DescribeField {
  name: string;
  field: string;
  fieldType: DescribeFieldType;
  subFields?: DescribeFields;
  description?: string;
  required?: boolean;
}

export enum DescribeFieldType {
  Value = "value",
  Array = "array",
  Object = "object",
  ObjectArray = "objectArray",
}

export type DescribeFields = DescribeField[];
