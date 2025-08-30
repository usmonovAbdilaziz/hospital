import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AppoinmentService } from './appoinment.service';
import { CreateAppoinmentDto } from './dto/create-appoinment.dto';
import { UpdateAppoinmentDto } from './dto/update-appoinment.dto';

@Controller('appoinment')
export class AppoinmentController {
  constructor(private readonly appoinmentService: AppoinmentService) {}

  @Post()
  create(@Body() createAppoinmentDto: CreateAppoinmentDto) {
    return this.appoinmentService.create(createAppoinmentDto);
  }

  @Get()
  findAll() {
    return this.appoinmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appoinmentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAppoinmentDto: UpdateAppoinmentDto) {
    return this.appoinmentService.update(+id, updateAppoinmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appoinmentService.remove(+id);
  }
}
