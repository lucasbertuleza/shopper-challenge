import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const PostgresConnection = TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'database',
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: process.env.NODE_ENV === 'development',
  logging: true,
  entities: [],
  migrations: [],
});

@Module({
  imports: [PostgresConnection],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
