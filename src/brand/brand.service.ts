// src/brand/brand.service.ts
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBrandDto } from './dto/create-brand.dto';


@Injectable()
export class BrandService {
  constructor(private readonly prisma: PrismaService) {}

  async createBrand(createBrandDto: CreateBrandDto) {
    // Проверяем, существует ли бренд с таким именем
    const existing = await this.prisma.brand.findUnique({
      where: { name: createBrandDto.name },
    });
    if (existing) {
      throw new ConflictException('Бренд с таким именем уже существует');
    }

    return this.prisma.brand.create({
      data: {
        ...createBrandDto,
      },
    });
  }

  async getBrands() {
    return this.prisma.brand.findMany();
  }

  async getBrandById(id: string) {
    const brand = await this.prisma.brand.findUnique({ where: { id } });
    if (!brand) {
      throw new NotFoundException('Бренд не найден');
    }
    return brand;
  }

  async updateBrand(id: string, updateBrandDto: any) {
    return this.prisma.brand.update({
      where: { id },
      data: { ...updateBrandDto },
    });
  }

  async deleteBrand(id: string) {
    return this.prisma.brand.delete({
      where: { id },
    });
  }
}
