import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { UUID } from "crypto";
import { SchemaTypes } from "mongoose";
import { IAttribute, attributesEnum } from "src/core/utils/attributes.utils";
import { Weapon } from "src/domain/weapons/schemas/weapons.schema";

@Schema()
export class Knight {
   @Prop({required: true, unique: true, maxlength: 15})
   name: string;

   @Prop({maxlength: 15})
   nickname: string;

   @Prop({type: Object})
   attributes: IAttribute;

   @Prop({type: Date})
   birthday: string;

   @Prop()
   keyAtributte: attributesEnum;

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