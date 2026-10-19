export interface Product {
  id: number;
  name: string;
  origin: string;
  category: string;
  roast: string;
  price: number;
  weight: string;
  description: string;
  notes: string[];
  altitude: string;
  process: string;
  image: string;
  rating: number;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Ethiopian Yirgacheffe",
    origin: "Ethiopia",
    category: "Single Origin",
    roast: "Light",
    price: 24.99,
    weight: "250g",
    description: "A vibrant and complex coffee from the birthplace of coffee. Grown at high altitudes in the Yirgacheffe region, this coffee offers an extraordinary cup with floral aromatics and bright citrus notes.",
    notes: ["Blueberry", "Jasmine", "Lemon Zest", "Honey"],
    altitude: "1,900 - 2,200m",
    process: "Washed",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop",
    rating: 4.9
  },
  {
    id: 2,
    name: "Colombian Supremo",
    origin: "Colombia",
    category: "Single Origin",
    roast: "Medium",
    price: 21.99,
    weight: "250g",
    description: "From the lush mountains of Huila, Colombia, this Supremo grade coffee delivers a perfectly balanced cup with rich caramel sweetness and a smooth, velvety body.",
    notes: ["Caramel", "Red Apple", "Chocolate", "Walnut"],
    altitude: "1,500 - 1,800m",
    process: "Washed",
    image: "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?w=400&h=400&fit=crop",
    rating: 4.7
  },
  {
    id: 3,
    name: "Kenya AA Nyeri",
    origin: "Kenya",
    category: "Single Origin",
    roast: "Medium-Light",
    price: 28.99,
    weight: "250g",
    description: "A prestigious AA grade from the Nyeri region of Kenya. Known for its intense brightness and wine-like qualities, this coffee is a favorite among specialty coffee enthusiasts.",
    notes: ["Blackcurrant", "Grapefruit", "Tomato", "Brown Sugar"],
    altitude: "1,700 - 2,000m",
    process: "Washed",
    image: "https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=400&h=400&fit=crop",
    rating: 4.8
  },
  {
    id: 4,
    name: "Espresso Blend — Velvet",
    origin: "Brazil & Guatemala",
    category: "Blend",
    roast: "Medium-Dark",
    price: 19.99,
    weight: "250g",
    description: "Our signature espresso blend crafted for a rich, full-bodied shot with a beautiful crema. Combines Brazilian sweetness with Guatemalan complexity for the perfect espresso experience.",
    notes: ["Dark Chocolate", "Hazelnut", "Toffee", "Spice"],
    altitude: "1,200 - 1,600m",
    process: "Natural / Washed",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefda?w=400&h=400&fit=crop",
    rating: 4.6
  },
  {
    id: 5,
    name: "Panama Geisha",
    origin: "Panama",
    category: "Premium",
    roast: "Light",
    price: 54.99,
    weight: "200g",
    description: "The crown jewel of specialty coffee. Panama Geisha is legendary for its extraordinary floral complexity and tea-like elegance. Each sip reveals new layers of flavor in this rare and exquisite coffee.",
    notes: ["Bergamot", "Peach", "Rose", "Mango"],
    altitude: "1,600 - 1,800m",
    process: "Natural",
    image: "https://images.unsplash.com/photo-1498804103079-a6351b050096?w=400&h=400&fit=crop",
    rating: 5.0
  },
  {
    id: 6,
    name: "Sumatra Mandheling",
    origin: "Indonesia",
    category: "Single Origin",
    roast: "Dark",
    price: 22.99,
    weight: "250g",
    description: "A bold and earthy coffee from the volcanic soils of Sumatra. The traditional wet-hulling process gives this coffee its distinctive full body and complex, syrupy character.",
    notes: ["Cedar", "Dark Cocoa", "Earth", "Tobacco"],
    altitude: "1,100 - 1,600m",
    process: "Wet-Hulled (Giling Basah)",
    image: "https://images.unsplash.com/photo-1504630083234-14187a9df0f5?w=400&h=400&fit=crop",
    rating: 4.5
  }
];

export const categories = ["All", "Single Origin", "Blend", "Premium"];
export const roastLevels = ["All", "Light", "Medium-Light", "Medium", "Medium-Dark", "Dark"];
