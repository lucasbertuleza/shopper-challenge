import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const PostgresConnection = TypeOrmModule.forRoot({
  type: 'postgres',
  port: 5432,
  host: process.env.POSTGRES_HOST,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: process.env.NODE_ENV === 'development',
  logging: ['info'],
  autoLoadEntities: true,
  entities: ['dist/modules/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
});

@Module({
  imports: [PostgresConnection],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
