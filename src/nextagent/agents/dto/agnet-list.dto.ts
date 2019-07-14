import { ApiModelProperty } from '@nestjs/swagger';
import { AgentUser1Dto } from '../../agent-users/dto';

export class AgentListDto {
    @ApiModelProperty()
    readonly id: number;

    @ApiModelProperty({maxLength: 100, minLength: 2})
    readonly companyName: string;

    @ApiModelProperty({maxLength: 100, minLength: 6})
    readonly domain: string;

    @ApiModelProperty({type: AgentUser1Dto, isArray: true})
    readonly agentUsers: AgentUser1Dto[];
}
