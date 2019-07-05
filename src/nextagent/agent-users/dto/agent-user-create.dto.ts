import { ApiModelProperty } from '@nestjs/swagger';

export class AgentUserCreateDto {
    @ApiModelProperty()
    readonly email: string;

    @ApiModelProperty()
    readonly plainPassword: string;

    @ApiModelProperty()
    readonly isActive: boolean;

    @ApiModelProperty()
    readonly agent: number;
}
