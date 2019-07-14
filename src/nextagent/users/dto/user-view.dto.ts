import { ApiModelProperty } from '@nestjs/swagger';

export class UserViewDto {
    @ApiModelProperty()
    readonly id: number;

    @ApiModelProperty({maxLength: 128, minLength: 6})
    readonly email: string;

    @ApiModelProperty()
    readonly isActive: string;

    @ApiModelProperty()
    readonly role: string;

    @ApiModelProperty({format: 'date-time'})
    readonly createdAt: string;
}
