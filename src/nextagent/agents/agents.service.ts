import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Agent } from './agent.entity';
import { REPOSITORIES, UPLOADS_DEST } from '../constans';
import { AgentDomainModel, AgentListModel, AgentViewModel } from './agent.model';
import { UsersService } from '../users/users.service';
import { ConfigService } from '../../_config/config.service';
import { NotFoundException } from '../_exceptions';
import * as _ from 'lodash';
import * as fs from 'fs';

@Injectable()
export class AgentsService {
    constructor( @Inject( REPOSITORIES.agents )
                 private readonly agentsRepository: Repository<Agent>,
                 private $usersService: UsersService,
                 private $configService: ConfigService ) {
    }

    async getAll(): Promise<AgentListModel[]> {
        const users = await this.$usersService.getAll();
        const agents = await this.agentsRepository.find();
        return Promise.resolve( agents.map( agentData => {
            const agent = new AgentListModel( agentData );
            agent.agentUsers = [];
            if ( agentData.agentUsers && agentData.agentUsers.length > 0 ) {
                agentData.agentUsers.forEach( userId => {
                    agent.agentUsers.push( _.find( users, { id: Number( userId ) } ) );
                } );
            }
            return agent;
        } ) );
    }

    async getById( id: number ): Promise<AgentViewModel> {
        const users = await this.$usersService.getAll();
        const agentData = await this.agentsFindOne( { id } );
        const agent = new AgentViewModel( agentData );

        agent.agentUsers = [];
        agent.agentSuppliers = [];
        if ( agentData.agentUsers && agentData.agentUsers.length > 0 ) {
            agentData.agentUsers.forEach( userId => {
                agent.agentUsers.push( _.find( users, { id: Number( userId ) } ) );
                agent.agentSuppliers.push( _.find( users, { id: Number( userId ) } ) );
            } );
        }
        return Promise.resolve( agent );
    }

    async getByDomain( domain: string ): Promise<AgentDomainModel> {
        const agentData = await this.agentsFindOne( { domain } );
        const agent = new AgentDomainModel( agentData );
        return Promise.resolve( agent );
    }

    async addAgent( data: any ): Promise<AgentViewModel> {
        const entity = Object.assign( new Agent(), data );
        const agentData = await this.agentsRepository.save( entity );
        return Promise.resolve( new AgentViewModel( agentData ) );
    }

    async updateAgent( id, data: any ): Promise<AgentViewModel> {
        const entity = Object.assign( new Agent(), data );
        await this.agentsRepository.update( { id }, entity );
        return await this.getById( id );
    }

    async deleteAgent( id: number ): Promise<any> {
        const res = await this.agentsRepository.delete( { id } );
        if ( res.affected === 0 ) {
            throw new NotFoundException( 'Agent not found' );
        }
    }

    async deleteLoginImage(id: number): Promise<any> {
        const agentData = await this.agentsFindOne( { id } );
        const loginImagePath = agentData.loginImageUrl ? (this.$configService.get( 'UPLOADS_DEST' ) + UPLOADS_DEST + '/' + agentData.loginImageUrl.split( '/' ).pop()) : '';
        const loginImageThumbnailPath = agentData.loginImageUrl ? (this.$configService.get( 'UPLOADS_DEST' ) + UPLOADS_DEST + '/' + agentData.loginImageThumbnailUrl.split( '/' ).pop()) : '';
        await this.deleteImage(loginImagePath);
        await this.deleteImage(loginImageThumbnailPath);
        return Promise.resolve();
    }

    async deleteLogoImage(id: number): Promise<any> {
        const agentData = await this.agentsFindOne( { id } );
        const logoImagePath = agentData.logoImageUrl ? (this.$configService.get( 'UPLOADS_DEST' ) + UPLOADS_DEST + '/' + agentData.logoImageUrl.split( '/' ).pop()) : '';
        const logoImageThumbnailPath = agentData.logoImageUrl ? (this.$configService.get( 'UPLOADS_DEST' ) + UPLOADS_DEST + '/' + agentData.logoImageThumbnailUrl.split( '/' ).pop()) : '';
        await this.deleteImage(logoImagePath);
        await this.deleteImage(logoImageThumbnailPath);
        return Promise.resolve();
    }

    async deleteImage( path ): Promise<any> {
        try {
            if (fs.existsSync(path)) {
                fs.unlinkSync(path);
            }
        } catch ( err ) {
            throw new NotFoundException( 'Image not found' );
        }
    }

    async agentsFindOne( condition ): Promise<Agent> {
        const agentData = await this.agentsRepository.findOne( condition );
        if ( !agentData ) {
            throw new NotFoundException( 'Agent not found' );
        }
        return agentData;
    }
}
