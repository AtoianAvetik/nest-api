import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Data {
    @PrimaryGeneratedColumn()
    startContent: any;

    @Column({ length: 500 })
    links: string;

    @Column({ length: 500 })
    translations: string;

    @Column({ length: 500 })
    configurator: string;
}
