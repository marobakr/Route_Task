export interface ITransaction {
  id: number;
  customer_id: number;
  amount: number;
  date: Date;
}
export interface ICustomer {
  id: number;
  name: string;
}

export interface IAllDataCustomer extends ICustomer {
  transactions: ITransaction[];
}
