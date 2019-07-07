import { ApiModelProperty } from '@nestjs/swagger';

export class LoginExceptionDto {
    @ApiModelProperty()
    readonly code: string;

    @ApiModelProperty()
    readonly message: string;
}
