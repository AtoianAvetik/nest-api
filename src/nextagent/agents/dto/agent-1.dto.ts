import { ApiModelProperty } from '@nestjs/swagger';

export class Agent1Dto {
    @ApiModelProperty()
    readonly id: number;

    @ApiModelProperty()
    readonly companyName: string;

    @ApiModelProperty()
    readonly domain: string;
}
