import { IAttribute } from "./attributes";
import { IWeapon } from "./weapons";

export interface IKnight {
    name:string,
    nickname:string,
    weapons: IWeapon[],
    attributes: IAttribute|any,
    birthday: string,
    equipped: any,
    experience?: number,
    attack?: number
    keyAttribute:string
}