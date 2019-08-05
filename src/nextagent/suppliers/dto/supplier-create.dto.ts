import { ApiModelProperty } from '@nestjs/swagger';

export class SupplierCreateDto {
    @ApiModelProperty({description: 'Min 2 characters long. Max 100 characters long.'})
    readonly name: string;

    @ApiModelProperty({description: 'Min 6 characters long. Max 128 characters long. Must be a valid email address.'})
    readonly email: string;

    @ApiModelProperty()
    readonly visibleForAllAgents: boolean;
}
