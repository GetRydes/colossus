import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilsModule } from 'src/utils/utils.module';
import { TypeOrmService } from './data-access.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useClass: TypeOrmService }),
    UtilsModule,
  ],
})
export class DataAccessModule {}
