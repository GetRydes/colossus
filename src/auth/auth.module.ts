import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { AuthMutationResolver } from './auth.mutation.resolver';
import { AuthQueryResolver } from './auth.query.resolver';
import { ProfileModule } from 'src/profile/profile.module';
import { LocalStrategy } from './strategy';

@Module({
  providers: [
    AuthResolver,
    AuthService,
    AuthMutationResolver,
    AuthQueryResolver,
    LocalStrategy,
  ],
  imports: [PassportModule, JwtModule.register({}), ProfileModule],
})
export class AuthModule {}
