import { ApiModelProperty } from '@nestjs/swagger';

export class SupplierDto {
    @ApiModelProperty()
    readonly id: number;

    @ApiModelProperty({maxLength: 100, minLength: 2})
    readonly name: string;
}
