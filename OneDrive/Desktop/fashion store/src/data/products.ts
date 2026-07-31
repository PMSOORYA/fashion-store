import { Product, Review } from '../types';

export const HERO_IMAGE = "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=2400&q=90";
export const LOGIN_IMAGE = "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=90";

export const PRODUCTS: Product[] = [
  {
    id: "dress-01",
    slug: "satin-backless-slip-maxi-dress",
    title: "Satin Backless Slip Maxi Dress",
    category: "Maxi Dress",
    description: "Crafted from liquid Grade 6A Mulberry silk satin, this floor-sweeping maxi dress features a delicate cowl neckline and a plunging open back secured by hand-rolled spaghetti ties. Elegant, sensual, and timeless.",
    price: 495,
    originalPrice: 620,
    rating: 4.9,
    reviewCount: 42,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Champagne", hex: "#EADBC8" },
      { name: "Onyx Black", hex: "#000000" },
      { name: "Ivory", hex: "#FDFBF7" }
    ],
    material: "100% Grade 6A Mulberry Silk Satin",
    careInstructions: "Dry clean only. Cool iron on reverse using press cloth.",
    stock: 8,
    thumbnail: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1200&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1600&q=85"
    ],
    isNewArrival: true,
    isBestseller: true
  },
  {
    id: "dress-02",
    slug: "architectural-pleated-midi-dress",
    title: "Architectural Pleated Midi Dress",
    category: "Midi Dress",
    description: "An homage to modern structural silhouette design. Featuring crisp accordion pleating through the asymmetrical skirt, a high structured collar, and a cinched waistline that flatters effortlessly.",
    price: 420,
    originalPrice: 500,
    rating: 4.8,
    reviewCount: 36,
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Ivory Silk", hex: "#FDFBF7" },
      { name: "Terracotta", hex: "#9E4733" },
      { name: "Pure Black", hex: "#000000" }
    ],
    material: "85% Recycled Crepe Polyester, 15% Silk",
    careInstructions: "Specialist dry clean only to maintain precision pleats.",
    stock: 12,
    thumbnail: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1600&q=85"
    ],
    isNewArrival: true
  },
  {
    id: "dress-03",
    slug: "velvet-corset-mini-dress",
    title: "Velvet Corset Mini Dress",
    category: "Mini Dress",
    description: "Sculpted from Italian plush cotton velvet, this dramatic mini dress incorporates interior boning for immaculate structure, paired with a subtle sweetheart bust and off-the-shoulder draped sleeves.",
    price: 380,
    originalPrice: 450,
    rating: 4.9,
    reviewCount: 58,
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Deep Ruby", hex: "#4A121A" },
      { name: "Midnight Black", hex: "#000000" }
    ],
    material: "92% Italian Cotton Velvet, 8% Elastane; Silk Lining",
    careInstructions: "Dry clean only. Steam softly on reverse.",
    stock: 6,
    thumbnail: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1600&q=85"
    ],
    isBestseller: true
  },
  {
    id: "dress-04",
    slug: "silk-botanical-floral-dress",
    title: "Silk Botanical Floral Dress",
    category: "Floral Dress",
    description: "Printed with exclusive hand-painted watercolor botanical motifs on organza silk. Features gentle flutter sleeves, a romantic tiered skirt, and subtle metallic thread accents.",
    price: 540,
    originalPrice: 650,
    rating: 4.9,
    reviewCount: 29,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Garden Rose", hex: "#E2C4C4" },
      { name: "Sage Mist", hex: "#BFCDA0" }
    ],
    material: "100% Silk Organza with Viscose Slip Lining",
    careInstructions: "Professional dry clean only.",
    stock: 5,
    thumbnail: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1200&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1600&q=85"
    ]
  },
  {
    id: "dress-05",
    slug: "royal-midnight-evening-gown",
    title: "Royal Midnight Evening Gown",
    category: "Evening Dress",
    description: "A show-stopping red carpet evening gown cut from double-faced satin jersey. Designed with an asymmetrical neckline, thigh-high slit, and an elongated sweep train.",
    price: 780,
    originalPrice: 950,
    rating: 5.0,
    reviewCount: 19,
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Midnight Navy", hex: "#0B132B" },
      { name: "Emerald Green", hex: "#0B3C26" },
      { name: "Onyx Black", hex: "#000000" }
    ],
    material: "95% Heavyweight Silk Jersey, 5% Elastane",
    careInstructions: "Specialist dry clean only. Store hanging in protective garment bag.",
    stock: 4,
    thumbnail: "https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?auto=format&fit=crop&w=1200&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1600&q=85"
    ],
    isBestseller: true
  },
  {
    id: "dress-06",
    slug: "minimalist-linen-blend-casual-dress",
    title: "Minimalist Linen-Blend Casual Dress",
    category: "Casual Dress",
    description: "Effortlessly understated luxury for warm afternoons. Spun from organic French flax linen with a breathable relaxed silhouette, side seam pockets, and horn button fastenings.",
    price: 290,
    originalPrice: 340,
    rating: 4.7,
    reviewCount: 31,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Natural Oatmeal", hex: "#E3D5C5" },
      { name: "Pure White", hex: "#FFFFFF" },
      { name: "Olive Green", hex: "#4C5B35" }
    ],
    material: "70% French Organic Linen, 30% Mulberry Silk",
    careInstructions: "Hand wash cold or dry clean. Hang dry in shade.",
    stock: 15,
    thumbnail: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=1600&q=85"
    ]
  },
  {
    id: "dress-07",
    slug: "sculptural-double-breasted-office-dress",
    title: "Sculptural Double-Breasted Office Dress",
    category: "Office Dress",
    description: "Command respect with razor-sharp tailored elegance. Designed with structured shoulders, horn buttons, a fabric belt with gold hardware, and a sheath pencil fit.",
    price: 460,
    originalPrice: 560,
    rating: 4.8,
    reviewCount: 22,
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Tailored Black", hex: "#000000" },
      { name: "Camel Tan", hex: "#B88E5A" },
      { name: "Grid Beige", hex: "#CFBEB1" }
    ],
    material: "90% Virgin Wool Crepe, 10% Cashmere",
    careInstructions: "Dry clean only.",
    stock: 9,
    thumbnail: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1200&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1600&q=85"
    ]
  },
  {
    id: "dress-08",
    slug: "metallic-draped-party-mini-dress",
    title: "Metallic Draped Party Mini Dress",
    category: "Party Dress",
    description: "Designed for nocturnal celebrations. Liquid metallic mesh drapes over the frame with a plunging cowl back and structured hip gathering for luminous radiance.",
    price: 360,
    originalPrice: 420,
    rating: 4.9,
    reviewCount: 47,
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Liquid Gold", hex: "#C5A038" },
      { name: "Sterling Silver", hex: "#B8B8B8" }
    ],
    material: "100% Metallic Chainmail Mesh; Silk Satin Lining",
    careInstructions: "Specialist metallic cleaning only.",
    stock: 7,
    thumbnail: "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=1200&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&q=85"
    ],
    isNewArrival: true
  },
  {
    id: "dress-09",
    slug: "tiered-silk-chiffon-summer-dress",
    title: "Tiered Silk Chiffon Summer Dress",
    category: "Summer Dress",
    description: "Float through summer days in weightless silk chiffon. Cascading tiers create subtle motion, finished with hand-embroidered neckline trim and cap sleeves.",
    price: 410,
    originalPrice: 480,
    rating: 4.8,
    reviewCount: 33,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Sunlit Cream", hex: "#F7F4E9" },
      { name: "Blush Coral", hex: "#E89B9B" },
      { name: "Azure Blue", hex: "#3B7A9E" }
    ],
    material: "100% Crinkle Silk Chiffon",
    careInstructions: "Hand wash cold inside out or dry clean.",
    stock: 11,
    thumbnail: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=85"
    ]
  },
  {
    id: "dress-10",
    slug: "draped-silk-satin-cowl-halter-dress",
    title: "Draped Silk Satin Cowl Halter Dress",
    category: "Satin Dress",
    description: "Extravagant fluid tailoring defined by a sculpted cowl halterneck and bias-cut waistline that cascades into a sleek trumpet hemline.",
    price: 510,
    originalPrice: 600,
    rating: 4.9,
    reviewCount: 26,
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Champagne Silk", hex: "#EADBC8" },
      { name: "Burgundy Satin", hex: "#5C0619" },
      { name: "Charcoal Silk", hex: "#1F1F1F" }
    ],
    material: "100% Heavy Silk Satin Charmeuse",
    careInstructions: "Dry clean only.",
    stock: 7,
    thumbnail: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85",
    galleryImages: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1600&q=85"
    ],
    isBestseller: true
  }
];

export const REVIEWS: Review[] = [
  {
    id: "rev-01",
    author: "Elena Rostova",
    location: "Paris, France",
    rating: 5,
    comment: "The Mulberry silk drape on the backless slip dress is transcendent. The quality rivals top Parisian couture houses. Unboxing was a pure luxury experience.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    date: "July 18, 2026",
    verified: true
  },
  {
    id: "rev-02",
    author: "Sophia Sterling",
    location: "New York, USA",
    rating: 5,
    comment: "Impeccable tailoring and fast delivery to Manhattan. The Architectural Pleated Dress fits like it was custom-made for my frame. Extraordinary craftsmanship.",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
    date: "July 22, 2026",
    verified: true
  },
  {
    id: "rev-03",
    author: "Camille Laurent",
    location: "Milan, Italy",
    rating: 5,
    comment: "LÉONIE LUXE has reinvented online luxury shopping. The fabric textures, stitching, and fluid movement of the Satin Cowl Halter exceeded every expectation.",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80",
    date: "July 26, 2026",
    verified: true
  }
];
