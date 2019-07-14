import { ApiModelProperty } from '@nestjs/swagger';

export class AgentDomainDto {
    @ApiModelProperty({maxLength: 100, minLength: 2})
    readonly companyName: string;

    @ApiModelProperty({maxLength: 100, minLength: 6})
    readonly domain: string;

    @ApiModelProperty()
    readonly loginImageUrl: string;

    @ApiModelProperty()
    readonly loginImageThumbnailUrl: string;

    @ApiModelProperty()
    readonly logoImageUrl: string;

    @ApiModelProperty()
    readonly logoImageThumbnailUrl: string;

    @ApiModelProperty({maxLength: 7, minLength: 7, pattern: '#([A-Fa-f0-9]{6}).*'})
    readonly primaryColor: string;

    @ApiModelProperty({maxLength: 7, minLength: 7, pattern: '#([A-Fa-f0-9]{6}).*'})
    readonly secondaryColor: string;
}
