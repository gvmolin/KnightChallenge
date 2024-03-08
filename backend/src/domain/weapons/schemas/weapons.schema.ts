import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { UUID } from "crypto";
import { IAttribute, attributesEnum } from "src/core/utils/attributes.utils";
@Schema()
export class Weapon {
   @Prop()
   _id?: UUID;

   @Prop()
   equipped?: boolean;

   @Prop()
   name: string;

   @Prop()
   keyAtributte: attributesEnum;

   @Prop()
   mod: number;
}
export const WeaponSchema = SchemaFactory.createForClass(Weapon);