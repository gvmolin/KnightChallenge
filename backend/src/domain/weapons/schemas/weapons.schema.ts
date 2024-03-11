import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { UUID } from "crypto";
import { ObjectId } from "mongoose";
import { BaseSchema } from "src/core/base/base-schema";
import { IAttribute, attributesEnum } from "src/core/utils/attributes.utils";
@Schema()
export class Weapon extends BaseSchema{
   @Prop({required: true, unique:true})
   name: string;

   @Prop({required: true})
   keyAttribute: string;

   @Prop({required: true})
   mod: number;
    
}
export const WeaponSchema = SchemaFactory.createForClass(Weapon);