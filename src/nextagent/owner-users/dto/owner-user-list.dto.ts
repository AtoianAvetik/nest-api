import { ApiModelProperty } from '@nestjs/swagger';
import { Agent1Dto } from '../../agents/dto';

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
    readonly agent: Agent1Dto;
}
