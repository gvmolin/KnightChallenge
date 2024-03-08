import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUpdateWeaponDto } from './dto/create-update-weapons.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateWriteOpResult } from 'mongoose';
import { Weapon } from './schemas/weapons.schema';
import { UUID } from 'crypto';
import { DefaultResponseDto } from 'src/core/utils/default-response.dto';
import { IPaginationParams, PaginationUtils, paginationParamsDto } from 'src/core/utils/pagination.utils';
import { WeaponsInterface } from './weapons.interface';

@Injectable()
export class WeaponsService {

  constructor(
    @InjectModel('Weapon') 
    private model:Model<Weapon>,
    // private weaponsModel: WeaponsModel
    
  ) { }
  async create(createWeaponDto: CreateUpdateWeaponDto): Promise<DefaultResponseDto<Weapon>> {
    const response = new DefaultResponseDto<Weapon>();

    try {
      const created = await this.model.create(createWeaponDto);
      response.setData(created);
      response.addMessage("Weapon created successfully", true);
    } catch (error) {
      response.setData(error);
      response.addMessage("Failure creating knight", false);
      console.error(error);
    }
    
    return response;
  }

  async findAll(query: IPaginationParams = {limit:10, page:1}) {
    const response = new DefaultResponseDto<{pagination: IPaginationParams, result:Weapon[]}>();

    try {
      const paginator = new PaginationUtils(this.model);
      const result = await paginator.paginate(paginationParamsDto(query));
      
      response.addMessage(!!result.result.length ? "Found some knights" : "Didnt found any knight", true);
      response.setData(result);
      
    } catch (error) {
      response.setData(error);
      response.addMessage("Failed getting all knights", false);
      console.error(error);
    }
    
    return response;
  }

  async findOne(id: UUID) {
    const response = new DefaultResponseDto<Weapon>();

    try {
      const found = await this.model.findById(id);
      if(!found) throw new BadRequestException("Invalid knight id");   
      response.setData(found);
      response.addMessage("Weapon found", true);
    } catch (error) {
      response.setData(error);
      response.addMessage("Invalid knight", false);
      console.error(error);
    }
    
    return this.model.findById(id)
  }

  async update(id: UUID, updateWeaponDto: CreateUpdateWeaponDto) {
    const response = new DefaultResponseDto<UpdateWriteOpResult>();
    try {
      const found = await this.model.findById(id);
      if(!found) throw new BadRequestException("Invalid knight id");   
      const updated = await this.model.updateOne(
        {_id: id}, 
        {$set: {...updateWeaponDto}}, 
        {runValidators: true}
      );      

      response.setData(updated);
      response.addMessage("Weapon updated successfully", true);
    } catch (error) {
      response.setData(error);
      response.addMessage("Failure updating knight", false);
      console.error(error);
    }
    
    return response;

  }

  async remove(id: UUID) {
    const response =  new DefaultResponseDto();

    try {
      const found = await this.model.findById(id);
      if(!found) throw new BadRequestException("Invalid knight id");

      const removed = await this.model.deleteOne({_id :id});
      response.setData(removed);
      response.addMessage("Weapon removed successfully", true);
      
    } catch (error) {
      response.setData(error);
      response.addMessage("Failure removing knight", false);
      console.error(error);
    }
    return response;
  }
}
