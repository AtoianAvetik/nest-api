import { ApiModelProperty } from '@nestjs/swagger';

class Agent1Dto {
    @ApiModelProperty()
    readonly id: number;

    @ApiModelProperty({maxLength: 100, minLength: 2})
    readonly companyName: string;
}

export class SupplierAgentDto {
    @ApiModelProperty()
    readonly id: number;

    @ApiModelProperty({type: Agent1Dto})
    readonly agent: Agent1Dto;
}
