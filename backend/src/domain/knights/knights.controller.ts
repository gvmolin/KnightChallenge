import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { KnightsService } from './knights.service';
import { CreateUpdateKnightDto } from './dto/create-update-knight.dto';
import { JoiPipe } from 'nestjs-joi';
import { UUID } from 'crypto';
import { IPaginationParams, paginationParamsDto } from 'src/core/utils/pagination.utils';


@Controller('knights')
export class KnightsController {
  constructor(private readonly knightsService: KnightsService) {}

  @Post("/create")
  create(@Body(new JoiPipe({group: "CREATE"})) createKnightDto: CreateUpdateKnightDto) {
    return this.knightsService.create(createKnightDto);
  }

  @Get("/get")
  findAll(@Query() query:IPaginationParams) {
    return this.knightsService.findAll(query);
  }

  @Get('/get/:id')
  findOne(@Param('id') id: UUID) {
    return this.knightsService.findOne(id);
  }

  @Patch('/update/:id')
  update(@Param('id') id: UUID, @Body(new JoiPipe({group: "UPDATE"})) updateKnightDto: CreateUpdateKnightDto) {
    return this.knightsService.update(id, updateKnightDto);
  }

  @Delete('/delete/:id')
  remove(@Param('id') id: UUID) {
    return this.knightsService.remove(id);
  }
}
