import { ApiModelProperty } from '@nestjs/swagger';

export class UserListDto {
    @ApiModelProperty()
    readonly id: number;

    @ApiModelProperty()
    readonly email: string;

    @ApiModelProperty()
    readonly isActive: boolean;

    @ApiModelProperty()
    readonly role: string;
}
