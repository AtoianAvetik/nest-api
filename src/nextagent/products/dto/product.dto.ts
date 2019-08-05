import { ApiModelProperty } from '@nestjs/swagger';

export class ProductDto {
    @ApiModelProperty()
    readonly id: number;

    @ApiModelProperty({maxLength: 100, minLength: 2})
    readonly name: string;

    @ApiModelProperty({minLength: 10})
    readonly orderInstruction: string;

    @ApiModelProperty()
    readonly onLocation: boolean;
}
