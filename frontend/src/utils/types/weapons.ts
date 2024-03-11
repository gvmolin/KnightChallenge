import { attributesEnum } from "./attributes";

export interface IWeapon{
    _id:string
    name: string;
    keyAttribute: attributesEnum;
    mod: number;
}
