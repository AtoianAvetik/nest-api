import { ApiModelProperty } from '@nestjs/swagger';

export class AgentUserUpdateDto {
    @ApiModelProperty({description: 'Min 6 characters long. Max 128 characters long. Must be a valid email address. Needs to be unique.'})
    readonly email: string;

    @ApiModelProperty({description: 'Min 8 characters long, at least one lower and capital and number.'})
    readonly plainPassword: string;

    @ApiModelProperty()
    readonly isActive: boolean;
}
