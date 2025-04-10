import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  async addProductToCart(userId: string, productId: string, quantity = 1) {
    // Ищем корзину пользователя, включаем связанные товары (items)
    let cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: { items: true },
    });

    // Если корзины не существует, создаем новую с include, чтобы вернуть пустой массив items
    if (!cart) {
      cart = await this.prisma.cart.create({
        data: { userId },
        include: { items: true },
      });
    }

    // Ищем, существует ли уже запись для данного товара в корзине
    const existingItem = cart.items.find((item) => item.productId === productId);

    if (existingItem) {
      // Если товар уже в корзине, увеличиваем количество
      return this.prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      });
    } else {
      // Если товара нет, создаем новую запись в корзине
      return this.prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
        },
      });
    }
  }


  async getCartByUser(userId: string) {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: true, // загружаем данные о товаре
          },
        },
      },
    });
    if (!cart) {
      throw new NotFoundException('Корзина не найдена');
    }
    return cart;
  }

  /**
   * Удаление товара из корзины по id записи корзины (cartItem)
   * @param cartItemId - id записи CartItem
   */
  async removeProductFromCart(cartItemId: string) {
    return this.prisma.cartItem.delete({
      where: { id: cartItemId },
    });
  }
}
