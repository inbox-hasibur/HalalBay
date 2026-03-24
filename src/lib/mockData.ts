export type Grade = {
  label: string; // "A", "B", "C"
  name: string;  // "Authentic Original", "Master Copy", etc.
  price: number;
  originalPrice?: number;
  description: string;
  details: string[];
  inStock: boolean;
  tag?: string; // "Best Value", "Most Popular", etc.
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  shortDescription: string;
  description: string;
  grades: Grade[];
  images: string[];
  tags: string[];
  reviewCount: number;
  rating: number;
  verifiedAt: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  icon: string;
  productCount: number;
  description: string;
};

export const categories: Category[] = [
  { id: "1", name: "Smartphones", slug: "smartphones", icon: "📱", productCount: 24, description: "Verified phones, multiple grades" },
  { id: "2", name: "Smartwatches", slug: "smartwatches", icon: "⌚", productCount: 18, description: "Original & replica watches" },
  { id: "3", name: "Footwear", slug: "footwear", icon: "👟", productCount: 42, description: "Authentic & master copy shoes" },
  { id: "4", name: "Fragrances", slug: "fragrances", icon: "🧴", productCount: 31, description: "Original & inspired perfumes" },
  { id: "5", name: "Sunglasses", slug: "sunglasses", icon: "🕶️", productCount: 15, description: "Designer & replica eyewear" },
  { id: "6", name: "Bags", slug: "bags", icon: "👜", productCount: 28, description: "Authentic & master copy bags" },
];

