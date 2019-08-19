import { Product } from './product';
import { Purchase } from './purchase';

export class PurchaseDetail {
    idPurchaseDetail: number;
    product: Product;
    quantity: number;
    amount: number;
}