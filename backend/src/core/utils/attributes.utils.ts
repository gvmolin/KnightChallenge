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

export function getAttributesArray(): attributesEnum[]{
    const validAttr = []
    Object.keys(attributesEnum).forEach(value => {
        if(Object.values(attributesEnum).includes(value) )validAttr.push(value);
    })

    return validAttr;
}