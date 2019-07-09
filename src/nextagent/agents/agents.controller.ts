import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AgentsService } from './agents.service';
import { AgentListDto, AgentViewDto, AgentCreateDto, AgentDomainDto, AgentThemingDto } from './dto';
import { AgentDomainModel, AgentListModel, AgentViewModel } from './agent.model';
import { TAGS } from '../types';

@ApiUseTags(TAGS.agents)
@ApiBearerAuth()
@Controller('nextagent/api/v1/agents')
export class AgentsController {
    constructor(private readonly agentsService: AgentsService) {
    }

    @ApiResponse({status: 200, description: 'Returns list of agent', isArray: true, type: AgentListDto})
    @UseGuards(AuthGuard('jwt'))
    @Get()
    getAll(): Promise<AgentListModel[]> {
        return this.agentsService.getAll();
    }

    @ApiResponse({status: 200, description: 'Agent created', type: AgentViewDto})
    @ApiResponse({status: 400, description: 'Validation failed'})
    @Post()
    addAgent(@Body() agent: AgentCreateDto): Promise<AgentViewModel> {
        return this.agentsService.addAgent(agent);
    }

    @ApiResponse({status: 200, description: 'Returns Agent data', type: [AgentViewDto]})
    @ApiResponse({status: 404, description: 'Agent not found'})
    @Get(':id')
    getById(@Param('id') id: number): Promise<AgentViewModel> {
        return this.agentsService.getById(id);
    }

    @ApiResponse({status: 200, description: 'Returns Agent data', type: [AgentDomainDto]})
    @ApiResponse({status: 404, description: 'Agent not found'})
    @Get('domain/:domain')
    getByDomain(@Param('domain') domain: string): Promise<AgentDomainModel> {
        return this.agentsService.getByDomain(domain);
    }

    @ApiResponse({status: 200, description: 'Agent updated', type: AgentViewDto})
    @ApiResponse({status: 400, description: 'Validation failed'})
    @ApiResponse({status: 404, description: 'Agent not found'})
    @Put(':id')
    updateAgent(@Param('id') id: number, @Body() agent: AgentCreateDto): Promise<AgentViewModel> {
        return this.agentsService.updateAgent(id, agent);
    }

    @ApiResponse({status: 204, description: 'Agent deleted'})
    @ApiResponse({status: 404, description: 'Agent not found'})
    @Delete(':id')
    deleteAgent(@Param('id') id: number): void {
        this.agentsService.deleteAgent(id);
    }

    @ApiResponse({status: 200, description: 'Agent updated', type: AgentViewDto})
    @ApiResponse({status: 400, description: 'Validation failed'})
    @ApiResponse({status: 404, description: 'Agent not found'})
    @Put(':id/theme')
    updateAgentTheming(@Param('id') id: number, @Body() theming: AgentThemingDto): Promise<AgentViewModel> {
        return this.agentsService.updateAgentTheming(id, theming);
    }
}
