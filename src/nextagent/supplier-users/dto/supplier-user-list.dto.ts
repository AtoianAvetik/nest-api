import { ApiModelProperty } from '@nestjs/swagger';
import { SupplierDto } from '../../suppliers/dto';

export class SupplierUserListDto {
    @ApiModelProperty()
    readonly id: number;

    @ApiModelProperty()
    readonly email: string;

    @ApiModelProperty()
    readonly isActive: string;

    @ApiModelProperty()
    readonly role: string;

    @ApiModelProperty()
    readonly supplier: SupplierDto;
}
