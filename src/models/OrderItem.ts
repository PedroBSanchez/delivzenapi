import { Additional } from "./Additional";

class OrderItem {
  public name: string;
  public value: number;
  public description: string;
  public additional: Array<Additional>;
  public category: string;
  public created_at: Date;
  public amount: number;
  constructor(
    name: string,
    value: number,
    description: string,
    additional: Array<Additional>,
    category: string,
    created_at: Date,
    amount: number
  ) {
    this.name = name;
    this.value = value;
    this.description = description;
    this.additional = additional;
    this.category = category;
    this.created_at = created_at;
    this.amount = amount;
  }
}

export { OrderItem };
