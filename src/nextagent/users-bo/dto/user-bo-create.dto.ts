import { ApiModelProperty } from '@nestjs/swagger';

export class UserBOCreateDto {
    @ApiModelProperty()
    readonly email: string;

    @ApiModelProperty()
    readonly password: string;

    @ApiModelProperty()
    readonly role: string;

    @ApiModelProperty()
    readonly isActive: boolean;
}
