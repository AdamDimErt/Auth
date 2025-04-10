// src/product/product.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { FilterProductDto } from './dto/filter-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  // Получаем все продукты с подгрузкой связанных данных
  async getProducts() {
    return this.prisma.product.findMany({
      include: {
        category: true,
        brand: true,
        colors: true,
        specifications: true,
      },
    });
  }

  // Получить один продукт по id
  async getProduct(id: string) {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  // Создание нового продукта. Для более строгой типизации можно создать DTO.
  async createProduct(createProductDto: CreateProductDto) {
    return this.prisma.product.create({
      data: {
        title: createProductDto.title,
        description: createProductDto.description,
        images: createProductDto.images,
        priceTenge: createProductDto.priceTenge,
        priceTon: createProductDto.priceTon,
        colors: createProductDto.colors,           // для связи с Color
        specifications: createProductDto.specifications, // для создания спецификаций
        brand: createProductDto.brand,             // для связи с Brand
        category: createProductDto.category,       // для связи с Category
      },
    });
  }
  

  // Обновление продукта по id
  async updateProduct(id: string, data: any) {
    return this.prisma.product.update({
      where: { id },
      data,
    });
  }

  // Удаление продукта по id
  async deleteProduct(id: string) {
    return await this.prisma.$transaction(async (prisma) => {
      // Удаляем все спецификации, связанные с продуктом:
      await prisma.productSpecification.deleteMany({
        where: { productId: id },
      });
      
      // Если у вас есть другие зависимости (например, favorites, cartItems) – обработайте их аналогично.
      
      // Теперь удаляем сам продукт:
      return await prisma.product.delete({
        where: { id },
      });
    });
  }


  async getProductsByCategory(categoryId: string) {
    return this.prisma.product.findMany({
      where: {
        categoryId: categoryId,
      },
      include: {
        category: true,
        brand: true,
        colors: true,
        specifications: true,
      },
    });
  }


  async filterProducts(filterDto: FilterProductDto) {
    const { brandId, minPrice, maxPrice, colorIds } = filterDto;

    // Если colorIds передаются как строка (comma-separated), преобразуем её в массив
    const colorsArray = colorIds 
      ? colorIds.split(',').map(id => id.trim()).filter(id => id.length > 0) 
      : undefined;

    // Строим объект фильтрации
    const whereCondition: any = {
      // Фильтрация по бренду: проверяем, что у продукта задан нужный brandId
      ...(brandId && { brandId }),
      
      // Фильтрация по диапазону цены
      ...(minPrice || maxPrice
        ? { priceTenge: { ...(minPrice ? { gte: minPrice } : {}), ...(maxPrice ? { lte: maxPrice } : {}) } }
        : {}),
    };

    // Если массив цветов существует и не пуст, добавляем условие, что продукт должен содержать каждый из выбранных цветов
    if (colorsArray && colorsArray.length > 0) {
      // Используем оператор AND для каждого цвета из массива:
      whereCondition.AND = colorsArray.map((colorId) => ({
        colors: {
          some: { id: colorId }
        }
      }));
    }

    return this.prisma.product.findMany({
      where: whereCondition,
      include: {
        category: true,
        brand: true,
        colors: true,
        specifications: true,
      },
    });
  }


}
