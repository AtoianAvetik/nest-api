import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ExampleService } from './example.service';
import { ApiUseTags, ApiModelProperty } from '@nestjs/swagger';
import { Example } from './example.entity';

export class CreateExampleDto {
    @ApiModelProperty()
    readonly id: number;

    @ApiModelProperty()
    readonly name: string;
}

@ApiUseTags('example')
@Controller('example/api/v1')
export class ExampleController {
    constructor(private readonly exampleService: ExampleService) {
    }

    @Get('getAll')
    getAll(): Promise<Example[]> {
        return this.exampleService.getAll();
    }

    @Get(':id')
    getById(@Param('id') id: number): Promise<Example> {
        return this.exampleService.getById(id);
    }

    @Post('add')
    addExample(@Body() exampleDto: CreateExampleDto): Promise<Example> {
        const example = new Example();
        example.id = exampleDto.id;
        example.name = exampleDto.name;

        return this.exampleService.addExample(example);
    }
}
