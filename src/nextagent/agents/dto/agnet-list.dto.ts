import { ApiModelProperty } from '@nestjs/swagger';
import { AgentUser1Dto } from '../../agent-users/dto';

export class AgentListDto {
    @ApiModelProperty()
    readonly id: number;

    @ApiModelProperty()
    readonly companyName: string;

    @ApiModelProperty()
    readonly domain: string;

    @ApiModelProperty({type: AgentUser1Dto, isArray: true})
    readonly agentUsers: AgentUser1Dto[];
}
