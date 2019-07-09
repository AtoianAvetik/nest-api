import { Entity, Column, PrimaryGeneratedColumn, Generated, CreateDateColumn, BeforeInsert } from 'typeorm';
import { CryptographerService } from '../auth/cryptographer.service';

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
    hashPassword() {
        this.plainPassword = new CryptographerService().hashPassword(this.plainPassword);
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
