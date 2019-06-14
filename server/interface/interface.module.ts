import { Interface } from './interface.entity';
import { InterfaceController } from './interface.controller';
import { InterfaceService } from './interface.service';
import { Module } from '@nestjs/common';
import { PropertyModule } from '@server/property/property.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Interface]), PropertyModule],
  controllers: [InterfaceController],
  providers: [InterfaceService],
  exports: [InterfaceService],
})
export class InterfaceModule {}
