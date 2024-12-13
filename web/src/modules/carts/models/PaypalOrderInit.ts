export interface PaypalOrderInit {
  amount:        number;
  currency:      string;
  paymentMethod: string;
  description:   string;
  intent:        string;
  sellerWallet:  string;
}