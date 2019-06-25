import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const dbConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.MYSQL_URL || '127.0.0.1',
  port: 3306,
  username: process.env.MYSQL_USERNAME || 'root',
  password: process.env.MYSQL_PASSWD || '123456',
  database: process.env.MYSQL_DATABASE || 'Lex',
  // https://github.com/typeorm/typeorm/issues/682
  entities: [__dirname + '/../**/**.entity{.ts,.js}'],
  // debug: true,
  // dropSchema: true,
  synchronize: true,
  // logging: true,
  // insecureAuth: true
};
