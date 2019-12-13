

export function enumValues(enumType: any) {
  //
  return Object
    .entries(enumType)
    .reduce((prev, current) => ({
      ...prev,
      [current[0]]: current[1],
    }), {});
}

export default {
  enumValues,
};
