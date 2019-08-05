import { Body, Controller, Delete, Get, Headers, HttpCode, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AgentUsersService } from './agent-users.service';
import { ApiUseTags, ApiResponse, ApiOperation, ApiBearerAuth, ApiImplicitHeader } from '@nestjs/swagger';
import { AgentUserCreateDto, AgentUserListDto, AgentUserViewDto } from './dto';
import { ValidationErrorDto } from '../_dto';
import { UserUpdateDto } from '../users/dto';
import { AgentUserListModel, AgentUserViewModel } from './agent-user.model';
import { TAGS, API_PATH, ROLES } from '../constans';
import { Roles } from '../_decorators';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../_guards/roles.guard';

@ApiUseTags(TAGS.agentUsers)
@Controller(API_PATH + 'agent_users')
export class AgentUsersController {
    constructor(private readonly $agentUsersService: AgentUsersService) {
    }

    @ApiOperation({title: 'Agent users overview', description: 'Accessible through BO with AdminUser'})
    @ApiResponse({status: 200, description: 'Returns list of agent users', isArray: true, type: AgentUserListDto})
    @ApiBearerAuth()
    @Roles(ROLES.admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    getAll(): Promise<AgentUserListModel[]> {
        return this.$agentUsersService.getAll();
    }

    @ApiOperation({title: 'Create new agent user', description: 'Accessible through BO with AdminUser'})
    @ApiResponse({status: 200, description: 'Agent user created', type: AgentUserViewDto})
    @ApiResponse({status: 400, description: 'Validation failed', type: ValidationErrorDto})
    @ApiBearerAuth()
    @Roles(ROLES.admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    addAgentUser(@Body() agentUser: AgentUserCreateDto): Promise<AgentUserViewModel> {
        return this.$agentUsersService.addAgentUser(agentUser);
    }

    @ApiOperation({
        title: 'Get single agent user', description: 'Accessible through BO with AdminUser\n' +
            'Can view every AgentUser\n' +
            '\n' +
            'Accessible through FO with AgentUser\n' +
            'Only shows the AgentUser if it is the same as the logged in AgentUser'})
    @ApiImplicitHeader({name: 'x-agent-domain', required: false})
    @ApiResponse({status: 200, description: 'Returns single agent user data', type: AgentUserViewDto})
    @ApiResponse({status: 404, description: 'User not found'})
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    getById(@Param('id') id: number, @Headers('x-agent-domain') domain?: string): Promise<AgentUserViewModel> {
        return this.$agentUsersService.getById(id, domain);
    }

    @ApiOperation({
        title: 'Update agent user', description: 'Accessible through BO with AdminUser\n' +
            'Can update every AgentUser\n' +
            '\n' +
            'Accessible through FO with AgentUser\n' +
            'Can only update the AgentUser if it is the same as the logged in AgentUser'})
    @ApiImplicitHeader({name: 'x-agent-domain', required: false})
    @ApiResponse({status: 200, description: 'Agent user updated', type: AgentUserViewDto})
    @ApiResponse({status: 400, description: 'Validation failed', type: ValidationErrorDto})
    @ApiResponse({status: 404, description: 'User not found'})
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Put(':id')
    updateAgentUser(@Param('id') id: number, @Body() agentUser: UserUpdateDto, @Headers('x-agent-domain') domain?: string): Promise<AgentUserViewModel> {
        return this.$agentUsersService.updateAgentUser(id, agentUser, domain);
    }

    @ApiOperation({title: 'Delete agent user', description: 'Accessible through BO with AdminUser'})
    @ApiResponse({status: 204, description: 'User deleted'})
    @ApiResponse({status: 404, description: 'User not found'})
    @ApiBearerAuth()
    @Roles(ROLES.admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    @HttpCode(204)
    async deleteAgentUser(@Param('id') id: number): Promise<any> {
        await this.$agentUsersService.deleteAgentUser(id);
        return 'User deleted';
    }
}
