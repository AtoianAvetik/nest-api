import { ApiModelProperty } from '@nestjs/swagger';

export class OwnerCreateDto {
    @ApiModelProperty({description: 'Min 2 characters long. Max 100 characters long.'})
    readonly firstName: string;

    @ApiModelProperty({description: 'Min 1 characters long. Max 100 characters long.', required: false})
    readonly middleName: string;

    @ApiModelProperty({description: 'Min 2 characters long. Max 100 characters long.'})
    readonly lastName: string;

    @ApiModelProperty({description: 'Min 6 characters long. Max 128 characters long. Must be a valid email address.'})
    readonly email: string;

    @ApiModelProperty({description: 'Min 7 characters long. Max 20 characters long.'})
    readonly phoneNumber: string;

    @ApiModelProperty({description: 'Min 2 characters long. Max 100 characters long.', required: false})
    readonly invoiceStreet: string;

    @ApiModelProperty({description: 'Min 1 characters long. Max 6 characters long.', required: false})
    readonly invoiceHouseNumber: string;

    @ApiModelProperty({description: 'Min 1 characters long. Max 6 characters long.', required: false})
    readonly invoiceHouseNumberAddition: string;

    @ApiModelProperty({description: 'Min 4 characters long. Max 7 characters long.', required: false})
    readonly invoiceZipCode: string;

    @ApiModelProperty({description: 'Min 2 characters long. Max 10 characters long.', required: false})
    readonly invoiceCity: string;

    @ApiModelProperty({description: 'Must be a valid ISO 3166 2-letter country code.', required: false})
    readonly invoiceCountryCode: string;

    @ApiModelProperty()
    readonly ableToLogin: boolean;
}
