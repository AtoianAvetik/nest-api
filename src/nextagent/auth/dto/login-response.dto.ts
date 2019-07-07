import { ApiModelProperty } from '@nestjs/swagger';

export class LoginResponseDto {
    @ApiModelProperty()
    readonly token: string;
}
