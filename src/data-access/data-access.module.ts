import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilsModule } from 'src/utils/utils.module';
import { DataAccessService, TypeOrmService } from './data-access.service';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useClass: TypeOrmService }),
    UtilsModule,
  ],
  providers: [DataAccessService],
  exports: [DataAccessService],
})
export class DataAccessModule {}
