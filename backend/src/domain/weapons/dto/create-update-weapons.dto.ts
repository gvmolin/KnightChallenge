import * as Joi from "joi";
import { JoiSchema, JoiSchemaOptions } from "nestjs-joi";
import { attributesEnum, getAttributesArray } from "src/core/utils/attributes.utils";
const validAttr = getAttributesArray();

@JoiSchemaOptions({ allowUnknown: false })
export class CreateUpdateWeaponDto{
    @JoiSchema(['CREATE'], Joi.string().required())
    @JoiSchema(['UPDATE'], Joi.string().optional())
    name: string;

    @JoiSchema(['CREATE'], Joi.string().valid(...validAttr).required())
    @JoiSchema(['UPDATE'], Joi.string().valid(...validAttr).optional())
    keyAttribute: attributesEnum;

    @JoiSchema(['CREATE'], Joi.number().required())
    @JoiSchema(['UPDATE'], Joi.number().optional())
    mod: number;
}
