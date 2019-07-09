import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';
import { ConfigService } from '../../_config/config.service';
import { CryptographerService } from './cryptographer.service';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('SESSION_SECRET'),
                signOptions: {
                    expiresIn: configService.get('EXPIRATION_TIME'),
                },
            }),
            inject: [ConfigService],
        }),
        UsersModule,
    ],
    controllers: [
        AuthController,
    ],
    providers: [
        AuthService,
        JwtStrategy,
        CryptographerService,
    ],
})
export class AuthModule {
}
