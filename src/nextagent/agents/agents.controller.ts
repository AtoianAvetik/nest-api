import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Req,
    Res,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiExcludeEndpoint, ApiImplicitFile, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { AgentsService } from './agents.service';
import { AgentCreateDto, AgentDomainDto, AgentListDto, AgentThemingDto, AgentViewDto } from './dto';
import { AgentDomainModel, AgentListModel, AgentViewModel } from './agent.model';
import { ValidationErrorDto } from '../_dto';
import { API_PATH, TAGS, MODULE_UPLOADS_DEST } from '../constans';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ConfigService } from '../../_config/config.service';
import { AgentGuard } from './guards/agent.guard';
import { Resize } from '../../_shared/sharp-resize';
import * as fs from 'fs';

@ApiUseTags( TAGS.agents )
@Controller( API_PATH + 'agents' )
export class AgentsController {
    constructor( private readonly agentsService: AgentsService,
                 private readonly $configService: ConfigService ) {
    }

    @ApiResponse( { status: 200, description: 'Returns list of agent', isArray: true, type: AgentListDto } )
    @ApiBearerAuth()
    @UseGuards( JwtAuthGuard )
    @Get()
    getAll(): Promise<AgentListModel[]> {
        return this.agentsService.getAll();
    }

    @ApiResponse( { status: 200, description: 'Agent created', type: AgentViewDto } )
    @ApiResponse( { status: 400, description: 'Validation failed', type: ValidationErrorDto } )
    // @ApiBearerAuth()
    // @UseGuards(JwtAuthGuard)
    @Post()
    addAgent( @Body() agent: AgentCreateDto ): Promise<AgentViewModel> {
        return this.agentsService.addAgent( agent );
    }

    @ApiResponse( { status: 200, description: 'Returns Agent data', type: [AgentViewDto] } )
    @ApiResponse( { status: 404, description: 'Agent not found' } )
    // @ApiBearerAuth()
    // @UseGuards(JwtAuthGuard)
    @Get( ':id' )
    getById( @Param( 'id' ) id: number ): Promise<AgentViewModel> {
        return this.agentsService.getById( id );
    }

    @ApiResponse( { status: 200, description: 'Returns Agent data', type: [AgentDomainDto] } )
    @ApiResponse( { status: 404, description: 'Agent not found' } )
    @Get( 'domain/:domain' )
    getByDomain( @Param( 'domain' ) domain: string ): Promise<AgentDomainModel> {
        return this.agentsService.getByDomain( domain );
    }

    @ApiResponse( { status: 200, description: 'Agent updated', type: AgentViewDto } )
    @ApiResponse( { status: 400, description: 'Validation failed', type: ValidationErrorDto } )
    @ApiResponse( { status: 404, description: 'Agent not found' } )
    // @ApiBearerAuth()
    // @UseGuards(JwtAuthGuard)
    @Put( ':id' )
    updateAgent( @Param( 'id' ) id: number, @Body() agent: AgentCreateDto ): Promise<AgentViewModel> {
        return this.agentsService.updateAgent( id, agent );
    }

    @ApiResponse( { status: 204, description: 'Agent deleted' } )
    @ApiResponse( { status: 404, description: 'Agent not found' } )
    // @ApiBearerAuth()
    // @UseGuards(JwtAuthGuard)
    @Delete( ':id' )
    async deleteAgent( @Param( 'id' ) id: number, @Res() res ): Promise<any> {
        await this.agentsService.deleteAgent( id );
        return res.status( 204 ).send( 'Agent deleted' );
    }

    @ApiResponse( { status: 200, description: 'Agent updated', type: AgentViewDto } )
    @ApiResponse( { status: 400, description: 'Validation failed', type: ValidationErrorDto } )
    @ApiResponse( { status: 404, description: 'Agent not found' } )
    // @ApiBearerAuth()
    // @UseGuards(JwtAuthGuard)
    @Put( ':id/theme' )
    updateAgentTheming( @Param( 'id' ) id: number, @Body() theming: AgentThemingDto ): Promise<AgentViewModel> {
        return this.agentsService.updateAgent( id, theming );
    }

