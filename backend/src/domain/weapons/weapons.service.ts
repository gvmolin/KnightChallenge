import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUpdateWeaponDto } from './dto/create-update-weapons.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateWriteOpResult } from 'mongoose';
import { Weapon } from './schemas/weapons.schema';
import { UUID } from 'crypto';
import { DefaultResponse } from 'src/core/utils/default-response.utils';
import { IPaginationParams, PaginationUtils, paginationParamsDto } from 'src/core/utils/pagination.utils';
import { WeaponsInterface } from './weapons.interface';

@Injectable()
export class WeaponsService {

  constructor(
    @InjectModel('Weapon') 
    private model:Model<Weapon>,
    // private weaponsModel: WeaponsModel
    
  ) { }
  async create(createWeaponDto: CreateUpdateWeaponDto): Promise<DefaultResponse<Weapon>> {
    const response = new DefaultResponse<Weapon>();

    try {
      const created = await this.model.create(createWeaponDto);
      response.setData(created);
      response.addMessage("Weapon created successfully", true);
    } catch (error) {
      response.setData(error);
      response.addMessage("Failure creating weapon", false);
      console.error(error);
    }
    
    return response;
  }

  async findAll(query: IPaginationParams = {limit:10, page:1}) {
    const response = new DefaultResponse<{pagination: IPaginationParams, result:Weapon[]}>();
    
    try {
      const paginator = new PaginationUtils(this.model);
      const result = await paginator.paginate(paginationParamsDto(query));
      
      response.addMessage(!!result.result.length ? "Found some weapons" : "Didnt found any weapon", true);
      response.setData(result);
      
    } catch (error) {
      response.setData(error);
      response.addMessage("Failed getting all weapons", false);
      console.error(error);
    }
    
    return response;
  }

  async findOne(id: UUID) {
    const response = new DefaultResponse<Weapon>();

    try {
      const found = await this.model.findById(id);
      if(!found) throw new BadRequestException("Invalid weapon id");   
      response.setData(found);
      response.addMessage("Weapon found", true);
    } catch (error) {
      response.setData(error);
      response.addMessage("Invalid weapon", false);
      console.error(error);
    }
    
    return this.model.findById(id)
  }

  async update(id: UUID, updateWeaponDto: CreateUpdateWeaponDto) {
    const response = new DefaultResponse<UpdateWriteOpResult>();
    try {
      const found = await this.model.findById(id);
      if(!found) throw new BadRequestException("Invalid weapon id");   
      const updated = await this.model.updateOne(
        {_id: id}, 
        {$set: {...updateWeaponDto}}, 
        {runValidators: true}
      );      

      response.setData(updated);
      response.addMessage("Weapon updated successfully", true);
    } catch (error) {
      response.setData(error);
      response.addMessage("Failure updating weapon", false);
      console.error(error);
    }
    
    return response;

  }

  async remove(id: UUID) {
    const response =  new DefaultResponse();

    try {
      const found = await this.model.findById(id);
      if(!found) throw new BadRequestException("Invalid weapon id");

      const removed = await this.model.deleteOne({_id :id});
      response.setData(removed);
      response.addMessage("Weapon removed successfully", true);
      
    } catch (error) {
      response.setData(error);
      response.addMessage("Failure removing weapon", false);
      console.error(error);
    }
    return response;
  }
}
