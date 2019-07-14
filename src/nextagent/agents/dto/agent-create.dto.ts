import { ApiModelProperty } from '@nestjs/swagger';

export class AgentCreateDto {
    @ApiModelProperty({maxLength: 100, minLength: 2})
    readonly companyName: string;

    @ApiModelProperty({maxLength: 100, minLength: 6, description: 'Valid domain without protocol or path.'})
    readonly domain: string;
}
