export class UserBOModel {
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

export class UserBOViewModel extends UserBOModel {
    createdAt = new Date();

    constructor(data) {
        super(data);
        this.createdAt = data.createdAt;
    }
}
