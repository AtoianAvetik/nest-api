import { Injectable } from '@nestjs/common';

@Injectable()
export class SuppliersService {
    async getAll(domain?: string): Promise<any[]> {
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
