import { Entity, Column, PrimaryGeneratedColumn, Generated, CreateDateColumn, BeforeInsert } from 'typeorm';
import * as crypto from 'crypto';

@Entity({
    name: 'users-bo',
})
export class UserBO {
    @PrimaryGeneratedColumn()
    @Generated('increment')
    id: number;

    @Column({length: 500})
    email: string;

    @BeforeInsert()
    hashPassword() {
        this.password = crypto.createHmac('sha256', this.password).digest('hex');
    }
    @Column({length: 500})
    password: string;

    @Column({default: 'CUSTOMER'})
    role: string;

    @Column({default: true})
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Date;
}
