import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Data } from './data.entity';

@Injectable()
export class HerasService {
    constructor(@Inject('HERAS_REPOSITORY')
                private readonly dataRepository: Repository<Data>) {
    }

    async getData(): Promise<Data[]> {
        return await  this.dataRepository.find();
    }
}
