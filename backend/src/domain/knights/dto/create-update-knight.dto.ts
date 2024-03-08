export class CreateKnightDto {}
import * as Joi from "joi";
import { JoiSchema, JoiSchemaOptions } from "nestjs-joi";
import { IAttribute } from "src/core/utils/attributes.utils";
import { Weapon } from "src/domain/weapons/schemas/weapons.schema";


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

    @JoiSchema(['CREATE'], Joi.string().required())
    @JoiSchema(['UPDATE'], Joi.string().optional())
    birthday: string;

    @JoiSchema(['CREATE'], Joi.string().required())
    @JoiSchema(['UPDATE'], Joi.string().optional())
    keyAttribute: string;
    
    @JoiSchema(['CREATE'], Joi.array().required())
    @JoiSchema(['UPDATE'], Joi.array().optional())
    weapons: Weapon[];
}
