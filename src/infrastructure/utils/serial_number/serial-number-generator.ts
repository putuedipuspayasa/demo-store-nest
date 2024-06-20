export function generateSerialNumber(prefix: string, counter: number): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);

  return `${prefix}-${year}${month}${day}-${counter}`;
}

export function generateSerialNumberWithTime(
  prefix: string,
  counter: number,
): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const hours = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);
  const seconds = ('0' + date.getSeconds()).slice(-2);

  return `${prefix}-${year}${month}${day}-${hours}${minutes}${seconds}-${counter}`;
}
