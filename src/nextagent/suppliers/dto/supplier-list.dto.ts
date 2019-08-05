import { ApiModelProperty } from '@nestjs/swagger';
import { UserListDto } from '../../users/dto';
import { SupplierAgentDto } from './supplier-agent.dto';

export class SupplierListDto {
    @ApiModelProperty()
    readonly id: number;

    @ApiModelProperty({maxLength: 100, minLength: 2})
    readonly name: string;

    @ApiModelProperty({maxLength: 128, minLength: 6})
    readonly email: string;

    @ApiModelProperty()
    readonly visibleForAllAgents: boolean;

    @ApiModelProperty({type: SupplierAgentDto, isArray: true, required: false})
    readonly agentSuppliers: SupplierAgentDto[];

    @ApiModelProperty({type: UserListDto, isArray: true, required: false})
    readonly supplierUsers: UserListDto[];
}
