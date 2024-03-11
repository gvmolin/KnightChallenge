import { BadRequestException } from "@nestjs/common";

export enum attributesEnum{
    "strength",
    "dexterity",
    "constitution",
    "intelligence",
    "wisdom",
    "charisma",  
}

export interface IAttribute{
    "strength": number,
    "dexterity": number,
    "constitution": number,
    "intelligence": number,
    "wisdom": number,
    "charisma": number,
}

export const attributeSet = {
    "strength": 0,
    "dexterity": 0,
    "constitution": 0,
    "intelligence": 0,
    "wisdom": 0,
    "charisma": 0, 
}

export function parseMod(attr:number):number {
    if(attr >= 0 && attr < 8){
        return -2;
    } else if (attr >= 9 && attr <= 10){
        return -1;
    } else if (attr >= 11 && attr <= 12){
        return 0;
    } else if (attr >= 13 && attr <= 15){
        return 1;
    } else if (attr >= 16 && attr <= 18){
        return 2;
    } else if (attr >= 19 && attr <= 20){
        return 3;
    } else {
        throw new BadRequestException("Maximum attribute set is 20")
    }

}

export function getAttributesArray(): attributesEnum[]{
    const validAttr = []
    Object.keys(attributesEnum).forEach(value => {
        if(Object.values(attributesEnum).includes(value) )validAttr.push(value);
    })

    return validAttr;
}