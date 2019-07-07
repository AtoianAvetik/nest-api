import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AgentUsersService } from './agent-users.service';
import { ApiUseTags, ApiResponse } from '@nestjs/swagger';
import { AgentUserCreateDto, AgentUserListDto, AgentUserViewDto } from './dto';
import { AgentUserListModel, AgentUserViewModel } from './agent-user.model';

@ApiUseTags('AgentUsers')
@Controller('nextagent/api/v1/agent_users')
export class AgentUsersController {
    constructor(private readonly agentUsersService: AgentUsersService) {
    }

    @ApiResponse({status: 200, description: 'Returns list of agent users', isArray: true, type: AgentUserListDto})
    @Get()
    getAll(): Promise<AgentUserListModel[]> {
        return this.agentUsersService.getAll();
    }

    @ApiResponse({status: 200, description: 'Agent user created', type: AgentUserViewDto})
    @ApiResponse({status: 400, description: 'Validation failed'})
    @Post()
    addExample(@Body() agentUser: AgentUserCreateDto): Promise<AgentUserViewModel> {
        return this.agentUsersService.addAgentUser(agentUser);
    }

    @ApiResponse({status: 200, description: 'Returns single agent user data', type: [AgentUserViewDto]})
    @ApiResponse({status: 404, description: 'Agent not found'})
    @Get(':id')
    getById(@Param('id') id: number): Promise<AgentUserViewModel> {
        return this.agentUsersService.getById(id);
    }

    @ApiResponse({status: 200, description: 'Agent user updated', type: AgentUserViewDto})
    @ApiResponse({status: 400, description: 'Validation failed'})
    @ApiResponse({status: 404, description: 'Agent not found'})
    @Put(':id')
    updateAgentUser(@Param('id') id: number, @Body() agentUser: AgentUserCreateDto): Promise<AgentUserViewModel> {
        return this.agentUsersService.updateAgentUser(id, agentUser);
    }

    @ApiResponse({status: 204, description: 'Agent user deleted'})
    @ApiResponse({status: 404, description: 'Agent not found'})
    @Delete(':id')
    deleteAgentUser(@Param('id') id: number): Promise<any> {
        return this.agentUsersService.deleteAgentUser(id);
    }
}
