import { Body, Controller, Delete, Get, Headers, HttpCode, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBearerAuth, ApiUseTags, ApiImplicitHeader } from '@nestjs/swagger';
import { Roles } from '../_decorators';
import { API_PATH, ROLES, TAGS } from '../constans';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../_guards/roles.guard';
import { SuppliersService } from './suppliers.service';
import { SupplierCreateDto, SupplierListDto, SupplierViewDto } from './dto';
import { SupplierListModel, SupplierViewModel } from './supplier.model';
import { ValidationErrorDto } from '../_dto';

@ApiUseTags(TAGS.suppliers)
@Controller(API_PATH + 'suppliers')
export class SuppliersController {
    constructor(private readonly $suppliersService: SuppliersService) {
    }

    @ApiOperation({title: 'Suppliers overview', description: 'Accessible through BO with AdminUser\n' +
            'Shows all suppliers\n' +
            '\n' +
            'Accessible through FO with AgentUser\n' +
            'Only shows Suppliers that are connected to the same Agent as the X-Agent-Domain'})
    @ApiImplicitHeader({name: 'x-agent-domain', required: false})
    @ApiResponse({status: 200, description: 'Returns list of suppliers', isArray: true, type: SupplierListDto})
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get()
    getAll(@Headers('x-agent-domain') domain: string): Promise<SupplierListModel[]> {
        return this.$suppliersService.getAll(domain);
    }

    @ApiOperation({title: 'Create new supplier', description: 'Accessible through BO with AdminUser'})
    @ApiResponse({status: 200, description: 'Supplier created', type: SupplierViewDto})
    @ApiResponse({status: 400, description: 'Validation failed', type: ValidationErrorDto})
    @ApiBearerAuth()
    @Roles(ROLES.admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    addSupplier(@Body() supplier: SupplierCreateDto): Promise<SupplierViewModel> {
        return this.$suppliersService.addSupplier(supplier);
    }

    @ApiOperation({
        title: 'Get single supplier', description: 'Accessible through BO with AdminUser'})
    @ApiResponse({status: 200, description: 'Returns Supplier data', type: SupplierViewDto})
    @ApiResponse({status: 404, description: 'Supplier not found'})
    @ApiBearerAuth()
    @Roles(ROLES.admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':id')
    getById(@Param('id') id: number): Promise<SupplierViewModel> {
        return this.$suppliersService.getById(id);
    }

    @ApiOperation({title: 'Update agent', description: 'Accessible through BO with AdminUser'})
    @ApiResponse({status: 200, description: 'Supplier updated', type: SupplierViewDto})
    @ApiResponse({status: 400, description: 'Validation failed', type: ValidationErrorDto})
    @ApiResponse({status: 404, description: 'Supplier not found'})
    @ApiBearerAuth()
    @Roles(ROLES.admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':id')
    updateSupplier(@Param('id') id: number, @Body() supplier: SupplierCreateDto): Promise<SupplierViewModel> {
        return this.$suppliersService.updateSupplier(id, supplier);
    }

    @ApiOperation({title: 'Delete supplier', description: 'Accessible through BO with AdminUser'})
    @ApiResponse({status: 204, description: 'Supplier deleted'})
    @ApiResponse({status: 404, description: 'Supplier not found'})
    @ApiBearerAuth()
    @Roles(ROLES.admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    @HttpCode(204)
    async deleteSupplier(@Param('id') id: number): Promise<any> {
        await this.$suppliersService.deleteSupplier(id);
        return 'Supplier deleted';
    }
}
