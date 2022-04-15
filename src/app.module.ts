import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DataAccessModule } from './data-access/data-access.module';
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [
    AuthModule,
    DataAccessModule,
    UtilsModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
