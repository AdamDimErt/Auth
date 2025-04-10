// src/category/category.service.ts
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  // Создание новой категории
  async createCategory(data: { name: string; description?: string }) {
    // Проверяем, существует ли категория с таким именем
    const existingCategory = await this.prisma.category.findUnique({
      where: { name: data.name },
    });
    if (existingCategory) {
      throw new ConflictException('Категория с таким именем уже существует');
    }
    return this.prisma.category.create({ data });
  }

  // Получение списка категорий
  async getCategories() {
    return this.prisma.category.findMany();
  }

  // Получение категории по id
  async getCategoryById(id: string) {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category) {
      throw new NotFoundException('Категория не найдена');
    }
    return category;
  }

  // Обновление категории
  async updateCategory(id: string, data: { name?: string; description?: string }) {
    return this.prisma.category.update({
      where: { id },
      data,
    });
  }

  // Удаление категории
  async deleteCategory(id: string) {
    return this.prisma.category.delete({
      where: { id },
    });
  }
}
