import { Body, Controller, Delete, Get, Headers, HttpCode, Param, Post, Put, UseGuards } from '@nestjs/common';
import { API_PATH, ROLES, TAGS } from '../constans';
import { ApiUseTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { OwnerUsersService } from './owner-users.service';
import { OwnerUserCreateDto, OwnerUserListDto, OwnerUserUpdateDto, OwnerUserViewDto } from './dto';
import { Roles } from '../_decorators';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../_guards/roles.guard';
import { OwnerUserListModel, OwnerUserViewModel } from './owner-user.model';
import { ValidationErrorDto } from '../_dto';

@ApiUseTags(TAGS.ownerUsers)
@Controller(API_PATH + 'owner_users')
export class OwnerUsersController {
    constructor(private readonly $ownerUsersService: OwnerUsersService) {
    }

    @ApiOperation({title: 'Owner users overview', description: 'Accessible through FO with AgentUser\n' +
            'Only shows OwnerUsers that are connected to the same Agent as the X-Agent-Domain'})
    @ApiResponse({status: 200, description: 'Returns list of owner users', isArray: true, type: OwnerUserListDto})
    @ApiBearerAuth()
    @Roles(ROLES.agent)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    getAll(@Headers('x-agent-domain') domain: string): Promise<OwnerUserListModel[]> {
        return this.$ownerUsersService.getAll(domain);
    }

    @ApiOperation({title: 'Create new owner user', description: 'Accessible through FO with AgentUser\n' +
            'Will connect the Owner to the same Agent as the AgentUser and the X-Agent-Domain'})
    @ApiResponse({status: 200, description: 'Owner user created', type: OwnerUserViewDto})
    @ApiResponse({status: 400, description: 'Validation failed', type: ValidationErrorDto})
    @ApiBearerAuth()
    @Roles(ROLES.agent)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    addOwnerUser(@Headers('x-agent-domain') domain: string, @Body() ownerUser: OwnerUserCreateDto): Promise<OwnerUserViewModel> {
        return this.$ownerUsersService.addOwnerUser(ownerUser, domain);
    }

    @ApiOperation({
        title: 'Get single owner user', description: 'Accessible through FO with AgentUser\n' +
            'Can only view OwnerUser if it is connected to the same Agent as the X-Agent-Domain'})
    @ApiResponse({status: 200, description: 'Returns single owner user data', type: [OwnerUserViewDto]})
    @ApiResponse({status: 404, description: 'User not found'})
    @ApiBearerAuth()
    @Roles(ROLES.agent)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':id')
    getById(@Headers('x-agent-domain') domain: string, @Param('id') id: number): Promise<OwnerUserViewModel> {
        return this.$ownerUsersService.getById(id, domain);
    }

    @ApiOperation({
        title: 'Update owner user', description: 'Accessible through FO with AgentUser\n' +
            'Can only update OwnerUser if it is connected to the same Agent as the X-Agent-Domain'})
    @ApiResponse({status: 200, description: 'Owner user updated', type: OwnerUserViewDto})
    @ApiResponse({status: 400, description: 'Validation failed', type: ValidationErrorDto})
    @ApiResponse({status: 404, description: 'User not found'})
    @ApiBearerAuth()
    @Roles(ROLES.agent)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':id')
    updateOwnerUser(@Headers('x-agent-domain') domain: string, @Param('id') id: number, @Body() ownerUser: OwnerUserUpdateDto): Promise<OwnerUserViewModel> {
        return this.$ownerUsersService.updateOwnerUser(id, ownerUser, domain);
    }

    @ApiOperation({title: 'Delete owner user', description: 'Accessible through FO with AgentUser\n' +
            'Can only delete OwnerUsers if it is connected to the same Agent as the X-Agent-Domain'})
    @ApiResponse({status: 204, description: 'User deleted'})
    @ApiResponse({status: 404, description: 'User not found'})
    @ApiBearerAuth()
    @Roles(ROLES.agent)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    @HttpCode(204)
    async deleteOwnerUser(@Headers('x-agent-domain') domain: string, @Param('id') id: number): Promise<any> {
        await this.$ownerUsersService.deleteOwnerUser(id, domain);
        return 'User deleted';
    }

    @ApiOperation({
        title: 'Password reset for Owner user', description: 'Accessible through FO with AgentUser\n' +
            'Can only reset OwnerUser if it is connected to the same Agent as the X-Agent-Domain'})
    @ApiResponse({status: 200, description: 'Password reset'})
    @ApiResponse({status: 404, description: 'User not found'})
    @ApiBearerAuth()
    @Roles(ROLES.agent)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':id/password_reset')
    passwordReset(@Headers('x-agent-domain') domain: string, @Param('id') id: number): Promise<any> {
        return this.$ownerUsersService.passwordReset(id, domain);
    }
}
