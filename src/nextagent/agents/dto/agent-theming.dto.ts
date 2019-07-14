import { ApiModelProperty } from '@nestjs/swagger';

export class AgentThemingDto {
    @ApiModelProperty({description: 'Hex code of a color (7 characters, starting with #).'})
    readonly primaryColor: string;

    @ApiModelProperty({description: 'Hex code of a color (7 characters, starting with #).'})
    readonly secondaryColor: string;
}
