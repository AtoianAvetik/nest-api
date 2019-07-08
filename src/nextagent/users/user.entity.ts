import { Entity, Column, PrimaryGeneratedColumn, Generated, CreateDateColumn, BeforeInsert } from 'typeorm';
import * as crypto from 'crypto';

@Entity({
    name: 'users',
})
export class User {
    @PrimaryGeneratedColumn()
    @Generated('increment')
    id: number;

    @Column({length: 500})
    email: string;

    @BeforeInsert()
    async hashPassword() {
        this.plainPassword = crypto.createHmac('sha256', this.plainPassword).digest('hex');
    }
    @Column({length: 500})
    plainPassword: string;

    @Column({default: true})
    isActive: boolean;

    @Column({default: 'ROLE_CUSTOMER'})
    role: string;

    @Column({nullable: true})
    agent?: number;

    @Column({nullable: true})
    owner?: number;

    @Column({nullable: true})
    supplier?: number;

    @CreateDateColumn()
    createdAt: Date;
}
