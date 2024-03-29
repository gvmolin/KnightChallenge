import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUpdateKnightDto } from './dto/create-update-knight.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateWriteOpResult } from 'mongoose';
import { Knight } from './schemas/knight.schema';
import { UUID } from 'crypto';
import { DefaultResponse } from 'src/core/utils/default-response.utils';
import { IPaginationParams, PaginationUtils, paginationParamsDto } from 'src/core/utils/pagination.utils';
import { WeaponsInterface } from '../weapons/weapons.interface';
import { KnightsUtils } from './knights.utils';

@Injectable()
export class KnightsService {

  constructor(
    @InjectModel('Knight') 
    private model:Model<Knight>,
    private weaponsInterface: WeaponsInterface,
    private utils: KnightsUtils
    
  ) { }
  async create(createKnightDto: CreateUpdateKnightDto): Promise<DefaultResponse<Knight>> {
    const response = new DefaultResponse<Knight>();

    try {
      //validation
      this.utils.validateKnight(createKnightDto);
      await this.weaponsInterface.validateWeapons(createKnightDto.weapons);
      const equipped = await this.weaponsInterface.validateEquipped(createKnightDto);
      
      //rules
      const build = this.utils.buildStatus(createKnightDto, equipped);

      
      const created = await this.model.create(build);
      response.setData(created);
      response.addMessage("Knight created successfully", true);
    } catch (error) {
      response.setData(error);
      response.addMessage("Failure creating knight", false);
      console.error(error);
    }
    
    return response;
  }

  async findAll(query: IPaginationParams = {limit:10, page:1}) {
    const response = new DefaultResponse<{pagination: IPaginationParams, result:Knight[]}>();

    try {
      const paginator = new PaginationUtils(this.model);

      query.populate = ["weapons", "equipped"];

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
    const response = new DefaultResponse<Knight>();

    try {
      const found = await this.model.findById(id);
      if(!found) throw new BadRequestException("Invalid knight id");   
      response.setData(found);
      response.addMessage("Knight found", true);
    } catch (error) {
      response.setData(error);
      response.addMessage("Invalid knight", false);
      console.error(error);
    }
    
    return this.model.findById(id)
  }

  async update(id: UUID, updateKnightDto: CreateUpdateKnightDto) {
    const response = new DefaultResponse<UpdateWriteOpResult>();
    try {
      const found = await this.model.findById(id);
      if(!found) throw new BadRequestException("Invalid knight id");   
      //validation
      this.utils.validateKnight(updateKnightDto);
      await this.weaponsInterface.validateWeapons(updateKnightDto.weapons);
      const equipped = await this.weaponsInterface.validateEquipped(updateKnightDto);
      
      //rules
      const build = this.utils.buildStatus(updateKnightDto, equipped);

      const updated = await this.model.updateOne(
        {_id: id}, 
        {$set: {...build}}, 
        {runValidators: true}
      );      

      response.setData(updated);
      response.addMessage("Knight updated successfully", true);
    } catch (error) {
      response.setData(error);
      response.addMessage("Failure updating knight", false);
      console.error(error);
    }
    
    return response;

  }

  async remove(id: UUID) {
    const response =  new DefaultResponse();

    try {
      const found = await this.model.findById(id);
      if(!found) throw new BadRequestException("Invalid knight id");

      const removed = await this.model.updateOne({_id :id}, {deleted:true});
      response.setData(removed);
      response.addMessage("Knight removed, transformed into a hero successfully", true);
      
    } catch (error) {
      response.setData(error);
      response.addMessage("Failure removing knight", false);
      console.error(error);
    }
    return response;
  }

}
