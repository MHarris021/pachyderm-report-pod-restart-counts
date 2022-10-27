export function updateObject(
  obj: object,
  key: string,
  value: object | string | number
): object {
  const newObject = { ...obj, [key]: value };
  console.log(`Updated object: ${JSON.stringify(newObject)}`);
  return newObject;
}
