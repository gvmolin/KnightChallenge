import { BadRequestException } from "@nestjs/common";
import { CreateUpdateKnightDto } from "./dto/create-update-knight.dto";
import { parseMod } from "src/core/utils/attributes.utils";
import { Weapon } from "../weapons/schemas/weapons.schema";

export class KnightsUtils {
    constructor(){
    }

    validateKnight(knight: CreateUpdateKnightDto){
        const age = this.getAge(knight.birthday);
        if(age < 7) throw new BadRequestException("Knights age start at 7");
        
      }
    
      buildStatus(knight: CreateUpdateKnightDto, equipped:Weapon) {
        const age = this.getAge(knight.birthday);
        const experience = Math.floor((age - 7) * Math.pow(22, 1.45));
        const attack = 10 + (parseMod(knight.attributes[knight.keyAttribute])) + equipped.mod;
        
        return {
            ...knight,
            experience,
            attack
        }

      }
    
      getAge(birthday:string|Date):number{
        const birthDate = new Date(birthday);
        const date = new Date();
        return date.getFullYear() - birthDate.getFullYear();
      }

}
