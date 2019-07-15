import { ApiModelProperty } from '@nestjs/swagger';
import { OwnerDto } from '../../owners/dto';

export class OwnerUserListDto {
    @ApiModelProperty()
    readonly id: number;

    @ApiModelProperty()
    readonly email: string;

    @ApiModelProperty()
    readonly isActive: string;

    @ApiModelProperty()
    readonly role: string;

    @ApiModelProperty()
    readonly owner: OwnerDto;
}
