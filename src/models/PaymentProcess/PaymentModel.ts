export interface ICardsDetails {
  brand: string;
  expMonth: number;
  expYear: number;
  cardNumber: string;
  paymentMethodId: string;
  customerId: string;
}

export interface IPaymentIntentPayload {
  customerId: string | undefined;
  paymentMethodId: string;
  shippingAddress: any; // Replace 'any' with a specific address type if available
  deliveryAddress: any; // Replace 'any' with a specific address type if available
  amount: number | string;
}