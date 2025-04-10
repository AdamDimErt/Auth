// src/color/color.service.ts
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';

@Injectable()
export class ColorService {
  constructor(private readonly prisma: PrismaService) {}

  async createColor(createColorDto: CreateColorDto) {
    const existing = await this.prisma.color.findUnique({
      where: { name: createColorDto.name },
    });
    if (existing) {
      throw new ConflictException('Цвет с таким именем уже существует');
    }

    return this.prisma.color.create({
      data: {
        ...createColorDto,
      },
    });
  }

  async getColors() {
    return this.prisma.color.findMany();
  }

  async getColorById(id: string) {
    const color = await this.prisma.color.findUnique({ where: { id } });
    if (!color) {
      throw new NotFoundException('Цвет не найден');
    }
    return color;
  }

  async updateColor(id: string, updateColorDto: UpdateColorDto) {
    return this.prisma.color.update({
      where: { id },
      data: { ...updateColorDto },
    });
  }

  async deleteColor(id: string) {
    return this.prisma.color.delete({
      where: { id },
    });
  }
}
