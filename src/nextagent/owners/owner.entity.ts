import { Entity, Column, PrimaryGeneratedColumn, Generated, CreateDateColumn } from 'typeorm';

@Entity({
    name: 'owners',
})
export class Owner {
    @PrimaryGeneratedColumn()
    @Generated('increment')
    id: number;

    @Column({length: 100})
    readonly firstName: string;

    @Column({length: 100, nullable: true})
    readonly middleName: string;

    @Column({length: 100})
    readonly lastName: string;

    @Column({length: 128})
    readonly email: string;

    @Column({length: 20})
    readonly phoneNumber: string;

    @Column({length: 100, nullable: true})
    readonly invoiceStreet: string;

    @Column({length: 6, nullable: true})
    readonly invoiceHouseNumber: string;

    @Column({length: 6, nullable: true})
    readonly invoiceHouseNumberAddition: string;

    @Column({length: 7, nullable: true})
    readonly invoiceZipCode: string;

    @Column({length: 10, nullable: true})
    readonly invoiceCity: string;

    @Column({length: 2, nullable: true})
    readonly invoiceCountryCode: string;

    @Column()
    readonly ableToLogin: boolean;

    @Column()
    readonly agent: number;

    @Column({type: 'simple-array', nullable: true})
    readonly ownerUsers: number[];

    @CreateDateColumn()
    createdAt: Date;
}
