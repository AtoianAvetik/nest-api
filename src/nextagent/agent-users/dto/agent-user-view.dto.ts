import { ApiModelProperty } from '@nestjs/swagger';
import { AgentDto } from '../../agents/dto';

export class AgentUserViewDto {
    @ApiModelProperty()
    readonly id: number;

    @ApiModelProperty()
    readonly email: string;

    @ApiModelProperty()
    readonly isActive: string;

    @ApiModelProperty()
    readonly role: string;

    @ApiModelProperty()
    readonly agent: AgentDto;

    @ApiModelProperty({format: 'date-time'})
    readonly createdAt: string;
}
