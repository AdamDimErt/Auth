// src/product/dto/filter-product.dto.ts
import { IsOptional, IsString, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class FilterProductDto {
  @IsOptional()
  @IsString()
  brandId?: string; // уникальный id бренда

  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  minPrice?: number; // минимальная цена (например, priceTenge)

  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  maxPrice?: number; // максимальная цена

  /**
   * Массив идентификаторов цветов.
   * Можно передавать как comma-separated строку, которую затем преобразуем в массив.
   */
  @IsOptional()
  @IsString()
  colorIds?: string; // например, "uuid1,uuid2,uuid3"
}
