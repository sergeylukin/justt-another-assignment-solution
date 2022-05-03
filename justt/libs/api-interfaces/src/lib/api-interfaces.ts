export interface BaseEntity {
  id: number | null;
}

export interface Transaction extends BaseEntity {
  price: number;
  currency: string;
  creditCardType: string;
  creditCardNumber: number;
}
