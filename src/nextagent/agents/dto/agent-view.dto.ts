import { ApiModelProperty } from '@nestjs/swagger';
import { AgentUser1Dto } from '../../agent-users/dto';

export class AgentViewDto {
    @ApiModelProperty()
    readonly id: number;

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

    @ApiModelProperty({type: AgentUser1Dto, isArray: true})
    readonly agentUsers: AgentUser1Dto[];

    @ApiModelProperty({type: AgentUser1Dto, isArray: true})
    readonly agentSuppliers: AgentUser1Dto[];

    @ApiModelProperty()
    readonly createdAt: Date;
}
