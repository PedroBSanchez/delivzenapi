import { Additional } from "../models/Additional";

interface InterfaceItemCreate {
  name: string;
  value: number;
  description: string;
  additional: Array<Additional>;
  category: string;
}

export { InterfaceItemCreate };
