import { Entity, Column, PrimaryGeneratedColumn, Generated, CreateDateColumn } from 'typeorm';

@Entity({
    name: 'suppliers',
})
export class Supplier {
    @PrimaryGeneratedColumn()
    @Generated('increment')
    id: number;

    @Column({length: 100})
    readonly name: string;

    @Column({length: 128})
    readonly email: string;

    @Column()
    readonly visibleForAllAgents: boolean;

    @Column({type: 'simple-array', nullable: true})
    readonly agentSuppliers: number[];

    @Column({type: 'simple-array', nullable: true})
    readonly supplierProducts: number[];

    @Column({type: 'simple-array', nullable: true})
    readonly supplierUsers: number[];

    @CreateDateColumn()
    createdAt: Date;
}
