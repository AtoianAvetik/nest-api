import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORIES, ROLES } from '../constans';
import { IsNull, Not, Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { Agent } from '../agents/agent.entity';
import { Supplier } from '../suppliers/supplier.entity';
import { SupplierUserListModel, SupplierUserViewModel } from './supplier-user.model';
import { SupplierModel } from '../suppliers/supplier.model';
import * as _ from 'lodash';
import { NotFoundException } from '../_exceptions';

@Injectable()
export class SupplierUsersService {
    constructor(@Inject(REPOSITORIES.users)
                private readonly usersRepository: Repository<User>,
                @Inject(REPOSITORIES.agents)
                private readonly agentsRepository: Repository<Agent>,
                @Inject(REPOSITORIES.suppliers)
                private readonly suppliersRepository: Repository<Supplier>) {
    }

    async getAll(): Promise<any[]> {
        const usersData = await this.usersRepository.find({supplier: Not(IsNull())});
        const suppliersData = await this.suppliersRepository.find();
        return Promise.resolve(usersData.map(userData => {
            const user = new SupplierUserListModel(userData);
            if (userData.supplier && suppliersData.length) {
                user.supplier = new SupplierModel(_.find(suppliersData, {id: userData.supplier}));
            }
            return user;
        }));
    }

    async getById(id: number): Promise<SupplierUserViewModel> {
        const userData = await this.usersFindOne({id});
        const user = new SupplierUserViewModel(userData);

        if ( userData.supplier ) {
            const supplierData = await this.suppliersFindOne({id: userData.supplier});
            user.supplier = new SupplierModel(supplierData);
        }
        return Promise.resolve(user);
    }

    async addSupplierUser(data: any): Promise<SupplierUserViewModel> {
        const entity = Object.assign(new User(), data, {role: ROLES.supplier});
        const userData = await this.usersRepository.save(entity);
        const addedUser = new SupplierUserViewModel(userData);

        const supplierData = await this.suppliersFindOne({id: userData.supplier});
        const supplierUsers = supplierData.supplierUsers || [];
        supplierUsers.push(userData.id);
        addedUser.supplier = new SupplierModel(supplierData);
        await this.suppliersRepository.update(userData.supplier, {supplierUsers});

        return Promise.resolve(addedUser);
    }

    async updateSupplierUser(id, data: any): Promise<SupplierUserViewModel> {
        const entity = Object.assign(new User(), data);
        const res = await this.usersRepository.update({id}, entity);
        if (res.raw.affectedRows === 0) {
            throw new NotFoundException('User not found');
        }
        return await this.getById(id);
    }

    async deleteSupplierUser(id): Promise<any> {
        const userData = await this.usersFindOne({id});
        const supplierData = await this.suppliersFindOne({id: userData.supplier});
        const supplierUsers = _.filter(supplierData.supplierUsers, o => o !== id.toString());
        await this.suppliersRepository.update(userData.supplier, {supplierUsers});
        const res = await this.usersRepository.delete({id});
        if (res.raw.affectedRows === 0) {
            throw new NotFoundException('User not found');
        }
    }

    async usersFindOne(condition): Promise<User> {
        const userData = await this.usersRepository.findOne(condition);
        if (!userData) {
            throw new NotFoundException('User not found');
        }
        return userData;
    }

    async suppliersFindOne(condition): Promise<Supplier> {
        const supplierData = await this.suppliersRepository.findOne(condition);
        if (!supplierData) {
            throw new NotFoundException('Supplier not found');
        }
        return supplierData;
    }
}
