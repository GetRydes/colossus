import { Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Resolver()
export class AuthQueryResolver {
  constructor(private readonly authService: AuthService) {}
}
