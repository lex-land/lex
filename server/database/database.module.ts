import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from '@config/ormconfig';

@Module({
  imports: [
    // https://docs.nestjs.com/techniques/database
    TypeOrmModule.forRootAsync({
      useFactory: () => ormConfig,
    }),
    // 配置 mongodb
    // MongooseModule.forRoot('mongodb://localhost/engine', {
    //   useNewUrlParser: true,
    // }),
  ],
})
export class DatabaseModule {}
