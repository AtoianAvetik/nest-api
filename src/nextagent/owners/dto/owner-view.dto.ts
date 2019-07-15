import { ApiModelProperty } from '@nestjs/swagger';
import { UserListDto } from '../../users/dto';

export class OwnerViewDto {
    @ApiModelProperty()
    readonly id: number;

    @ApiModelProperty({maxLength: 100, minLength: 2})
    readonly firstName: string;

    @ApiModelProperty({maxLength: 100, minLength: 1, required: false})
    readonly middleName: string;

    @ApiModelProperty({maxLength: 100, minLength: 2})
    readonly lastName: string;

    @ApiModelProperty({maxLength: 128, minLength: 6})
    readonly email: string;

    @ApiModelProperty({maxLength: 20, minLength: 6})
    readonly phoneNumber: string;

    @ApiModelProperty({maxLength: 100, minLength: 2, required: false})
    readonly invoiceStreet: string;

    @ApiModelProperty({maxLength: 6, minLength: 1, required: false})
    readonly invoiceHouseNumber: string;

    @ApiModelProperty({maxLength: 6, minLength: 1, required: false})
    readonly invoiceHouseNumberAddition: string;

    @ApiModelProperty({maxLength: 7, minLength: 4, required: false})
    readonly invoiceZipCode: string;

    @ApiModelProperty({maxLength: 100, minLength: 2, required: false})
    readonly invoiceCity: string;

    @ApiModelProperty({maxLength: 2, minLength: 2, required: false})
    readonly invoiceCountryCode: string;

    @ApiModelProperty()
    readonly ableToLogin: boolean;

    @ApiModelProperty({type: UserListDto, isArray: true, required: false})
    readonly ownerUsers: UserListDto[];

    @ApiModelProperty({format: 'date-time'})
    readonly createdAt: string;
}
