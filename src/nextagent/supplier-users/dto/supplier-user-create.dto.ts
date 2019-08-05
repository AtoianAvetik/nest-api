import { ApiModelProperty } from '@nestjs/swagger';

export class SupplierUserCreateDto {
    @ApiModelProperty()
    readonly email: string;

    @ApiModelProperty()
    readonly plainPassword: string;

    @ApiModelProperty()
    readonly isActive: boolean;

    @ApiModelProperty()
    readonly supplier: number;
}
