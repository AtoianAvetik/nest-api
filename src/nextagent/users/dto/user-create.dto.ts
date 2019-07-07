import { ApiModelProperty } from '@nestjs/swagger';

export class UserCreateDto {
    @ApiModelProperty()
    readonly email: string;

    @ApiModelProperty()
    readonly plainPassword: string;

    @ApiModelProperty()
    readonly role: string;

    @ApiModelProperty()
    readonly isActive: boolean;
}
