import { Module } from '@nestjs/common';
import { KnightsService } from './knights.service';
import { KnightsController } from './knights.controller';
import { KnightSchema } from './schemas/knight.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { WeaponsModule } from '../weapons/weapons.module';
import { KnightsUtils } from './knights.utils';

@Module({
  imports: [ 
    MongooseModule.forFeatureAsync([{ 
      name: 'Knight', 
      useFactory: () => {
        const schema = KnightSchema;
        schema.plugin(require('mongoose-unique-validator'), { message: 'Unique validation error on knights schema' })
        return schema;
      }    
    } ]),
    WeaponsModule
 ],
  controllers: [KnightsController],
  providers: [KnightsService, KnightsUtils],
})
export class KnightsModule {}
