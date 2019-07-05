import { Entity, Column, PrimaryGeneratedColumn, Generated } from 'typeorm';

@Entity({
    name: 'users',
})
export class User {
    @PrimaryGeneratedColumn()
    @Generated('increment')
    id: number;

    @Column({length: 500})
    email: string;

    @Column({default: true})
    isActive: boolean;

    @Column({default: 'CUSTOMER'})
    role: string;

    @Column({nullable: true})
    agent?: number;

    @Column({nullable: true})
    owner?: number;

    @Column({nullable: true})
    supplier?: number;
}
