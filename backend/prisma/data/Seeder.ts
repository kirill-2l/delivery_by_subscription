export abstract class Seeder<T = any> {
  protected count: number;
  protected _data: T[] = [];

  protected constructor(count: number) {
    this.count = count;
  }

  protected abstract createData(): void;

  get data(): T[] {
    return this._data;
  }
}
