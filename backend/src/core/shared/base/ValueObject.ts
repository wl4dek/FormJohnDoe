export abstract class ValueObject<Props> {
  protected readonly props: Props;

  constructor(props: Props) {
    this.props = Object.freeze({ ...props });
  }

  public equals(other: ValueObject<Props>): boolean {
    if (other === null || other === undefined) return false;
    if (this === other) return true;
    return JSON.stringify(this.props) === JSON.stringify(other.props);
  }
}
