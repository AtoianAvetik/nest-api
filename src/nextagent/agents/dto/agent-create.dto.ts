import { ApiModelProperty } from '@nestjs/swagger';

export class AgentCreateDto {
    @ApiModelProperty()
    readonly companyName: string;

    @ApiModelProperty()
    readonly domain: string;
}
