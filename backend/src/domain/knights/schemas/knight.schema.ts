import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { UUID } from "crypto";
import { IAttribute, attributesEnum } from "src/core/utils/attributes.utils";
import { Weapon } from "src/domain/weapons/schemas/weapons.schema";
@Schema()
export class Knight {
   @Prop()
   name: string;

   @Prop()
   nickname: string;

   @Prop({type: Object})
   attributes: IAttribute;

   @Prop()
   birthday: string;

   @Prop()
   keyAtributte: attributesEnum;

   @Prop({ type: [{ type: Weapon, ref: 'Weapon' }] })
   weapons: Weapon[];

}
export const KnightSchema = SchemaFactory.createForClass(Knight);