import { ApiModelProperty } from '@nestjs/swagger';

export class Agent1Dto {
    @ApiModelProperty()
    readonly id: number;

    @ApiModelProperty({maxLength: 100, minLength: 2})
    readonly companyName: string;
}
