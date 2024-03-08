import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Weapon } from './schemas/weapons.schema';

@Injectable()
export class WeaponsInterface {

    constructor(
        @InjectModel('Weapon')
        private model: Model<Weapon>,

    ) { }

    async validateWeapons(weapons: Weapon[]) {

        try {
            const promises = [];
            weapons.forEach(item => {
                const promise = this.model.find({name: item.name, mod:item.mod})
                promises.push(promise);
            })

            const result = await Promise.all(promises);

            result.forEach(context => {
                if(!context.length) throw new BadRequestException("Invalid weapon list!")
            })
        
            return [true, result]
            
        } catch (error) {
            console.error(error);
            return [false, error];
        }

    }
}