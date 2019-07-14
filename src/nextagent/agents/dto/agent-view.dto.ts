import { ApiModelProperty } from '@nestjs/swagger';
import { AgentUser1Dto } from '../../agent-users/dto';

export class AgentViewDto {
    @ApiModelProperty()
    readonly id: number;

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

    @ApiModelProperty({type: AgentUser1Dto, isArray: true})
    readonly agentUsers: AgentUser1Dto[];

    @ApiModelProperty({type: AgentUser1Dto, isArray: true})
    readonly agentSuppliers: AgentUser1Dto[];

    @ApiModelProperty({format: 'date-time'})
    readonly createdAt: string;
}
