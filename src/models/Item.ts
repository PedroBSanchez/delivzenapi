import { Additional } from "./Additional";

class Item {
  public name: string;
  public value: number;
  public description: string;
  public additional: Array<Additional>;
  public category: string;
  public created_at: Date;
  constructor(
    name: string,
    value: number,
    description: string,
    additional: Array<Additional>,
    category: string,
    created_at: Date
  ) {
    this.name = name;
    this.value = value;
    this.description = description;
    this.additional = additional;
    this.category = category;
    this.created_at = created_at;
  }
}

export { Item };
