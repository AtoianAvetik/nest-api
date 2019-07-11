import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiUseTags, ApiResponse, ApiBearerAuth, ApiImplicitFile, ApiExcludeEndpoint } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { AgentsService } from './agents.service';
import { AgentListDto, AgentViewDto, AgentCreateDto, AgentDomainDto, AgentThemingDto } from './dto';
import { AgentDomainModel, AgentListModel, AgentViewModel } from './agent.model';
import { ValidationErrorDto } from '../_dto';
import { TAGS } from '../types';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiUseTags(TAGS.agents)
@Controller('nextagent/api/v1/agents')
export class AgentsController {
    constructor(private readonly agentsService: AgentsService) {
    }

    @ApiResponse({status: 200, description: 'Returns list of agent', isArray: true, type: AgentListDto})
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get()
    getAll(): Promise<AgentListModel[]> {
        return this.agentsService.getAll();
    }

    @ApiResponse({status: 200, description: 'Agent created', type: AgentViewDto})
    @ApiResponse({status: 400, description: 'Validation failed', type: ValidationErrorDto})
    // @ApiBearerAuth()
    // @UseGuards(JwtAuthGuard)
    @Post()
    addAgent(@Body() agent: AgentCreateDto): Promise<AgentViewModel> {
        return this.agentsService.addAgent(agent);
    }

    @ApiResponse({status: 200, description: 'Returns Agent data', type: [AgentViewDto]})
    @ApiResponse({status: 404, description: 'Agent not found'})
    // @ApiBearerAuth()
    // @UseGuards(JwtAuthGuard)
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
    @ApiResponse({status: 400, description: 'Validation failed', type: ValidationErrorDto})
    @ApiResponse({status: 404, description: 'Agent not found'})
    // @ApiBearerAuth()
    // @UseGuards(JwtAuthGuard)
    @Put(':id')
    updateAgent(@Param('id') id: number, @Body() agent: AgentCreateDto): Promise<AgentViewModel> {
        return this.agentsService.updateAgent(id, agent);
    }

    @ApiResponse({status: 204, description: 'Agent deleted'})
    @ApiResponse({status: 404, description: 'Agent not found'})
    // @ApiBearerAuth()
    // @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deleteAgent(@Param('id') id: number): void {
        this.agentsService.deleteAgent(id);
    }

    @ApiResponse({status: 200, description: 'Agent updated', type: AgentViewDto})
    @ApiResponse({status: 400, description: 'Validation failed', type: ValidationErrorDto})
    @ApiResponse({status: 404, description: 'Agent not found'})
    // @ApiBearerAuth()
    // @UseGuards(JwtAuthGuard)
    @Put(':id/theme')
    updateAgentTheming(@Param('id') id: number, @Body() theming: AgentThemingDto): Promise<AgentViewModel> {
        return this.agentsService.updateAgentTheming(id, theming);
    }

    @ApiResponse({status: 200, description: 'Agent login image updated', type: AgentViewDto})
    @ApiResponse({status: 400, description: 'Validation failed', type: ValidationErrorDto})
    @ApiResponse({status: 404, description: 'Agent not found'})
    @ApiImplicitFile({name: 'loginImageFile', description: 'Agent login image file (jpg or png)', required: true})
    // @ApiBearerAuth()
    // @UseGuards(JwtAuthGuard)
    @Post(':id/images/login')
    @UseInterceptors(FileInterceptor('loginImageFile'))
    addAgentLoginImage(@Param('id') id: number, @UploadedFile() file, @Req() req): Promise<AgentViewModel> {
        return this.agentsService.addAgentLoginImage(id, req.headers.host + '\\nextagent\\api\\v1\\agents\\images\\' + file.filename);
    }

    // @ApiBearerAuth()
    // @UseGuards(JwtAuthGuard)
    @ApiExcludeEndpoint()
    @Get('images/:fileName')
    serveFiles(@Param('fileName') fileName, @Res() res): Promise<any> {
        return res.sendFile(fileName, { root: 'uploads'});
    }
}
