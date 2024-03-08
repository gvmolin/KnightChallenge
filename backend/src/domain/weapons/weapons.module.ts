import { Module } from '@nestjs/common';
import { WeaponsService } from './weapons.service';
import { WeaponsController } from './weapons.controller';
import { WeaponSchema } from './schemas/weapons.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { WeaponsInterface } from './weapons.interface';

@Module({
  imports: [ MongooseModule.forFeature([{ name: 'Weapon', schema: WeaponSchema } ]) ],
  controllers: [WeaponsController],
  providers: [WeaponsService, WeaponsInterface],
  exports: [WeaponsInterface]
})
export class WeaponsModule {}
