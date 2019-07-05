import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AgentsService } from './agents.service';
import { ApiUseTags, ApiResponse } from '@nestjs/swagger';
import { AgentListDto, AgentViewDto, AgentCreateDto } from './dto';
import { AgentListModel, AgentViewModel } from './agent.model';

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
    addExample(@Body() agent: AgentCreateDto): Promise<AgentViewModel> {
        return this.agentsService.addAgent(agent);
    }

    @ApiResponse({status: 200, description: 'Returns Agent data', type: [AgentViewDto]})
    @ApiResponse({status: 404, description: 'Agent not found'})
    @Get(':id')
    getById(@Param('id') id: number): Promise<AgentViewModel> {
        return this.agentsService.getById(id);
    }
}
