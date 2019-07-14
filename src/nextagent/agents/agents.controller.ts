import {
    Body,
    Controller,
    Delete,
    Get, Headers, HttpCode,
    Param,
    Post,
    Put,
    Res,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiExcludeEndpoint, ApiImplicitFile, ApiResponse, ApiUseTags, ApiOperation, ApiImplicitHeader } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { AgentsService } from './agents.service';
import { AgentCreateDto, AgentDomainDto, AgentListDto, AgentThemingDto, AgentViewDto } from './dto';
import { AgentDomainModel, AgentListModel, AgentViewModel } from './agent.model';
import { ValidationErrorDto } from '../_dto';
import { API_PATH, TAGS, MODULE_UPLOADS_DEST, ROLES } from '../constans';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ConfigService } from '../../_config/config.service';
import { AgentGuard } from './guards/agent.guard';
import { Resize } from '../../_shared/sharp-resize';
import * as fs from 'fs';
import { Roles } from '../_decorators';
import { RolesGuard } from '../_guards/roles.guard';

@ApiUseTags(TAGS.agents)
@Controller(API_PATH + 'agents')
export class AgentsController {
    constructor(private readonly agentsService: AgentsService,
                private readonly $configService: ConfigService) {
    }

    @ApiOperation({title: 'Get single agent by domain', description: 'Accessible by everyone'})
    @ApiResponse({status: 200, description: 'Returns Agent data', type: [AgentDomainDto]})
    @ApiResponse({status: 404, description: 'Agent not found'})
    @Get('domain/:domain')
    getByDomain(@Param('domain') domain: string): Promise<AgentDomainModel> {
        return this.agentsService.getByDomain(domain);
    }

