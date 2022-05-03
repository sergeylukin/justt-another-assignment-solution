export interface BaseEntity {
  id: number | null;
}

export interface Transaction extends BaseEntity {
  price: number;
  currency: string;
  creditCardType: string;
  creditCardNumber: number;
}

export interface Customer extends BaseEntity {
  externalId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  country?: string;
  city?: string;
  street?: string;
  phone?: string;
}
export interface CustomerWithTransactions extends Customer {
  transactions?: Transaction[];
}

export interface TransactionWithCustomer extends Transaction {
  customer: Customer;
}

export const FEED_API_URL = '/api/feed';
