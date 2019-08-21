export class FilterPurchaseDTO {
    driverLicense: string;
    fullName: string;
    date: Date;

    constructor(driverLicense: string, fullName: string, date: Date) {
        this.driverLicense = driverLicense;
        this.fullName = fullName;
        this.date = date;
    }
}