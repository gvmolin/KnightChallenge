import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { WeaponsService } from './weapons.service';
import { CreateUpdateWeaponDto } from './dto/create-update-weapons.dto';
import { JoiPipe } from 'nestjs-joi';
import { UUID } from 'crypto';
import { IPaginationParams, paginationParamsDto } from 'src/core/utils/pagination.utils';


@Controller('weapons')
export class WeaponsController {
  constructor(private readonly weaponsService: WeaponsService) {}

  @Post("/create")
  create(@Body(new JoiPipe({group: "CREATE"})) createWeaponDto: CreateUpdateWeaponDto) {
    return this.weaponsService.create(createWeaponDto);
  }

  @Get("/get")
  findAll(@Query() query:IPaginationParams) {
    return this.weaponsService.findAll(query);
  }

  @Get('/get/:id')
  findOne(@Param('id') id: UUID) {
    return this.weaponsService.findOne(id);
  }

  @Patch('/update/:id')
  update(@Param('id') id: UUID, @Body(new JoiPipe({group: "UPDATE"})) updateWeaponDto: CreateUpdateWeaponDto) {
    return this.weaponsService.update(id, updateWeaponDto);
  }

  @Delete('/delete/:id')
  remove(@Param('id') id: UUID) {
    return this.weaponsService.remove(id);
  }
}
