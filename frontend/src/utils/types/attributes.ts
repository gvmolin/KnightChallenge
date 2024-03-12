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

export function getAttributesArray(): attributesEnum[] {
    const validAttr: attributesEnum[] = [];
    Object.keys(attributesEnum).forEach((value: string) => {
        const enumValue = attributesEnum[value as keyof typeof attributesEnum];
        console.log(enumValue, Number.isNaN(Number.parseInt(`${enumValue}`)), Number.parseInt(`${enumValue}`));
        

        if (enumValue !== undefined && Number.isNaN(Number.parseInt(`${enumValue}`))) {
            validAttr.push(enumValue);
        }
    });

    return validAttr;
}
