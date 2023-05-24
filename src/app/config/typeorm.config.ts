import path from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  //@ts-expect-error
  synchronize: process.env.DATABASE_SYNC as boolean,
  entities: [path.resolve(__dirname, '..', '..', '**', '*.entity.{js,ts}')],
  migrations: [
    path.resolve(
      __dirname,
      '..',
      'infra',
      'database',
      'migrations',
      '*.{js,ts}',
    ),
  ],
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
