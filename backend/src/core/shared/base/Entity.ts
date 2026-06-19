export abstract class Entity<Props> {
  protected readonly props: Props;
  protected readonly _id: string;

  constructor(props: Props, id?: string) {
    this.props = Object.freeze({ ...props });
    this._id = id ?? crypto.randomUUID();
  }

  get id(): string {
    return this._id;
  }

  public equals(other: Entity<unknown>): boolean {
    if (other === null || other === undefined) return false;
    if (this === other) return true;
    return this._id === other._id;
  }
}
