import { OwnerModel } from '../owners/owner.model';
import { UserModel, UserViewModel } from '../users/user.model';

export class OwnerUserListModel extends UserModel {
    owner: OwnerModel;

    constructor(data) {
        super(data);
    }
}

export class OwnerUserViewModel extends UserViewModel {
    owner: OwnerModel;

    constructor(data) {
        super(data);
    }
}
