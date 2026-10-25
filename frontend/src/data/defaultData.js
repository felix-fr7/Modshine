export const initialSettings = {
  companyName: "Modshine Interior",
  tagline: "Decorate Your Home The Easy Way",
  motto: "Design • Innovate • Create",
  phone: "+91 99944 12345",
  secondaryPhone: "082208 05159",
  email: "info@modshineinterior.com",
  website: "www.modshineinterior.com",
  instagram: "@modshine.interior",
  address: "24-A26, Pasuvandhanai Road, Kovilpatti, Tamil Nadu 628501",
  workingHours: "Monday - Saturday: 9:00 AM - 8:30 PM | Sunday: By Appointment",
  stats: {
    projectsCompleted: 450,
    happyFamilies: 420,
    yearsExperience: 15,
    warrantyYears: 10
  },
  announcement: "Special Inaugural Offer: Free 3D Visualization & Modular Wardrobe consultation in Kovilpatti & South TN!"
};

export const initialCategories = [
  {
    id: "cat-1",
    name: "Modular Kitchen",
    slug: "kitchen",
    tagline: "Modern | Functional | Timeless",
    description: "Custom-designed modular kitchens, ergonomic work-triangles, waterproof HDHMR boards, and smooth soft-close hardware.",
    image: "/assets/kitchen_island.jpg",
    itemCount: 8
  },
  {
    id: "cat-2",
    name: "Wardrobe",
    slug: "wardrobe",
    tagline: "Stylish | Functional | Organized",
    description: "Floor-to-ceiling customized wardrobes, walk-in closets, glass profile shutters, and integrated vanity counters.",
    image: "/assets/wardrobe_sage_green.jpg",
    itemCount: 9
  },
  {
    id: "cat-3",
    name: "TV Unit & Media Wall",
    slug: "tv-unit",
    tagline: "Stylish | Functional | Elegant",
    description: "Fluted panel acoustic walls, Carra marble backsplashes, floating consoles, and hidden cable management.",
    image: "/assets/tv_unit_fluted_marble.jpg",
    itemCount: 6
  },
  {
    id: "cat-4",
    name: "Partition & Space Dividers",
    slug: "partition",
    tagline: "Display | Wooden Slat | CNC Design",
    description: "Aesthetic space dividers for living and dining spaces, featuring wooden slats, double-sided displays, and brass CNC fretwork.",
    image: "/assets/partition_wooden_slat.jpg",
    itemCount: 5
  },
  {
    id: "cat-5",
    name: "Pooja Unit",
    slug: "pooja-unit",
    tagline: "Sacred | Traditional | Modern Craft",
    description: "Custom carved sacred temples, backlit jaali laser cutting, brass accents, bell carvings, and organized storage drawers.",
    image: "/assets/pooja_unit_backlit.jpg",
    itemCount: 4
  },
  {
    id: "cat-6",
    name: "Living & Bedroom Sets",
    slug: "living-bedroom",
    tagline: "Comfort | Aesthetics | Practicality",
    description: "Bespoke bed back paneling, floating bedside units, designer accent chairs, and customized credenzas.",
    image: "/assets/bedroom_twin_luxury.jpg",
    itemCount: 7
  }
];

