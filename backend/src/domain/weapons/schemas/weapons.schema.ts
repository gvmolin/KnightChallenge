import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { UUID } from "crypto";
import { IAttribute, attributesEnum } from "src/core/utils/attributes.utils";
@Schema()
export class Weapon {

   @Prop({required: true, unique:true})
   name: string;

   @Prop({required: true})
   keyAttribute: string;

   @Prop({required: true})
   mod: number;
}
export const WeaponSchema = SchemaFactory.createForClass(Weapon);