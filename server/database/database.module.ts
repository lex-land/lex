import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useExisting: ConfigService,
    }),
    // 配置 mongodb
    // MongooseModule.forRoot('mongodb://localhost/engine', {
    //   useNewUrlParser: true,
    // }),
  ],
  // providers: [...databaseProviders],
  // exports: [...databaseProviders],
})
export class DatabaseModule {}
