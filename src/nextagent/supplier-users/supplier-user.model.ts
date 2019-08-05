import { SupplierModel } from '../suppliers/supplier.model';
import { UserModel, UserViewModel } from '../users/user.model';

export class SupplierUserListModel extends UserModel {
    supplier: SupplierModel;

    constructor(data) {
        super(data);
    }
}

export class SupplierUserViewModel extends UserViewModel {
    supplier: SupplierModel;

    constructor(data) {
        super(data);
    }
}
