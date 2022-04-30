import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { Driver } from 'src/profile/entities/driver.entity';
import { ProfileService } from 'src/profile/profile.service';
import { AuthDto, SignToken } from './dto';
import { SignUpInput } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly profileService: ProfileService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signup(dto: SignUpInput): Promise<SignToken> {
    const { password } = dto;
    const hash = await argon2.hash(password);

    // turn this to a create profile event
    const driver = await this.profileService.create({ ...dto, password: hash });

    // dispatch event to send email to user to verify email
    return this.signToken(driver);
  }

  async login(dto: AuthDto): Promise<SignToken> {
    const validDriver = await this.validateUser(dto.email, dto.password);
    if (!validDriver) throw new ForbiddenException('Credentials Incorrect');
    return this.signToken(validDriver);
  }

  async logout() {
    return {};
  }

  async validateUser(email: string, password: string) {
    const user = await this.profileService.findOne(null, email);
    if (!user) return null;

    const isCorrectPassword = await argon2.verify(user.password, password);
    if (isCorrectPassword) return user;
  }

  async signToken(driver: Driver): Promise<SignToken> {
    const payloadData = (({ email, firstName, lastName }) => ({
      email,
      firstName,
      lastName,
    }))(driver);
    const payload = {
      sub: driver.id,
      ...payloadData,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '2d',
      secret: this.configService.get('JWT_SECRET'),
    });

    return {
      accessToken,
      refreshToken: '',
      driver,
    };
  }
}
