import { ApiModelProperty } from '@nestjs/swagger';
import { SupplierDto } from '../../suppliers/dto';

export class AgentSupplierDto {
    @ApiModelProperty()
    readonly id: number;

    @ApiModelProperty({type: SupplierDto})
    readonly supplier: SupplierDto;
}
