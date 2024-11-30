export class Numeric {
  static toMoney(value: number | string): number {
    if (typeof value == 'string') return parseFloat(parseFloat(value).toFixed(2));

    return parseFloat(value.toFixed(2));
  }
}
