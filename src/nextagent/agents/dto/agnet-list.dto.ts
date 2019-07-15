import { ApiModelProperty } from '@nestjs/swagger';
import { UserListDto } from '../../users/dto';

export class AgentListDto {
    @ApiModelProperty()
    readonly id: number;

    @ApiModelProperty({maxLength: 100, minLength: 2})
    readonly companyName: string;

    @ApiModelProperty({maxLength: 100, minLength: 6})
    readonly domain: string;

    @ApiModelProperty({type: UserListDto, isArray: true})
    readonly agentUsers: UserListDto[];
}
