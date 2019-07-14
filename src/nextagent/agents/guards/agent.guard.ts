import {
    CanActivate,
    ExecutionContext,
    Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AgentsService } from '../agents.service';

@Injectable()
export class AgentGuard implements CanActivate {
    constructor( private readonly $agentsService: AgentsService) {
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return this.handleRequest(request);
    }

    async handleRequest(req): Promise<boolean> {
        const agentData = await this.$agentsService.agentsFindOne({id: req.params.id});

        // Only have access the Agent if it is the same Agent as the AgentUser and the X-Agent-Domain
        if ( agentData && req.headers['x-agent-domain'] ) {
            this.$agentsService.validateDomain(req.headers['x-agent-domain'], agentData.domain);
        }

        return !!agentData;
    }
}
