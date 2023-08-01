interface InterfaceOrderClientCreate {
  client: string;
  address: string;
  adressNumber: string;
  paymentMethod: string;
  complement: string;
  neighborhood: string;
  phoneNumber: string;
  items: Array<InterfaceOrderClientItem>;
  observations: string;
}

interface InterfaceOrderClientItem {
  itemId: string;
  amount: number;
  additionalCodes: Array<number>;
}

interface InterfaceOrderByDate {
  start: Date;
  end: Date;
}

export { InterfaceOrderClientCreate, InterfaceOrderByDate };
