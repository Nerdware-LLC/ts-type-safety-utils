/**
 * A type-guard which uses `Object.hasOwn` to ensure the provided `obj` has the
 * provided `key` as an own-property.
 */
export const hasKey = <Obj extends Record<PropertyKey, unknown>, Key extends PropertyKey>(
  obj: Obj,
  key: Key
): obj is Obj & Record<Key, Obj[Key]> => {
  return Object.hasOwn(obj, key);
};
