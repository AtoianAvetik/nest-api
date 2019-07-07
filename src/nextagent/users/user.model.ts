export class UserModel {
    id: number;
    email: string;
    isActive: boolean;
    role: string;

    constructor(data) {
        this.id = data.id;
        this.email = data.email;
        this.isActive = data.isActive;
        this.role = data.role;
    }
}

export class UserViewModel extends UserModel {
    createdAt = new Date();

    constructor(data) {
        super(data);
        this.createdAt = data.createdAt;
    }
}
