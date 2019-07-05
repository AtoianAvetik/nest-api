import { ApiModelProperty } from '@nestjs/swagger';

export class AgentUser1Dto {
    @ApiModelProperty()
    readonly id: number;

    @ApiModelProperty()
    readonly email: string;

    @ApiModelProperty()
    readonly isActive: string;

    @ApiModelProperty()
    readonly role: string;
}
