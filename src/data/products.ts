import { Product, ProductCategory } from '@/types/product';

export const products: Product[] = [
  {
    id: 'lari-apr-01',
    slug: 'leather-welding-apron',
    name: 'Leather Welding Apron',
    category: 'Aprons',
    price: 6.50,
    originalPrice: 8.50,
    priceUnit: '/ piece',
    image: '/static/images/Aprons/Leather Welding Apron.jpeg',
    additionalImages: [
      '/static/images/Aprons/Leather Welding Apron 2.jpeg',
    ],
    description: 'Heavy-duty split cowhide leather welding apron designed for maximum thermal and spark protection during high-temperature arc and MIG/TIG welding operations.',
    features: [
      'Grade-A heavy split cowhide leather',
      'Heat-resistant Kevlar stitching',
      'Adjustable cross-back harness strap system',
      'Reinforced front tool chest pocket',
      'Resistant to sparks, spatter, and radiant heat'
    ],
    specs: {
      material: 'Split Cowhide Leather',
      thickness: '1.4mm - 1.6mm',
      grade: 'Industrial Grade Heavy',
      certification: 'EN ISO 11611:2015 Class 2',
      origin: 'Kanpur, India',
      application: 'Welding, Metal Fabrication, Foundry Work'
    },
    inStock: true,
    rating: 4.8,
    reviewCount: 34,
    isFeatured: true,
    isBestseller: true,
    bulkDiscount: { minQty: 50, discountPercent: 12 }
  },
  {
    id: 'lari-apr-02',
    slug: 'industrial-leather-apron',
    name: 'Industrial Leather Apron',
    category: 'Aprons',
    price: 6.00,
    originalPrice: 7.50,
    priceUnit: '/ piece',
    image: '/static/images/Aprons/Apron 1.jpg',
    additionalImages: [
      '/static/images/Aprons/apron 2.jpg',
      '/static/images/Aprons/Apron 3.jpg',
      '/static/images/Aprons/Apron image 1.jpg',
      '/static/images/Aprons/apron image 2.jpg',
      '/static/images/Aprons/apron image 3.jpg',
      '/static/images/Aprons/APRON IMAGE.jpg',
    ],
    description: 'Rugged workshop and fabrication apron providing comprehensive torso and upper leg protection against abrasion, flying slag, and molten metal splashes.',
    features: [
      'Flexible chrome-tanned leather',
      'Rivet-reinforced stress points',
      'Dual reinforced waist ties',
      'Flame and abrasion resistant'
    ],
    specs: {
      material: 'Genuine Chrome Tanned Leather',
      thickness: '1.2mm - 1.4mm',
      grade: 'Commercial / Industrial',
      certification: 'IS 6153 Compliant',
      origin: 'Kanpur, India',
      application: 'Machine Shop, Blacksmithing, Cutting'
    },
    inStock: true,
    rating: 4.7,
    reviewCount: 19
  },
  {
    id: 'lari-apr-03',
    slug: 'heavy-duty-welding-apron',
    name: 'Heavy Duty Welding Apron',
    category: 'Aprons',
    price: 7.00,
    originalPrice: 9.00,
    priceUnit: '/ piece',
    image: '/static/images/Aprons/Leather Welding Apron 2.jpeg',
    additionalImages: [
      '/static/images/Aprons/Leather Welding Apron.jpeg',
    ],
    description: 'Extended coverage premium welder apron with reinforced abdominal patch and quick-release buckle harness designed for heavy industrial fabricators.',
    features: [
      'Extra-thick premium buffalo split leather',
      'Full chest-to-knee coverage (42 inches)',
      'Brass hardware with quick release clips',
      'Thermal reflective inner lining'
    ],
    specs: {
      material: 'Buffalo Split Hide',
      thickness: '1.6mm - 1.8mm',
      grade: 'Super Heavy Duty',
      certification: 'EN 470-1 / EN 531',
      origin: 'Kanpur, India',
      application: 'Heavy Arc Welding, Shipbuilding, Smelting'
    },
    inStock: true,
    rating: 4.9,
    reviewCount: 42,
    isFeatured: true
  },
  {
    id: 'lari-apr-04',
    slug: 'cotton-safety-apron',
    name: 'Cotton Safety Apron',
    category: 'Aprons',
    price: 2.50,
    originalPrice: 3.50,
    priceUnit: '/ piece',
    image: '/static/images/Aprons/cotton apron 1.jpg',
    additionalImages: [
      '/static/images/Aprons/cotton apron 1 JPG.jpg',
      '/static/images/Aprons/cotton apron 2 JPG.jpg',
      '/static/images/Aprons/cotton apron 2.jpg',
      '/static/images/Aprons/cotton apron 3.jpg',
      '/static/images/Aprons/cotton apron 4.jpg',
      '/static/images/Aprons/cotton apron 5.jpg',
      '/static/images/Aprons/cotton apron 6 JPG.jpg',
      '/static/images/Aprons/cotton apron 6.jpg',
    ],
    description: 'Lightweight breathable heavy-drill cotton safety apron ideal for assembly lines, packaging plants, light workshop handling, and warehousing.',
    features: [
      '100% heavy drill cotton fabric (300 GSM)',
      'Breathable all-day comfort',
      'Machine washable and pre-shrunk',
      'Multi-compartment front pouch'
    ],
    specs: {
      material: '100% Cotton Drill 300 GSM',
      thickness: '300 GSM Fabric',
      grade: 'Light Industrial / General Purpose',
      certification: 'OEKO-TEX Standard 100',
      origin: 'Kanpur, India',
      application: 'Warehousing, Assembly, Carpentry'
    },
    inStock: true,
    rating: 4.5,
    reviewCount: 28
  },
  {
    id: 'lari-apr-06',
    slug: 'industrial-dangri-suit',
    name: 'Industrial Dangri Suit',
    category: 'Aprons',
    price: 8.50,
    originalPrice: 11.00,
    priceUnit: '/ piece',
    image: '/static/images/Aprons/Dangri1 248 kb.jpg',
    description: 'Full-body coverall dangri work suit made of durable poly-cotton blend with reinforced knees, tool loops, and heavy duty two-way brass zipper.',
    features: [
      'High tensile poly-cotton drill fabric',
      'Reflective safety piping on shoulders and legs',
      'Elasticated waist for ergonomic mobility',
      '6 high-capacity industrial utility pockets'
    ],
    specs: {
      material: '65% Cotton / 35% Polyester Heavy Drill',
      thickness: '260 GSM',
      grade: 'Full Body Coverall PPE',
      certification: 'EN ISO 13688:2013',
      origin: 'Kanpur, India',
      application: 'Automotive, Maintenance, Refineries, Rig Sites'
    },
    inStock: true,
    rating: 4.9,
    reviewCount: 51,
    isBestseller: true
  },
  {
    id: 'lari-apr-07',
    slug: 'cotton-lab-coat',
    name: 'Cotton Lab Coat',
    category: 'Aprons',
    price: 3.50,
    originalPrice: 4.80,
    priceUnit: '/ piece',
    image: '/static/images/Aprons/LabCoat 01.jpg',
    additionalImages: [
      '/static/images/Aprons/LabCoat 02.jpg',
      '/static/images/Aprons/LabCoat 03.jpg',
    ],
    description: 'Classic professional white lab coat crafted from high-density sanitized cotton featuring notched lapel collar and deep front pockets.',
    features: [
      '100% fine carded cotton',
      'Stain resistant treatment',
      'Side vent slits for pocket access',
      'Concealed press button closure'
    ],
    specs: {
      material: '100% Mercerized Cotton',
      thickness: '210 GSM',
      grade: 'Laboratory & QC Grade',
      certification: 'GMP / ISO Compliant',
      origin: 'Kanpur, India',
      application: 'Laboratories, Pharmaceuticals, Quality Control'
    },
    inStock: true,
    rating: 4.7,
    reviewCount: 22
  },
  {
    id: 'lari-asb-01',
    slug: 'asbestos-safety-gloves-type-a',
    name: 'Asbestos Thermal Safety Gloves',
    category: 'Asbestos Gloves',
    price: 3.50,
    originalPrice: 4.50,
    priceUnit: '/ pair',
    image: '/static/images/Asbestos Gloves/ASbestos Gloves 1.jpg',
    additionalImages: [
      '/static/images/Asbestos Gloves/ASbestos Gloves 2.jpg',
      '/static/images/Asbestos Gloves/ASbestos Gloves 3.jpg',
    ],
    description: 'High thermal insulating safety gloves engineered for foundry furnace tending, glass blowing, and extreme heat material handling.',
    features: [
      'High thermal threshold resistance up to 350°C',
      'Thick woven heat-dissipating insulation',
      'Extra-long cuff protects forearms',
      'Reinforced thumb crotch for grip durability'
    ],
    specs: {
      material: 'Woven Thermal Asbestos Composite',
      thickness: '3.0mm Woven',
      grade: 'Extreme Heat Handling',
      certification: 'EN 407 Thermal Hazards Class 3',
      origin: 'Kanpur, India',
      application: 'Foundry, Kilns, Metal Casting, Boilers'
    },
    inStock: true,
    rating: 4.7,
    reviewCount: 16
  },
  {
    id: 'lari-asb-02',
    slug: 'asbestos-safety-gloves-type-b',
    name: 'Reinforced Heavy Duty Asbestos Gloves',
    category: 'Asbestos Gloves',
    price: 4.00,
    originalPrice: 5.20,
    priceUnit: '/ pair',
    image: '/static/images/Asbestos Gloves/ASbestos Gloves 2.jpg',
    additionalImages: [
      '/static/images/Asbestos Gloves/ASbestos Gloves 1.jpg',
      '/static/images/Asbestos Gloves/ASbestos Gloves 3.jpg',
    ],
    description: 'Heavy duty mitten-pattern thermal gloves offering prolonged contact heat resistance for forging operations and crucible holding.',
    features: [
      'Continuous contact rating up to 400°C',
      'Double fleece internal lining for user comfort',
      'Reinforced palm grip area'
    ],
    specs: {
      material: 'Heavy Asbestos Fabric with Wool Lining',
      thickness: '3.5mm Multi-Layer',
      grade: 'Smelting & Crucible Grade',
      certification: 'IS 2573 Compliant',
      origin: 'Kanpur, India',
      application: 'Forging, Smelting, Heat Treatment Plants'
    },
    inStock: true,
    rating: 4.8,
    reviewCount: 12
  },
  {
    id: 'lari-exp-01',
    slug: 'canadian-drill-gloves',
    name: 'Canadian Drill Gloves',
    category: 'Export Gloves',
    price: 1.40,
    originalPrice: 1.90,
    priceUnit: '/ pair',
    image: '/static/images/Export gloves images/Drill Canadian.jpg',
    description: 'Classic Canadian pattern split cowhide rigger glove with striped cotton drill back and rubberized safety cuff. Export quality standard.',
    features: [
      'High-grade cow split leather palm and knuckle strap',
      'Heavy cotton drill fabric striped backing',
      'Rubberized 2.5-inch protective safety cuff',
      'Fleece lined palm for sweat absorption'
    ],
    specs: {
      material: 'Cow Split Leather & Cotton Drill',
      thickness: '1.2mm Leather',
      grade: 'Export Standard Grade A',
      certification: 'EN 388:2016 (3-1-3-2-X)',
      origin: 'Kanpur, India',
      application: 'Rigging, Construction, Cargo Handling, Lumber'
    },
    inStock: true,
    rating: 4.8,
    reviewCount: 64,
    isBestseller: true
  },
  {
    id: 'lari-exp-02',
    slug: 'premium-driving-gloves',
    name: 'Lari D662 CE Certified Leather Driver Gloves',
    category: 'Export Gloves',
    price: 1.75,
    originalPrice: 2.30,
    priceUnit: '/ pair',
    image: '/static/images/Gloves Images/branded gloves 4.jpeg',
    additionalImages: [
      '/static/images/Gloves Images/branded gloves 1.jpeg',
      '/static/images/Gloves Images/branded gloves 2.jpeg',
      '/static/images/Gloves Images/branded gloves 3.jpeg',
      '/static/images/Gloves Images/branded gloves 5.jpeg',
      '/static/images/Gloves Images/branded gloves 6.jpeg',
    ],
    description: 'Official factory-branded Lari D662 full-grain white leather utility and driver gloves with certified CE EN388:2016 marking. Ergonomic keystone thumb and shirred elastic back for superior dexterity.',
    features: [
      'Genuine factory-branded Lari D662 with official CE EN388:2016 stamp',
      'Supple full grain goat/cow leather in natural white finish',
      'Keystone thumb for natural hand movement and reduced fatigue',
      'Elasticized shirred wrist with red piped hem cuff binding'
    ],
    specs: {
      material: '100% Full Grain Leather',
      thickness: '1.0mm - 1.1mm',
      grade: 'Export Deluxe Driver A+',
      certification: 'CE EN388:2016 (2-1-3-2-X)',
      origin: 'Kanpur, India',
      application: 'Heavy Equipment Operators, Trucking, Rigging, Utilities'
    },
    inStock: true,
    rating: 4.9,
    reviewCount: 38,
    isFeatured: true,
    isBestseller: true
  },
  {
    id: 'lari-exp-05',
    slug: 'split-leather-drill-gloves',
    name: 'Split Leather Drill Gloves',
    category: 'Export Gloves',
    price: 1.25,
    originalPrice: 1.75,
    priceUnit: '/ pair',
    image: '/static/images/Export gloves images/Drill split leather gloves.jpg',
    additionalImages: [
      '/static/images/Export gloves images/Drill split leather gloves 2.jpg',
    ],
    description: 'Reinforced split leather palm with double-stitched cotton drill back, designed for rigorous export markets requiring extended lifespan.',
    features: [
      'Selected cow split leather palm',
      'Reinforced knuckle protection strap',
      'Heavy drill backing for breathability'
    ],
    specs: {
      material: 'Cow Split Leather & Heavy Drill',
      thickness: '1.3mm Leather',
      grade: 'Export Heavy Duty',
      certification: 'EN 388 (3-2-3-2-X)',
      origin: 'Kanpur, India',
      application: 'Steel Mills, Scaffolding, Demolition'
    },
    inStock: true,
    rating: 4.8,
    reviewCount: 33
  },
  {
    id: 'lari-exp-06',
    slug: 'lined-driving-gloves',
    name: 'Lined Driving Gloves',
    category: 'Export Gloves',
    price: 2.25,
    originalPrice: 3.00,
    priceUnit: '/ pair',
    image: '/static/images/Export gloves images/Driving with linning.jpg',
    additionalImages: [
      '/static/images/Export gloves images/Driving with linning 2.jpg',
    ],
    description: 'Thermal insulated winter driving glove lined with micro-fleece, providing extreme cold weather protection alongside leather durability.',
    features: [
      'Soft cowhide leather outer shell',
      'Warm micro-fleece inner thermal lining',
      'Wind-resistant and cold flexible down to -15°C',
      'Shirred elastic wrist'
    ],
    specs: {
      material: 'Cowhide Grain + Microfleece Liner',
      thickness: '1.1mm + 150 GSM Fleece',
      grade: 'Cold Weather Export Series',
      certification: 'EN 511 Cold Hazards / EN 388',
      origin: 'Kanpur, India',
      application: 'Cold Storage, Winter Driving, Outdoor Utility'
    },
    inStock: true,
    rating: 4.9,
    reviewCount: 45,
    isFeatured: true
  },
  {
    id: 'lari-ind-01',
    slug: 'leather-welding-gloves',
    name: 'Leather Welding Gloves',
    category: 'Industrial Safety',
    price: 2.50,
    originalPrice: 3.20,
    priceUnit: '/ pair',
    image: '/static/images/Gloves Images/Leather Welding Gloves.jpg',
    additionalImages: [
      '/static/images/Gloves Images/Leather Welding  Gloves.jpg',
      '/static/images/Gloves Images/Leather Welding Gloves 2.jpg',
    ],
    description: 'Signature Lari Industries welding gauntlet made of premium heat-resistant split leather with full cotton liner and welted seams.',
    features: [
      '14-inch extended forearm gauntlet',
      'One-piece seamless back construction',
      'Fully welted seams with Kevlar threading',
      'Soft flame-retardant fleece lining'
    ],
    specs: {
      material: 'Specially Treated Split Cowhide',
      thickness: '1.3mm - 1.5mm',
      grade: 'Industrial Welder Grade A',
      certification: 'EN 12477 Type A / IS 2573',
      origin: 'Kanpur, India',
      application: 'MIG, Stick, Arc Welding, Torch Cutting'
    },
    inStock: true,
    rating: 4.9,
    reviewCount: 88,
    isBestseller: true
  },
  {
    id: 'lari-ind-02',
    slug: 'cut-resistance-gloves-type-a',
    name: 'Cut-Resistant Industrial Safety Gloves',
    category: 'Industrial Safety',
    price: 0.50,
    originalPrice: 0.80,
    priceUnit: '/ pair',
    image: '/static/images/Gloves Images/Cut Rsistance 1.jpg',
    additionalImages: [
      '/static/images/Gloves Images/Cut Rsistance 2.jpg',
      '/static/images/Gloves Images/Cut Rsistance 3.jpg',
    ],
    description: 'Level 5 cut-resistant engineering gloves combining HPPE and fiberglass yarn with polyurethane palm coating for micro-grip precision.',
    features: [
      'ANSI Cut Level A4 / EN 388 Cut Level 5',
      'PU palm coating provides high tactile grip',
      'Breathable seamless 13-gauge knit liner',
      'Oil resistant grip surface'
    ],
    specs: {
      material: 'HPPE / Glass Fiber / PU Coating',
      thickness: '13 Gauge Knit',
      grade: 'High Precision Anti-Cut',
      certification: 'EN 388:2016 (4-X-4-2-D)',
      origin: 'Kanpur, India',
      application: 'Glass Handling, Sheet Metal, Blade Assembly'
    },
    inStock: true,
    rating: 4.8,
    reviewCount: 41
  },
  {
    id: 'lari-ind-04',
    slug: 'pvc-polka-dot-gloves',
    name: 'PVC Polka Dot Gloves',
    category: 'Industrial Safety',
    price: 0.40,
    originalPrice: 0.60,
    priceUnit: '/ pair',
    image: '/static/images/Gloves Images/polka dot gloves 1.jpg',
    description: 'Natural cotton knit glove with non-slip PVC polka dots on both sides for reversible wear and superior slip-resistant gripping.',
    features: [
      'Heavy 7-gauge seamless cotton/polyester knit',
      'High-traction black PVC micro-dots',
      'Reversible pattern for double the lifespan'
    ],
    specs: {
      material: 'Cotton-Poly Knit + PVC Dots',
      thickness: '7 Gauge Heavy Knit',
      grade: 'High-Grip Commercial',
      certification: 'CE CAT I Compliant',
      origin: 'Kanpur, India',
      application: 'Box Handling, General Logistics, Construction'
    },
    inStock: true,
    rating: 4.6,
    reviewCount: 52
  },
  {
    id: 'lari-ind-05',
    slug: 'drill-work-gloves',
    name: 'Drill Work Gloves',
    category: 'Industrial Safety',
    price: 0.40,
    originalPrice: 0.65,
    priceUnit: '/ pair',
    image: '/static/images/Gloves Images/Drill Gloves 1 cc.jpg',
    description: 'High-visibility industrial drill gloves featuring reinforced palm patches and knuckle guards for robust mechanical operations.',
    features: [
      'Reinforced palm and index finger',
      'High-contrast safety drill back',
      'Heavy rubberized protective cuff'
    ],
    specs: {
      material: 'Leather Palm + Cotton Drill',
      thickness: '1.2mm Leather',
      grade: 'Mechanical Safety',
      certification: 'EN 388 (3-1-2-1-X)',
      origin: 'Kanpur, India',
      application: 'Machine Operators, Maintenance, Cargo'
    },
    inStock: true,
    rating: 4.7,
    reviewCount: 19
  },
  {
    id: 'lari-ind-06',
    slug: 'buckle-leather-gloves',
    name: 'Buckle Leather Gloves',
    category: 'Industrial Safety',
    price: 1.60,
    originalPrice: 2.10,
    priceUnit: '/ pair',
    image: '/static/images/Gloves Images/Buckle leather gloves1-Photoroomjpg.jpg',
    description: 'Heavy duty lineman and utility glove featuring an adjustable leather cinch strap with nickel buckle for an ultra-secure wrist seal.',
    features: [
      'Heavy top-grain leather body',
      'Integrated adjustable metal roller buckle',
      'Reinforced thumb and palm stitching'
    ],
    specs: {
      material: 'Full Grain Leather + Brass Buckle',
      thickness: '1.3mm - 1.4mm',
      grade: 'Lineman & Rigger Safety',
      certification: 'IS 2573 / CE Marked',
      origin: 'Kanpur, India',
      application: 'Electrical Utilities, High-Tension Riggings, Cranes'
    },
    inStock: true,
    rating: 4.9,
    reviewCount: 35
  },
  {
    id: 'lari-ind-07',
    slug: 'cotton-knitted-hand-gloves',
    name: 'Cotton Knitted Hand Gloves',
    category: 'Industrial Safety',
    price: 0.25,
    originalPrice: 0.40,
    priceUnit: '/ pair',
    image: '/static/images/Gloves Images/cotton-knitted-hand-gloves-500x500.jpg',
    description: 'Bulk industrial cotton seamless knit gloves for basic hand hygiene, scratch prevention, and component assembly lines.',
    features: [
      '10-gauge bleached white cotton yarn',
      'Breathable, ambidextrous pattern',
      'Elasticized wrist binding'
    ],
    specs: {
      material: '100% Cotton Yarn',
      thickness: '10 Gauge Knit',
      grade: 'General Utility Pack',
      certification: 'ISO 9001 Standard',
      origin: 'Kanpur, India',
      application: 'Electronics Assembly, Paint Shop, Packaging'
    },
    inStock: true,
    rating: 4.5,
    reviewCount: 76
  },
  {
    id: 'lari-ind-08',
    slug: 'industrial-safety-gloves',
    name: 'Industrial Safety Gloves',
    category: 'Industrial Safety',
    price: 0.30,
    originalPrice: 0.45,
    priceUnit: '/ pair',
    image: '/static/images/Gloves Images/safety-gloves-500x500.jpg',
    description: 'All-around tough utility gloves engineered with reinforced seams and split hide patches for everyday shop floor protection.',
    features: [
      'Tough split leather palm',
      'Breathable fabric backing',
      'Reinforced knuckle protection strap'
    ],
    specs: {
      material: 'Split Leather & Twill',
      thickness: '1.1mm',
      grade: 'Standard Shop Floor PPE',
      certification: 'EN 388 (2-1-2-1)',
      origin: 'Kanpur, India',
      application: 'Manufacturing, Loading Docks, Scrap Yard'
    },
    inStock: true,
    rating: 4.6,
    reviewCount: 31
  },
  {
    id: 'lari-ind-09',
    slug: 'pvc-dotted-safety-gloves',
    name: 'PVC Dotted Safety Gloves',
    category: 'Industrial Safety',
    price: 0.25,
    originalPrice: 0.40,
    priceUnit: '/ pair',
    image: '/static/images/Gloves Images/Pvc dotted gloves.jpg',
    description: 'Single-sided high-density PVC dotted cotton gloves offering exceptional grip control for parcel sorting and dry material moving.',
    features: [
      'Thick non-abrasive PVC micro-dots',
      'Comfortable sweat absorbing cotton base',
      'Color-coded overcast wrist edge'
    ],
    specs: {
      material: 'Cotton Blend Knit + Black PVC',
      thickness: '7 Gauge Heavy',
      grade: 'High Traction PPE',
      certification: 'CE CAT I',
      origin: 'Kanpur, India',
      application: 'Fulfillment Centers, Carton Handling, Stacking'
    },
    inStock: true,
    rating: 4.7,
    reviewCount: 44
  },
  {
    id: 'lari-ind-10',
    slug: 'leather-cotton-combo-gloves',
    name: 'Leather Cotton Combo Gloves',
    category: 'Industrial Safety',
    price: 0.65,
    originalPrice: 0.90,
    priceUnit: '/ pair',
    image: '/static/images/Gloves Images/LEATHER COTTON GLOVES 1.jpg',
    additionalImages: [
      '/static/images/Gloves Images/leather cotton gloves.jpg',
    ],
    description: 'Hybrid safety glove uniting top-grade leather palms with flexible cotton backs for maximum coolness during long industrial shifts.',
    features: [
      'Goat grain palm with cotton back',
      'High tactile sensitivity for small tools',
      'Fast drying and lightweight'
    ],
    specs: {
      material: 'Goatskin Leather & Cotton Weave',
      thickness: '0.9mm Leather',
      grade: 'Precision Utility',
      certification: 'EN 388 (2-1-1-1)',
      origin: 'Kanpur, India',
      application: 'Assembly Lines, Tool Handling, Maintenance'
    },
    inStock: true,
    rating: 4.8,
    reviewCount: 26
  },
  {
    id: 'lari-ind-11',
    slug: 'welder-gauntlet-gloves',
    name: 'Welder Gauntlet Gloves',
    category: 'Industrial Safety',
    price: 2.40,
    originalPrice: 3.10,
    priceUnit: '/ pair',
    image: '/static/images/Gloves Images/welder gloves 1.jpg',
    additionalImages: [
      '/static/images/Gloves Images/welder gloves 3.jpg',
    ],
    description: 'Heavy 16-inch split leather gauntlet designed to shield hands, wrists, and lower forearms from weld spatters and high radiant heat.',
    features: [
      '16-inch extended full arm protection',
      'Reinforced thumb strap and inner palm',
      'Kevlar stitched throughout for heat durability'
    ],
    specs: {
      material: 'Heavy Cowhide Split Leather',
      thickness: '1.4mm - 1.6mm',
      grade: 'Heavy Welding PPE Class 2',
      certification: 'EN 12477 Type A / EN 407',
      origin: 'Kanpur, India',
      application: 'Heavy Duty Structural Welding, Pipe Fitting'
    },
    inStock: true,
    rating: 4.9,
    reviewCount: 57,
    isFeatured: true
  },
  {
    id: 'lari-ind-12',
    slug: 'ropeman-grain-leather-gloves',
    name: 'Ropeman Grain Leather Gloves',
    category: 'Industrial Safety',
    price: 1.50,
    originalPrice: 2.00,
    priceUnit: '/ pair',
    image: '/static/images/Gloves Images/Ropeman Grain Leather Gloves 2.jpg',
    additionalImages: [
      '/static/images/Gloves Images/Ropeman Grain Leather Gloves 2 (2).jpg',
      '/static/images/Gloves Images/Ropeman Grain Leather gloves.png',
    ],
    description: 'Specialized rope handling and abseiling glove featuring double reinforced friction palms, heat-dissipating vents, and carabiner eyelets.',
    features: [
      'Double leather layer across friction zones',
      'Reinforced palm protects against rope burn',
      'Velcro wrist fastener with carabiner hole'
    ],
    specs: {
      material: 'Top Grain Cowhide + Goatskin',
      thickness: '1.4mm Double Palm',
      grade: 'Rappelling & Ropes Grade',
      certification: 'EN 388 (4-2-4-3-X)',
      origin: 'Kanpur, India',
      application: 'Industrial Abseiling, Tree Care, Cable Pulling'
    },
    inStock: true,
    rating: 4.9,
    reviewCount: 39
  },
  {
    id: 'lari-leg-01',
    slug: 'leather-leg-guard',
    name: 'Leather Leg Guard',
    category: 'Leg Guards & Spats',
    price: 2.50,
    originalPrice: 3.40,
    priceUnit: '/ pair',
    image: '/static/images/Gloves Images/LEATHER LEG GAURD.jpg',
    description: 'Rigid cowhide leather shin and leg guard engineered to protect industrial welders and furnace operators from molten metal sparks.',
    features: [
      'Thick full coverage calf and shin shield',
      'Adjustable heavy leather buckle straps',
      'Under-boot stirrup strap keeps guard locked in position'
    ],
    specs: {
      material: 'Heavy Split Cowhide + Steel Rivets',
      thickness: '1.8mm Leather',
      grade: 'High Hazard Shin Protection',
      certification: 'EN ISO 11611:2015',
      origin: 'Kanpur, India',
      application: 'Foundry, Arc Gouging, Heavy Gas Cutting'
    },
    inStock: true,
    rating: 4.8,
    reviewCount: 23,
    isBestseller: true
  },
  {
    id: 'lari-leg-02',
    slug: 'leather-safety-spats',
    name: 'Leather Safety Spats',
    category: 'Leg Guards & Spats',
    price: 2.90,
    originalPrice: 3.80,
    priceUnit: '/ pair',
    image: '/static/images/Gloves Images/leather spats 2.jpg',
    additionalImages: [
      '/static/images/Gloves Images/LEATHER SPATS 3.jpg',
    ],
    description: 'Protective heavy split-leather leg and ankle spats shielding lower limbs against welding sparks, torch slag, and molten metal splashes.',
    features: [
      'Quick-release heavy Velcro rear closure',
      'Under-sole retention strap',
      'Protects lower ankle and instep from heat and splatter'
    ],
    specs: {
      material: 'Heat Resistant Split Cowhide',
      thickness: '1.4mm - 1.6mm',
      grade: 'Industrial Safety Gaiter',
      certification: 'EN ISO 11611 Class 2',
      origin: 'Kanpur, India',
      application: 'Welding, Grinding, Casting, Smelting'
    },
    inStock: true,
    rating: 4.7,
    reviewCount: 30
  },
  {
    id: 'lari-har-01',
    slug: '6mm-thick-harness-leather-sheet',
    name: '6mm Thick Harness Leather Sheet',
    category: 'Harness Leather',
    price: 25.00,
    originalPrice: 30.00,
    priceUnit: '/ kg',
    image: '/static/images/Harness leather thick/6 mm Thick leather 1.jpg',
    additionalImages: [
      '/static/images/Harness leather thick/6 mm Thick leather 3.jpeg',
    ],
    description: 'Extra thick vegetable tanned full-grain harness leather sheet cured with natural oils and tallow for unrivaled tensile strength and weather resistance.',
    features: [
      'Solid 6mm full-thickness cut',
      'Natural vegetable pit tanned in Kanpur',
      'Wax and oil infused for weather resistance',
      'Extraordinary tensile resistance under extreme loads'
    ],
    specs: {
      material: 'Vegetable Tanned Buffalo/Cowhide',
      thickness: '6.0mm Solid',
      grade: 'Grade A Harness Master Grade',
      certification: 'Pure Vegetable Tanned - Chemical Free',
      origin: 'Kanpur, India',
      application: 'Heavy Saddlery, Draft Horse Tack, Industrial Belts'
    },
    inStock: true,
    rating: 5.0,
    reviewCount: 47,
    isFeatured: true,
    isBestseller: true
  },
  {
    id: 'lari-hos-01',
    slug: 'white-hosiery-hand-gloves',
    name: 'White Hosiery Hand Gloves',
    category: 'Hosiery Gloves',
    price: 0.40,
    originalPrice: 0.55,
    priceUnit: '/ pair',
    image: '/static/images/Hosery Gloves/HoseryGloves 1.jpg',
    description: 'Soft 100% bleached cotton hosiery gloves designed for cleanroom operations, jewelry handling, and automotive inspection lines.',
    features: [
      'Lint-free soft knitted cotton jersey',
      'Protects sensitive surfaces from fingerprints',
      'Thin profile allows full touch dexterity'
    ],
    specs: {
      material: '100% Carded Hosiery Cotton',
      thickness: '180 GSM Jersey Knit',
      grade: 'Inspection & Cleanroom Grade',
      certification: 'Lint-Free Standard',
      origin: 'Kanpur, India',
      application: 'Jewelry, Photography, Paint Inspection, Electronics'
    },
    inStock: true,
    rating: 4.6,
    reviewCount: 60
  },
  {
    id: 'lari-hos-02',
    slug: 'hosiery-work-gloves-type-b',
    name: 'Industrial Hosiery Inspection Gloves',
    category: 'Hosiery Gloves',
    price: 0.25,
    originalPrice: 0.38,
    priceUnit: '/ pair',
    image: '/static/images/Hosery Gloves/Hosery Gloves 2.jpg',
    additionalImages: [
      '/static/images/Hosery Gloves/Hosery Gloves 3.jpg',
    ],
    description: 'Medium weight cotton hosiery gloves with inset thumb construction for comfortable prolonged work in light packaging and assembly.',
    features: [
      'Breathable sweat absorbing cotton weave',
      'Hemmed cuff prevents edge unravelling'
    ],
    specs: {
      material: 'Pure Cotton Hosiery',
      thickness: '200 GSM',
      grade: 'Utility Assembly Grade',
      certification: 'ISO 9001 Certified Quality',
      origin: 'Kanpur, India',
      application: 'Packaging, Garment Handling, Light Assembly'
    },
    inStock: true,
    rating: 4.5,
    reviewCount: 22
  },
  {
    id: 'lari-hos-04',
    slug: 'polka-dot-hosiery-gloves',
    name: 'Polka Dot Hosiery Gloves',
    category: 'Hosiery Gloves',
    price: 0.85,
    originalPrice: 1.15,
    priceUnit: '/ pair',
    image: '/static/images/Hosery Gloves/POLKA 1.jpg',
    description: 'Fine cotton hosiery gloves equipped with precision micro PVC grip dots across the palm and fingers for anti-slip component handling.',
    features: [
      'Combines soft hosiery cotton with PVC dot grip',
      'Enhances slip resistance when holding small plastics or glass',
      'Elastic wrist gathers'
    ],
    specs: {
      material: 'Cotton Hosiery + Micro PVC Dots',
      thickness: '200 GSM Base',
      grade: 'Micro Grip Precision',
      certification: 'General PPE Norms',
      origin: 'Kanpur, India',
      application: 'Light Warehousing, Sorting, Glass Handling'
    },
    inStock: true,
    rating: 4.6,
    reviewCount: 31
  },
  {
    id: 'lari-hos-05',
    slug: 'heavy-polka-dot-gloves',
    name: 'Heavy Polka Dot Gloves',
    category: 'Hosiery Gloves',
    price: 0.95,
    originalPrice: 1.30,
    priceUnit: '/ pair',
    image: '/static/images/Hosery Gloves/POLKA3.jpg',
    description: 'High-density dot matrix hosiery gloves providing exceptional slip resistance for carton handling and conveyor sorting workers.',
    features: [
      'Heavy cluster PVC grip formulation',
      'Tear-resistant edge seams',
      'Long-wearing comfortable cotton body'
    ],
    specs: {
      material: 'Double Layer Cotton + PVC Matrix',
      thickness: '250 GSM',
      grade: 'Commercial Logistics Grade',
      certification: 'ISO 9001 Compliant',
      origin: 'Kanpur, India',
      application: 'Courier Logistics, Cargo Loading, Sorting'
    },
    inStock: true,
    rating: 4.8,
    reviewCount: 28
  },
  {
    id: 'lari-kev-01',
    slug: 'kevlar-para-aramid-gloves-type-a',
    name: 'Kevlar® Para-Aramid Heavy Duty Work Gloves',
    category: 'Kevlar Gloves',
    price: 18.50,
    originalPrice: 24.00,
    priceUnit: '/ pair',
    image: '/static/images/Kevlar Gloves/IMG-20230807-WA0009.jpg',
    description: '100% Genuine DuPont™ Kevlar® para-aramid fiber safety gloves engineered for maximum resistance to cut hazards and moderate contact heat.',
    features: [
      '100% Virgin Para-Aramid Kevlar® yarn',
      'Five times stronger than steel on equal-weight basis',
      'Will not melt, drip, or support combustion',
      'Seamless 10-gauge knit for puncture resistance'
    ],
    specs: {
      material: '100% DuPont™ Kevlar® Para-Aramid',
      thickness: '10 Gauge Medium-Heavy Knit',
      grade: 'Extreme Cut Level A5',
      certification: 'EN 388:2016 (1-5-4-X-E) / EN 407',
      origin: 'Kanpur, India',
      application: 'Automotive Press, Heavy Steel Slitting, Metal Stamping'
    },
    inStock: true,
    rating: 5.0,
    reviewCount: 53,
    isFeatured: true,
    isBestseller: true
  },
  {
    id: 'lari-kev-02',
    slug: 'kevlar-para-aramid-gloves-type-b',
    name: 'Kevlar® Para-Aramid High-Dexterity Gloves',
    category: 'Kevlar Gloves',
    price: 15.50,
    originalPrice: 19.50,
    priceUnit: '/ pair',
    image: '/static/images/Kevlar Gloves/IMG-20230809-WA0001.jpg',
    description: 'Reinforced Kevlar® glove with split cowhide leather palm patch providing combined extreme cut protection and physical puncture barrier.',
    features: [
      'Kevlar® knit body with split leather palm armor',
      'High resistance to oily metal burrs and sharp edges',
      'Extended wrist protection'
    ],
    specs: {
      material: 'Kevlar® + Cowhide Split Leather Palm',
      thickness: '10 Gauge + 1.2mm Leather',
      grade: 'Armored Cut & Puncture Grade',
      certification: 'EN 388 (4-5-4-3-E)',
      origin: 'Kanpur, India',
      application: 'Heavy Scrap Metal, Recycling, Glass Manufacturing'
    },
    inStock: true,
    rating: 4.9,
    reviewCount: 36
  },
  {
    id: 'lari-kev-03',
    slug: 'kevlar-heat-resistant-gloves',
    name: 'Kevlar Heat Resistant Gloves',
    category: 'Kevlar Gloves',
    price: 20.50,
    originalPrice: 26.00,
    priceUnit: '/ pair',
    image: '/static/images/Kevlar Gloves/IMG-20230809-WA0004.jpg',
    description: 'Double-ply Kevlar® terrycloth construction providing continuous heat defense up to 500°C alongside ANSI A6 extreme cut protection.',
    features: [
      'Heavy terrycloth Kevlar loop structure traps dead air',
      'Withstands high-temperature contact up to 500°C',
      'Kevlar thread stitched throughout'
    ],
    specs: {
      material: 'Kevlar® Loop Terry + Wool Thermal Liner',
      thickness: 'Heavy Terrycloth 3.2mm',
      grade: 'High Temperature Thermal PPE',
      certification: 'EN 407 (4-3-4-2-X-X)',
      origin: 'Kanpur, India',
      application: 'Bakeries, Glass Furnaces, Thermal Extrusions'
    },
    inStock: true,
    rating: 4.9,
    reviewCount: 42,
    isFeatured: true
  },
  {
    id: 'lari-kev-04',
    slug: 'kevlar-cut-proof-gloves',
    name: 'Kevlar Cut Proof Gloves',
    category: 'Kevlar Gloves',
    price: 12.50,
    originalPrice: 16.50,
    priceUnit: '/ pair',
    image: '/static/images/Kevlar Gloves/IMG-20230809-WA0014.jpg',
    description: 'Maximum protection cut-proof gloves reinforced with stainless steel core wire encased in Kevlar® aramid fibers for zero-tolerance security.',
    features: [
      'Steel-reinforced Kevlar® composite construction',
      'Highest possible cut resistance tier',
      'Silicone dotted palm for wet and dry grip'
    ],
    specs: {
      material: 'Stainless Steel Core + DuPont™ Kevlar® + Silicone',
      thickness: 'Composite Heavy Knit',
      grade: 'ANSI Level A9 Maximum Cut Defense',
      certification: 'EN 388 (4-X-4-4-F)',
      origin: 'Kanpur, India',
      application: 'Butchery, Meat Processing, Razor Blade Fabrication'
    },
    inStock: true,
    rating: 5.0,
    reviewCount: 48,
    isBestseller: true
  },
  {
    id: 'lari-lea-01',
    slug: 'brown-leather-sheet',
    name: 'Brown Leather Sheet',
    category: 'Leather Sheets',
    price: 18.00,
    originalPrice: 22.00,
    priceUnit: '/ kg',
    image: '/static/images/LEATHER/Brown Leather.jpg',
    additionalImages: [
      '/static/images/LEATHER/Brown leather 1.jpg',
      '/static/images/LEATHER/Brown leather 2.jpg',
    ],
    description: 'Artisanal vegetable-tanned brown cowhide leather sheet from Kanpur tanneries, offering rich oil pull-up character and tight grain structure.',
    features: [
      'Full vegetable tanned with natural tree bark extracts',
      'Rich pull-up effect when bent or manipulated',
      'Substantial weight and consistent gauge'
    ],
    specs: {
      material: 'Full Grain Vegetable Tanned Cowhide',
      thickness: '3.5mm - 4.0mm',
      grade: 'Top Grain Artisan Quality',
      certification: 'LWG Audited Tannery Standards',
      origin: 'Kanpur, India',
      application: 'Handcrafted Goods, Belts, Sheaths, Straps'
    },
    inStock: true,
    rating: 4.9,
    reviewCount: 38,
    isFeatured: true
  },
  {
    id: 'lari-lea-02',
    slug: 'black-leather-sheet-premium',
    name: 'Black Leather Sheet – Premium',
    category: 'Leather Sheets',
    price: 18.00,
    originalPrice: 22.00,
    priceUnit: '/ kg',
    image: '/static/images/LEATHER/Black leather 2.jpg',
    additionalImages: [
      '/static/images/LEATHER/Black Leather 1.jpg',
      '/static/images/LEATHER/Black leather.jpg',
    ],
    description: 'Deep aniline dyed black leather hide with smooth satin luster and water-resistant wax finish for luxury craft and high-end upholstery.',
    features: [
      'Deep drum-dyed through-and-through black pigment',
      'Satin semi-gloss protective wax coat',
      'Supple temper with high tear strength'
    ],
    specs: {
      material: 'Aniline Full Grain Cow Leather',
      thickness: '3.0mm - 3.5mm',
      grade: 'Premium Aniline Grade A',
      certification: 'ISO 14001 Tannery Certified',
      origin: 'Kanpur, India',
      application: 'Tack, Motorcycle Seats, Luxury Furniture'
    },
    inStock: true,
    rating: 5.0,
    reviewCount: 29
  },
  {
    id: 'lari-wsh-01',
    slug: 'leather-washer-standard',
    name: 'Leather Washer – Standard',
    category: 'Leather Washers',
    price: 0.20,
    originalPrice: 0.35,
    priceUnit: '/ piece',
    image: '/static/images/Leather Washer/Leather washer 1 a.jpg',
    additionalImages: [
      '/static/images/Leather Washer/Leather washer 2 a.jpg',
      '/static/images/Leather Washer/Leather washer 3 a.jpg',
      '/static/images/Leather Washer/Leather washer 4 a.jpg',
      '/static/images/Leather Washer/Leather washer 5 a.jpg',
      '/static/images/Leather Washer/Leather washer 6 a.jpg',
    ],
    description: 'Precision die-cut vegetable leather sealing washers engineered for plumbing joints, hydraulic couplings, and pneumatic seals.',
    features: [
      'Swells slightly in water and oil to create an airtight seal',
      'Will not score or scratch mating metal surfaces',
      'Resistant to aging and hardening'
    ],
    specs: {
      material: 'Dense Oak-Tanned Vegetable Leather',
      thickness: '2.5mm - 3.0mm',
      grade: 'Precision Sealing Grade',
      certification: 'IS 5057 Standard',
      origin: 'Kanpur, India',
      application: 'Plumbing, Water Pumps, Compressors'
    },
    inStock: true,
    rating: 4.8,
    reviewCount: 37,
    isBestseller: true
  },
  {
    id: 'lari-wsh-02',
    slug: 'leather-washer-heavy-duty',
    name: 'Leather Washer – Heavy Duty',
    category: 'Leather Washers',
    price: 1.50,
    originalPrice: 2.10,
    priceUnit: '/ piece',
    image: '/static/images/Leather Washer/Leather washer 2 a.jpg',
    additionalImages: [
      '/static/images/Leather Washer/Leather washer 1 a.jpg',
      '/static/images/Leather Washer/Leather washer 3 a.jpg',
      '/static/images/Leather Washer/Leather washer 4 a.jpg',
      '/static/images/Leather Washer/Leather washer 5 a.jpg',
      '/static/images/Leather Washer/Leather washer 6 a.jpg',
    ],
    description: 'Extra thick reinforced leather washer designed for high-pressure pump valves and vibration isolation mounts.',
    features: [
      'Reinforced fiber density for extreme pressure',
      'Tallow impregnated for smooth compression recovery'
    ],
    specs: {
      material: 'Heavy Buffalo Leather',
      thickness: '4.0mm - 5.0mm',
      grade: 'High Pressure Grade',
      certification: 'ISO 9001 Tested',
      origin: 'Kanpur, India',
      application: 'High-Pressure Pumps, Heavy Machinery Dampeners'
    },
    inStock: true,
    rating: 4.7,
    reviewCount: 23
  },
  {
    id: 'lari-wsh-03',
    slug: 'foot-valve-leather-washer',
    name: 'Foot Valve Leather Washer',
    category: 'Leather Washers',
    price: 2.50,
    originalPrice: 3.20,
    priceUnit: '/ piece',
    image: '/static/images/Leather Washer/FOOT VALVE WASHER 1J.jpg',
    description: 'Heavy duty flanged leather cup washer specifically tailored for agricultural foot valves, borewell suction lines, and hand pumps.',
    features: [
      'Self-forming flexible sealing lip under hydraulic suction',
      'Specially cured for continuous immersion in groundwater',
      'Precision punch center hole'
    ],
    specs: {
      material: 'Hydraulic Tanned Leather',
      thickness: '3.5mm Formed',
      grade: 'Agricultural Foot Valve Grade',
      certification: 'Agro-Industrial Standard',
      origin: 'Kanpur, India',
      application: 'Submersible Pumps, Foot Valves, Suction Flanges'
    },
    inStock: true,
    rating: 4.9,
    reviewCount: 45,
    isFeatured: true
  },
  {
    id: 'lari-wsh-04',
    slug: 'spud-washer-industrial',
    name: 'Spud Washer – Industrial',
    category: 'Leather Washers',
    price: 2.90,
    originalPrice: 3.70,
    priceUnit: '/ piece',
    image: '/static/images/Leather Washer/SPUD WASHER 1.jpg',
    description: 'Industrial specification spud union washer manufactured for fuel pipes, pipeline joints, and flange gaskets.',
    features: [
      'Oil and kerosene resistant tannage',
      'Maintains dimensional stability under bolting torque'
    ],
    specs: {
      material: 'Oil Resistant Heavy Leather',
      thickness: '3.0mm',
      grade: 'Pipe & Spud Union Grade',
      certification: 'IS 3000 Pipeline Compliance',
      origin: 'Kanpur, India',
      application: 'Union Couplings, Flanged Pipes, Petroleum Lines'
    },
    inStock: true,
    rating: 4.6,
    reviewCount: 16
  },
  {
    id: 'lari-str-01',
    slug: 'leather-strap-natural',
    name: 'Leather Strap – Natural',
    category: 'Leather Straps',
    price: 3.50,
    originalPrice: 5.00,
    priceUnit: 'As per custom choice',
    isCustomQuote: true,
    image: '/static/images/Leather strip/Leather Strap 1.jpg',
    description: 'Smooth full grain vegetable tanned leather strip with beveled edges. Made strictly to order as per custom width, length, and gauge choice.',
    features: [
      'Custom cut to exact millimeter dimensions',
      'Natural veg-tan accepts bespoke tooling & dye',
      'Smooth hand-beveled edge profiles'
    ],
    specs: {
      material: 'Natural Veg-Tan Cow Leather',
      thickness: 'Custom 2.0mm - 6.0mm',
      grade: 'Bespoke Industrial Specification',
      certification: 'Chemical-Free Natural Tan',
      origin: 'Kanpur, India',
      application: 'Belts, Custom Ties, Machinery Slings'
    },
    inStock: true,
    rating: 4.8,
    reviewCount: 33
  },
  {
    id: 'lari-str-02',
    slug: 'leather-strap-brown',
    name: 'Leather Strap – Brown',
    category: 'Leather Straps',
    price: 4.50,
    originalPrice: 6.00,
    priceUnit: 'As per custom choice',
    isCustomQuote: true,
    image: '/static/images/Leather strip/Leather Strap 2.jpg',
    additionalImages: [
      '/static/images/Leather strip/Leather Strap 1.jpg',
      '/static/images/Leather strip/Leather Strap 3.jpg',
    ],
    description: 'Drum-dyed chestnut brown leather strapping crafted to your requested length, width, and thickness specifications.',
    features: [
      'Custom sizing on demand',
      'Pre-dyed chestnut finish with protective wax sheen',
      'High breaking tensile strength'
    ],
    specs: {
      material: 'Full Grain Dyed Leather',
      thickness: 'Custom Thickness On Request',
      grade: 'Bespoke Strapping Grade',
      certification: 'IS 579 Compliant',
      origin: 'Kanpur, India',
      application: 'Luggage Handles, Equipment Slings, Harnessing'
    },
    inStock: true,
    rating: 4.8,
    reviewCount: 25
  },
  {
    id: 'lari-tar-01',
    slug: 'waterproof-tarpaulin-blue',
    name: 'Waterproof Tarpaulin – Blue',
    category: 'Tarpaulin',
    price: 55.00,
    originalPrice: 68.00,
    priceUnit: '/ sheet',
    image: '/static/images/Tarpoline/Tarpoline image 01.jpg',
    additionalImages: [
      '/static/images/Tarpoline/Tarpoline image 02.jpg',
      '/static/images/Tarpoline/Tarpoline image 03.jpeg',
      '/static/images/Tarpoline/Tarpoline image 04.jpg',
      '/static/images/Tarpoline/Tarpoline image 05.jpeg',
      '/static/images/Tarpoline/Tarpoline image 06.jpeg',
    ],
    description: 'Heavy duty high-density polyethylene (HDPE) laminated waterproof tarpaulin with ultrasonic welded hems and rustproof aluminum eyelets.',
    features: [
      '100% waterproof and UV stabilized for outdoor longevity',
      'Reinforced corners with heavy plastic caps',
      'Rust-proof aluminum grommets every 3 feet',
      'Tear resistant cross-woven HDPE fabric'
    ],
    specs: {
      material: 'Virgin HDPE / LDPE Lamination',
      thickness: '200 GSM Heavy Gauge',
      grade: 'Commercial All-Weather Protection',
      certification: 'IS 7903 Certified Waterproof',
      origin: 'Kanpur, India',
      application: 'Truck Cargo, Monsoon Coverage, Grain Silos, Construction'
    },
    inStock: true,
    rating: 4.8,
    reviewCount: 55,
    isBestseller: true
  },
  {
    id: 'lari-tar-02',
    slug: 'heavy-duty-tarpaulin',
    name: 'Heavy Duty Tarpaulin',
    category: 'Tarpaulin',
    price: 45.00,
    originalPrice: 56.00,
    priceUnit: '/ sheet',
    image: '/static/images/Tarpoline/Tarpoline image 02.jpg',
    additionalImages: [
      '/static/images/Tarpoline/Tarpoline image 01.jpg',
      '/static/images/Tarpoline/Tarpoline image 03.jpeg',
      '/static/images/Tarpoline/Tarpoline image 04.jpg',
      '/static/images/Tarpoline/Tarpoline image 05.jpeg',
      '/static/images/Tarpoline/Tarpoline image 06.jpeg',
    ],
    description: 'Extreme weather multi-layer ripstop tarpaulin offering unmatched hydrostatic head resistance and tear protection for transport fleets.',
    features: [
      'Super strong 250 GSM laminated fabric',
      'Rope reinforced double stitched hems',
      'Resistant to acids, alkalis, and sunlight degradation'
    ],
    specs: {
      material: 'Multi-layer Co-extruded HDPE/LDPE',
      thickness: '250 GSM Super Heavy',
      grade: 'Industrial Fleet Tarpaulin',
      certification: 'IS 7903 Class 1 Extra Heavy Duty',
      origin: 'Kanpur, India',
      application: 'Freight Transport, Industrial Open Storage, Marine'
    },
    inStock: true,
    rating: 4.9,
    reviewCount: 38,
    isFeatured: true
  },
  {
    id: 'lari-tar-03',
    slug: 'industrial-tarpaulin-sheet',
    name: 'Industrial Tarpaulin Sheet',
    category: 'Tarpaulin',
    price: 40.00,
    originalPrice: 50.00,
    priceUnit: '/ sheet',
    image: '/static/images/Tarpoline/Tarpoline image 04.jpg',
    additionalImages: [
      '/static/images/Tarpoline/Tarpoline image 01.jpg',
      '/static/images/Tarpoline/Tarpoline image 02.jpg',
      '/static/images/Tarpoline/Tarpoline image 03.jpeg',
      '/static/images/Tarpoline/Tarpoline image 05.jpeg',
      '/static/images/Tarpoline/Tarpoline image 06.jpeg',
    ],
    description: 'Rugged industrial cover tarpaulin designed for machinery weatherproofing, building scaffolding covers, and outdoor construction sites.',
    features: [
      'Mildew resistant and flexible down to sub-zero temperatures',
      'Reinforced brass eyelets on heavy webbing borders',
      'Complete sun and rain barrier'
    ],
    specs: {
      material: 'HDPE Woven Fabric + Double Sided LDPE',
      thickness: '220 GSM',
      grade: 'Civil Engineering & Scaffolding',
      certification: 'ISO 9001 Certified Manufacturing',
      origin: 'Kanpur, India',
      application: 'Building Sites, Scaffolding Enclosures, Machinery'
    },
    inStock: true,
    rating: 4.7,
    reviewCount: 29
  },
  {
    id: 'lari-raw-01',
    slug: 'raw-hides-bleached-parchment',
    name: 'Bleached Raw Hides & Skin Parchment (0.7–1.00 mm)',
    category: 'Raw Hides',
    subCategory: 'Export Division Exclusive',
    price: 27.50,
    originalPrice: 35.00,
    priceUnit: '/ skin (hide)',
    image: '/static/images/rawhides/parchment-sheet-1.jpeg',
    additionalImages: [
      '/static/images/rawhides/parchment-sheet-2.jpeg',
      '/static/images/rawhides/2.jpeg',
      '/static/images/rawhides/WhatsApp Image 2026-10-24 at 5.16.52 PM.jpeg',
    ],
    description: 'Direct Kanpur tannery export: bleached goat and buff calfskin parchment hides (0.70 mm – 1.00 mm thickness, average size 6+ sq. ft.). Full hides processed from raw skins to bleached finish for musical drum heads, bookbinding, archival vellum, luxury stationery, and craft lacing. Over 10 years of consistent supply to German and continental European markets.',
    features: [
      'Processed in-house at our Kanpur tannery from raw skins to pure bleached level',
      '0.70 mm – 1.00 mm calibrated thickness with average size 6+ sq. ft. per whole skin',
      'Pure bleached goat and buff calfskin whole hides',
      'Multi-purpose: acoustic drum heads, bookbinding, parchment stationery, lace making',
      'Over 10 years established export track record across Germany & Continental Europe',
      'Strict export quality grading with zero weak points or scarring'
    ],
    specs: {
      material: 'Bleached Goat & Buff Calf Skin Rawhide (Avg 6+ sq. ft. whole hides)',
      thickness: '0.70 mm - 1.00 mm Calibrated',
      grade: 'European Export Grade A+',
      certification: 'Direct Tannery Certificate of Analysis',
      origin: 'Kanpur Tannery Facility, Uttar Pradesh, India',
      application: 'Acoustic Musical Drum Heads, Bookbinding & Vellum, Stationery, Saddlery Lace Making'
    },
    inStock: true,
    rating: 5.0,
    reviewCount: 94,
    isBestseller: true,
    isFeatured: true,
    bulkDiscount: { minQty: 25, discountPercent: 15 }
  }
];

export const CATEGORIES: ProductCategory[] = [
  'All',
  'Raw Hides',
  'Aprons',
  'Asbestos Gloves',
  'Export Gloves',
  'Industrial Safety',
  'Leg Guards & Spats',
  'Harness Leather',
  'Hosiery Gloves',
  'Kevlar Gloves',
  'Leather Sheets',
  'Leather Washers',
  'Leather Straps',
  'Tarpaulin'
];