export const initialProducts = [
  {
    id: "prod-1",
    title: "Linear Luxe Island Modular Kitchen",
    category: "kitchen",
    categoryName: "Modular Kitchen",
    priceRange: "₹1,85,000 - ₹3,50,000",
    startingPrice: 185000,
    image: "/assets/kitchen_island.jpg",
    featured: true,
    inStock: true,
    rating: 4.9,
    reviewsCount: 38,
    boardType: "HDHMR Boilo (Waterproof & Termite-proof)",
    brand: "Action TESA",
    hardware: "Ebco / Hettich Soft Close Sensys Hinges",
    finish: "Matte Cashmere with Warm LED Profile Strips",
    description: "Premium island modular kitchen designed for modern open-concept homes. Features seamless handleless acrylic cabinets, anti-scratch quartz countertop, deep tandem box drawers, and built-in chimney loft.",
    specifications: [
      { label: "Core Board", value: "Action TESA HDHMR Boilo Grade" },
      { label: "Hardware & Sliders", value: "Hettich InnoTech Atira Soft-Close" },
      { label: "Finish Type", value: "Anti-fingerprint Matte Laminate" },
      { label: "Warranty", value: "10-Year Comprehensive Warranty" },
      { label: "Work Triangle", value: "Optimized Sink-Hob-Refrigerator Flow" }
    ],
    features: [
      "100% Waterproof HDHMR Boilo Substrate",
      "Soft-close Hettich drawer channels (tested up to 50kg load)",
      "Concealed LED under-cabinet task lighting",
      "Corner carousel / Magic corner pull-out",
      "Integrated waste sorting bin & cutlery organizers"
    ]
  },
  {
    id: "prod-2",
    title: "Nordic Parallel Streamline Kitchen",
    category: "kitchen",
    categoryName: "Modular Kitchen",
    priceRange: "₹1,45,000 - ₹2,75,000",
    startingPrice: 145000,
    image: "/assets/kitchen_parallel.jpg",
    featured: false,
    inStock: true,
    rating: 4.8,
    reviewsCount: 29,
    boardType: "BWP Plywood (Boiling Water Proof)",
    brand: "Greenply",
    hardware: "Sleek / Ebco Heavy Duty Channels",
    finish: "Pastel Mint & White Gloss Laminate",
    description: "Efficient parallel modular layout perfect for apartments and villas. Maximizes counter space and dual-side movement with overhead lofts extending to ceiling.",
    specifications: [
      { label: "Core Board", value: "Greenply Marine Grade BWP 710" },
      { label: "Hardware Brand", value: "Sleek by Asian Paints" },
      { label: "Countertop Support", value: "Reinforced 18mm Granite Base" },
      { label: "Edge Banding", value: "2mm Machine-pressed PVC Rehau" },
      { label: "Warranty", value: "10-Year Water Resistance Guarantee" }
    ],
    features: [
      "BWP Grade 710 Marine Plywood framework",
      "Tall pantry unit with chrome pull-out baskets",
      "Dampener-equipped bi-fold overhead lift doors",
      "Profile Gola handle system for sleek look"
    ]
  },
  {
    id: "prod-3",
    title: "Calacatta Glaze & Matte Loft Wardrobe",
    category: "wardrobe",
    categoryName: "Wardrobe",
    priceRange: "₹1,35,000 - ₹2,60,000",
    startingPrice: 135000,
    image: "/assets/wardrobe_white_marble.jpg",
    featured: true,
    inStock: true,
    rating: 5.0,
    reviewsCount: 42,
    boardType: "HDHMR & UV Board",
    brand: "CenturyPly / Action TESA",
    hardware: "Ebco Soft-Close & Long Slim Black Handles",
    finish: "Calacatta Marble Finish with Charcoal Loft",
    description: "Full-height master bedroom wardrobe with built-in illuminated dressing niche. Combines Italian marble texture shutters with contrasting deep charcoal overhead storage.",
    specifications: [
      { label: "Core Board", value: "CenturyPly Century MR & HDHMR" },
      { label: "Internal Layout", value: "Dual Hanging Rails, 6 Soft Drawers, Locker Nook" },
      { label: "Shutters", value: "Touch-to-open Upper Lofts, Long Black Profile Handles" },
      { label: "Vanity Dressing", value: "Embedded warm backlight mirror & vanity drawers" },
      { label: "Warranty", value: "7-Year Hardware & Board Warranty" }
    ],
    features: [
      "Floor-to-ceiling 9ft optimized storage",
      "Dedicated secret jewelry drawer with velvet felt lining",
      "Built-in vanity mirror with tri-color touch sensor LED",
      "Anti-warp shutter stiffener rods installed"
    ]
  },
  {
    id: "prod-4",
    title: "Sage Green Architectural Wardrobe with Glass Vitrine",
    category: "wardrobe",
    categoryName: "Wardrobe",
    priceRange: "₹1,65,000 - ₹3,10,000",
    startingPrice: 165000,
    image: "/assets/wardrobe_sage_green.jpg",
    featured: true,
    inStock: true,
    rating: 4.9,
    reviewsCount: 31,
    boardType: "Action TESA HDHMR",
    brand: "Action TESA",
    hardware: "Hettich Sensys Clip-on Hinges with integrated buffers",
    finish: "Silky Sage Green Matte with Fluted Bronze Glass Vitrine",
    description: "Contemporary designer wardrobe with an illuminated vertical glass vitrine for bags, perfumes, and luxury watches. Upper attic storage and custom grooved panel shutters.",
    specifications: [
      { label: "Core Material", value: "18mm Action TESA HDHMR" },
      { label: "Glass Vitrine", value: "Smoked Bronze Tempered Glass in Aluminium Profile" },
      { label: "Lighting", value: "Automatic magnetic door-sensor warm strip lights" },
      { label: "Hardware", value: "German Hettich soft-close system" },
      { label: "Warranty", value: "10-Year Warranty" }
    ],
    features: [
      "Fluted smoked glass corner display with auto-light on opening",
      "Heavy gauge aluminium profile frames",
      "High capacity pull-out trouser rack & shoe organizer",
      "Custom designer finish matching contemporary suites"
    ]
  },
  {
    id: "prod-5",
    title: "Mid-Century Warm Wood Arched Wardrobe & Dressing Unit",
    category: "wardrobe",
    categoryName: "Wardrobe",
    priceRange: "₹1,50,000 - ₹2,90,000",
    startingPrice: 150000,
    image: "/assets/wardrobe_warm_wood_arches.jpg",
    featured: false,
    inStock: true,
    rating: 4.8,
    reviewsCount: 19,
    boardType: "BWP Plywood & MDF CNC Moldings",
    brand: "Greenply",
    hardware: "Ebco Concealed Hinges & Brushed Brass Knobs",
    finish: "Natural Walnut Wood Grain with Sage Green CNC Arch Grooves",
    description: "Charming Scandinavian-meets-Mid-Century wardrobe design. Features artistic arch CNC engravings, warm wood accents, integrated tall dressing mirror, and illuminated display cubbies.",
    specifications: [
      { label: "Structure", value: "BWP Plywood + High Density MDF routered panels" },
      { label: "Specialty", value: "Laser-routed arch relief pattern" },
      { label: "Dresser", value: "Integrated full-length arch mirror with vanity drawers" },
      { label: "Drawers", value: "Ebco bottom-mounted telescopic soft-close sliders" },
      { label: "Warranty", value: "10-Year Warranty" }
    ],
    features: [
      "Unique arch motif CNC precision detailing",
      "Warm ambient display niche with glass shelves",
      "Four deep utility drawers for folded linens and essentials",
      "High durability scratch-resistant textured laminates"
    ]
  },
  {
    id: "prod-6",
    title: "Carra Marble Backsplash & Fluted Wood TV Entertainment Unit",
    category: "tv-unit",
    categoryName: "TV Unit & Media Wall",
    priceRange: "₹75,000 - ₹1,40,000",
    startingPrice: 75000,
    image: "/assets/tv_unit_fluted_marble.jpg",
    featured: true,
    inStock: true,
    rating: 5.0,
    reviewsCount: 54,
    boardType: "Action TESA HDHMR & Fluted Charcoal Panels",
    brand: "Action TESA",
    hardware: "Ebco Push-to-Open & Hydraulic Lift Struts",
    finish: "Italian Carra Marble Sheet + Walnut Fluted Louvers",
    description: "Statement media center featuring vertical fluted charcoal wall louvers, high-gloss Italian Carra marble slab backdrop, floating acoustic console, and vertical illuminated glass tower for curated artifacts.",
    specifications: [
      { label: "Backdrop Panel", value: "Nano-coat Marble sheet + Wooden Fluted Louvers MN 8616" },
      { label: "Console Type", value: "Wall-mounted Floating Credenza (14-inch depth)" },
      { label: "Display Vitrine", value: "Black slim aluminium profile with tempered glass" },
      { label: "Cable Flow", value: "100% hidden conduit wire channels" },
      { label: "Lighting", value: "Warm 3000K recessed COB and LED strip lights" }
    ],
    features: [
      "Supports 55 to 85 inch curved and flat OLED televisions",
      "Fluted panel acoustic dampening properties",
      "Smoked glass curio cabinet with warm shelf illumination",
      "Concealed power socket and HDMI cable bay"
    ]
  },
  {
    id: "prod-7",
    title: "Warm Ambient LED Halo Floating TV Console",
    category: "tv-unit",
    categoryName: "TV Unit & Media Wall",
    priceRange: "₹55,000 - ₹1,10,000",
    startingPrice: 55000,
    image: "/assets/tv_unit_ambient_gold.jpg",
    featured: false,
    inStock: true,
    rating: 4.7,
    reviewsCount: 22,
    boardType: "HDHMR Boilo & Acrylic",
    brand: "CenturyPly",
    hardware: "Hettich Push Catch Latches",
    finish: "Warm Champagne Gold & Matte Cream",
    description: "Minimalist modern TV backdrop featuring an oversized textured stone panel with continuous indirect LED halo perimeter glow, paired with a dual-color floating low console.",
    specifications: [
      { label: "Mounting", value: "Reinforced wall hanging bracket up to 80kg" },
      { label: "Perimeter Lighting", value: "High CRI 90+ warm LED strip with dimmer" },
      { label: "Laminate", value: "Anti-static matte cream & champagne gold" },
      { label: "Dimensions", value: "Custom built to living room wall span" },
      { label: "Warranty", value: "7-Year Warranty" }
    ],
    features: [
      "Circumferential warm ambient glow reducing eye strain during night viewing",
      "Soft drop-down flap door for set-top box and gaming consoles",
      "Ventilation slots for electronic heat dissipation"
    ]
  },
  {
    id: "prod-8",
    title: "Architectural Wooden Slat Room Partition",
    category: "partition",
    categoryName: "Partition & Space Dividers",
    priceRange: "₹45,000 - ₹95,000",
    startingPrice: 45000,
    image: "/assets/partition_wooden_slat.jpg",
    featured: true,
    inStock: true,
    rating: 4.9,
    reviewsCount: 27,
    boardType: "Solid Wood & BWP Plywood",
    brand: "Greenply",
    hardware: "Concealed Floor & Ceiling Anchors",
    finish: "Natural Teak & Walnut Satin Polish",
    description: "Elegant floor-to-ceiling wooden vertical slat partition that demarcates foyer, living, and dining zones while maintaining natural air circulation and sunlight. Features staggered display cubes with spotlights for potted indoor plants and artifacts.",
    specifications: [
      { label: "Slat Spacing", value: "Precision 2.5-inch equidistant gaps" },
      { label: "Display Cubes", value: "4 illuminated cantilevered shadow display boxes" },
      { label: "Installation", value: "Non-damaging ceiling & flooring anchoring" },
      { label: "Polish Finish", value: "PU Matte scratch-resistant clear coat" },
      { label: "Warranty", value: "10-Year Termite & Borer Proofing" }
    ],
    features: [
      "Separates living and dining rooms without making space feel small",
      "Staggered display cubes with embedded warm spotlighting",
      "Acoustic diffusers reduce living room echo",
      "Zero light blockage allows natural daylight penetration"
    ]
  },
  {
    id: "prod-9",
    title: "Precision CNC Geometric Lattice Partition",
    category: "partition",
    categoryName: "Partition & Space Dividers",
    priceRange: "₹40,000 - ₹85,000",
    startingPrice: 40000,
    image: "/assets/partition_cnc_design.jpg",
    featured: false,
    inStock: true,
    rating: 4.8,
    reviewsCount: 16,
    boardType: "High Density MR Board & Brass Frame",
    brand: "Action TESA",
    hardware: "Ebco Aluminium Profiles & Brass Clamps",
    finish: "Champagne Gold PU Enamel",
    description: "Precision CNC-cut geometric jaali screen framed in brushed champagne gold aluminium. Paired with a functional low console unit for shoe storage or dining crockery.",
    specifications: [
      { label: "Cutting Method", value: "High-precision 5-axis CNC Router" },
      { label: "Jaali Thickness", value: "18mm High Density MR Board" },
      { label: "Base Credenza", value: "3-door storage unit with soft-close hinges" },
      { label: "Design Pattern", value: "Custom geometric and floral jaali motifs" },
      { label: "Warranty", value: "7-Year Warranty" }
    ],
    features: [
      "Adds royal architectural grandeur to foyers & hall partitions",
      "Seamless PU paint finish in customizable gold, white, or bronze",
      "Integrated dual-drawer base cabinet"
    ]
  },
  {
    id: "prod-10",
    title: "Traditional Heritage Backlit Pooja Mandir",
    category: "pooja-unit",
    categoryName: "Pooja Unit",
    priceRange: "₹65,000 - ₹1,35,000",
    startingPrice: 65000,
    image: "/assets/pooja_unit_mandir.jpg",
    featured: true,
    inStock: true,
    rating: 5.0,
    reviewsCount: 47,
    boardType: "Action TESA HDHMR (Moisture Resistant)",
    brand: "Action TESA",
    hardware: "Ebco Soft-Close Drawers & Profile Knobs",
    finish: "Warm Cream Matte with Laser-Cut Om & Lotus Jaali",
    description: "Exquisite sacred home temple designed with deep cultural respect and modern ergonomics. Features temple gopuram arch styling, glowing warm Om center medallion, glass framed deity alcoves, and capacious pooja samagri storage cabinets.",
    specifications: [
      { label: "Core Board", value: "Action TESA HDHMR Board" },
      { label: "Centerpiece", value: "Laser-engraved Om motif with golden acrylic back-glow" },
      { label: "Deity Pillars", value: "Multi-tier glass shelves with spotlighting" },
      { label: "Base Unit", value: "3 large drawers + concealed pull-out aarti tray" },
      { label: "Warranty", value: "10-Year Termite & Humidity Warranty" }
    ],
    features: [
      "Pull-out heavy load brass aarti diya tray",
      "Individual deity alcoves with dedicated spotlighting",
      "Acoustic bells hook and traditional CNC temple silhouette",
      "Deep storage drawers for pooja oils, dhoop, and sacred texts"
    ]
  },
  {
    id: "prod-11",
    title: "Sacred Temple Shrine with Backlit Photo Frames",
    category: "pooja-unit",
    categoryName: "Pooja Unit",
    priceRange: "₹72,000 - ₹1,45,000",
    startingPrice: 72000,
    image: "/assets/pooja_unit_backlit.jpg",
    featured: false,
    inStock: true,
    rating: 4.9,
    reviewsCount: 23,
    boardType: "HDHMR & Teak Finish",
    brand: "CenturyPly",
    hardware: "Hettich Soft-Close Drawer Systems",
    finish: "Rich Burma Teak with Warm Ambient Halo Framing",
    description: "Grand family pooja unit with individual back-illuminated photo frame alcoves, marble or granite top altar, bell brackets, and lower mahogany credenza for oil lamps and offerings.",
    specifications: [
      { label: "Core Substrate", value: "CenturyPly HDHMR & Teak Veneer" },
      { label: "Wall Panel", value: "Warm backlit wood panelling with acrylic diffusers" },
      { label: "Hardware", value: "German Hettich telescopic drawer runners" },
      { label: "Base Altar", value: "Heat-resistant solid surface top for diyas" },
      { label: "Warranty", value: "10-Year Warranty" }
    ],
    features: [
      "Custom niches sized for traditional family framed deities",
      "Flame-safe and oil-resistant countertop treatment",
      "Independent dual-circuit light switches for day and evening pooja"
    ]
  },
  {
    id: "prod-12",
    title: "Signature Master Bedroom Luxury Wall & Headboard Suite",
    category: "living-bedroom",
    categoryName: "Living & Bedroom Sets",
    priceRange: "₹1,25,000 - ₹2,80,000",
    startingPrice: 125000,
    image: "/assets/bedroom_twin_luxury.jpg",
    featured: true,
    inStock: true,
    rating: 5.0,
    reviewsCount: 36,
    boardType: "BWP Plywood & High-density Acoustic Foam",
    brand: "Greenply / Action TESA",
    hardware: "Ebco Bedside Floating Mounts",
    finish: "Plush Textured Fabric, Fluted Walnut Wood & Warm Arch Lighting",
    description: "Five-star hotel luxury designed for the master bedroom. Dual illuminated architectural arches with warm cove backlighting, rich fluted walnut acoustic panels, custom upholstered fabric headboards, and floating cantilevered nightstands.",
    specifications: [
      { label: "Wall Paneling", value: "Dual Architectural Arches with 3000K warm halo glow" },
      { label: "Acoustic Backing", value: "High-density sound absorbing fluted wood and fabric" },
      { label: "Nightstands", value: "Floating dual-drawer bedside units with wireless charging nooks" },
      { label: "Finishes", value: "Rich Walnut Louvers + Beige Boucle Upholstery" },
      { label: "Warranty", value: "10-Year Structural & Paneling Warranty" }
    ],
    features: [
      "Signature twin illuminated arch design creating serene ambiance",
      "Integrated bedside 2-way master lighting switches & USB charging",
      "Sound-dampening acoustic panelling for restful deep sleep",
      "Floating nightstands make floor cleaning effortlessly simple"
    ]
  }
];

