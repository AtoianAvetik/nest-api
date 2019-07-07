import { ApiModelProperty } from '@nestjs/swagger';

export class AgentThemingDto {
    @ApiModelProperty()
    readonly primaryColor: string;

    @ApiModelProperty()
    readonly secondaryColor: string;
}
