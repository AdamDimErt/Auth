// src/product/product.controller.ts
import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    ParseUUIDPipe,
    Query,
  } from '@nestjs/common';
  import { ProductService } from './product.service';
import { FilterProductDto } from './dto/filter-product.dto';
  
  @Controller('products')
  export class ProductController {
    constructor(private readonly productService: ProductService) {}
  
    // GET /products — получение списка всех продуктов
    @Get()
    async findAll() {
      return this.productService.getProducts();
    }
  
    // GET /products/:id — получение продукта по id
    @Get(':id')
    async findOne(@Param('id', ParseUUIDPipe) id: string) {
      return this.productService.getProduct(id);
    }
  
    // POST /products — создание нового продукта
    @Post()
    async create(@Body() productData: any) {
      return this.productService.createProduct(productData);
    }
  
    // PUT /products/:id — обновление продукта по id
    @Put(':id')
    async update(
      @Param('id', ParseUUIDPipe) id: string,
      @Body() productData: any,
    ) {
      return this.productService.updateProduct(id, productData);
    }
  
    // DELETE /products/:id — удаление продукта по id
    @Delete(':id')
    async remove(@Param('id', ParseUUIDPipe) id: string) {
      return this.productService.deleteProduct(id);
    }

    @Get('filter/category')
    async filterByCategory(@Query('categoryId') categoryId: string) {
      return this.productService.getProductsByCategory(categoryId);
    }
    @Get('filter/filter')
    async filterProducts(@Query() filterDto: FilterProductDto) {
      return this.productService.filterProducts(filterDto);
    }
  }
  