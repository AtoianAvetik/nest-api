import { ApiModelProperty } from '@nestjs/swagger';
import { OwnerDto } from '../../owners/dto';

export class OwnerUserViewDto {
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

    @ApiModelProperty({format: 'date-time'})
    readonly createdAt: string;
}
