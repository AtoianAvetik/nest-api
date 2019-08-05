import { ApiModelProperty } from '@nestjs/swagger';
import { SupplierDto } from '../../suppliers/dto';
import { Agent1Dto } from '../../agents/dto';

export class AgentSupplierViewDto {
    @ApiModelProperty()
    readonly id: number;

    @ApiModelProperty({type: Agent1Dto})
    readonly agent: Agent1Dto;

    @ApiModelProperty({type: SupplierDto})
    readonly supplier: SupplierDto;

    @ApiModelProperty({format: 'date-time'})
    readonly createdAt: string;
}
