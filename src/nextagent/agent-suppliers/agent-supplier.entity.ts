import { Entity, Column, PrimaryGeneratedColumn, Generated, CreateDateColumn } from 'typeorm';

@Entity({
    name: 'agent_suppliers',
})
export class AgentSupplier {
    @PrimaryGeneratedColumn()
    @Generated('increment')
    id: number;

    @Column()
    agent: number;

    @Column()
    supplier: number;

    @CreateDateColumn()
    createdAt: Date;
}
