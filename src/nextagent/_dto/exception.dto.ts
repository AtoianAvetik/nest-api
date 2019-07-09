import { ApiModelProperty } from '@nestjs/swagger';

export class ExceptionDto {
    @ApiModelProperty({example: '400'})
    readonly code: number;

    @ApiModelProperty({example: 'Validation Failed'})
    readonly message: string;
}
