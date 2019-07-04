import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Example } from './example.entity';

@Injectable()
export class ExampleService {
    constructor(@Inject('EXAMPLE_REPOSITORY')
                private readonly exampleRepository: Repository<Example>) {
    }

    async getAll(): Promise<Example[]> {
        return await  this.exampleRepository.find();
    }

    async getById(id: number): Promise<Example> {
        return await  this.exampleRepository.findOne({id});
    }

    async addExample(example: Example): Promise<Example> {
        return await  this.exampleRepository.save(example);
    }
}
