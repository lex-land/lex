import { createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DbConnectionToken',
    useFactory: async () =>
      await createConnection({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '123456',
        database: 'test',
        entities: [`**/**.entity{.ts,.js}`],
        synchronize: true,
        // debug: true,
        logging: true,

        // type: 'mysql',
        // host: 'localhost',
        // port: 3306,
        // username: 'root',
        // password: 'root',
        // database: 'test',
        // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        // synchronize: true,
      }),
  },
];
