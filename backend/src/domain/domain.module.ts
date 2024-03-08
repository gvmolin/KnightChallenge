import { Module } from "@nestjs/common";
import { KnightsModule } from "./knights/knights.module";
import { WeaponsModule } from "./weapons/weapons.module";


@Module({
    imports: [
      KnightsModule,
      WeaponsModule
    ],
  
  })
  export class DomainModule {}