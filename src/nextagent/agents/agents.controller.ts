import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AgentsService } from './agents.service';
import { ApiUseTags, ApiResponse } from '@nestjs/swagger';
import { AgentListDto, AgentViewDto, AgentCreateDto } from './dto';
import { AgentListModel, AgentViewModel } from './agent.model';
import { AgentThemingDto } from './dto/agent-theming.dto';

@ApiUseTags('Agents')
@Controller('nextagent/api/v1/agents')
export class AgentsController {
    constructor(private readonly agentsService: AgentsService) {
    }

    @ApiResponse({status: 200, description: 'Returns list of agent', isArray: true, type: AgentListDto})
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
