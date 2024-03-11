import { ObjectId } from "mongoose";
import { Prop, Schema } from "@nestjs/mongoose"

@Schema()
export class BaseSchema {
    _id: ObjectId

    @Prop({ default: null })
    deleted: boolean;
}