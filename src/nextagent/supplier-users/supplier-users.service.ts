import { Injectable } from '@nestjs/common';

@Injectable()
export class SupplierUsersService {
    async getAll(): Promise<any[]> {
        return Promise.resolve([]);
    }

    async getById(id: number): Promise<any[]> {
        return Promise.resolve([]);
    }

    async addOwner(data: any): Promise<any[]> {
        return Promise.resolve([]);
    }

    async updateOwner(id, data: any): Promise<any[]> {
        return Promise.resolve([]);
    }

    async deleteOwner(id): Promise<any[]> {
        return Promise.resolve([]);
    }
}
