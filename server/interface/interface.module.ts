import { AuthModule } from '../auth/auth.module';
import { Interface } from './interface.entity';
import { InterfaceController } from './interface.controller';
import { InterfaceService } from './interface.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Interface]), AuthModule],
  controllers: [InterfaceController],
  providers: [InterfaceService],
  exports: [InterfaceService],
})
export class InterfaceModule {}
