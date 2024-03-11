export class CreateKnightDto {}
import * as Joi from "joi";
import { JoiSchema, JoiSchemaOptions } from "nestjs-joi";
import { IAttribute, attributesEnum, getAttributesArray } from "src/core/utils/attributes.utils";
import { Weapon } from "src/domain/weapons/schemas/weapons.schema";
const validAttr = getAttributesArray();


@JoiSchemaOptions({ allowUnknown: false })

export class CreateUpdateKnightDto{
    @JoiSchema(['CREATE'], Joi.string().required())
    @JoiSchema(['UPDATE'], Joi.string().optional())
    name: string;

    @JoiSchema(['CREATE'], Joi.string().required())
    @JoiSchema(['UPDATE'], Joi.string().optional())
    nickname: string;

    @JoiSchema(['CREATE'], Joi.object({
        strength: Joi.number().required(),
        dexterity: Joi.number().required(),
        constitution: Joi.number().required(),
        intelligence: Joi.number().required(),
        wisdom: Joi.number().required(),
        charisma: Joi.number().required(), 
    }).required())
    @JoiSchema(['UPDATE'], Joi.object({
        strength: Joi.number().optional(),
        dexterity: Joi.number().optional(),
        constitution: Joi.number().optional(),
        intelligence: Joi.number().optional(),
        wisdom: Joi.number().optional(),
        charisma: Joi.number().optional(), 
    }).optional())
    attributes: IAttribute;

    @JoiSchema(['CREATE'], Joi.date().required())
    @JoiSchema(['UPDATE'], Joi.date().optional())
    birthday: Date;


    @JoiSchema(['CREATE'], Joi.string().valid(...validAttr).required())
    @JoiSchema(['UPDATE'], Joi.string().valid(...validAttr).optional())
    keyAttribute: attributesEnum;
    
    @JoiSchema(['CREATE'], Joi.array().required())
    @JoiSchema(['UPDATE'], Joi.array().optional())
    weapons: Weapon[];

    @JoiSchema(['CREATE'], Joi.object().optional())
    @JoiSchema(['UPDATE'], Joi.object().optional())
    equipped: Weapon;
}
