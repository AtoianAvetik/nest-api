import { Body, Controller, Delete, HttpCode, Param, Post, UseGuards } from '@nestjs/common';
import { AgentSuppliersService } from './agent-suppliers.service';
import { ApiUseTags, ApiResponse, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AgentSupplierCreateDto, AgentSupplierViewDto } from './dto';
import { ValidationErrorDto } from '../_dto';
import { TAGS, API_PATH, ROLES } from '../constans';
import { Roles } from '../_decorators';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../_guards/roles.guard';
import { AgentSupplierViewModel } from './agent-supplier.model';

@ApiUseTags(TAGS.agentSuppliers)
@Controller(API_PATH + 'agent_suppliers')
export class AgentSuppliersController {
    constructor(private readonly $agentSuppliersService: AgentSuppliersService) {
    }

    @ApiOperation({title: 'Create AgentSupplier relation', description: 'Accessible through BO with AdminUser'})
    @ApiResponse({status: 200, description: 'AgentSupplier created', type: AgentSupplierViewDto})
    @ApiResponse({status: 400, description: 'Validation failed', type: ValidationErrorDto})
    @ApiBearerAuth()
    @Roles(ROLES.admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    addAgentUser(@Body() agentSupplier: AgentSupplierCreateDto): Promise<AgentSupplierViewModel> {
        return this.$agentSuppliersService.addAgentSupplierRelation(agentSupplier);
    }

    @ApiOperation({title: 'Delete AgentSupplier relation', description: 'Accessible through BO with AdminUser'})
    @ApiResponse({status: 204, description: 'AgentSupplier deleted'})
    @ApiResponse({status: 404, description: 'AgentSupplier not found'})
    @ApiBearerAuth()
    @Roles(ROLES.admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    @HttpCode(204)
    async deleteAgentSupplier(@Param('id') id: number): Promise<any> {
        await this.$agentSuppliersService.deleteAgentSupplierRelation(id);
        return 'AgentSupplier deleted';
    }
}
