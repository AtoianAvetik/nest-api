import { ApiModelProperty } from '@nestjs/swagger';

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
    readonly agent: number;

    @ApiModelProperty()
    readonly createdAt: Date;
}
