export type StaticProject = {
  _id: string;
  title: { tr: string; en: string };
  slug: { current: string };
  category: "living" | "bedroom" | "kitchen" | "office" | "furniture";
  coverImage: string;
  images: string[];
  description: { tr: string; en: string };
};

// Category display names for the static seed content. Once Sanity is
// configured, categories come from the CMS instead and can be anything.
export const staticCategoryTitles: Record<
  StaticProject["category"],
  { tr: string; en: string }
> = {
  living: { tr: "Salon", en: "Living Room" },
  bedroom: { tr: "Yatak Odası", en: "Bedroom" },
  kitchen: { tr: "Mutfak", en: "Kitchen" },
  office: { tr: "Ofis", en: "Office" },
  furniture: { tr: "Özel Mobilya", en: "Custom Furniture" },
};

// Returns the extra gallery images (2.jpg, 3.jpg, ...) beyond the cover (1.jpg).
function imgs(slug: string, count: number) {
  return Array.from({ length: count - 1 }, (_, i) => `/projects/${slug}/${i + 2}.jpg`);
}

export const staticProjects: StaticProject[] = [
  {
    _id: "static-villa-tuzla-salon",
    title: { tr: "Villa Projesi, Tuzla — Salon", en: "Villa Project, Tuzla — Living Room" },
    slug: { current: "villa-tuzla-salon" },
    category: "living",
    coverImage: "/projects/villa-tuzla-salon/1.jpg",
    images: imgs("villa-tuzla-salon", 3),
    description: {
      tr: "Doğal renk paleti ve dokulu yüzeylerle sakin, geniş bir oturma alanı.",
      en: "A calm, spacious living area built around a natural palette and textured surfaces.",
    },
  },
  {
    _id: "static-villa-tuzla-teras",
    title: { tr: "Villa Projesi, Tuzla — Teras", en: "Villa Project, Tuzla — Terrace" },
    slug: { current: "villa-tuzla-teras" },
    category: "living",
    coverImage: "/projects/villa-tuzla-teras/1.jpg",
    images: imgs("villa-tuzla-teras", 2),
    description: {
      tr: "İç mekânın konforunu dışarıya taşıyan, taş dokulu bir teras oturma ve bar alanı.",
      en: "A stone-textured terrace lounge and bar area that extends the comfort of the interior outdoors.",
    },
  },
  {
    _id: "static-villa-tuzla-yatak-odasi",
    title: { tr: "Villa Projesi, Tuzla — Yatak Odası", en: "Villa Project, Tuzla — Bedroom" },
    slug: { current: "villa-tuzla-yatak-odasi" },
    category: "bedroom",
    coverImage: "/projects/villa-tuzla-yatak-odasi/1.jpg",
    images: imgs("villa-tuzla-yatak-odasi", 1),
    description: {
      tr: "Doğal doku paleti ve yumuşak aydınlatmayla dinlendirici bir ana yatak odası.",
      en: "A restful primary bedroom built on a natural texture palette and soft lighting.",
    },
  },
  {
    _id: "static-villa-bodrum-banyolar",
    title: { tr: "Villa Projesi, Bodrum — Banyolar", en: "Villa Project, Bodrum — Bathrooms" },
    slug: { current: "villa-bodrum-banyolar" },
    category: "furniture",
    coverImage: "/projects/villa-bodrum-banyolar/1.jpg",
    images: imgs("villa-bodrum-banyolar", 3),
    description: {
      tr: "Aynı villadaki üç banyo için taş dokulu, sade ve otel konforunda bir tasarım dili.",
      en: "A restrained, hotel-grade design language in stone tones across three bathrooms in the same villa.",
    },
  },
  {
    _id: "static-restoran-projesi",
    title: { tr: "Restoran Projesi", en: "Restaurant Project" },
    slug: { current: "restoran-projesi" },
    category: "office",
    coverImage: "/projects/restoran-projesi/1.jpg",
    images: imgs("restoran-projesi", 3),
    description: {
      tr: "Tuğla, ahşap ve yeşillik dokularının bir araya geldiği sıcak bir restoran iç mekânı.",
      en: "A warm restaurant interior where brick, wood and greenery textures come together.",
    },
  },
  {
    _id: "static-konut-projesi-salon",
    title: { tr: "Konut Projesi — Salon", en: "Residential Project — Living Room" },
    slug: { current: "konut-projesi-salon" },
    category: "living",
    coverImage: "/projects/konut-projesi-salon/1.jpg",
    images: imgs("konut-projesi-salon", 1),
    description: {
      tr: "Terrazzo zemin ve toprak tonlarıyla sade, konforlu bir oturma alanı.",
      en: "A simple, comfortable living space built on a terrazzo floor and earthy tones.",
    },
  },
  {
    _id: "static-konut-projesi-mutfak",
    title: { tr: "Konut Projesi — Mutfak", en: "Residential Project — Kitchen" },
    slug: { current: "konut-projesi-mutfak" },
    category: "kitchen",
    coverImage: "/projects/konut-projesi-mutfak/1.jpg",
    images: imgs("konut-projesi-mutfak", 1),
    description: {
      tr: "Taş dokulu ada ve pirinç detaylarla öne çıkan bir mutfak tasarımı.",
      en: "A kitchen design defined by a stone-textured island and brass details.",
    },
  },
  {
    _id: "static-konut-projesi-yatak-odasi",
    title: { tr: "Konut Projesi — Yatak Odası", en: "Residential Project — Bedroom" },
    slug: { current: "konut-projesi-yatak-odasi" },
    category: "bedroom",
    coverImage: "/projects/konut-projesi-yatak-odasi/1.jpg",
    images: imgs("konut-projesi-yatak-odasi", 1),
    description: {
      tr: "Manzaraya açılan cephesi ve sıcak aydınlatmasıyla dingin bir yatak odası.",
      en: "A serene bedroom opening onto a view, defined by warm lighting.",
    },
  },
  {
    _id: "static-konut-projesi-banyo",
    title: { tr: "Konut Projesi — Banyo", en: "Residential Project — Bathroom" },
    slug: { current: "konut-projesi-banyo" },
    category: "furniture",
    coverImage: "/projects/konut-projesi-banyo/1.jpg",
    images: imgs("konut-projesi-banyo", 2),
    description: {
      tr: "Yekpare yüzeyler ve gizli aydınlatmayla otel konforunda bir banyo tasarımı.",
      en: "A hotel-grade bathroom design built on monolithic surfaces and concealed lighting.",
    },
  },
  {
    _id: "static-konut-projesi-2-mutfak",
    title: { tr: "Konut Projesi II — Mutfak", en: "Residential Project II — Kitchen" },
    slug: { current: "konut-projesi-2-mutfak" },
    category: "kitchen",
    coverImage: "/projects/konut-projesi-2-mutfak/1.jpg",
    images: imgs("konut-projesi-2-mutfak", 1),
    description: {
      tr: "Kompakt bir alanda fonksiyonel çözümlerle tasarlanmış koyu tonlu bir mutfak.",
      en: "A dark-toned kitchen designed with functional solutions for a compact footprint.",
    },
  },
  {
    _id: "static-konut-projesi-2-banyolar",
    title: { tr: "Konut Projesi II — Banyolar", en: "Residential Project II — Bathrooms" },
    slug: { current: "konut-projesi-2-banyolar" },
    category: "furniture",
    coverImage: "/projects/konut-projesi-2-banyolar/1.jpg",
    images: imgs("konut-projesi-2-banyolar", 3),
    description: {
      tr: "Siyah mermer ve pirinç aksanlarla karakterli iki banyo tasarımı.",
      en: "Two characterful bathrooms defined by black marble and brass accents.",
    },
  },
  {
    _id: "static-loft-dairesi-yatak-odasi",
    title: { tr: "Loft Dairesi — Yatak Odası", en: "Loft Apartment — Bedroom" },
    slug: { current: "loft-dairesi-yatak-odasi" },
    category: "bedroom",
    coverImage: "/projects/loft-dairesi-yatak-odasi/1.jpg",
    images: imgs("loft-dairesi-yatak-odasi", 2),
    description: {
      tr: "Tuğla duvar ve endüstriyel dokunuşlarla karakterli bir loft yatak odası.",
      en: "A characterful loft bedroom defined by brick walls and industrial touches.",
    },
  },
  {
    _id: "static-loft-dairesi-salon",
    title: { tr: "Loft Dairesi — Salon", en: "Loft Apartment — Living Room" },
    slug: { current: "loft-dairesi-salon" },
    category: "living",
    coverImage: "/projects/loft-dairesi-salon/1.jpg",
    images: imgs("loft-dairesi-salon", 1),
    description: {
      tr: "Şömine ve tuğla dokusuyla sıcak, endüstriyel karakterli bir oturma alanı.",
      en: "A warm, industrial-character living space built around a fireplace and brick texture.",
    },
  },
  {
    _id: "static-banyo-projesi",
    title: { tr: "Banyo Projesi", en: "Bathroom Project" },
    slug: { current: "banyo-projesi" },
    category: "furniture",
    coverImage: "/projects/banyo-projesi/1.jpg",
    images: imgs("banyo-projesi", 2),
    description: {
      tr: "Koyu ahşap ve siyah mermerle karakterli, otel havasında bir banyo tasarımı.",
      en: "A characterful, hotel-inspired bathroom in dark wood and black marble.",
    },
  },
  {
    _id: "static-fuar-standi",
    title: { tr: "Fuar Standı Tasarımı", en: "Exhibition Stand Design" },
    slug: { current: "fuar-standi" },
    category: "office",
    coverImage: "/projects/fuar-standi/1.jpg",
    images: imgs("fuar-standi", 3),
    description: {
      tr: "Ahşap strüktür ve sade sergileme sistemleriyle bir marka fuar standı tasarımı.",
      en: "A brand exhibition stand built around a timber structure and clean display systems.",
    },
  },
  {
    _id: "static-magaza-konsepti-dalaman",
    title: { tr: "Mağaza Konsepti, Dalaman", en: "Retail Concept, Dalaman" },
    slug: { current: "magaza-konsepti-dalaman" },
    category: "office",
    coverImage: "/projects/magaza-konsepti-dalaman/1.jpg",
    images: imgs("magaza-konsepti-dalaman", 2),
    description: {
      tr: "Yoğun geçişli bir alanda net sergileme ve yönlendirmeye odaklanan mağaza konsepti.",
      en: "A retail concept focused on clear display and wayfinding in a high-traffic space.",
    },
  },
  {
    _id: "static-villa-arnavutkoy-salon",
    title: { tr: "Villa Projesi, Arnavutköy — Salon", en: "Villa Project, Arnavutköy — Living Room" },
    slug: { current: "villa-arnavutkoy-salon" },
    category: "living",
    coverImage: "/projects/villa-arnavutkoy-salon/1.jpg",
    images: imgs("villa-arnavutkoy-salon", 2),
    description: {
      tr: "Boğaz manzarasına açılan, lacivert ve ahşap tonlarıyla sıcak bir oturma alanı.",
      en: "A warm living space in navy and wood tones, opening onto a Bosphorus view.",
    },
  },
];
