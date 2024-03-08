export class CreateKnightDto {}
import * as Joi from "joi";
import { JoiSchema, JoiSchemaOptions } from "nestjs-joi";


@JoiSchemaOptions({ allowUnknown: false })

export class CreateUpdateKnightDto{
    @JoiSchema(['CREATE'], Joi.string().required())
    @JoiSchema(['UPDATE'], Joi.string().optional())
    name: string;

    @JoiSchema(['CREATE'], Joi.string().required())
    @JoiSchema(['UPDATE'], Joi.string().optional())
    nickname: string;

    @JoiSchema(['CREATE'], Joi.string().required())
    @JoiSchema(['UPDATE'], Joi.string().optional())
    attributes: string;

    @JoiSchema(['CREATE'], Joi.string().required())
    @JoiSchema(['UPDATE'], Joi.string().optional())
    birthday: string;

    @JoiSchema(['CREATE'], Joi.string().required())
    @JoiSchema(['UPDATE'], Joi.string().optional())
    keyAttribute: string;
}
