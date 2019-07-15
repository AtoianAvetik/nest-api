import { ApiModelProperty } from '@nestjs/swagger';

export class AgentDto {
    @ApiModelProperty()
    readonly id: number;

    @ApiModelProperty({maxLength: 100, minLength: 2})
    readonly companyName: string;

    @ApiModelProperty({maxLength: 100, minLength: 6})
    readonly domain: string;
}
