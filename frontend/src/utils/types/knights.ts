import { IAttribute } from "./attributes";
import { IWeapon } from "./weapons";

export interface IKnight {
    _id?:string,
    name:string,
    nickname:string,
    weapons: IWeapon[],
    attributes: IAttribute|any,
    birthday: string|Date,
    equipped: any,
    experience?: number,
    attack?: number
    keyAttribute:string
}