import { Controller, Get } from '@nestjs/common';
import { HerasService } from './heras.service';
import { ApiUseTags } from '@nestjs/swagger';
import { Data } from './data.entity';

@ApiUseTags('heras')
@Controller('heras/api/v1')
export class HerasController {
    constructor(private readonly exampleService: HerasService) {
    }

    @Get('getData')
    getData(): Promise<Data[]> {
        return this.exampleService.getData();
    }
}
