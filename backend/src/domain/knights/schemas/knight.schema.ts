import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
@Schema()
export class Knight {
   @Prop()
   name: string;

   @Prop()
   nickname: string;

   @Prop()
   attributes: string;

   @Prop()
   birthday: string;

   @Prop()
   keyAtributte: string;
}
export const KnightSchema = SchemaFactory.createForClass(Knight);