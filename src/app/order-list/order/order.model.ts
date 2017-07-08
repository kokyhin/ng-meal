export class Order {
  public full: number;
  public first: number;
  public second: number;
  public total?: number;

  constructor(full: number, first: number, second: number, total: number) {
    this.full = full;
    this.first = first;
    this.second = second;
    this.total = total;
  }
}
