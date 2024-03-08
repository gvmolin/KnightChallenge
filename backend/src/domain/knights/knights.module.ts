import { Module } from '@nestjs/common';
import { KnightsService } from './knights.service';
import { KnightsController } from './knights.controller';
import { KnightSchema } from './schemas/knight.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [ MongooseModule.forFeature([{ name: 'Knight', schema: KnightSchema} ]) ],
  controllers: [KnightsController],
  providers: [KnightsService],
})
export class KnightsModule {}
