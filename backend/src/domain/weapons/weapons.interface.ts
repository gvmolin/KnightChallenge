import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Weapon } from './schemas/weapons.schema';
import { UUID } from 'crypto';
import { log } from 'util';
import { attributesEnum } from 'src/core/utils/attributes.utils';
import { CreateUpdateKnightDto } from '../knights/dto/create-update-knight.dto';

@Injectable()
export class WeaponsInterface {

    constructor(
        @InjectModel('Weapon')
        private model: Model<Weapon>,

    ) { }

    async validateWeapons(weapons: Weapon[]):Promise<Weapon[]> {

        try {            
            const promises = [];
            weapons.forEach(item => {
                const id = item._id.toString()
                const promise = this.model.findById(id);
                promises.push(promise);
            })
            
            const result = await Promise.all(promises);
            
            result.forEach(obj => {
                if (!obj) throw new NotFoundException("Invalid weapon list!");
            })

            return result as Weapon[];
            
        } catch (error) {
            console.error(error);
        }

    }

    async validateEquipped(knight: CreateUpdateKnightDto): Promise<Weapon>{   
        const id = knight.equipped._id;    
        const result = await this.model.findById(id.toString());
        console.log(result);
        
        if(!result) throw new NotFoundException("Invalid equipped item!");

        const found = knight.weapons.find(el => el._id.toString() === id.toString());
        if(!found) throw new BadRequestException("Equipped isnt on knight's inventory!");
        
        
        // if(result.keyAttribute !== knight.keyAttribute.toString()) throw new BadRequestException("Invalid weapon for this knight!");
        
        return found;
        
    }

    // async getAllIdsRecursive(arr:UUID[], target:any[], messages: any[]){
    //     try {
    //         target.forEach(el => {
    //             if(el._id) arr.push(el._id as UUID);
    //             if(typeof el === "object") this.getAllIdsRecursive(arr, el, messages);
    //         })
    //     } catch (error) {
    //         messages.push(error)
    //     }


    // }
}