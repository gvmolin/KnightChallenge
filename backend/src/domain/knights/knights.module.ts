import { Module } from '@nestjs/common';
import { KnightsService } from './knights.service';
import { KnightsController } from './knights.controller';
import { KnightSchema } from './schemas/knight.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { WeaponsModule } from '../weapons/weapons.module';

@Module({
  imports: [ 
    MongooseModule.forFeature([{ name: 'Knight', schema: KnightSchema} ]),
    WeaponsModule
  ],
  controllers: [KnightsController],
  providers: [KnightsService],
})
export class KnightsModule {}