export const initialMaterials = [
  {
    category: "Boards",
    items: [
      { name: "BWP Plywood", description: "Boiling Water Proof 710 Marine Grade for long-lasting kitchens & vanities.", badge: "Waterproof" },
      { name: "HDHMR Boilo", description: "High-density water-resistant composite engineered for high-moisture tropical homes.", badge: "Termite Proof" },
      { name: "MDF Board", description: "Precision smooth substrate perfect for CNC intricate routering and PU lacquering.", badge: "Super Smooth" },
      { name: "MR Plywood", description: "Moisture-resistant grade ideal for dry living spaces and bedroom wardrobes.", badge: "Durable" },
      { name: "UV High Gloss Board", description: "Mirror-reflective scratch-resistant surface with vibrant color depth.", badge: "High Gloss" },
      { name: "Fluted Louver Panels", description: "Architectural 3D fluted textures (MN 8616) creating warmth and acoustic depth.", badge: "Trending" }
    ]
  },
  {
    category: "Board Brands",
    items: [
      { name: "Action TESA", description: "India's #1 HDHMR manufacturer providing ultimate density and screw holding power.", logo: "Action TESA HDHMR" },
      { name: "Greenply", description: "Pioneers in zero-emission green certified boiling water proof plywood.", logo: "Greenply E0 Plywood" },
      { name: "CenturyPly", description: "ViroKill and borer-proof engineered boards with firewall technology.", logo: "CenturyPly Architect" }
    ]
  },
  {
    category: "Hardware & Fitting Brands",
    items: [
      { name: "Hettich", description: "German precision hardware: Sensys soft-close hinges and InnoTech drawer systems.", logo: "Hettich Germany" },
      { name: "Ebco", description: "Simplifying lives with ultra-smooth telescopic runners, flap stays, and profile handles.", logo: "Ebco Hardware" },
      { name: "Sleek by Asian Paints", description: "Ergonomic kitchen wire baskets, tall pantries, and modular pull-out units.", logo: "Sleek Wire Baskets" }
    ]
  }
];

