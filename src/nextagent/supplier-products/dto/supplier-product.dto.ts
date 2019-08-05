import { ApiModelProperty } from '@nestjs/swagger';
import { ProductDto } from '../../products/dto';

export class SupplierProductDto {
    @ApiModelProperty()
    readonly id: number;

    @ApiModelProperty({maxLength: 100, minLength: 2})
    readonly title: string;

    @ApiModelProperty({minLength: 10})
    readonly description: string;

    @ApiModelProperty({required: false})
    readonly imageFilename: string;

    @ApiModelProperty({required: false})
    readonly imageUrl: string;

    @ApiModelProperty({required: false})
    readonly imageThumbnailUrl: string;

    @ApiModelProperty({type: ProductDto})
    readonly product: ProductDto;
}
