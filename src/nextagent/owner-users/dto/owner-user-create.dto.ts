import { ApiModelProperty } from '@nestjs/swagger';

export class OwnerUserCreateDto {
    @ApiModelProperty()
    readonly email: string;

    @ApiModelProperty()
    readonly plainPassword: string;

    @ApiModelProperty()
    readonly isActive: boolean;

    @ApiModelProperty()
    readonly owner: number;
}
