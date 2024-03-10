import { BadRequestException } from "@nestjs/common";
import { CreateUpdateKnightDto } from "./dto/create-update-knight.dto";

export class KnightsUtils {
    constructor(){
    }

    validateKnight(knight: CreateUpdateKnightDto){
        const age = this.getAge(knight.birthday);
        if(age < 7) throw new BadRequestException("Knights age start at 7");
        
      }
    
      buildStatus(knight: CreateUpdateKnightDto) {
        const age = this.getAge(knight.birthday);
        const experience = Math.floor((age - 7) * Math.pow(22, 1.45));
        const attack = 10 //attack = 10 + mod(keyAttr) + equippedWeapon.mod 
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
