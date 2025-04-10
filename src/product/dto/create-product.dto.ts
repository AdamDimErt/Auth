export class CreateProductDto {
    readonly title: string;
    readonly description?: string;
    readonly images?: string[];
    readonly priceTenge: number;
    readonly priceTon: number;
  
    // Привязка цвета
    readonly colors?: {
      create?: { name: string; hex?: string }[];
      connect?: { id: string }[];
    };
  
    // Создание спецификаций
    readonly specifications?: {
      create: { name: string; value: string }[];
    };
  
    // Привязка бренда, как уже настроено
    readonly brand?: {
      connect?: { id: string } | { name: string };
      create?: { name: string; description?: string };
    };
  
    // Привязка категории
    readonly category?: {
      connect?: { id: string } | { name: string };
      create?: { name: string; description?: string };
    };
  }
  