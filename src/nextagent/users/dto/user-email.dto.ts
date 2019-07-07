import { ApiModelProperty } from '@nestjs/swagger';

export class UserEmailDto {
    @ApiModelProperty()
    readonly email: string;
}
