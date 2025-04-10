// src/color/color.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param, ParseUUIDPipe } from '@nestjs/common';
import { ColorService } from './color.service';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';

@Controller('colors')
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  @Post()
  async create(@Body() createColorDto: CreateColorDto) {
    return this.colorService.createColor(createColorDto);
  }

  @Get()
  async findAll() {
    return this.colorService.getColors();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.colorService.getColorById(id);
  }

  @Put(':id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateColorDto: UpdateColorDto) {
    return this.colorService.updateColor(id, updateColorDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.colorService.deleteColor(id);
  }
}
