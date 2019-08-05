import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards } from '@nestjs/common';
import { API_PATH, ROLES, TAGS } from '../constans';
import { ApiUseTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { SupplierUsersService } from './supplier-users.service';
import { Roles } from '../_decorators';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../_guards/roles.guard';
import { ValidationErrorDto } from '../_dto';
import { UserUpdateDto } from '../users/dto';
import { SupplierUserCreateDto, SupplierUserListDto, SupplierUserViewDto } from './dto';
import { SupplierUserListModel, SupplierUserViewModel } from './supplier-user.model';

@ApiUseTags(TAGS.supplierUsers)
@Controller(API_PATH + 'supplier_users')
export class SupplierUsersController {
    constructor(private readonly $supplierUsersService: SupplierUsersService) {
    }

    @ApiOperation({title: 'Supplier users overview', description: 'Accessible through BO with AdminUser'})
    @ApiResponse({status: 200, description: 'Returns list of supplier users', isArray: true, type: SupplierUserListDto})
    @ApiBearerAuth()
    @Roles(ROLES.admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    getAll(): Promise<SupplierUserListModel[]> {
        return this.$supplierUsersService.getAll();
    }

    @ApiOperation({title: 'Create new supplier user', description: 'Accessible through BO with AdminUser'})
    @ApiResponse({status: 200, description: 'Supplier user created', type: SupplierUserViewDto})
    @ApiResponse({status: 400, description: 'Validation failed', type: ValidationErrorDto})
    @ApiBearerAuth()
    @Roles(ROLES.admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    addSupplierUser(@Body() supplierUser: SupplierUserCreateDto): Promise<SupplierUserViewModel> {
        return this.$supplierUsersService.addSupplierUser(supplierUser);
    }

    @ApiOperation({title: 'Get single supplier user', description: 'Accessible through BO with AdminUser'})
    @ApiResponse({status: 200, description: 'Returns single supplier user data', type: SupplierUserViewDto})
    @ApiResponse({status: 404, description: 'User not found'})
    @ApiBearerAuth()
    @Roles(ROLES.admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':id')
    getById(@Param('id') id: number): Promise<SupplierUserViewModel> {
        return this.$supplierUsersService.getById(id);
    }

    @ApiOperation({title: 'Update supplier user', description: 'Accessible through BO with AdminUser'})
    @ApiResponse({status: 200, description: 'Supplier user updated', type: SupplierUserViewDto})
    @ApiResponse({status: 400, description: 'Validation failed', type: ValidationErrorDto})
    @ApiResponse({status: 404, description: 'User not found'})
    @ApiBearerAuth()
    @Roles(ROLES.admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':id')
    updateSupplierUser(@Param('id') id: number, @Body() supplierUser: UserUpdateDto): Promise<SupplierUserViewModel> {
        return this.$supplierUsersService.updateSupplierUser(id, supplierUser);
    }

    @ApiOperation({title: 'Delete supplier user', description: 'Accessible through BO with AdminUser'})
    @ApiResponse({status: 204, description: 'User deleted'})
    @ApiResponse({status: 404, description: 'User not found'})
    @ApiBearerAuth()
    @Roles(ROLES.admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    @HttpCode(204)
    async deleteSupplierUser(@Param('id') id: number): Promise<any> {
        await this.$supplierUsersService.deleteSupplierUser(id);
        return 'User deleted';
    }
}