    @ApiResponse( { status: 200, description: 'Agent login image updated', type: AgentViewDto } )
    @ApiResponse( { status: 400, description: 'Validation failed', type: ValidationErrorDto } )
    @ApiResponse( { status: 404, description: 'Agent not found' } )
    @ApiImplicitFile( { name: 'loginImageFile', description: 'Agent login image file (jpg or png)', required: true } )
    // @ApiBearerAuth()
    // @UseGuards(JwtAuthGuard)
    @UseGuards( AgentGuard )
    @Post( ':id/images/login' )
    @UseInterceptors( FileInterceptor( 'loginImageFile', {}))
    async updateAgentLoginImage( @Param( 'id' ) id: number, @UploadedFile() file, @Req() req ): Promise<AgentViewModel> {
        const fileResizer = new Resize(
            this.$configService.get( 'GLOBAL_UPLOADS_DEST' ) + MODULE_UPLOADS_DEST.agents + '/thumbnails/',
            {w: 300, h: 300},
            file.filename,
        );
        const thumbnailFilename = await fileResizer.save(fs.readFileSync(file.path));
        const path = this.$configService.get( 'ORIGIN' ) + API_PATH + 'agents/images/' + file.filename;
        const thumbnailPath = this.$configService.get( 'ORIGIN' ) + API_PATH + 'agents/images/thumbnails/' + thumbnailFilename;
        await this.agentsService.deleteLoginImage( id );
        return this.agentsService.updateAgent( id, { loginImageUrl: path, loginImageThumbnailUrl: thumbnailPath } );
    }

    @ApiResponse( { status: 204, description: 'Agent login image deleted' } )
    @ApiResponse( { status: 404, description: 'Agent not found' } )
    // @ApiBearerAuth()
    // @UseGuards(JwtAuthGuard)
    @Delete( ':id/images/login' )
    async deleteAgentLoginImage( @Param( 'id' ) id: number, @Res() res ): Promise<any> {
        await this.agentsService.deleteLoginImage( id );
        await this.agentsService.updateAgent( id, { loginImageUrl: null, loginImageThumbnailUrl: null } );
        return res.status( 204 ).send( 'Agent login image deleted' );
    }

    @ApiResponse( { status: 200, description: 'Agent logo image updated', type: AgentViewDto } )
    @ApiResponse( { status: 400, description: 'Validation failed', type: ValidationErrorDto } )
    @ApiResponse( { status: 404, description: 'Agent not found' } )
    @ApiImplicitFile( { name: 'logoImageFile', description: 'Agent logo image file (jpg or png)', required: true } )
    // @ApiBearerAuth()
    // @UseGuards(JwtAuthGuard)
    @UseGuards( AgentGuard )
    @Post( ':id/images/logo' )
    @UseInterceptors( FileInterceptor( 'logoImageFile' ) )
    async updateAgentLogoImage( @Param( 'id' ) id: number, @UploadedFile() file, @Req() req ): Promise<AgentViewModel> {
        const fileResizer = new Resize(
            this.$configService.get( 'GLOBAL_UPLOADS_DEST' ) + MODULE_UPLOADS_DEST.agents + '/thumbnails/',
            {w: 300, h: 300},
            file.filename,
        );
        const thumbnailFilename = await fileResizer.save(fs.readFileSync(file.path));
        const path = this.$configService.get( 'ORIGIN' ) + API_PATH + 'agents/images/' + file.filename;
        const thumbnailPath = this.$configService.get( 'ORIGIN' ) + API_PATH + 'agents/images/thumbnails/' + thumbnailFilename;
        await this.agentsService.deleteLogoImage( id );
        return this.agentsService.updateAgent( id, { logoImageUrl: path, logoImageThumbnailUrl: thumbnailPath } );
    }

    @ApiResponse( { status: 204, description: 'Agent logo image deleted' } )
    @ApiResponse( { status: 404, description: 'Agent not found' } )
    // @ApiBearerAuth()
    // @UseGuards(JwtAuthGuard)
    @Delete( ':id/images/logo' )
    async deleteAgentLogoImage( @Param( 'id' ) id: number, @Res() res ): Promise<any> {
        await this.agentsService.deleteLogoImage( id );
        await this.agentsService.updateAgent( id, { logoImageUrl: null, logoImageThumbnailUrl: null } );
        return res.status( 204 ).send( 'Agent logo image deleted' );
    }

    // @ApiBearerAuth()
    // @UseGuards(JwtAuthGuard)
    @ApiExcludeEndpoint()
    @Get( 'images/:fileName' )
    serveImages( @Param( 'fileName' ) fileName, @Res() res ): Promise<any> {
        return res.sendFile( fileName, { root: this.$configService.get( 'GLOBAL_UPLOADS_DEST' ) + MODULE_UPLOADS_DEST.agents} );
    }

    // @ApiBearerAuth()
    // @UseGuards(JwtAuthGuard)
    @ApiExcludeEndpoint()
    @Get( 'images/thumbnails/:fileName' )
    serveThumbnails( @Param( 'fileName' ) fileName, @Res() res ): Promise<any> {
        return res.sendFile( fileName, { root: this.$configService.get( 'GLOBAL_UPLOADS_DEST' ) + MODULE_UPLOADS_DEST.agents + '/thumbnails'} );
    }
}
