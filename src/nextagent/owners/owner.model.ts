import { UserModel } from '../users/user.model';

export class OwnerModel {
    id: number;
    firstName: string;
    middleName: string;
    lastName: string;

    constructor(data) {
        this.id = data.id;
        this.firstName = data.firstName;
        this.middleName = data.middleName;
        this.lastName = data.lastName;
    }
}

export class OwnerListModel extends OwnerModel {
    email: string;
    phoneNumber: string;
    invoiceStreet: string;
    invoiceHouseNumber: string;
    invoiceHouseNumberAddition: string;
    invoiceZipCode: string;
    invoiceCity: string;
    invoiceCountryCode: string;
    ableToLogin: boolean;
    ownerUsers: UserModel[];

    constructor(data) {
        super(data);
        this.email = data.email;
        this.phoneNumber = data.phoneNumber;
        this.invoiceStreet = data.invoiceStreet;
        this.invoiceHouseNumber = data.invoiceHouseNumber;
        this.invoiceHouseNumberAddition = data.invoiceHouseNumberAddition;
        this.invoiceZipCode = data.invoiceZipCode;
        this.invoiceCity = data.invoiceCity;
        this.invoiceCountryCode = data.invoiceCountryCode;
        this.ableToLogin = data.ableToLogin;
        this.ownerUsers = data.ownerUsers || [];
    }
}

export class OwnerViewModel extends OwnerListModel {
    createdAt: Date;

    constructor(data) {
        super(data);
        this.createdAt = data.createdAt;
    }
}
