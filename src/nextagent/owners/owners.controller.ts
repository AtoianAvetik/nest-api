import { Body, Controller, Delete, Get, Headers, HttpCode, Param, Post, Put, UseGuards } from '@nestjs/common';
import { API_PATH, ROLES, TAGS } from '../constans';
import { ApiUseTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { OwnersService } from './owners.service';
import { Roles } from '../_decorators';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../_guards/roles.guard';
import { OwnerCreateDto, OwnerListDto, OwnerViewDto } from './dto';
import { OwnerListModel, OwnerViewModel } from './owner.model';
import { ValidationErrorDto } from '../_dto';

@ApiUseTags(TAGS.owners)
@Controller(API_PATH + 'owners')
export class OwnersController {
    constructor(private readonly $ownersService: OwnersService) {
    }

    @ApiOperation({title: 'Owners overview', description: 'Accessible through FO with AgentUser\n' +
            'Only shows Owners that are connected to the same Agent as the X-Agent-Domain'})
    @ApiResponse({status: 200, description: 'Returns list of owners', isArray: true, type: OwnerListDto})
    @ApiBearerAuth()
    @Roles(ROLES.agent)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    getAll(@Headers('x-agent-domain') domain: string): Promise<OwnerListModel[]> {
        return this.$ownersService.getAll(domain);
    }

    @ApiOperation({title: 'Create new owner', description: 'Accessible through FO with AgentUser'})
    @ApiResponse({status: 200, description: 'Owner created', type: OwnerViewDto})
    @ApiResponse({status: 400, description: 'Validation failed', type: ValidationErrorDto})
    @ApiBearerAuth()
    @Roles(ROLES.agent)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    addOwner(@Headers('x-agent-domain') domain: string, @Body() owner: OwnerCreateDto): Promise<OwnerViewModel> {
        return this.$ownersService.addOwner(owner, domain);
    }

    @ApiOperation({title: 'Get single owner', description: 'Accessible through FO with AgentUser\n' +
            'Can only view Owner if it is connected to the same Agent as the X-Agent-Domain'})
    @ApiResponse({status: 200, description: 'Returns Owner data', type: [OwnerViewDto]})
    @ApiResponse({status: 404, description: 'Owner not found'})
    @ApiBearerAuth()
    @Roles(ROLES.agent)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':id')
    getById(@Headers('x-agent-domain') domain: string, @Param('id') id: number): Promise<OwnerViewModel> {
        return this.$ownersService.getById(id, domain);
    }

    @ApiOperation({title: 'Update owner', description: 'Accessible through FO with AgentUser\n' +
            'Can only update Owner if it is connected to the same Agent as the X-Agent-Domain'})
    @ApiResponse({status: 200, description: 'Owner updated', type: OwnerViewDto})
    @ApiResponse({status: 400, description: 'Validation failed', type: ValidationErrorDto})
    @ApiResponse({status: 404, description: 'Owner not found'})
    @ApiBearerAuth()
    @Roles(ROLES.agent)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':id')
    updateAgentUser(@Headers('x-agent-domain') domain: string, @Param('id') id: number, @Body() owner: OwnerCreateDto): Promise<OwnerViewModel> {
        return this.$ownersService.updateOwner(id, owner, domain);
    }

    @ApiOperation({title: 'Delete owner', description: 'Accessible through FO with AgentUser\n' +
            'Can only delete Owners if it is connected to the same Agent as the X-Agent-Domain'})
    @ApiResponse({status: 204, description: 'Owner deleted'})
    @ApiResponse({status: 404, description: 'Owner not found'})
    @ApiBearerAuth()
    @Roles(ROLES.agent)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    @HttpCode(204)
    async deleteAgentUser(@Headers('x-agent-domain') domain: string, @Param('id') id: number): Promise<any> {
        await this.$ownersService.deleteOwner(id, domain);
        return 'Owner deleted';
    }
}
