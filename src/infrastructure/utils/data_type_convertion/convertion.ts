export function numberToString(value: number): string {
  return value.toString();
}

export function stringToNumber(value: string): number {
  return parseFloat(value);
}

export function booleanToString(value: boolean): string {
  return value ? 'true' : 'false';
}

export function stringToBoolean(value: string): boolean {
  return value.toLowerCase() === 'true';
}
