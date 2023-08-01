import { Item } from "./Item";
import { OrderItem } from "./OrderItem";

class Order {
  public status: number;
  public totalValue: number;
  public code: number;
  public client: string;
  public paymentMethod: string;
  public address: string;
  public adressNumber: string;
  public complement: string;
  public neighborhood: string;
  public phoneNumber: string;
  public items: Array<OrderItem>;
  public created_at: Date;
  public observations: string;
  constructor(
    status: number,
    totalValue: number,
    code: number,
    client: string,
    paymentMethod: string,
    address: string,
    adressNumber: string,
    complement: string,
    neighborhood: string,
    phoneNumber: string,
    items: Array<OrderItem>,
    created_at: Date,
    observations: string
  ) {
    this.status = status;
    this.totalValue = totalValue;
    this.code = code;
    this.client = client;
    this.paymentMethod = paymentMethod;
    this.address = address;
    this.adressNumber = adressNumber;
    this.complement = complement;
    this.neighborhood = neighborhood;
    this.phoneNumber = phoneNumber;
    this.items = items;
    this.created_at = created_at;
    this.observations = observations;
  }
}

export { Order };
