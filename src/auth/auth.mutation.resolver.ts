import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignToken } from './dto';
import { SignUpInput } from './dto/sign-up.dto';

@Resolver()
export class AuthMutationResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => SignToken)
  async signup(@Args('signUpInput') signUpInput: SignUpInput) {
    return await this.authService.signup(signUpInput);
  }

  @Mutation(() => SignToken)
  async signin(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    return await this.authService.login({ email, password });
  }

  @Mutation(() => String)
  async logout() {
    return await this.authService.logout();
  }
}
