import { ApiModelProperty } from '@nestjs/swagger';

export class OwnerDto {
    @ApiModelProperty()
    readonly id: number;

    @ApiModelProperty({maxLength: 100, minLength: 2})
    readonly firstName: string;

    @ApiModelProperty({maxLength: 100, minLength: 1, required: false})
    readonly middleName: string;

    @ApiModelProperty({maxLength: 100, minLength: 2})
    readonly lastName: string;
}
