import { Entity, Column, PrimaryGeneratedColumn, Generated, CreateDateColumn } from 'typeorm';

@Entity({
    name: 'agents',
})
export class Agent {
    @PrimaryGeneratedColumn()
    @Generated('increment')
    id: number;

    @Column({length: 500})
    companyName: string;

    @Column({length: 500})
    domain: string;

    @Column({length: 500, nullable: true})
    loginImageUrl: string;

    @Column({length: 500, nullable: true})
    loginImageThumbnailUrl: string;

    @Column({length: 500, nullable: true})
    logoImageUrl: string;

    @Column({length: 500, nullable: true})
    logoImageThumbnailUrl: string;

    @Column({length: 500, nullable: true})
    primaryColor: string;

    @Column({length: 500, nullable: true})
    secondaryColor: string;

    @Column({type: 'simple-array', nullable: true})
    agentSuppliers: number[];

    @Column({type: 'simple-array', nullable: true})
    agentUsers: number[];

    @CreateDateColumn()
    createdAt: Date;
}
