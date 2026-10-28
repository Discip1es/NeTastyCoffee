import { Product } from "../data/products";
import { CartItem } from "../components/Cart";

export const mockProduct: Product = {
  id: 1,
  name: "Эфиопия Иргачеффе",
  origin: "Эфиопия",
  category: "Моносорт",
  roast: "Светлая",
  price: 24.99,
  weight: "250г",
  description: "Яркий и многогранный кофе из родины кофе.",
  notes: ["Черника", "Жасмин", "Лимонная цедра", "Мёд"],
  altitude: "1 900 – 2 200 м",
  process: "Мытая обработка",
  image: "https://example.com/coffee.jpg",
  rating: 4.9,
};

export const mockPremiumProduct: Product = {
  ...mockProduct,
  id: 2,
  name: "Кения AA Ньери",
  origin: "Кения",
  category: "Премиум",
  roast: "Средняя",
  price: 28.99,
  rating: 4.8,
};

export const makeCartItem = (
  product: Product = mockProduct,
  quantity = 1
): CartItem => ({ product, quantity });
