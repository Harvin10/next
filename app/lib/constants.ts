export const PROPERTY_TYPES = [
  'house',
  'apartment',
  'villa',
  'condo',
  'penthouse',
  'townhouse'
] as const;

export type PropertyType = typeof PROPERTY_TYPES[number];