export const initialInquiries = [
  {
    id: "inq-1",
    name: "Suresh Ramanathan",
    phone: "+91 98421 78910",
    email: "suresh.r@example.com",
    city: "Kovilpatti",
    service: "Modular Kitchen & Wardrobe",
    budget: "₹3,50,000 - ₹5,00,000",
    propertyType: "3 BHK Villa",
    message: "Looking for an L-shaped modular kitchen with HDHMR Boilo board and 2 floor-to-ceiling wardrobes. We saw your portfolio in Pasuvandhanai Road and want to visit.",
    status: "New",
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString()
  },
  {
    id: "inq-2",
    name: "Priya Murugesan",
    phone: "+91 94432 11099",
    email: "priya.murugesan@gmail.com",
    city: "Tirunelveli",
    service: "Turnkey Interior Solutions",
    budget: "₹8,00,000+",
    propertyType: "Duplex House",
    message: "Need complete interior design including living room TV unit with Carra marble, Pooja mandir, and modular kitchen.",
    status: "Contacted",
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString()
  },
  {
    id: "inq-3",
    name: "Karthik Raja",
    phone: "+91 97900 55432",
    email: "karthik.raja@outlook.com",
    city: "Kovilpatti",
    service: "Pooja Unit & Partition",
    budget: "₹1,50,000 - ₹2,50,000",
    propertyType: "Independent House",
    message: "Interested in the wooden slat room partition and traditional backlit temple pooja mandir.",
    status: "In-Progress",
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString()
  }
];
