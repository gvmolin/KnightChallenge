import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { UUID } from "crypto";
import { SchemaTypes } from "mongoose";
import { BaseSchema } from "src/core/base/base-schema";
import { IAttribute, attributesEnum } from "src/core/utils/attributes.utils";
import { Weapon } from "src/domain/weapons/schemas/weapons.schema";

@Schema()
export class Knight extends BaseSchema {
   @Prop({required: true, unique: true, maxlength: 15})
   name: string;

   @Prop({maxlength: 15})
   nickname: string;

   @Prop({type: Object, required: true})
   attributes: IAttribute;

   @Prop({type: Date, required: true})
   birthday: string;

   @Prop({required: true})
   keyAttribute: string;

   @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Weapon' }] })
   weapons: Weapon[];

   @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Weapon' }],  maxlength: 1})
   equipped: Weapon;

   @Prop({required: true})
   experience: number;

   @Prop({required: true})
   attack: number;

}
export const KnightSchema = SchemaFactory.createForClass(Knight);