    @ApiOperation({title: 'Agents overview', description: 'Accessible through BO with AdminUser'})
    @ApiResponse({status: 200, description: 'Returns list of agent', isArray: true, type: AgentListDto})
    @ApiBearerAuth()
    @Roles(ROLES.admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    getAll(): Promise<AgentListModel[]> {
        return this.agentsService.getAll();
    }

    @ApiOperation({title: 'Create new agent', description: 'Accessible through BO with AdminUser'})
    @ApiResponse({status: 200, description: 'Agent created', type: AgentViewDto})
    @ApiResponse({status: 400, description: 'Validation failed', type: ValidationErrorDto})
    @ApiBearerAuth()
    @Roles(ROLES.admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    addAgent(@Body() agent: AgentCreateDto): Promise<AgentViewModel> {
        return this.agentsService.addAgent(agent);
    }

    @ApiOperation({
        title: 'Get single agent', description: 'Accessible through BO with AdminUser\n' +
            'Shows all Agents\n' +
            '\n' +
            'Accessible through FO with AgentUser\n' +
            'Only shows the Agent if it is the same Agent as the AgentUser and the X-Agent-Domain',
    })
    @ApiImplicitHeader({name: 'x-agent-domain', required: false})
    @ApiResponse({status: 200, description: 'Returns Agent data', type: [AgentViewDto]})
    @ApiResponse({status: 404, description: 'Agent not found'})
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    getById(@Param('id') id: number, @Headers('x-agent-domain') domain?: string): Promise<AgentViewModel> {
        return this.agentsService.getById(id, domain);
    }

    @ApiOperation({title: 'Update agent', description: 'Accessible through BO with AdminUser'})
    @ApiResponse({status: 200, description: 'Agent updated', type: AgentViewDto})
    @ApiResponse({status: 400, description: 'Validation failed', type: ValidationErrorDto})
    @ApiResponse({status: 404, description: 'Agent not found'})
    @ApiBearerAuth()
    @Roles(ROLES.admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':id')
    updateAgent(@Param('id') id: number, @Body() agent: AgentCreateDto): Promise<AgentViewModel> {
        return this.agentsService.updateAgent(id, agent);
    }

    @ApiOperation({title: 'Delete agent', description: 'Accessible through BO with AdminUser'})
    @ApiResponse({status: 204, description: 'Agent deleted'})
    @ApiResponse({status: 404, description: 'Agent not found'})
    @ApiBearerAuth()
    @Roles(ROLES.admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    @HttpCode(204)
    async deleteAgent(@Param('id') id: number): Promise<any> {
        await this.agentsService.deleteAgent(id);
        return 'Agent deleted';
    }

    @ApiOperation({
        title: 'Update agent theming', description: 'Accessible through FO with AgentUser\n' +
            'Can only update Agent if it is the same Agent as the X-Agent-Domain'
    })
    @ApiResponse({status: 200, description: 'Agent updated', type: AgentViewDto})
    @ApiResponse({status: 400, description: 'Validation failed', type: ValidationErrorDto})
    @ApiResponse({status: 404, description: 'Agent not found'})
    @ApiBearerAuth()
    @Roles(ROLES.agent)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':id/theme')
    updateAgentTheming(@Param('id') id: number, @Body() theming: AgentThemingDto, @Headers('x-agent-domain') domain: string): Promise<AgentViewModel> {
        return this.agentsService.updateAgent(id, theming, domain);
    }

    @ApiOperation({
        title: 'Upload agent login image', description: 'Accessible through FO with AgentUser\n' +
            'Can only update Agent if it is the same Agent as the X-Agent-Domain'
    })
    @ApiResponse({status: 200, description: 'Agent login image updated', type: AgentViewDto})
    @ApiResponse({status: 400, description: 'Validation failed', type: ValidationErrorDto})
    @ApiResponse({status: 404, description: 'Agent not found'})
    @ApiImplicitFile({name: 'loginImageFile', description: 'Agent login image file (jpg or png)', required: true})
    @ApiBearerAuth()
    @Roles(ROLES.agent)
    @UseGuards(JwtAuthGuard, AgentGuard, RolesGuard)
    @Post(':id/images/login')
    @UseInterceptors(FileInterceptor('loginImageFile', {}))
    async updateAgentLoginImage(@Param('id') id: number, @UploadedFile() file, @Headers('x-agent-domain') domain: string): Promise<AgentViewModel> {
        const fileResizer = new Resize(
            this.$configService.get('GLOBAL_UPLOADS_DEST') + MODULE_UPLOADS_DEST.agents + '/thumbnails/',
            {w: 300, h: 300},
            file.filename,
        );
        const thumbnailFilename = await fileResizer.save(fs.readFileSync(file.path));
        const path = this.$configService.get('ORIGIN') + API_PATH + 'agents/images/' + file.filename;
        const thumbnailPath = this.$configService.get('ORIGIN') + API_PATH + 'agents/images/thumbnails/' + thumbnailFilename;
        await this.agentsService.deleteLoginImage(id);
        return this.agentsService.updateAgent(id, {loginImageUrl: path, loginImageThumbnailUrl: thumbnailPath}, domain);
    }

    @ApiOperation({
        title: 'Delete agent login image', description: 'Accessible through FO with AgentUser\n' +
            'Can only update Agent if it is the same Agent as the X-Agent-Domain'
    })
    @ApiResponse({status: 204, description: 'Agent login image deleted'})
    @ApiResponse({status: 404, description: 'Agent not found'})
    @ApiBearerAuth()
    @Roles(ROLES.agent)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id/images/login')
    @HttpCode(204)
    async deleteAgentLoginImage(@Param('id') id: number, @Headers('x-agent-domain') domain: string): Promise<any> {
        await this.agentsService.deleteLoginImage(id);
        await this.agentsService.updateAgent(id, {loginImageUrl: null, loginImageThumbnailUrl: null}, domain);
        return 'Agent login image deleted';
    }

    @ApiOperation({
        title: 'Upload agent logo image', description: 'Accessible through FO with AgentUser\n' +
            'Can only update Agent if it is the same Agent as the X-Agent-Domain'
    })
    @ApiResponse({status: 200, description: 'Agent logo image updated', type: AgentViewDto})
    @ApiResponse({status: 400, description: 'Validation failed', type: ValidationErrorDto})
    @ApiResponse({status: 404, description: 'Agent not found'})
    @ApiImplicitFile({name: 'logoImageFile', description: 'Agent logo image file (jpg or png)', required: true})
    @ApiBearerAuth()
    @Roles(ROLES.agent)
    @UseGuards(JwtAuthGuard, AgentGuard, RolesGuard)
    @Post(':id/images/logo')
    @UseInterceptors(FileInterceptor('logoImageFile'))
    async updateAgentLogoImage(@Param('id') id: number, @UploadedFile() file, @Headers('x-agent-domain') domain: string): Promise<AgentViewModel> {
        const fileResizer = new Resize(
            this.$configService.get('GLOBAL_UPLOADS_DEST') + MODULE_UPLOADS_DEST.agents + '/thumbnails/',
            {w: 300, h: 300},
            file.filename,
        );
        const thumbnailFilename = await fileResizer.save(fs.readFileSync(file.path));
        const path = this.$configService.get('ORIGIN') + API_PATH + 'agents/images/' + file.filename;
        const thumbnailPath = this.$configService.get('ORIGIN') + API_PATH + 'agents/images/thumbnails/' + thumbnailFilename;
        await this.agentsService.deleteLogoImage(id);
        return this.agentsService.updateAgent(id, {logoImageUrl: path, logoImageThumbnailUrl: thumbnailPath}, domain);
    }

    @ApiOperation({
        title: 'Delete agent logo image', description: 'Accessible through FO with AgentUser\n' +
            'Can only update Agent if it is the same Agent as the X-Agent-Domain',
    })
    @ApiResponse({status: 204, description: 'Agent logo image deleted'})
    @ApiResponse({status: 404, description: 'Agent not found'})
    @ApiBearerAuth()
    @Roles(ROLES.agent)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id/images/logo')
    @HttpCode(204)
    async deleteAgentLogoImage(@Param('id') id: number, @Headers('x-agent-domain') domain: string): Promise<any> {
        await this.agentsService.deleteLogoImage(id);
        await this.agentsService.updateAgent(id, {logoImageUrl: null, logoImageThumbnailUrl: null}, domain);
        return 'Agent logo image deleted';
    }

    // @ApiBearerAuth()
    // @UseGuards(JwtAuthGuard)
    @ApiExcludeEndpoint()
    @Get('images/:fileName')
    serveImages(@Param('fileName') fileName, @Res() res): Promise<any> {
        return res.sendFile(fileName, {root: this.$configService.get('GLOBAL_UPLOADS_DEST') + MODULE_UPLOADS_DEST.agents});
    }

    // @ApiBearerAuth()
    // @UseGuards(JwtAuthGuard)
    @ApiExcludeEndpoint()
    @Get('images/thumbnails/:fileName')
    serveThumbnails(@Param('fileName') fileName, @Res() res): Promise<any> {
        return res.sendFile(fileName, {root: this.$configService.get('GLOBAL_UPLOADS_DEST') + MODULE_UPLOADS_DEST.agents + '/thumbnails'});
    }
}
