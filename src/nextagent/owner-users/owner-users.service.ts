import { Injectable } from '@nestjs/common';

@Injectable()
export class OwnerUsersService {
    async getAll(domain: string): Promise<any[]> {
        return Promise.resolve([]);
    }

    async getById(id: number, domain: string): Promise<any[]> {
        return Promise.resolve([]);
    }

    async addOwnerUser(data: any, domain: string): Promise<any[]> {
        return Promise.resolve([]);
    }

    async updateOwnerUser(id, data: any, domain: string): Promise<any[]> {
        return Promise.resolve([]);
    }

    async deleteOwnerUser(id, domain: string): Promise<any[]> {
        return Promise.resolve([]);
    }
}
