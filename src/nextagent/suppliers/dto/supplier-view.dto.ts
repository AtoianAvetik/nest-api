import { ApiModelProperty } from '@nestjs/swagger';
import { UserListDto } from '../../users/dto';
import { SupplierAgentDto } from './supplier-agent.dto';
import { SupplierProductDto } from '../../supplier-products/dto';

export class SupplierViewDto {
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

    @ApiModelProperty({type: SupplierProductDto, isArray: true, required: false})
    readonly supplierProducts: SupplierProductDto[];

    @ApiModelProperty({type: UserListDto, isArray: true, required: false})
    readonly supplierUsers: UserListDto[];

    @ApiModelProperty({format: 'date-time'})
    readonly createdAt: string;
}
