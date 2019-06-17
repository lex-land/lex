import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from '@config/database';

@Module({
  imports: [
    // https://docs.nestjs.com/techniques/database
    TypeOrmModule.forRootAsync({
      useFactory: () => dbConfig,
    }),
    // 配置 mongodb
    // MongooseModule.forRoot('mongodb://localhost/engine', {
    //   useNewUrlParser: true,
    // }),
  ],
})
export class DatabaseModule {}