export const products: Product[] = [
  {
    id: "1",
    slug: "apple-watch-series-9",
    name: "Apple Watch Series 9",
    brand: "Apple",
    category: "Smartwatches",
    shortDescription: "The most capable Apple Watch yet. Health sensors, always-on display, and S9 chip.",
    description:
      "The Apple Watch Series 9 brings a new level of intelligence to the wrist. With the S9 chip, it's faster than ever and introduces the magical double tap gesture. Grade A units are 100% authentic, imported from official Apple channels. Grade B units are high-quality replicas with matching aesthetics and basic smartwatch functions. Grade C units are budget alternatives with basic health monitoring.",
    grades: [
      {
        label: "A",
        name: "Authentic Original",
        price: 42000,
        description: "100% genuine Apple Watch Series 9. Imported directly from Apple-authorized distributors. Full Apple warranty applies.",
        details: ["Official Apple product", "Full iOS ecosystem integration", "Siri, ECG, Blood Oxygen sensor", "1-year Apple warranty", "Original packaging & accessories"],
        inStock: true,
        tag: "100% Authentic",
      },
      {
        label: "B",
        name: "Master Copy",
        price: 3500,
        originalPrice: 5000,
        description: "High-quality replica with near-identical aesthetics. Works as a standalone smartwatch with health tracking basics.",
        details: ["1:1 replica design", "Step counter, heart rate", "Compatible with Android & iOS", "30-day HalalBay warranty"],
        inStock: true,
        tag: "Best Value",
      },
      {
        label: "C",
        name: "Standard Quality",
        price: 1200,
        description: "Budget-friendly smartwatch with Apple Watch styling. Basic fitness tracking, notifications.",
        details: ["Similar design language", "Step & sleep tracking", "7-day battery life", "14-day HalalBay warranty"],
        inStock: true,
      },
    ],
    images: ["/products/apple-watch.jpg"],
    tags: ["smartwatch", "apple", "wearable"],
    reviewCount: 128,
    rating: 4.8,
    verifiedAt: "2025-12-01",
  },
  {
    id: "2",
    slug: "nike-air-jordan-1",
    name: "Nike Air Jordan 1 Retro High OG",
    brand: "Nike",
    category: "Footwear",
    shortDescription: "The iconic sneaker that started it all. Chicago colorway, premium leather.",
    description:
      "The Nike Air Jordan 1 Retro High OG in the legendary Chicago colorway. Grade A sneakers are sourced from official Nike retailers and verified authentic. Grade B are premium replicas using identical materials and production methods. Grade C are standard budget alternatives.",
    grades: [
      {
        label: "A",
        name: "Authentic Original",
        price: 18000,
        description: "100% authentic Nike Air Jordan 1, verified through Nike's official authentication process. Comes with original Nike box.",
        details: ["Nike SNKRS verified", "Premium full-grain leather", "Air-sole cushioning", "Original Nike box & receipt", "Anti-counterfeit tag"],
        inStock: false,
        tag: "Original",
      },
      {
        label: "B",
        name: "Master Copy",
        price: 2800,
        originalPrice: 3500,
        description: "Premium 1:1 replica using identical sole technology and leather quality. Virtually indistinguishable from the original.",
        details: ["Identical leather quality", "Perfect stitch pattern", "Correct sole weight & feel", "All colorway details correct", "30-day warranty"],
        inStock: true,
        tag: "Most Popular",
      },
      {
        label: "C",
        name: "Standard Quality",
        price: 950,
        description: "Standard quality sneaker with Jordan 1 design. Made for everyday wear at an accessible price.",
        details: ["Similar colorway", "Durable synthetic leather", "Comfortable EVA sole", "Sizes 39-45 available"],
        inStock: true,
      },
    ],
    images: ["/products/jordan.jpg"],
    tags: ["sneakers", "nike", "jordan", "shoes"],
    reviewCount: 246,
    rating: 4.7,
    verifiedAt: "2025-11-15",
  },
  {
    id: "3",
    slug: "creed-aventus",
    name: "Creed Aventus EDP",
    brand: "Creed",
    category: "Fragrances",
    shortDescription: "The legendary fragrance for success. Smoky pineapple top notes with a warm woody base.",
    description:
      "Creed Aventus is one of the most celebrated fragrances in the world. Our Grade A units are 100% authentic Creed Aventus EDP from certified distributors. Grade B are master copy inspired fragrances with 80–90% scent accuracy. Grade C are inspired dupe perfumes with budget-friendly pricing.",
    grades: [
      {
        label: "A",
        name: "Authentic Original",
        price: 28000,
        description: "100% authentic Creed Aventus EDP, 100ml. Verified batch codes and hologram authenticity seals.",
        details: ["Authentic Creed bottle", "Batch code verified", "100ml EDP", "12–14 hour longevity", "Full sillage"],
        inStock: true,
        tag: "Verified Authentic",
      },
      {
        label: "B",
        name: "Master Copy",
        price: 1800,
        originalPrice: 2500,
        description: "High-quality inspired fragrance with 85% scent accuracy. Long-lasting projection at a fraction of the cost.",
        details: ["85% scent accuracy", "6–8 hour longevity", "100ml bottle", "Similar projection"],
        inStock: true,
        tag: "Best Value",
      },
      {
        label: "C",
        name: "Inspired Dupe",
        price: 450,
        description: "Budget Aventus-inspired fragrance. Great daily wear option.",
        details: ["Aventus-inspired scent", "3–4 hour longevity", "50ml bottle"],
        inStock: true,
      },
    ],
    images: ["/products/creed.jpg"],
    tags: ["perfume", "fragrance", "luxury"],
    reviewCount: 89,
    rating: 4.6,
    verifiedAt: "2025-12-10",
  },
  {
    id: "4",
    slug: "samsung-galaxy-s24-ultra",
    name: "Samsung Galaxy S24 Ultra",
    brand: "Samsung",
    category: "Smartphones",
    shortDescription: "The ultimate Galaxy experience. 200MP camera, built-in S Pen, 12GB RAM.",
    description:
      "Samsung's flagship smartphone for 2024. Grade A units are official Samsung products with full warranty. Grade B are high-quality replicas with Android OS and similar form factor. Grade C are budget Android phones with S24 Ultra styling.",
    grades: [
      {
        label: "A",
        name: "Authentic Original",
        price: 130000,
        description: "100% authentic Samsung Galaxy S24 Ultra. Imported from official Samsung channels, full Samsung warranty.",
        details: ["Official Samsung product", "200MP quad camera", "Built-in S Pen", "12GB RAM + 256GB", "1-year Samsung warranty"],
        inStock: true,
        tag: "Original",
      },
      {
        label: "B",
        name: "Master Copy",
        price: 12000,
        originalPrice: 15000,
        description: "High-quality replica with full Android functionality. Similar form factor and camera performance.",
        details: ["Android 13 OS", "64MP main camera", "8GB RAM + 128GB", "Similar design & materials", "30-day warranty"],
        inStock: true,
        tag: "Most Popular",
      },
      {
        label: "C",
        name: "Standard Quality",
        price: 4500,
        description: "Budget Android smartphone with Galaxy S24 Ultra styling. Good for basic daily use.",
        details: ["S24 Ultra inspired design", "Android OS", "4GB RAM + 64GB", "32MP camera"],
        inStock: true,
      },
    ],
    images: ["/products/samsung.jpg"],
    tags: ["smartphone", "samsung", "android"],
    reviewCount: 312,
    rating: 4.9,
    verifiedAt: "2026-01-05",
  },
  {
    id: "5",
    slug: "ray-ban-aviator",
    name: "Ray-Ban Aviator Classic",
    brand: "Ray-Ban",
    category: "Sunglasses",
    shortDescription: "The original aviator. Iconic gold frame with classic G-15 lenses.",
    description:
      "The Ray-Ban Aviator Classic is the world's most iconic sunglasses. Grade A comes with the authentic Ray-Ban product with UV400 protection and official case. Grade B is a high-quality replica with identical aesthetics and UV protection.",
    grades: [
      {
        label: "A",
        name: "Authentic Original",
        price: 16000,
        description: "100% authentic Ray-Ban Aviator from official Ray-Ban distributor. Includes original case and cleaning cloth.",
        details: ["Official Ray-Ban product", "UV400 G-15 lenses", "Gold stainless steel frame", "Original case & cloth", "Certificate of authenticity"],
        inStock: true,
      },
      {
        label: "B",
        name: "Master Copy",
        price: 900,
        originalPrice: 1200,
        description: "Near-identical replica with UV protection and high-quality metal frame.",
        details: ["UV400 lens protection", "Similar metal build", "Identical looks", "Soft case included"],
        inStock: true,
        tag: "Best Value",
      },
    ],
    images: ["/products/rayban.jpg"],
    tags: ["sunglasses", "rayban", "eyewear"],
    reviewCount: 67,
    rating: 4.5,
    verifiedAt: "2025-10-20",
  },
  {
    id: "6",
    slug: "louis-vuitton-neverfull",
    name: "Louis Vuitton Neverfull MM",
    brand: "Louis Vuitton",
    category: "Bags",
    shortDescription: "The iconic LV tote bag. Monogram canvas, red interior, versatile everyday use.",
    description:
      "The Louis Vuitton Neverfull MM is one of the most desirable bags in the world. Grade A is a 100% authentic LV product. Grade B is the highest-quality master copy replica. Grade C is a standard quality inspired tote.",
    grades: [
      {
        label: "A",
        name: "Authentic Original",
        price: 250000,
        description: "100% authentic Louis Vuitton Neverfull MM. Sourced directly from Louis Vuitton store with date code verification.",
        details: ["LV date code verified", "Authentic monogram canvas", "Genuine leather trim", "Original dust bag & box", "LV receipt included"],
        inStock: false,
        tag: "Rare",
      },
      {
        label: "B",
        name: "Master Copy",
        price: 8500,
        originalPrice: 11000,
        description: "Premium 1:1 replica using authentic-grade canvas and leather materials. Indistinguishable from the original.",
        details: ["Authentic-grade canvas", "Real leather handles", "Perfect monogram print", "Correct hardware weight", "Dust bag included"],
        inStock: true,
        tag: "Most Popular",
      },
      {
        label: "C",
        name: "Standard Quality",
        price: 2200,
        description: "Budget-friendly LV-inspired tote bag. Great for everyday use.",
        details: ["LV-inspired design", "Durable PU canvas", "Comfortable handles", "Multiple sizes"],
        inStock: true,
      },
    ],
    images: ["/products/lv.jpg"],
    tags: ["bag", "luxury", "louis vuitton", "tote"],
    reviewCount: 154,
    rating: 4.7,
    verifiedAt: "2025-11-30",
  },
  {
    id: "7",
    slug: "rolex-submariner",
    name: "Rolex Submariner Date",
    brand: "Rolex",
    category: "Smartwatches",
    shortDescription: "The ultimate dive watch. Ceramic bezel, Oystersteel bracelet, 300m water resistance.",
    description:
      "The Rolex Submariner is the definitive dive watch and one of the most iconic timepieces ever created. Grade A is a 100% genuine Rolex with box and papers. Grade B is a high-end mechanical replica. Grade C is a quartz-movement budget alternative.",
    grades: [
      {
        label: "A",
        name: "Authentic Original",
        price: 1200000,
        description: "100% genuine Rolex Submariner Date with serial number verification, original box and papers.",
        details: ["Genuine Rolex movement", "Serial number verified", "Ceramic bezel", "Oystersteel bracelet", "Box & papers", "5-year Rolex service warranty"],
        inStock: false,
        tag: "Rare",
      },
      {
        label: "B",
        name: "Master Copy",
        price: 15000,
        originalPrice: 20000,
        description: "High-grade mechanical replica with Japanese/Swiss clone movement. Virtually identical appearance and weight.",
        details: ["Japanese auto movement", "Sapphire crystal", "Ceramic bezel insert", "Correct weight & dimensions", "Screw-down crown", "30-day warranty"],
        inStock: true,
        tag: "Most Popular",
      },
      {
        label: "C",
        name: "Standard Quality",
        price: 3500,
        description: "Quartz-movement budget Submariner. Perfect for the Rolex aesthetic at a fraction of the cost.",
        details: ["Submariner design", "Quartz movement", "Stainless steel case", "Date display"],
        inStock: true,
      },
    ],
    images: ["/products/rolex.jpg"],
    tags: ["watch", "rolex", "luxury", "dive watch"],
    reviewCount: 203,
    rating: 4.8,
    verifiedAt: "2026-01-10",
  },
  {
    id: "8",
    slug: "adidas-yeezy-350-v2",
    name: "Adidas Yeezy Boost 350 V2",
    brand: "Adidas / Yeezy",
    category: "Footwear",
    shortDescription: "Kanye's iconic silhouette. Primeknit upper, Boost sole, unmatched comfort.",
    description:
      "The Adidas Yeezy Boost 350 V2 is one of the most coveted sneakers in the world. Our Grade A units are verified authentic Yeezys. Grade B are premium replica pairs.",
    grades: [
      {
        label: "A",
        name: "Authentic Original",
        price: 22000,
        description: "100% authentic Adidas Yeezy Boost 350 V2, verified through StockX/GOAT authentication.",
        details: ["StockX authenticated", "Genuine Boost sole", "Original Primeknit upper", "Correct box & label", "Authentication card"],
        inStock: true,
        tag: "Verified",
      },
      {
        label: "B",
        name: "Master Copy",
        price: 3200,
        originalPrice: 4000,
        description: "Premium 1:1 Yeezy replica with identical Primeknit weave and Boost-like cushioning.",
        details: ["Identical Primeknit pattern", "Boost-like EVA cushion", "Correct colorway details", "Stripe detail accurate", "30-day warranty"],
        inStock: true,
        tag: "Best Value",
      },
      {
        label: "C",
        name: "Standard Quality",
        price: 850,
        description: "Budget Yeezy-inspired sneaker. Great daily casual option.",
        details: ["Yeezy 350 V2 inspired", "Knit upper", "EVA sole", "Sizes 40-45"],
        inStock: true,
      },
    ],
    images: ["/products/yeezy.jpg"],
    tags: ["sneakers", "adidas", "yeezy", "shoes"],
    reviewCount: 419,
    rating: 4.9,
    verifiedAt: "2026-01-20",
  },
];
