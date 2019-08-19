import { PurchaseDetail } from './purchaseDetail';
import { Person } from './person';

export class Purchase {
    idPurchase: number;
    date: string;
    person: Person;
    amount: number;
    purchaseDetails: PurchaseDetail[];
}