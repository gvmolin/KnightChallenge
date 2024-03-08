import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { mongooseConfig } from './core/utils/database-config';
import { DomainModule } from './domain/domain.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true
    }),
    MongooseModule.forRoot(mongooseConfig.getUrl(), {dbName: mongooseConfig.getName()}),
    DomainModule,
    // KnightsModule
  ],

})
export class AppModule {}
