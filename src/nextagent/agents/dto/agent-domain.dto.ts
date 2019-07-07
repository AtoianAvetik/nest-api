import { ApiModelProperty } from '@nestjs/swagger';

export class AgentDomainDto {
    @ApiModelProperty()
    readonly companyName: string;

    @ApiModelProperty()
    readonly domain: string;

    @ApiModelProperty()
    readonly loginImageUrl: string;

    @ApiModelProperty()
    readonly loginImageThumbnailUrl: string;

    @ApiModelProperty()
    readonly logoImageUrl: string;

    @ApiModelProperty()
    readonly logoImageThumbnailUrl: string;

    @ApiModelProperty()
    readonly primaryColor: string;

    @ApiModelProperty()
    readonly secondaryColor: string;
}
