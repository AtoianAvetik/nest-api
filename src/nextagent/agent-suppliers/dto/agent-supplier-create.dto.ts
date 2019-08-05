import { ApiModelProperty } from '@nestjs/swagger';

export class AgentSupplierCreateDto {
    @ApiModelProperty({description: 'The agent.'})
    readonly agent: number;

    @ApiModelProperty({description: 'The supplier.'})
    readonly supplier: number;
}
