/**
 * Source of truth for the mock newsroom.
 *
 * Every article "kernel" carries all four languages side by side so the
 * locales can never drift apart. The generator (generate-data.mjs) turns
 * these into /data/<locale>/<section>.json files.
 *
 * EVERYTHING HERE IS FICTIONAL. Dates sit inside the Iranian year 1404
 * (≈ 21 Mar 2025 – 20 Mar 2026). Numbers are invented for layout only.
 */

export const LOCALES = ["fa", "en", "ar", "tr"];

/* --------------------------------------------------------------------- */
/*  Section metadata                                                      */
/* --------------------------------------------------------------------- */

export const SECTION_META = {
  energy: {
    accent: "#f97316",
    title: {
      fa: "سرویس انرژی",
      en: "Energy",
      ar: "خدمة الطاقة",
      tr: "Enerji Servisi",
    },
    description: {
      fa: "اخبار برق، گاز، انرژی‌های تجدیدپذیر و بهره‌وری انرژی در سال ۱۴۰۴. همه ارقام و منابع ساختگی است.",
      en: "Electricity, gas, renewables and energy-efficiency news for the year 1404. All figures and sources are fictional.",
      ar: "أخبار الكهرباء والغاز والطاقات المتجددة وكفاءة الطاقة لعام ١٤٠٤. جميع الأرقام والمصادر متخيّلة.",
      tr: "1404 yılı için elektrik, doğal gaz, yenilenebilir enerji ve enerji verimliliği haberleri. Tüm rakamlar ve kaynaklar kurgusaldır.",
    },
    topics: {
      electricity: { fa: "برق", en: "Electricity", ar: "الكهرباء", tr: "Elektrik" },
      gas: { fa: "گاز", en: "Gas", ar: "الغاز", tr: "Doğal gaz" },
      renewables: {
        fa: "تجدیدپذیر",
        en: "Renewables",
        ar: "الطاقة المتجددة",
        tr: "Yenilenebilir",
      },
      efficiency: {
        fa: "بهره‌وری انرژی",
        en: "Efficiency",
        ar: "كفاءة الطاقة",
        tr: "Verimlilik",
      },
    },
  },

  oil: {
    accent: "#0f766e",
    title: { fa: "سرویس نفت", en: "Oil", ar: "خدمة النفط", tr: "Petrol Servisi" },
    description: {
      fa: "اخبار بالادستی، صادرات، پالایش و روند قیمت نفت در سال ۱۴۰۴. داده‌ها نمونه و غیرواقعی است.",
      en: "Upstream, exports, refining and oil-price trends through the year 1404. The data is sample and unreal.",
      ar: "أخبار المنبع والصادرات والتكرير واتجاهات أسعار النفط خلال عام ١٤٠٤. البيانات نموذجية وغير واقعية.",
      tr: "1404 yılında yukarı akış, ihracat, rafinaj ve petrol fiyatı eğilimleri. Veriler örnek ve gerçek dışıdır.",
    },
    topics: {
      upstream: { fa: "بالادستی", en: "Upstream", ar: "المنبع", tr: "Yukarı akış" },
      exports: { fa: "صادرات", en: "Exports", ar: "الصادرات", tr: "İhracat" },
      refining: { fa: "پالایش", en: "Refining", ar: "التكرير", tr: "Rafinaj" },
      prices: { fa: "قیمت نفت", en: "Prices", ar: "الأسعار", tr: "Fiyatlar" },
    },
  },

  petrochemical: {
    accent: "#7c3aed",
    title: {
      fa: "سرویس پتروشیمی",
      en: "Petrochemical",
      ar: "خدمة البتروكيماويات",
      tr: "Petrokimya Servisi",
    },
    description: {
      fa: "اخبار تولید، صادرات، خوراک و طرح‌های توسعه صنعت پتروشیمی در سال ۱۴۰۴. همه اعداد ساختگی است.",
      en: "Production, exports, feedstock and development projects in the petrochemical industry for 1404. Every number is made up.",
      ar: "أخبار الإنتاج والصادرات واللقيم ومشاريع تطوير صناعة البتروكيماويات لعام ١٤٠٤. جميع الأرقام متخيّلة.",
      tr: "1404 yılında petrokimya sanayisinde üretim, ihracat, hammadde ve geliştirme projeleri. Tüm sayılar uydurmadır.",
    },
    topics: {
      production: { fa: "تولید", en: "Production", ar: "الإنتاج", tr: "Üretim" },
      exports: { fa: "صادرات", en: "Exports", ar: "الصادرات", tr: "İhracat" },
      feedstock: { fa: "خوراک", en: "Feedstock", ar: "اللقيم", tr: "Hammadde" },
      projects: {
        fa: "طرح‌های توسعه",
        en: "Projects",
        ar: "المشاريع",
        tr: "Projeler",
      },
    },
  },
};

/* --------------------------------------------------------------------- */
/*  Reusable people / sources                                             */
/* --------------------------------------------------------------------- */

const DESK = {
  energy: { fa: "گروه انرژی", en: "Energy Desk", ar: "قسم الطاقة", tr: "Enerji Masası" },
  business: {
    fa: "گروه اقتصادی",
    en: "Business Desk",
    ar: "القسم الاقتصادي",
    tr: "Ekonomi Masası",
  },
  field: {
    fa: "گروه گزارش میدانی",
    en: "Field Reporting",
    ar: "فريق التغطية الميدانية",
    tr: "Saha Muhabirliği",
  },
};

const SOURCE = {
  wire: {
    fa: "خبرگزاری دمو",
    en: "Demo Newswire",
    ar: "وكالة ديمو للأنباء",
    tr: "Demo Haber Ajansı",
  },
  ministry: {
    fa: "روابط عمومی وزارت انرژی (نمایشی)",
    en: "Ministry of Energy press office (mock)",
    ar: "المكتب الإعلامي لوزارة الطاقة (نموذج)",
    tr: "Enerji Bakanlığı basın ofisi (örnek)",
  },
  company: {
    fa: "روابط عمومی شرکت ملی (نمایشی)",
    en: "National company press office (mock)",
    ar: "المكتب الإعلامي للشركة الوطنية (نموذج)",
    tr: "Ulusal şirket basın ofisi (örnek)",
  },
  analyst: {
    fa: "میز تحلیل دمو",
    en: "Demo Analysis Desk",
    ar: "منضدة التحليل - ديمو",
    tr: "Demo Analiz Masası",
  },
};

/* --------------------------------------------------------------------- */
/*  Article kernels                                                       */
/* --------------------------------------------------------------------- */
/* jd = [jYear, jMonth, jDay]; t = [hh, mm]                               */

export const ARTICLES = [
  /* ================= ENERGY ========================================== */
  {
    slug: "grid-summer-peak-record-1404",
    section: "energy",
    topic: "electricity",
    jd: [1404, 6, 4],
    t: [8, 15],
    views: 91240,
    readingMinutes: 4,
    featured: true,
    breaking: true,
    author: DESK.energy,
    source: SOURCE.ministry,
    title: {
      fa: "مصرف برق در تابستان ۱۴۰۴ به رکورد تازه رسید",
      en: "Summer 1404 electricity demand hits a fresh record",
      ar: "الطلب على الكهرباء يسجّل رقماً قياسياً جديداً في صيف ١٤٠٤",
      tr: "1404 yazında elektrik talebi yeni bir rekora ulaştı",
    },
    lead: {
      fa: "بنابر داده‌های ساختگی این نمونه، بار شبکه سراسری در ساعات میانی روز از مرز ۷۴ هزار مگاوات گذشت و مدیران شبکه از صنایع خواستند مصرف را جابه‌جا کنند.",
      en: "On this demo's invented data, national grid load passed 74,000 MW in the early-afternoon hours and operators asked industrial users to shift consumption.",
      ar: "استناداً إلى بيانات هذا النموذج المتخيّلة، تجاوز حمل الشبكة الوطنية 74 ألف ميغاواط في ساعات الظهيرة، وطلب المشغّلون من الصناعات نقل استهلاكها.",
      tr: "Bu demonun kurgusal verilerine göre ulusal şebeke yükü öğleden sonranın ilk saatlerinde 74.000 MW'ı aştı ve operatörler sanayiden tüketimi kaydırmasını istedi.",
    },
    body: {
      fa: [
        "شرکت مدیریت شبکه در این سناریوی نمایشی اعلام کرد پیک بار روز چهارشنبه به ۷۴٬۳۰۰ مگاوات رسید که نسبت به اوج سال گذشته حدود ۵٬۲ درصد بیشتر است. گرمای فراگیر و افزایش استفاده از سامانه‌های سرمایشی عامل اصلی این جهش عنوان شد.",
        "بر پایه همین داده‌های ساختگی، حدود ۹۰۰ واحد صنعتی بزرگ در قالب برنامه همکاری داوطلبانه پذیرفته‌اند بخشی از بار خود را به ساعات شب منتقل کنند و در مقابل تخفیف تعرفه بگیرند. مسئولان می‌گویند این جابه‌جایی معادل نزدیک به ۲٬۱ هزار مگاوات ظرفیت است.",
        "این خبر صرفاً برای نمایش ساختار صفحه سرویس انرژی تهیه شده و هیچ ارزش خبری واقعی ندارد؛ همه ارقام، نهادها و نقل‌قول‌ها فرضی است.",
      ],
      en: [
        "In this mock scenario the grid management company said Wednesday's peak load reached 74,300 MW, roughly 5.2 percent above last year's high. Widespread heat and heavier use of cooling systems were named as the main drivers.",
        "On the same invented data, about 900 large industrial plants have joined a voluntary cooperation scheme to move part of their load to night hours in exchange for a tariff discount. Officials put the shift at close to 2,100 MW of capacity.",
        "This item exists only to show the layout of the energy service page and carries no real news value; every figure, body and quote is hypothetical.",
      ],
      ar: [
        "قالت شركة إدارة الشبكة في هذا السيناريو النموذجي إن حمل الذروة يوم الأربعاء بلغ 74,300 ميغاواط، أي أعلى بنحو 5.2 بالمئة من ذروة العام الماضي. وذُكر أن الحرّ الواسع وزيادة استخدام أنظمة التبريد هما السبب الرئيسي.",
        "واستناداً إلى البيانات المتخيّلة نفسها، انضم نحو 900 منشأة صناعية كبيرة إلى برنامج تعاون طوعي لنقل جزء من حملها إلى ساعات الليل مقابل خصم على التعرفة. ويقدّر المسؤولون هذا النقل بما يقارب 2,100 ميغاواط من القدرة.",
        "أُعدّ هذا الخبر فقط لعرض هيكل صفحة خدمة الطاقة ولا يحمل أي قيمة خبرية حقيقية؛ فكل الأرقام والجهات والاقتباسات افتراضية.",
      ],
      tr: [
        "Bu örnek senaryoda şebeke yönetim şirketi, çarşamba günkü tepe yükünün 74.300 MW'a ulaştığını ve geçen yılın zirvesinin yaklaşık yüzde 5,2 üzerinde olduğunu bildirdi. Yaygın sıcaklık ve soğutma sistemlerinin daha yoğun kullanımı başlıca etken olarak gösterildi.",
        "Aynı kurgusal verilere göre yaklaşık 900 büyük sanayi tesisi, tarife indirimi karşılığında yükünün bir bölümünü gece saatlerine kaydırmak için gönüllü işbirliği programına katıldı. Yetkililer bu kaymayı yaklaşık 2.100 MW kapasite olarak veriyor.",
        "Bu haber yalnızca enerji servisi sayfasının düzenini göstermek için hazırlanmıştır ve gerçek bir haber değeri taşımaz; tüm rakamlar, kurumlar ve alıntılar varsayımsaldır.",
      ],
    },
    tags: {
      fa: ["برق", "پیک بار", "مدیریت مصرف", "۱۴۰۴"],
      en: ["electricity", "peak load", "demand response", "1404"],
      ar: ["الكهرباء", "حمل الذروة", "إدارة الطلب", "١٤٠٤"],
      tr: ["elektrik", "tepe yük", "talep yönetimi", "1404"],
    },
  },

  {
    slug: "solar-capacity-milestone-1404",
    section: "energy",
    topic: "renewables",
    jd: [1404, 5, 27],
    t: [11, 40],
    views: 43110,
    readingMinutes: 3,
    featured: true,
    breaking: false,
    author: DESK.energy,
    source: SOURCE.wire,
    title: {
      fa: "ظرفیت نصب‌شده خورشیدی از مرز نمایشی ۵ هزار مگاوات گذشت",
      en: "Installed solar capacity passes a demo milestone of 5,000 MW",
      ar: "القدرة الشمسية المركّبة تتجاوز عتبة نموذجية قدرها 5000 ميغاواط",
      tr: "Kurulu güneş kapasitesi örnek 5.000 MW eşiğini aştı",
    },
    lead: {
      fa: "در این نمونه، با اتصال ۱۲ نیروگاه جدید در استان‌های مرکزی و جنوبی، مجموع ظرفیت خورشیدی کشور به ۵٬۱۲۰ مگاوات رسید.",
      en: "In this sample, twelve new plants in the central and southern provinces lifted the country's total solar capacity to 5,120 MW.",
      ar: "في هذا النموذج، رفع ربط اثنتي عشرة محطة جديدة في المحافظات الوسطى والجنوبية إجمالي القدرة الشمسية في البلاد إلى 5,120 ميغاواط.",
      tr: "Bu örnekte, orta ve güney illerdeki on iki yeni santralin devreye girmesi ülkenin toplam güneş kapasitesini 5.120 MW'a çıkardı.",
    },
    body: {
      fa: [
        "طبق داده‌های ساختگی این دمو، ۱۲ نیروگاه خورشیدی با ظرفیت جمعی ۷۴۰ مگاوات در سه ماه گذشته وارد مدار شده‌اند. بزرگ‌ترین آن‌ها یک مزرعه ۲۵۰ مگاواتی در حاشیه کویر مرکزی توصیف شده است.",
        "در همین سناریو، سهم تجدیدپذیرها از تولید برق کشور به ۶٬۳ درصد رسیده و هدف فرضی برنامه، رسیدن به ۱۰ درصد تا پایان سال ۱۴۰۴ عنوان شده است.",
        "همه اعداد و نام‌ها در این متن فرضی است و تنها برای نشان‌دادن نحوه نمایش اخبار تجدیدپذیر در این صفحه به کار رفته است.",
      ],
      en: [
        "On this demo's invented data, twelve solar plants with a combined 740 MW have come online over the past three months. The largest is described as a 250 MW farm on the edge of the central desert.",
        "In the same scenario, renewables now cover 6.3 percent of national power output, with a hypothetical programme target of 10 percent by the end of 1404.",
        "Every number and name in this text is hypothetical and is used only to show how renewables news appears on this page.",
      ],
      ar: [
        "استناداً إلى بيانات هذا النموذج المتخيّلة، دخلت اثنتا عشرة محطة شمسية بقدرة إجمالية 740 ميغاواط الخدمة خلال الأشهر الثلاثة الماضية. وتوصف أكبرها بأنها مزرعة قدرتها 250 ميغاواط على حافة الصحراء الوسطى.",
        "وفي السيناريو نفسه، باتت الطاقات المتجددة تغطّي 6.3 بالمئة من إنتاج الكهرباء الوطني، مع هدف افتراضي للبرنامج يبلغ 10 بالمئة بنهاية عام ١٤٠٤.",
        "كل الأرقام والأسماء في هذا النص افتراضية وتُستخدم فقط لبيان كيفية ظهور أخبار الطاقة المتجددة في هذه الصفحة.",
      ],
      tr: [
        "Bu demonun kurgusal verilerine göre son üç ayda toplam 740 MW gücünde on iki güneş santrali devreye girdi. En büyüğü, orta çöl kenarında 250 MW'lık bir tarla olarak tanımlanıyor.",
        "Aynı senaryoda yenilenebilir kaynaklar ulusal elektrik üretiminin yüzde 6,3'ünü karşılıyor; programın varsayımsal hedefi 1404 sonuna kadar yüzde 10.",
        "Bu metindeki her sayı ve isim varsayımsaldır ve yalnızca yenilenebilir enerji haberlerinin bu sayfada nasıl göründüğünü göstermek için kullanılmıştır.",
      ],
    },
    tags: {
      fa: ["تجدیدپذیر", "خورشیدی", "ظرفیت نصب‌شده", "۱۴۰۴"],
      en: ["renewables", "solar", "installed capacity", "1404"],
      ar: ["الطاقة المتجددة", "الطاقة الشمسية", "القدرة المركّبة", "١٤٠٤"],
      tr: ["yenilenebilir", "güneş", "kurulu güç", "1404"],
    },
  },

  {
    slug: "gas-winter-storage-plan-1404",
    section: "energy",
    topic: "gas",
    jd: [1404, 5, 19],
    t: [16, 5],
    views: 30880,
    readingMinutes: 3,
    featured: false,
    breaking: false,
    author: DESK.energy,
    source: SOURCE.company,
    title: {
      fa: "برنامه ذخیره‌سازی گاز برای زمستان طبق جدول پیش می‌رود",
      en: "Gas storage plan for winter is on schedule",
      ar: "خطة تخزين الغاز للشتاء تسير وفق الجدول",
      tr: "Kışa yönelik gaz depolama planı takvimine uygun ilerliyor",
    },
    lead: {
      fa: "در این نمونه، اپراتور شبکه گاز می‌گوید دو مخزن زیرزمینی تا ۸۲ درصد پر شده و تزریق تابستانی طبق برنامه ادامه دارد.",
      en: "In this sample, the gas network operator says two underground stores are 82 percent full and summer injection is continuing as planned.",
      ar: "في هذا النموذج، يقول مشغّل شبكة الغاز إن مخزنين جوفيين امتلآ بنسبة 82 بالمئة وإن الحقن الصيفي مستمر وفق الخطة.",
      tr: "Bu örnekte gaz şebekesi operatörü, iki yeraltı deposunun yüzde 82 dolu olduğunu ve yaz enjeksiyonunun planlandığı gibi sürdüğünü söylüyor.",
    },
    body: {
      fa: [
        "بر اساس ارقام ساختگی این گزارش، ظرفیت قابل‌برداشت دو مخزن اصلی در پایان شهریور به ۴٬۴ میلیارد مترمکعب خواهد رسید. این میزان برای پوشش اوج مصرف حدود ۱۰ روز سرد زمستان کافی توصیف شده است.",
        "در همین سناریو فرضی، مصرف گاز خانگی در تابستان امسال ۳ درصد کمتر از سال گذشته بوده و صرفه‌جویی حاصل به تزریق مخازن اختصاص یافته است.",
        "این متن نمونه است و برای آزمودن نمایش اخبار حوزه گاز ساخته شده؛ هیچ‌یک از داده‌ها مستند نیست.",
      ],
      en: [
        "On this report's invented figures, the recoverable capacity of the two main stores will reach 4.4 billion cubic metres by late Shahrivar. That is described as enough to cover peak demand for about ten cold winter days.",
        "In the same hypothetical scenario, residential gas use this summer ran 3 percent below last year, and the saving was routed into store injection.",
        "This text is a sample built to test how gas-sector news is displayed; none of the data is sourced.",
      ],
      ar: [
        "استناداً إلى الأرقام المتخيّلة في هذا التقرير، ستبلغ السعة القابلة للسحب من المخزنين الرئيسيين 4.4 مليار متر مكعب بحلول أواخر شهريور. ويوصف ذلك بأنه يكفي لتغطية ذروة الطلب لنحو عشرة أيام باردة في الشتاء.",
        "وفي السيناريو الافتراضي نفسه، انخفض استهلاك الغاز المنزلي هذا الصيف بنسبة 3 بالمئة عن العام الماضي، ووُجِّه هذا التوفير إلى حقن المخازن.",
        "هذا النص نموذج أُعدّ لاختبار طريقة عرض أخبار قطاع الغاز؛ ولا شيء من البيانات موثّق.",
      ],
      tr: [
        "Bu raporun kurgusal rakamlarına göre iki ana deponun geri kazanılabilir kapasitesi Şehrivar sonuna kadar 4,4 milyar metreküpe ulaşacak. Bu miktar, yaklaşık on soğuk kış günü boyunca tepe talebi karşılamaya yeterli olarak tanımlanıyor.",
        "Aynı varsayımsal senaryoda bu yaz konut doğal gaz tüketimi geçen yıla göre yüzde 3 düşük seyretti ve elde edilen tasarruf depo enjeksiyonuna yönlendirildi.",
        "Bu metin, gaz sektörü haberlerinin nasıl görüntülendiğini test etmek için hazırlanmış bir örnektir; verilerin hiçbiri kaynaklı değildir.",
      ],
    },
    tags: {
      fa: ["گاز", "ذخیره‌سازی", "زمستان", "۱۴۰۴"],
      en: ["gas", "storage", "winter", "1404"],
      ar: ["الغاز", "التخزين", "الشتاء", "١٤٠٤"],
      tr: ["doğal gaz", "depolama", "kış", "1404"],
    },
  },

  {
    slug: "appliance-labelling-rules-1404",
    section: "energy",
    topic: "efficiency",
    jd: [1404, 5, 11],
    t: [9, 50],
    views: 18760,
    readingMinutes: 2,
    featured: false,
    breaking: false,
    author: DESK.business,
    source: SOURCE.ministry,
    title: {
      fa: "برچسب انرژی تازه لوازم خانگی از فصل خرید ۱۴۰۴ اجرا شد",
      en: "New appliance energy labels take effect for the 1404 buying season",
      ar: "بطاقات الطاقة الجديدة للأجهزة المنزلية تدخل حيّز التنفيذ لموسم شراء ١٤٠٤",
      tr: "Yeni cihaz enerji etiketleri 1404 alışveriş sezonunda yürürlüğe girdi",
    },
    lead: {
      fa: "در این سناریوی نمایشی، رده‌بندی مصرف یخچال، کولر و ماشین لباسشویی سخت‌گیرانه‌تر شده و محصولات کم‌بازده از ویترین حذف می‌شوند.",
      en: "In this mock scenario, efficiency ratings for fridges, coolers and washing machines get stricter, and low-performing models leave the shelves.",
      ar: "في هذا السيناريو النموذجي، أصبح تصنيف استهلاك الثلاجات والمبرّدات والغسالات أكثر صرامة، وتُسحب الطُرز منخفضة الكفاءة من العرض.",
      tr: "Bu örnek senaryoda buzdolabı, klima ve çamaşır makinelerinin verimlilik sınıflandırması sıkılaştırılıyor ve düşük performanslı modeller raflardan kalkıyor.",
    },
    body: {
      fa: [
        "بر پایه متن فرضی این خبر، آستانه رده «الف» برای یخچال‌فریزر حدود ۱۵ درصد پایین‌تر آمده و فروشندگان شش ماه فرصت دارند موجودی قدیمی را تعیین‌تکلیف کنند.",
        "در همین نمونه، برآورد ساختگی نهاد مجری این است که اجرای کامل برنامه می‌تواند تا سال ۱۴۰۶ معادل ۹۰۰ مگاوات از پیک بار تابستان بکاهد.",
        "این مطلب صرفاً برای پرکردن سرویس انرژی نمونه تولید شده و به رویداد واقعی اشاره ندارد.",
      ],
      en: [
        "On this item's hypothetical text, the «A» threshold for fridge-freezers drops about 15 percent, and retailers get six months to clear old stock.",
        "In the same sample, the implementing body's invented estimate is that full rollout could shave the equivalent of 900 MW off summer peak load by 1406.",
        "This piece was produced only to fill the sample energy service and refers to no real event.",
      ],
      ar: [
        "بحسب النص الافتراضي لهذا الخبر، انخفضت عتبة الفئة «أ» للثلاجات المجمّدة نحو 15 بالمئة، ويحصل التجّار على ستة أشهر لتصريف المخزون القديم.",
        "وفي النموذج نفسه، يقدّر تقدير الجهة المنفّذة المتخيّل أن التطبيق الكامل للبرنامج قد يخفض ما يعادل 900 ميغاواط من حمل الذروة الصيفي بحلول عام ١٤٠٦.",
        "أُنتجت هذه المادة فقط لملء خدمة الطاقة النموذجية ولا تشير إلى حدث حقيقي.",
      ],
      tr: [
        "Bu haberin varsayımsal metnine göre buzdolabı-dondurucular için «A» eşiği yaklaşık yüzde 15 düşüyor ve perakendecilere eski stoğu eritmek için altı ay tanınıyor.",
        "Aynı örnekte uygulayıcı kurumun kurgusal tahmini, programın tam olarak hayata geçmesinin 1406 yılına kadar yaz tepe yükünden 900 MW eşdeğeri düşürebileceği yönünde.",
        "Bu içerik yalnızca örnek enerji servisini doldurmak için üretilmiştir ve gerçek bir olaya atıfta bulunmaz.",
      ],
    },
    tags: {
      fa: ["بهره‌وری انرژی", "برچسب انرژی", "لوازم خانگی", "۱۴۰۴"],
      en: ["efficiency", "energy label", "appliances", "1404"],
      ar: ["كفاءة الطاقة", "بطاقة الطاقة", "الأجهزة المنزلية", "١٤٠٤"],
      tr: ["verimlilik", "enerji etiketi", "ev aletleri", "1404"],
    },
  },

  {
    slug: "northeast-wind-farm-financing-1404",
    section: "energy",
    topic: "renewables",
    jd: [1404, 4, 29],
    t: [13, 20],
    views: 22470,
    readingMinutes: 3,
    featured: false,
    breaking: false,
    author: DESK.energy,
    source: SOURCE.wire,
    title: {
      fa: "تأمین مالی مزرعه بادی ۳۰۰ مگاواتی شمال‌شرق نهایی شد",
      en: "Financing closed for a 300 MW wind farm in the northeast",
      ar: "إغلاق تمويل مزرعة رياح بقدرة 300 ميغاواط في الشمال الشرقي",
      tr: "Kuzeydoğuda 300 MW'lık rüzgâr santralinin finansmanı tamamlandı",
    },
    lead: {
      fa: "در این نمونه، یک کنسرسیوم داخلی برای احداث ۷۵ توربین بادی در گذرگاه بادخیز شمال‌شرق قرارداد تأمین مالی امضا کرد.",
      en: "In this sample, a domestic consortium signed a financing deal to build 75 turbines along a windy corridor in the northeast.",
      ar: "في هذا النموذج، وقّع اتحاد شركات محلي اتفاقية تمويل لبناء 75 توربيناً على ممرّ كثير الرياح في الشمال الشرقي.",
      tr: "Bu örnekte yerli bir konsorsiyum, kuzeydoğudaki rüzgârlı bir koridorda 75 türbin kurmak için finansman anlaşması imzaladı.",
    },
    body: {
      fa: [
        "طبق روایت ساختگی این خبر، ارزش سرمایه‌گذاری طرح ۳۲۰ میلیون واحد پول فرضی است و ۷۰ درصد آن از محل تسهیلات بانکی داخلی تأمین می‌شود. زمان اجرا ۲۰ ماه پیش‌بینی شده است.",
        "در همین سناریو، ضریب ظرفیت سایت به دلیل وزش پایدار باد حدود ۳۸ درصد برآورد شده که برای این نمونه رقم بالایی محسوب می‌شود.",
        "همه جزئیات این متن ساختگی است و صرفاً برای نمایش نحوه پوشش خبرهای تجدیدپذیر در صفحه انرژی نوشته شده است.",
      ],
      en: [
        "On this item's invented account, the project's investment value is 320 million hypothetical currency units, 70 percent covered by domestic bank facilities. Construction is put at 20 months.",
        "In the same scenario, the site's capacity factor is estimated near 38 percent thanks to steady wind, a high figure for this sample.",
        "Every detail in this text is fabricated and written only to show how renewables coverage looks on the energy page.",
      ],
      ar: [
        "بحسب الرواية المتخيّلة لهذا الخبر، تبلغ قيمة استثمار المشروع 320 مليون وحدة عملة افتراضية، يُغطّى 70 بالمئة منها بتسهيلات مصرفية محلية. ويُقدَّر زمن التنفيذ بعشرين شهراً.",
        "وفي السيناريو نفسه، يُقدَّر معامل قدرة الموقع بنحو 38 بالمئة بفضل هبوب الرياح المستقر، وهو رقم مرتفع في هذا النموذج.",
        "كل تفاصيل هذا النص ملفّقة وكُتبت فقط لبيان شكل تغطية أخبار الطاقة المتجددة في صفحة الطاقة.",
      ],
      tr: [
        "Bu haberin kurgusal anlatımına göre projenin yatırım değeri 320 milyon varsayımsal para birimi olup yüzde 70'i yerli banka kredileriyle karşılanıyor. İnşaat süresi 20 ay olarak veriliyor.",
        "Aynı senaryoda sahanın kapasite faktörü, istikrarlı rüzgâr sayesinde yaklaşık yüzde 38 olarak tahmin ediliyor; bu örnek için yüksek bir değer.",
        "Bu metindeki her ayrıntı uydurmadır ve yalnızca yenilenebilir enerji haberlerinin enerji sayfasında nasıl göründüğünü göstermek için yazılmıştır.",
      ],
    },
    tags: {
      fa: ["تجدیدپذیر", "بادی", "تأمین مالی", "۱۴۰۴"],
      en: ["renewables", "wind", "financing", "1404"],
      ar: ["الطاقة المتجددة", "طاقة الرياح", "التمويل", "١٤٠٤"],
      tr: ["yenilenebilir", "rüzgâr", "finansman", "1404"],
    },
  },

  {
    slug: "cross-border-power-export-renewed-1404",
    section: "energy",
    topic: "electricity",
    jd: [1404, 4, 17],
    t: [10, 30],
    views: 26540,
    readingMinutes: 2,
    featured: false,
    breaking: false,
    author: DESK.business,
    source: SOURCE.company,
    title: {
      fa: "قرارداد صادرات برق فرامرزی برای سه سال تمدید شد",
      en: "Cross-border electricity export contract renewed for three years",
      ar: "تجديد عقد تصدير الكهرباء عبر الحدود لثلاث سنوات",
      tr: "Sınır ötesi elektrik ihracatı sözleşmesi üç yıl uzatıldı",
    },
    lead: {
      fa: "در این نمونه، توافق فروش برق به دو کشور همسایه با سقف ۱٬۲ هزار مگاوات در ساعات غیراوج تمدید شده است.",
      en: "In this sample, a deal to sell power to two neighbouring countries has been renewed with a 1,200 MW ceiling in off-peak hours.",
      ar: "في هذا النموذج، جُدِّد اتفاق بيع الكهرباء لبلدين مجاورين بسقف 1,200 ميغاواط في ساعات خارج الذروة.",
      tr: "Bu örnekte iki komşu ülkeye elektrik satışı anlaşması, yoğun olmayan saatlerde 1.200 MW tavanla yenilendi.",
    },
    body: {
      fa: [
        "بر اساس متن فرضی این خبر، صادرات تنها زمانی انجام می‌شود که بار داخلی زیر آستانه معیّن باشد و اولویت همیشه با مصرف داخلی است. درآمد ارزی این قرارداد در سناریو صرف نوسازی خطوط انتقال می‌شود.",
        "در همین روایت ساختگی، حجم مبادله در سال گذشته حدود ۴٬۱ تراوات‌ساعت بوده و پیش‌بینی نمونه از رشد ۶ درصدی در دوره جدید حکایت دارد.",
        "این مطلب داده واقعی ندارد و فقط برای تکمیل فهرست اخبار برق در این دمو آورده شده است.",
      ],
      en: [
        "On this item's hypothetical text, exports run only when domestic load is below a set threshold, and home demand always comes first. In the scenario, the contract's hard-currency income is spent on upgrading transmission lines.",
        "In the same invented account, exchanged volume last year was about 4.1 TWh, and the sample forecast points to 6 percent growth in the new period.",
        "This piece has no real data and is included only to complete the electricity news list in this demo.",
      ],
      ar: [
        "بحسب النص الافتراضي لهذا الخبر، لا يجري التصدير إلا عندما يكون الحمل المحلي دون عتبة محددة، وتبقى الأولوية دائماً للاستهلاك الداخلي. وفي السيناريو، يُنفَق دخل العملة الصعبة من العقد على تحديث خطوط النقل.",
        "وفي الرواية المتخيّلة نفسها، بلغ حجم التبادل العام الماضي نحو 4.1 تيراواط ساعة، ويشير توقّع النموذج إلى نمو بنسبة 6 بالمئة في الفترة الجديدة.",
        "لا تتضمّن هذه المادة بيانات حقيقية وأُدرجت فقط لاستكمال قائمة أخبار الكهرباء في هذا النموذج.",
      ],
      tr: [
        "Bu haberin varsayımsal metnine göre ihracat yalnızca iç yük belirli bir eşiğin altındayken yapılıyor ve öncelik her zaman iç tüketimde. Senaryoda sözleşmenin döviz geliri iletim hatlarının yenilenmesine harcanıyor.",
        "Aynı kurgusal anlatımda geçen yılki takas hacmi yaklaşık 4,1 TWh oldu ve örnek tahmin yeni dönemde yüzde 6 büyümeye işaret ediyor.",
        "Bu içerik gerçek veri içermez ve yalnızca bu demodaki elektrik haber listesini tamamlamak için eklenmiştir.",
      ],
    },
    tags: {
      fa: ["برق", "صادرات", "تبادل انرژی", "۱۴۰۴"],
      en: ["electricity", "exports", "power trade", "1404"],
      ar: ["الكهرباء", "الصادرات", "تبادل الطاقة", "١٤٠٤"],
      tr: ["elektrik", "ihracat", "enerji ticareti", "1404"],
    },
  },

  {
    slug: "smart-meter-rollout-progress-1404",
    section: "energy",
    topic: "efficiency",
    jd: [1404, 4, 6],
    t: [12, 0],
    views: 15230,
    readingMinutes: 3,
    featured: false,
    breaking: false,
    author: DESK.energy,
    source: SOURCE.ministry,
    title: {
      fa: "نصب کنتور هوشمند به ۴ میلیون نقطه رسید",
      en: "Smart-meter rollout reaches 4 million points",
      ar: "تركيب العدّادات الذكية يصل إلى 4 ملايين نقطة",
      tr: "Akıllı sayaç kurulumu 4 milyon noktaya ulaştı",
    },
    lead: {
      fa: "در این سناریو، نصب کنتورهای هوشمند برای مشترکان پرمصرف و صنعتی از مرز ۴ میلیون دستگاه گذشت و مدیریت بار لحظه‌ای ممکن شد.",
      en: "In this scenario, smart-meter installation for high-use and industrial customers passed 4 million units, enabling real-time load management.",
      ar: "في هذا السيناريو، تجاوز تركيب العدّادات الذكية للمشتركين كثيري الاستهلاك والصناعيين 4 ملايين وحدة، ما أتاح إدارة الحمل لحظياً.",
      tr: "Bu senaryoda yüksek tüketimli ve sanayi aboneleri için akıllı sayaç kurulumu 4 milyon adedi geçti ve anlık yük yönetimi mümkün oldu.",
    },
    body: {
      fa: [
        "طبق ارقام ساختگی این گزارش، پوشش کنتور هوشمند در بخش صنعتی به ۹۲ درصد و در بخش خانگی پرمصرف به ۴۵ درصد رسیده است. هدف نمونه، تکمیل بخش صنعتی تا پایان ۱۴۰۴ است.",
        "در همین روایت، داده لحظه‌ای این کنتورها به اپراتور اجازه داده در پیک تابستان حدود ۸۰۰ مگاوات بار را با هماهنگی مشترکان کم کند.",
        "این خبر نمونه است، منبع مستند ندارد و صرفاً برای نمایش ساختار مطلب در سرویس انرژی تهیه شده است.",
      ],
      en: [
        "On this report's invented figures, smart-meter coverage has reached 92 percent in industry and 45 percent among high-use households. The sample target is to finish the industrial segment by the end of 1404.",
        "In the same account, real-time data from these meters let the operator trim about 800 MW of load during the summer peak in coordination with customers.",
        "This is a sample story with no sourced data, prepared only to show the article structure in the energy service.",
      ],
      ar: [
        "استناداً إلى الأرقام المتخيّلة في هذا التقرير، بلغت تغطية العدّادات الذكية 92 بالمئة في الصناعة و45 بالمئة بين الأسر كثيرة الاستهلاك. والهدف النموذجي هو إنهاء الشريحة الصناعية بنهاية عام ١٤٠٤.",
        "وفي الرواية نفسها، سمحت البيانات اللحظية من هذه العدّادات للمشغّل بخفض نحو 800 ميغاواط من الحمل خلال ذروة الصيف بالتنسيق مع المشتركين.",
        "هذا خبر نموذجي بلا بيانات موثّقة، أُعدّ فقط لعرض هيكل المادة في خدمة الطاقة.",
      ],
      tr: [
        "Bu raporun kurgusal rakamlarına göre akıllı sayaç kapsamı sanayide yüzde 92'ye, yüksek tüketimli hanelerde yüzde 45'e ulaştı. Örnek hedef, sanayi bölümünü 1404 sonuna kadar tamamlamak.",
        "Aynı anlatımda bu sayaçlardan gelen anlık veriler, operatörün yaz zirvesinde abonelerle koordineli olarak yaklaşık 800 MW yük kısmasını sağladı.",
        "Bu, kaynaklı verisi olmayan örnek bir haberdir; yalnızca enerji servisindeki makale yapısını göstermek için hazırlanmıştır.",
      ],
    },
    tags: {
      fa: ["بهره‌وری انرژی", "کنتور هوشمند", "مدیریت بار", "۱۴۰۴"],
      en: ["efficiency", "smart meter", "load management", "1404"],
      ar: ["كفاءة الطاقة", "العدّاد الذكي", "إدارة الحمل", "١٤٠٤"],
      tr: ["verimlilik", "akıllı sayaç", "yük yönetimi", "1404"],
    },
  },

  {
    slug: "grid-battery-storage-pilot-1404",
    section: "energy",
    topic: "renewables",
    jd: [1404, 3, 24],
    t: [15, 45],
    views: 19980,
    readingMinutes: 3,
    featured: false,
    breaking: false,
    author: DESK.energy,
    source: SOURCE.wire,
    title: {
      fa: "نخستین پروژه بزرگ ذخیره‌ساز باتری به شبکه وصل شد",
      en: "First large battery-storage pilot connects to the grid",
      ar: "أول مشروع كبير لتخزين البطاريات يُربط بالشبكة",
      tr: "İlk büyük ölçekli batarya depolama pilotu şebekeye bağlandı",
    },
    lead: {
      fa: "در این نمونه، یک ذخیره‌ساز باتری ۱۲۰ مگاوات/۲۴۰ مگاوات‌ساعت برای تثبیت فرکانس و جابه‌جایی بار خورشیدی وارد مدار شد.",
      en: "In this sample, a 120 MW / 240 MWh battery store came online to steady frequency and time-shift solar output.",
      ar: "في هذا النموذج، دخل مخزن بطاريات بقدرة 120 ميغاواط / 240 ميغاواط ساعة الخدمة لتثبيت التردد وإزاحة إنتاج الطاقة الشمسية زمنياً.",
      tr: "Bu örnekte frekansı sabitlemek ve güneş üretimini zamanda kaydırmak için 120 MW / 240 MWh'lik bir batarya deposu devreye girdi.",
    },
    body: {
      fa: [
        "بر پایه داده‌های ساختگی این خبر، این ذخیره‌ساز می‌تواند در دو ساعت اوج عصر، توان تولیدشده نیمروزی نیروگاه‌های خورشیدی مجاور را به شبکه بازگرداند. زمان پاسخ آن کمتر از یک ثانیه توصیف شده است.",
        "در همین سناریو، بهره‌بردار می‌گوید اگر آزمون یک‌ساله موفق باشد، ظرفیت مشابه در چهار نقطه دیگر کشور تکرار خواهد شد.",
        "تمام اعداد و ادعاهای این متن فرضی است و تنها کارکرد آن، نمایش قالب خبر در این صفحه است.",
      ],
      en: [
        "On this item's invented data, the store can push midday output from neighbouring solar plants back onto the grid during the two-hour evening peak. Its response time is described as under one second.",
        "In the same scenario, the operator says that if the one-year trial succeeds, similar capacity will be repeated at four other sites nationwide.",
        "All numbers and claims in this text are hypothetical; its only job is to show the news format on this page.",
      ],
      ar: [
        "استناداً إلى بيانات هذا الخبر المتخيّلة، يستطيع المخزن إعادة إنتاج منتصف النهار من محطات شمسية مجاورة إلى الشبكة خلال ذروة المساء التي تمتد ساعتين. ويوصف زمن استجابته بأنه أقل من ثانية واحدة.",
        "وفي السيناريو نفسه، يقول المشغّل إنه إذا نجحت التجربة التي تستغرق عاماً، فستُكرَّر قدرة مماثلة في أربعة مواقع أخرى على مستوى البلاد.",
        "جميع الأرقام والادعاءات في هذا النص افتراضية، ووظيفته الوحيدة هي عرض صيغة الخبر في هذه الصفحة.",
      ],
      tr: [
        "Bu haberin kurgusal verilerine göre depo, komşu güneş santrallerinin öğle üretimini iki saatlik akşam zirvesinde şebekeye geri verebiliyor. Tepki süresi bir saniyenin altında olarak tanımlanıyor.",
        "Aynı senaryoda operatör, bir yıllık denemenin başarılı olması hâlinde benzer kapasitenin ülke genelinde dört ayrı sahada tekrarlanacağını söylüyor.",
        "Bu metindeki tüm sayılar ve iddialar varsayımsaldır; tek işlevi bu sayfadaki haber biçimini göstermektir.",
      ],
    },
    tags: {
      fa: ["تجدیدپذیر", "ذخیره‌ساز باتری", "پایداری شبکه", "۱۴۰۴"],
      en: ["renewables", "battery storage", "grid stability", "1404"],
      ar: ["الطاقة المتجددة", "تخزين البطاريات", "استقرار الشبكة", "١٤٠٤"],
      tr: ["yenilenebilir", "batarya depolama", "şebeke kararlılığı", "1404"],
    },
  },

  /* ================= OIL ============================================= */
  {
    slug: "southern-field-redevelopment-contract-1404",
    section: "oil",
    topic: "upstream",
    jd: [1404, 6, 2],
    t: [9, 10],
    views: 61230,
    readingMinutes: 4,
    featured: true,
    breaking: false,
    author: DESK.business,
    source: SOURCE.company,
    title: {
      fa: "قرارداد بازتوسعه یک میدان نفتی بالغ جنوبی امضا شد",
      en: "Redevelopment contract signed for a mature southern oil field",
      ar: "توقيع عقد إعادة تطوير حقل نفطي ناضج في الجنوب",
      tr: "Güneydeki olgun bir petrol sahası için yeniden geliştirme sözleşmesi imzalandı",
    },
    lead: {
      fa: "در این نمونه، قراردادی برای افزایش برداشت یک میدان قدیمی خشکی با هدف افزودن ۸۵ هزار بشکه در روز طی چهار سال امضا شده است.",
      en: "In this sample, a contract has been signed to raise output from an old onshore field, aiming to add 85,000 barrels per day over four years.",
      ar: "في هذا النموذج، وُقّع عقد لزيادة إنتاج حقل برّي قديم بهدف إضافة 85 ألف برميل يومياً خلال أربع سنوات.",
      tr: "Bu örnekte, eski bir kara sahasının üretimini artırmak için dört yılda günde 85.000 varil ekleme hedefiyle bir sözleşme imzalandı.",
    },
    body: {
      fa: [
        "بر اساس روایت ساختگی این خبر، ارزش طرح ۱٬۹ میلیارد واحد پول فرضی است و شامل حفر ۴۰ حلقه چاه جدید، نوسازی خطوط لوله جمع‌آوری و ساخت یک واحد نمک‌زدایی می‌شود.",
        "در همین سناریو، ضریب بازیافت میدان با تزریق گاز و مدیریت فشار مخزن از ۲۴ به ۳۱ درصد افزایش می‌یابد. نخستین افزایش تولید محسوس، ۱۸ ماه پس از آغاز عملیات پیش‌بینی شده است.",
        "این متن رویداد واقعی را گزارش نمی‌کند؛ همه ارقام، نهادها و بازه‌های زمانی برای نمایش صفحه سرویس نفت ساخته شده‌اند.",
      ],
      en: [
        "On this item's invented account, the project is worth 1.9 billion hypothetical currency units and covers 40 new wells, renewal of gathering pipelines and a new desalting unit.",
        "In the same scenario, the field's recovery factor rises from 24 to 31 percent through gas injection and reservoir-pressure management. The first noticeable output gain is expected 18 months after operations start.",
        "This text reports no real event; every figure, body and timeframe was built to show the oil service page.",
      ],
      ar: [
        "بحسب الرواية المتخيّلة لهذا الخبر، تبلغ قيمة المشروع 1.9 مليار وحدة عملة افتراضية، ويشمل حفر 40 بئراً جديدة وتجديد خطوط أنابيب التجميع وبناء وحدة إزالة أملاح.",
        "وفي السيناريو نفسه، يرتفع معامل استخلاص الحقل من 24 إلى 31 بالمئة عبر حقن الغاز وإدارة ضغط المكمن. ويُتوقَّع أول ارتفاع ملموس في الإنتاج بعد 18 شهراً من بدء العمليات.",
        "لا يروي هذا النص حدثاً حقيقياً؛ فكل الأرقام والجهات والأطر الزمنية صُنعت لعرض صفحة خدمة النفط.",
      ],
      tr: [
        "Bu haberin kurgusal anlatımına göre proje 1,9 milyar varsayımsal para birimi değerinde olup 40 yeni kuyu, toplama boru hatlarının yenilenmesi ve yeni bir tuz giderme ünitesini kapsıyor.",
        "Aynı senaryoda sahanın geri kazanım faktörü, gaz enjeksiyonu ve rezervuar basınç yönetimiyle yüzde 24'ten yüzde 31'e çıkıyor. İlk belirgin üretim artışı, operasyonların başlamasından 18 ay sonra bekleniyor.",
        "Bu metin gerçek bir olayı aktarmaz; her rakam, gövde ve zaman aralığı petrol servisi sayfasını göstermek için oluşturulmuştur.",
      ],
    },
    tags: {
      fa: ["بالادستی", "بازتوسعه میدان", "ازدیاد برداشت", "۱۴۰۴"],
      en: ["upstream", "field redevelopment", "enhanced recovery", "1404"],
      ar: ["المنبع", "إعادة تطوير الحقل", "زيادة الاستخلاص", "١٤٠٤"],
      tr: ["yukarı akış", "saha yeniden geliştirme", "artırılmış üretim", "1404"],
    },
  },

  {
    slug: "crude-condensate-exports-q1-1404",
    section: "oil",
    topic: "exports",
    jd: [1404, 5, 31],
    t: [7, 45],
    views: 78450,
    readingMinutes: 3,
    featured: true,
    breaking: true,
    author: DESK.business,
    source: SOURCE.wire,
    title: {
      fa: "صادرات نفت خام و میعانات در بهار ۱۴۰۴ افزایش یافت",
      en: "Crude and condensate exports rose in spring 1404",
      ar: "ارتفاع صادرات النفط الخام والمكثّفات في ربيع ١٤٠٤",
      tr: "Ham petrol ve kondensat ihracatı 1404 ilkbaharında arttı",
    },
    lead: {
      fa: "بر پایه داده‌های ساختگی این نمونه، میانگین صادرات سه‌ماهه نخست به ۱٬۶۵ میلیون بشکه در روز رسید؛ حدود ۷ درصد بیشتر از زمستان.",
      en: "On this sample's invented data, first-quarter exports averaged 1.65 million barrels per day, about 7 percent above winter.",
      ar: "استناداً إلى بيانات هذا النموذج المتخيّلة، بلغ متوسط صادرات الربع الأول 1.65 مليون برميل يومياً، بزيادة نحو 7 بالمئة عن الشتاء.",
      tr: "Bu örneğin kurgusal verilerine göre ilk çeyrek ihracatı günde ortalama 1,65 milyon varil oldu; kışa göre yaklaşık yüzde 7 fazla.",
    },
    body: {
      fa: [
        "طبق ارقام فرضی این گزارش، آسیای شرقی با سهم ۶۸ درصد بزرگ‌ترین مقصد بوده و میعانات گازی حدود یک‌پنجم کل محموله‌ها را تشکیل داده است.",
        "در همین سناریو، ذخیره‌سازی شناور نزدیک پایانه‌های صادراتی به کمترین مقدار ۱۸ ماه گذشته رسیده که در این نمونه نشانه روان‌تر شدن تحویل‌ها تفسیر شده است.",
        "این خبر ساختگی است و برای سنجش نمایش داده‌های صادرات در سرویس نفت تهیه شده؛ هیچ عدد آن متکی به منبع واقعی نیست.",
      ],
      en: [
        "On this report's hypothetical figures, East Asia was the top destination with a 68 percent share, and gas condensate made up about a fifth of all cargoes.",
        "In the same scenario, floating storage near export terminals fell to its lowest in 18 months, read in this sample as a sign of smoother deliveries.",
        "This story is fabricated and made to test how export data displays in the oil service; none of its numbers rests on a real source.",
      ],
      ar: [
        "بحسب الأرقام الافتراضية لهذا التقرير، كانت شرق آسيا الوجهة الأولى بحصة 68 بالمئة، وشكّلت المكثّفات الغازية نحو خُمس إجمالي الشحنات.",
        "وفي السيناريو نفسه، هبط التخزين العائم قرب محطات التصدير إلى أدنى مستوى في 18 شهراً، وهو ما يُفسَّر في هذا النموذج كإشارة إلى تسليمات أكثر سلاسة.",
        "هذا الخبر ملفّق وأُعدّ لاختبار عرض بيانات الصادرات في خدمة النفط؛ ولا يستند أي رقم فيه إلى مصدر حقيقي.",
      ],
      tr: [
        "Bu raporun varsayımsal rakamlarına göre Doğu Asya yüzde 68 payla başlıca varış noktasıydı ve gaz kondensatı tüm kargoların yaklaşık beşte birini oluşturdu.",
        "Aynı senaryoda ihracat terminalleri yakınındaki yüzer depolama 18 ayın en düşük seviyesine indi; bu örnekte teslimatların daha akıcı hâle geldiğinin işareti olarak yorumlandı.",
        "Bu haber uydurmadır ve petrol servisinde ihracat verilerinin nasıl görüntülendiğini test etmek için hazırlanmıştır; hiçbir sayısı gerçek bir kaynağa dayanmaz.",
      ],
    },
    tags: {
      fa: ["صادرات", "نفت خام", "میعانات گازی", "۱۴۰۴"],
      en: ["exports", "crude oil", "gas condensate", "1404"],
      ar: ["الصادرات", "النفط الخام", "المكثّفات الغازية", "١٤٠٤"],
      tr: ["ihracat", "ham petrol", "gaz kondensatı", "1404"],
    },
  },

  {
    slug: "refinery-upgrade-gasoline-output-1404",
    section: "oil",
    topic: "refining",
    jd: [1404, 5, 23],
    t: [14, 25],
    views: 40120,
    readingMinutes: 4,
    featured: true,
    breaking: false,
    author: DESK.energy,
    source: SOURCE.company,
    title: {
      fa: "طرح ارتقای پالایشگاه، تولید بنزین را بالا برد و گوگرد را کم کرد",
      en: "Refinery upgrade lifts gasoline output and cuts sulphur",
      ar: "مشروع تطوير المصفاة يرفع إنتاج البنزين ويخفض الكبريت",
      tr: "Rafineri iyileştirmesi benzin üretimini artırdı, kükürdü düşürdü",
    },
    lead: {
      fa: "در این نمونه، راه‌اندازی واحد تصفیه جدید یک پالایشگاه، ظرفیت بنزین یورو-۵ را ۱۲ میلیون لیتر در روز افزایش داد.",
      en: "In this sample, a refinery's new treatment unit added 12 million litres a day of Euro-5 gasoline capacity.",
      ar: "في هذا النموذج، أضافت وحدة معالجة جديدة في مصفاة 12 مليون لتر يومياً من طاقة بنزين يورو-5.",
      tr: "Bu örnekte bir rafinerinin yeni arıtma ünitesi, günde 12 milyon litre Euro-5 benzin kapasitesi ekledi.",
    },
    body: {
      fa: [
        "بر اساس متن ساختگی این خبر، این طرح شامل یک واحد تبدیل کاتالیستی و یک واحد گوگردزدایی است و سرمایه‌گذاری آن ۹۵۰ میلیون واحد پول فرضی اعلام شده است.",
        "در همین سناریو، میانگین گوگرد بنزین خروجی از ۵۰ به کمتر از ۱۰ ‌پی‌پی‌ام کاهش یافته و مازوت تولیدی پالایشگاه حدود ۱۵ درصد کم شده است.",
        "همه ارقام و مشخصات فنی این متن فرضی است و صرفاً برای نمایش نحوه پوشش اخبار پالایش در این دمو نوشته شده است.",
      ],
      en: [
        "On this item's invented text, the project includes a catalytic reforming unit and a desulphurisation unit, with investment stated at 950 million hypothetical currency units.",
        "In the same scenario, average sulphur in the output gasoline fell from 50 to under 10 ppm, and the refinery's fuel-oil yield dropped about 15 percent.",
        "Every figure and technical spec in this text is hypothetical and written only to show how refining news is covered in this demo.",
      ],
      ar: [
        "بحسب النص المتخيّل لهذا الخبر، يشمل المشروع وحدة إعادة تهذيب حفزية ووحدة إزالة كبريت، وأُعلن أن استثماره يبلغ 950 مليون وحدة عملة افتراضية.",
        "وفي السيناريو نفسه، انخفض متوسط الكبريت في البنزين الناتج من 50 إلى أقل من 10 أجزاء في المليون، وتراجع إنتاج زيت الوقود في المصفاة نحو 15 بالمئة.",
        "كل الأرقام والمواصفات الفنية في هذا النص افتراضية وكُتبت فقط لبيان كيفية تغطية أخبار التكرير في هذا النموذج.",
      ],
      tr: [
        "Bu haberin kurgusal metnine göre proje bir katalitik reforming ünitesi ile bir kükürt giderme ünitesini içeriyor ve yatırımın 950 milyon varsayımsal para birimi olduğu belirtiliyor.",
        "Aynı senaryoda çıkış benzinindeki ortalama kükürt 50'den 10 ppm'in altına indi ve rafinerinin fuel-oil verimi yaklaşık yüzde 15 düştü.",
        "Bu metindeki her rakam ve teknik özellik varsayımsaldır ve yalnızca bu demoda rafinaj haberlerinin nasıl işlendiğini göstermek için yazılmıştır.",
      ],
    },
    tags: {
      fa: ["پالایش", "بنزین", "گوگردزدایی", "۱۴۰۴"],
      en: ["refining", "gasoline", "desulphurisation", "1404"],
      ar: ["التكرير", "البنزين", "إزالة الكبريت", "١٤٠٤"],
      tr: ["rafinaj", "benzin", "kükürt giderme", "1404"],
    },
  },

  {
    slug: "brent-range-analysis-late-summer-1404",
    section: "oil",
    topic: "prices",
    jd: [1404, 5, 15],
    t: [17, 30],
    views: 52310,
    readingMinutes: 3,
    featured: false,
    breaking: false,
    author: DESK.business,
    source: SOURCE.analyst,
    title: {
      fa: "تحلیل نمونه: برنت تا پایان تابستان در دامنه باریک می‌ماند",
      en: "Sample analysis: Brent holds a narrow range into late summer",
      ar: "تحليل نموذجي: برنت يبقى ضمن نطاق ضيّق حتى أواخر الصيف",
      tr: "Örnek analiz: Brent yaz sonuna kadar dar bir bantta kalıyor",
    },
    lead: {
      fa: "در این یادداشت فرضی، میز تحلیل دمو انتظار دارد نفت برنت در بازه ۷۸ تا ۸۵ واحد فرضی نوسان کند.",
      en: "In this hypothetical note, the Demo Analysis Desk expects Brent to swing between 78 and 85 fictional units.",
      ar: "في هذه المذكّرة الافتراضية، تتوقّع منضدة التحليل - ديمو أن يتذبذب برنت بين 78 و85 وحدة متخيّلة.",
      tr: "Bu varsayımsal notta Demo Analiz Masası, Brent'in 78 ile 85 kurgusal birim arasında dalgalanmasını bekliyor.",
    },
    body: {
      fa: [
        "بر پایه فرض‌های ساختگی این تحلیل، تقاضای فصلی پالایشگاه‌ها و عرضه پایدار، دو نیروی متوازن‌کننده‌اند و شکست دامنه تنها با یک شوک عرضه محتمل است.",
        "در همین متن، اختلاف قیمت گران بین سبد سنگین و سبک اندکی باز شده که به‌گفته نویسنده فرضی، نشانه ترجیح پالایشگاه‌ها برای خوراک سبک‌تر در این فصل است.",
        "این یادداشت توصیه سرمایه‌گذاری نیست، داده واقعی ندارد و فقط برای نمایش قالب تحلیل بازار در سرویس نفت این دمو تهیه شده است.",
      ],
      en: [
        "On this analysis's invented assumptions, seasonal refinery demand and steady supply are the two balancing forces, and a break of the range is likely only with a supply shock.",
        "In the same text, the quality spread between the heavy and light baskets has widened slightly, which the hypothetical author reads as refiners favouring lighter feed this season.",
        "This note is not investment advice, has no real data, and exists only to show the market-analysis format in this demo's oil service.",
      ],
      ar: [
        "بحسب الافتراضات المتخيّلة لهذا التحليل، يمثّل الطلب الموسمي للمصافي والإمداد المستقر قوّتين متوازنتين، ولا يُرجَّح كسر النطاق إلا مع صدمة في الإمداد.",
        "وفي النص نفسه، اتّسع فارق الجودة بين السلّة الثقيلة والخفيفة قليلاً، وهو ما يقرأه الكاتب الافتراضي على أنه تفضيل المصافي للقيم أخفّ هذا الموسم.",
        "هذه المذكّرة ليست نصيحة استثمارية، ولا تتضمّن بيانات حقيقية، وهي موجودة فقط لعرض صيغة تحليل السوق في خدمة النفط بهذا النموذج.",
      ],
      tr: [
        "Bu analizin kurgusal varsayımlarına göre mevsimsel rafineri talebi ve istikrarlı arz iki dengeleyici güçtür ve bandın kırılması yalnızca bir arz şokuyla olasıdır.",
        "Aynı metinde ağır ve hafif sepet arasındaki kalite farkı hafifçe açıldı; varsayımsal yazar bunu rafinerilerin bu sezon daha hafif hammaddeyi tercih etmesi olarak okuyor.",
        "Bu not yatırım tavsiyesi değildir, gerçek verisi yoktur ve yalnızca bu demonun petrol servisindeki piyasa analizi biçimini göstermek için vardır.",
      ],
    },
    tags: {
      fa: ["قیمت نفت", "برنت", "تحلیل بازار", "۱۴۰۴"],
      en: ["prices", "Brent", "market analysis", "1404"],
      ar: ["الأسعار", "برنت", "تحليل السوق", "١٤٠٤"],
      tr: ["fiyatlar", "Brent", "piyasa analizi", "1404"],
    },
  },

  {
    slug: "enhanced-oil-recovery-pilot-results-1404",
    section: "oil",
    topic: "upstream",
    jd: [1404, 5, 7],
    t: [10, 5],
    views: 21770,
    readingMinutes: 3,
    featured: false,
    breaking: false,
    author: DESK.field,
    source: SOURCE.company,
    title: {
      fa: "پایلوت ازدیاد برداشت از افزایش ضریب بازیافت خبر داد",
      en: "Enhanced-recovery pilot reports a higher recovery factor",
      ar: "تجربة زيادة الاستخلاص تُبلّغ عن ارتفاع معامل الاستخلاص",
      tr: "Artırılmış üretim pilotu daha yüksek geri kazanım oranı bildirdi",
    },
    lead: {
      fa: "در این نمونه، تزریق آب هوشمند در یک بلوک آزمایشی، ضریب بازیافت را در دو سال ۴ واحد درصد بالا برده است.",
      en: "In this sample, smart water injection in a test block raised the recovery factor by 4 percentage points in two years.",
      ar: "في هذا النموذج، رفع حقن المياه الذكي في كتلة اختبار معامل الاستخلاص 4 نقاط مئوية خلال عامين.",
      tr: "Bu örnekte bir test bloğunda akıllı su enjeksiyonu, iki yılda geri kazanım oranını 4 puan artırdı.",
    },
    body: {
      fa: [
        "طبق ارقام ساختگی این گزارش، در بلوک آزمایشی ۶ چاه تولیدی و ۳ چاه تزریقی به‌کار گرفته شده و ترکیب شوری آب تزریقی برای برهم‌زدن چسبندگی نفت به سنگ تنظیم شده است.",
        "در همین سناریو، بهره‌بردار می‌گوید در صورت تعمیم روش به کل میدان، برداشت تجمعی طی یک دهه حدود ۹۰ میلیون بشکه بیشتر خواهد شد.",
        "این متن مستند نیست و همه جزئیات فنی و اقتصادی آن برای نمایش ساختار خبر بالادستی ساخته شده است.",
      ],
      en: [
        "On this report's invented figures, the test block used six producing wells and three injectors, with the salinity of the injected water tuned to disrupt oil sticking to rock.",
        "In the same scenario, the operator says that extending the method to the whole field would add about 90 million barrels of cumulative output over a decade.",
        "This text is not sourced; all its technical and economic detail was built to show the upstream news structure.",
      ],
      ar: [
        "استناداً إلى الأرقام المتخيّلة في هذا التقرير، استُخدم في كتلة الاختبار ست آبار منتجة وثلاث آبار حقن، وضُبطت ملوحة المياه المحقونة لتفكيك التصاق النفط بالصخر.",
        "وفي السيناريو نفسه، يقول المشغّل إن تعميم الطريقة على الحقل بأكمله سيضيف نحو 90 مليون برميل من الإنتاج التراكمي خلال عقد.",
        "هذا النص غير موثّق، وكل تفاصيله الفنية والاقتصادية صُنعت لعرض هيكل خبر المنبع.",
      ],
      tr: [
        "Bu raporun kurgusal rakamlarına göre test bloğunda altı üretim ve üç enjeksiyon kuyusu kullanıldı; enjekte edilen suyun tuzluluğu, petrolün kayaya yapışmasını bozacak şekilde ayarlandı.",
        "Aynı senaryoda operatör, yöntemin tüm sahaya yayılmasının on yılda yaklaşık 90 milyon varil kümülatif üretim ekleyeceğini söylüyor.",
        "Bu metin kaynaklı değildir; tüm teknik ve ekonomik ayrıntıları yukarı akış haber yapısını göstermek için oluşturulmuştur.",
      ],
    },
    tags: {
      fa: ["بالادستی", "ازدیاد برداشت", "تزریق آب", "۱۴۰۴"],
      en: ["upstream", "enhanced recovery", "water injection", "1404"],
      ar: ["المنبع", "زيادة الاستخلاص", "حقن المياه", "١٤٠٤"],
      tr: ["yukarı akış", "artırılmış üretim", "su enjeksiyonu", "1404"],
    },
  },

  {
    slug: "floating-storage-terminal-flexibility-1404",
    section: "oil",
    topic: "exports",
    jd: [1404, 4, 26],
    t: [13, 40],
    views: 17640,
    readingMinutes: 2,
    featured: false,
    breaking: false,
    author: DESK.business,
    source: SOURCE.wire,
    title: {
      fa: "افزوده‌شدن مخزن شناور جدید، انعطاف پایانه صادراتی را بیشتر کرد",
      en: "New floating storage adds flexibility at the export terminal",
      ar: "تخزين عائم جديد يزيد مرونة محطة التصدير",
      tr: "Yeni yüzer depolama ihracat terminaline esneklik kattı",
    },
    lead: {
      fa: "در این نمونه، یک شناور ذخیره‌سازی با ظرفیت ۲ میلیون بشکه به پایانه اصلی صادرات افزوده شده تا زمان‌بندی بارگیری بهتر مدیریت شود.",
      en: "In this sample, a 2-million-barrel storage vessel has been added to the main export terminal to better manage loading schedules.",
      ar: "في هذا النموذج، أُضيفت ناقلة تخزين سعتها مليونا برميل إلى محطة التصدير الرئيسية لتحسين إدارة جداول التحميل.",
      tr: "Bu örnekte yükleme programlarını daha iyi yönetmek için ana ihracat terminaline 2 milyon varillik bir depolama gemisi eklendi.",
    },
    body: {
      fa: [
        "بر پایه متن فرضی این خبر، شناور جدید امکان می‌دهد در روزهای موج بلند، بارگیری بدون توقف کامل ادامه یابد و زمان انتظار نفتکش‌ها حدود ۱۱ ساعت کاهش می‌یابد.",
        "در همین سناریو، بهره‌بردار می‌گوید این ظرفیت مکمل، هزینه معطلی کشتی را در سال حدود ۷ میلیون واحد پول فرضی کم می‌کند.",
        "این خبر ساختگی است و تنها برای تکمیل فهرست اخبار صادرات در سرویس نفت این دمو نوشته شده است.",
      ],
      en: [
        "On this item's hypothetical text, the new vessel lets loading continue on high-swell days without a full stop, cutting tanker waiting time by about 11 hours.",
        "In the same scenario, the operator says this back-up capacity trims ship-demurrage costs by roughly 7 million hypothetical currency units a year.",
        "This story is fabricated and written only to complete the export news list in this demo's oil service.",
      ],
      ar: [
        "بحسب النص الافتراضي لهذا الخبر، تتيح الناقلة الجديدة استمرار التحميل في أيام الأمواج العالية دون توقّف كامل، ما يقلّل زمن انتظار الناقلات نحو 11 ساعة.",
        "وفي السيناريو نفسه، يقول المشغّل إن هذه القدرة الاحتياطية تخفض تكاليف تأخير السفن نحو 7 ملايين وحدة عملة افتراضية سنوياً.",
        "هذا الخبر ملفّق وكُتب فقط لاستكمال قائمة أخبار الصادرات في خدمة النفط بهذا النموذج.",
      ],
      tr: [
        "Bu haberin varsayımsal metnine göre yeni gemi, yüksek dalgalı günlerde yüklemenin tam durmadan sürmesini sağlıyor ve tanker bekleme süresini yaklaşık 11 saat kısaltıyor.",
        "Aynı senaryoda operatör, bu yedek kapasitenin gemi sürastarya maliyetlerini yılda yaklaşık 7 milyon varsayımsal para birimi düşürdüğünü söylüyor.",
        "Bu haber uydurmadır ve yalnızca bu demonun petrol servisindeki ihracat haber listesini tamamlamak için yazılmıştır.",
      ],
    },
    tags: {
      fa: ["صادرات", "مخزن شناور", "پایانه نفتی", "۱۴۰۴"],
      en: ["exports", "floating storage", "oil terminal", "1404"],
      ar: ["الصادرات", "التخزين العائم", "محطة نفطية", "١٤٠٤"],
      tr: ["ihracat", "yüzer depolama", "petrol terminali", "1404"],
    },
  },

  {
    slug: "refining-margins-narrow-report-1404",
    section: "oil",
    topic: "refining",
    jd: [1404, 4, 13],
    t: [16, 15],
    views: 14980,
    readingMinutes: 2,
    featured: false,
    breaking: false,
    author: DESK.business,
    source: SOURCE.analyst,
    title: {
      fa: "گزارش نمونه: حاشیه سود پالایش با بهبود عرضه فرآورده باریک شد",
      en: "Sample report: refining margins narrow as product supply improves",
      ar: "تقرير نموذجي: هوامش التكرير تضيق مع تحسّن إمداد المنتجات",
      tr: "Örnek rapor: ürün arzı iyileşince rafinaj marjları daraldı",
    },
    lead: {
      fa: "در این نمونه، شاخص فرضی حاشیه پالایش منطقه‌ای نسبت به ماه گذشته حدود ۱۸ درصد افت کرده است.",
      en: "In this sample, a hypothetical regional refining-margin index is down about 18 percent from the previous month.",
      ar: "في هذا النموذج، تراجع مؤشر افتراضي لهوامش التكرير الإقليمية نحو 18 بالمئة عن الشهر السابق.",
      tr: "Bu örnekte varsayımsal bir bölgesel rafinaj marjı endeksi, önceki aya göre yaklaşık yüzde 18 geriledi.",
    },
    body: {
      fa: [
        "بر اساس ارقام ساختگی این گزارش، بازگشت چند واحد پالایشی از تعمیرات و افزایش موجودی بنزین و گازوئیل، فشار نزولی بر حاشیه‌ها وارد کرده است.",
        "در همین متن فرضی، انتظار می‌رود با نزدیک‌شدن به فصل سرد و رشد تقاضای نفت‌گاز گرمایشی، بخشی از این افت جبران شود.",
        "این مطلب داده مستند ندارد و صرفاً برای نمایش قالب گزارش بازار در سرویس نفت ساخته شده است.",
      ],
      en: [
        "On this report's invented figures, several refining units returning from maintenance, plus higher gasoline and diesel stocks, have put downward pressure on margins.",
        "In the same hypothetical text, part of the drop is expected to reverse as the cold season nears and heating-gasoil demand grows.",
        "This piece has no sourced data and was built only to show the market-report format in the oil service.",
      ],
      ar: [
        "استناداً إلى الأرقام المتخيّلة في هذا التقرير، أدّت عودة عدة وحدات تكرير من الصيانة وارتفاع مخزونات البنزين والديزل إلى ضغط هبوطي على الهوامش.",
        "وفي النص الافتراضي نفسه، يُتوقَّع أن ينعكس جزء من هذا التراجع مع اقتراب الموسم البارد ونمو الطلب على غاز التدفئة.",
        "لا تتضمّن هذه المادة بيانات موثّقة وصُنعت فقط لعرض صيغة تقرير السوق في خدمة النفط.",
      ],
      tr: [
        "Bu raporun kurgusal rakamlarına göre bakımdan dönen birkaç rafinaj ünitesi ile artan benzin ve motorin stokları marjlar üzerinde aşağı yönlü baskı oluşturdu.",
        "Aynı varsayımsal metinde, soğuk sezon yaklaştıkça ve ısıtma motorin talebi arttıkça düşüşün bir kısmının geri döneceği bekleniyor.",
        "Bu içeriğin kaynaklı verisi yoktur ve yalnızca petrol servisindeki piyasa raporu biçimini göstermek için oluşturulmuştur.",
      ],
    },
    tags: {
      fa: ["پالایش", "حاشیه سود", "فرآورده نفتی", "۱۴۰۴"],
      en: ["refining", "margins", "oil products", "1404"],
      ar: ["التكرير", "الهوامش", "المنتجات النفطية", "١٤٠٤"],
      tr: ["rafinaj", "marjlar", "petrol ürünleri", "1404"],
    },
  },

  {
    slug: "heavy-crude-discount-widens-1404",
    section: "oil",
    topic: "prices",
    jd: [1404, 3, 29],
    t: [11, 55],
    views: 16210,
    readingMinutes: 2,
    featured: false,
    breaking: false,
    author: DESK.business,
    source: SOURCE.analyst,
    title: {
      fa: "تخفیف نفت سنگین در پی بازترشدن اختلاف کیفیت بیشتر شد",
      en: "Heavy-crude discount widens on a bigger quality spread",
      ar: "خصم النفط الثقيل يتّسع مع اتّساع فارق الجودة",
      tr: "Kalite farkının açılmasıyla ağır ham petrol iskontosu genişledi",
    },
    lead: {
      fa: "در این نمونه، فاصله قیمت نفت سنگین با سبد سبک به ۶٬۵ واحد فرضی در هر بشکه رسیده است.",
      en: "In this sample, the price gap between heavy crude and the light basket has reached 6.5 fictional units per barrel.",
      ar: "في هذا النموذج، بلغ فارق السعر بين النفط الثقيل والسلّة الخفيفة 6.5 وحدة متخيّلة للبرميل.",
      tr: "Bu örnekte ağır ham petrol ile hafif sepet arasındaki fiyat farkı varil başına 6,5 kurgusal birime ulaştı.",
    },
    body: {
      fa: [
        "طبق فرض‌های ساختگی این تحلیل، ظرفیت محدود واحدهای تبدیل در برخی پالایشگاه‌های منطقه باعث شده تقاضا برای خوراک سنگین کمتر و تخفیف آن بیشتر شود.",
        "در همین سناریو، اگر چند واحد کک‌سازی جدید طبق برنامه راه‌اندازی شوند، انتظار می‌رود این تخفیف در فصول بعد کمی جمع شود.",
        "این یادداشت توصیه معاملاتی نیست و همه اعداد آن برای نمایش ساختار تحلیل قیمت در این دمو ساخته شده است.",
      ],
      en: [
        "On this analysis's invented assumptions, limited conversion-unit capacity at some regional refineries has softened demand for heavy feed and deepened its discount.",
        "In the same scenario, if several new coking units start up on schedule, the discount is expected to narrow somewhat in later quarters.",
        "This note is not trading advice, and all its numbers were built to show the price-analysis structure in this demo.",
      ],
      ar: [
        "بحسب الافتراضات المتخيّلة لهذا التحليل، أدّت محدودية طاقة وحدات التحويل في بعض مصافي المنطقة إلى ضعف الطلب على اللقيم الثقيل وتعميق خصمه.",
        "وفي السيناريو نفسه، إذا بدأت عدة وحدات فحم كوك جديدة العمل وفق الجدول، فيُتوقَّع أن يضيق الخصم قليلاً في الأرباع اللاحقة.",
        "هذه المذكّرة ليست نصيحة تداول، وكل أرقامها صُنعت لعرض هيكل تحليل الأسعار في هذا النموذج.",
      ],
      tr: [
        "Bu analizin kurgusal varsayımlarına göre bazı bölgesel rafinerilerdeki sınırlı dönüşüm ünitesi kapasitesi, ağır hammadde talebini zayıflattı ve iskontosunu derinleştirdi.",
        "Aynı senaryoda birkaç yeni koklaştırma ünitesi programa uygun devreye girerse iskontonun ilerleyen çeyreklerde bir miktar daralması bekleniyor.",
        "Bu not alım-satım tavsiyesi değildir ve tüm sayıları bu demoda fiyat analizi yapısını göstermek için oluşturulmuştur.",
      ],
    },
    tags: {
      fa: ["قیمت نفت", "نفت سنگین", "اختلاف کیفیت", "۱۴۰۴"],
      en: ["prices", "heavy crude", "quality spread", "1404"],
      ar: ["الأسعار", "النفط الثقيل", "فارق الجودة", "١٤٠٤"],
      tr: ["fiyatlar", "ağır ham petrol", "kalite farkı", "1404"],
    },
  },

  /* ================= PETROCHEMICAL ================================== */
  {
    slug: "methanol-complex-startup-1404",
    section: "petrochemical",
    topic: "projects",
    jd: [1404, 6, 5],
    t: [8, 40],
    views: 69880,
    readingMinutes: 4,
    featured: true,
    breaking: true,
    author: DESK.energy,
    source: SOURCE.company,
    title: {
      fa: "مجتمع متانول جدید با ظرفیت ۱٬۶۵ میلیون تن راه‌اندازی شد",
      en: "New methanol complex starts up with 1.65 million tonnes capacity",
      ar: "بدء تشغيل مجمّع ميثانول جديد بطاقة 1.65 مليون طن",
      tr: "1,65 milyon ton kapasiteli yeni metanol kompleksi devreye girdi",
    },
    lead: {
      fa: "در این نمونه، یک واحد متانول در منطقه ویژه انرژی به مدار تولید پیوست و نخستین محموله صادراتی آن بارگیری شد.",
      en: "In this sample, a methanol unit in the special energy zone joined production and loaded its first export cargo.",
      ar: "في هذا النموذج، انضمت وحدة ميثانول في المنطقة الاقتصادية الخاصة للطاقة إلى الإنتاج وحمّلت أول شحنة تصدير لها.",
      tr: "Bu örnekte özel enerji bölgesindeki bir metanol ünitesi üretime katıldı ve ilk ihracat kargosunu yükledi.",
    },
    body: {
      fa: [
        "بر پایه روایت ساختگی این خبر، این مجتمع با سرمایه‌گذاری ۲٬۳ میلیارد واحد پول فرضی ساخته شده و خوراک آن گاز طبیعی از خط سراسری تأمین می‌شود.",
        "در همین سناریو، حدود ۷۰ درصد تولید برای صادرات و بقیه برای واحدهای پایین‌دستی داخلی مانند فرمالدهید و اسید استیک در نظر گرفته شده است. ظرفیت اسمی روزانه ۴٬۵ هزار تن اعلام شده است.",
        "این متن به رویداد واقعی اشاره ندارد؛ همه ارقام و نهادها برای نمایش صفحه سرویس پتروشیمی ساخته شده‌اند.",
      ],
      en: [
        "On this item's invented account, the complex was built with 2.3 billion hypothetical currency units of investment, and its feedstock is natural gas from the trunkline.",
        "In the same scenario, about 70 percent of output is set aside for export and the rest for domestic downstream units such as formaldehyde and acetic acid. Nameplate capacity is stated at 4,500 tonnes a day.",
        "This text refers to no real event; every figure and body was built to show the petrochemical service page.",
      ],
      ar: [
        "بحسب الرواية المتخيّلة لهذا الخبر، بُني المجمّع باستثمار قدره 2.3 مليار وحدة عملة افتراضية، ولقيمه غاز طبيعي من الخط الرئيسي.",
        "وفي السيناريو نفسه، خُصّص نحو 70 بالمئة من الإنتاج للتصدير والباقي لوحدات محلية لاحقة مثل الفورمالدهيد وحمض الخليك. وأُعلنت الطاقة الاسمية بـ 4,500 طن يومياً.",
        "لا يشير هذا النص إلى حدث حقيقي؛ فكل الأرقام والجهات صُنعت لعرض صفحة خدمة البتروكيماويات.",
      ],
      tr: [
        "Bu haberin kurgusal anlatımına göre kompleks 2,3 milyar varsayımsal para birimi yatırımla inşa edildi ve hammaddesi ana boru hattından gelen doğal gaz.",
        "Aynı senaryoda üretimin yaklaşık yüzde 70'i ihracata, kalanı formaldehit ve asetik asit gibi yurt içi alt sektör ünitelerine ayrıldı. Anma kapasitesi günde 4.500 ton olarak belirtiliyor.",
        "Bu metin gerçek bir olaya atıfta bulunmaz; her rakam ve gövde petrokimya servisi sayfasını göstermek için oluşturulmuştur.",
      ],
    },
    tags: {
      fa: ["طرح‌های توسعه", "متانول", "صادرات", "۱۴۰۴"],
      en: ["projects", "methanol", "exports", "1404"],
      ar: ["المشاريع", "الميثانول", "الصادرات", "١٤٠٤"],
      tr: ["projeler", "metanol", "ihracat", "1404"],
    },
  },

  {
    slug: "polymer-exports-quarterly-record-1404",
    section: "petrochemical",
    topic: "exports",
    jd: [1404, 5, 30],
    t: [12, 30],
    views: 47600,
    readingMinutes: 3,
    featured: true,
    breaking: false,
    author: DESK.business,
    source: SOURCE.wire,
    title: {
      fa: "صادرات محصولات پلیمری در بهار ۱۴۰۴ رکورد فصلی زد",
      en: "Polymer exports set a quarterly record in spring 1404",
      ar: "صادرات المنتجات البوليمرية تسجّل رقماً قياسياً فصلياً في ربيع ١٤٠٤",
      tr: "Polimer ihracatı 1404 ilkbaharında çeyreklik rekor kırdı",
    },
    lead: {
      fa: "بر پایه داده‌های ساختگی این نمونه، صادرات پلی‌اتیلن و پلی‌پروپیلن در سه‌ماهه نخست به ۱٬۹ میلیون تن رسید.",
      en: "On this sample's invented data, polyethylene and polypropylene exports reached 1.9 million tonnes in the first quarter.",
      ar: "استناداً إلى بيانات هذا النموذج المتخيّلة، بلغت صادرات البولي إيثيلين والبولي بروبيلين 1.9 مليون طن في الربع الأول.",
      tr: "Bu örneğin kurgusal verilerine göre polietilen ve polipropilen ihracatı ilk çeyrekte 1,9 milyon tona ulaştı.",
    },
    body: {
      fa: [
        "طبق ارقام فرضی این گزارش، رشد تقاضا در بازارهای آسیایی و راه‌اندازی دو خط جدید گرید صادراتی، عامل اصلی این رکورد عنوان شده است.",
        "در همین سناریو، سهم گریدهای ویژه و مهندسی‌شده از سبد صادرات به ۲۲ درصد رسیده که در این نمونه نشانه حرکت به سمت محصولات با ارزش افزوده بالاتر تفسیر شده است.",
        "این خبر ساختگی است و صرفاً برای نمایش نحوه ارائه آمار صادرات در سرویس پتروشیمی تهیه شده است.",
      ],
      en: [
        "On this report's hypothetical figures, stronger demand in Asian markets and the start-up of two new export-grade lines are named as the main drivers of the record.",
        "In the same scenario, specialty and engineered grades have reached 22 percent of the export mix, read in this sample as a move toward higher-value products.",
        "This story is fabricated and prepared only to show how export statistics are presented in the petrochemical service.",
      ],
      ar: [
        "بحسب الأرقام الافتراضية لهذا التقرير، ذُكر أن قوة الطلب في الأسواق الآسيوية وبدء تشغيل خطّي إنتاج جديدين بمواصفات تصديرية هما المحرّكان الرئيسيان لهذا الرقم القياسي.",
        "وفي السيناريو نفسه، بلغت حصة الأصناف المتخصّصة والهندسية 22 بالمئة من مزيج الصادرات، وهو ما يُقرأ في هذا النموذج كتحرّك نحو منتجات ذات قيمة مضافة أعلى.",
        "هذا الخبر ملفّق وأُعدّ فقط لبيان كيفية عرض إحصاءات الصادرات في خدمة البتروكيماويات.",
      ],
      tr: [
        "Bu raporun varsayımsal rakamlarına göre Asya pazarlarındaki güçlü talep ve iki yeni ihracat sınıfı hattının devreye girmesi rekorun başlıca etkenleri olarak gösteriliyor.",
        "Aynı senaryoda özel ve mühendislik sınıfları ihracat karışımının yüzde 22'sine ulaştı; bu örnekte daha yüksek katma değerli ürünlere yöneliş olarak yorumlanıyor.",
        "Bu haber uydurmadır ve yalnızca petrokimya servisinde ihracat istatistiklerinin nasıl sunulduğunu göstermek için hazırlanmıştır.",
      ],
    },
    tags: {
      fa: ["صادرات", "پلی‌اتیلن", "پلی‌پروپیلن", "۱۴۰۴"],
      en: ["exports", "polyethylene", "polypropylene", "1404"],
      ar: ["الصادرات", "البولي إيثيلين", "البولي بروبيلين", "١٤٠٤"],
      tr: ["ihracat", "polietilen", "polipropilen", "1404"],
    },
  },

  {
    slug: "ethane-feedstock-allocation-1404",
    section: "petrochemical",
    topic: "feedstock",
    jd: [1404, 5, 21],
    t: [15, 10],
    views: 33450,
    readingMinutes: 3,
    featured: false,
    breaking: false,
    author: DESK.energy,
    source: SOURCE.ministry,
    title: {
      fa: "کمیته خوراک، سهمیه اتان کراکرهای جدید را تعیین کرد",
      en: "Feedstock committee sets the ethane allocation for new crackers",
      ar: "لجنة اللقيم تحدّد حصة الإيثان لوحدات التكسير الجديدة",
      tr: "Hammadde komitesi yeni krakerler için etan tahsisini belirledi",
    },
    lead: {
      fa: "در این نمونه، برای سه واحد الفین در حال تکمیل، مجموعاً ۴٬۸ میلیون مترمکعب در روز اتان تخصیص یافته است.",
      en: "In this sample, three olefin units near completion have been allocated a combined 4.8 million cubic metres of ethane per day.",
      ar: "في هذا النموذج، خُصّص لثلاث وحدات أوليفينات قيد الإنجاز ما مجموعه 4.8 مليون متر مكعب من الإيثان يومياً.",
      tr: "Bu örnekte tamamlanmak üzere olan üç olefin ünitesine günde toplam 4,8 milyon metreküp etan tahsis edildi.",
    },
    body: {
      fa: [
        "بر اساس متن ساختگی این خبر، تخصیص خوراک مشروط به پیشرفت فیزیکی بالای ۹۰ درصد و آمادگی زیرساخت انتقال گاز است و در دو مرحله اجرا می‌شود.",
        "در همین سناریو، کمیته می‌گوید با تکمیل واحدهای بازیافت اتان در دو پالایشگاه گاز، عرضه اضافی برای این تخصیص‌ها تأمین خواهد شد.",
        "این مطلب مستند نیست و همه ارقام و فرایندهای آن برای نمایش ساختار خبر خوراک در این دمو ساخته شده است.",
      ],
      en: [
        "On this item's invented text, the allocation is conditional on physical progress above 90 percent and readiness of gas-transfer infrastructure, and is applied in two stages.",
        "In the same scenario, the committee says that completing ethane-recovery units at two gas refineries will provide the extra supply for these allocations.",
        "This piece is not sourced; all its figures and processes were built to show the feedstock news structure in this demo.",
      ],
      ar: [
        "بحسب النص المتخيّل لهذا الخبر، تخضع الحصة لشرط تجاوز التقدّم المادي 90 بالمئة وجاهزية بنية نقل الغاز، وتُطبَّق على مرحلتين.",
        "وفي السيناريو نفسه، تقول اللجنة إن إنجاز وحدات استعادة الإيثان في مصفاتَي غاز سيوفّر الإمداد الإضافي لهذه الحصص.",
        "هذه المادة غير موثّقة، وكل أرقامها وعملياتها صُنعت لعرض هيكل خبر اللقيم في هذا النموذج.",
      ],
      tr: [
        "Bu haberin kurgusal metnine göre tahsis, fiziksel ilerlemenin yüzde 90'ın üzerinde olmasına ve gaz transfer altyapısının hazır olmasına bağlı olup iki aşamada uygulanıyor.",
        "Aynı senaryoda komite, iki gaz rafinerisindeki etan geri kazanım ünitelerinin tamamlanmasının bu tahsisler için ek arzı sağlayacağını söylüyor.",
        "Bu içerik kaynaklı değildir; tüm rakamları ve süreçleri bu demoda hammadde haber yapısını göstermek için oluşturulmuştur.",
      ],
    },
    tags: {
      fa: ["خوراک", "اتان", "کراکر الفین", "۱۴۰۴"],
      en: ["feedstock", "ethane", "olefin cracker", "1404"],
      ar: ["اللقيم", "الإيثان", "وحدة تكسير الأوليفينات", "١٤٠٤"],
      tr: ["hammadde", "etan", "olefin krakeri", "1404"],
    },
  },

  {
    slug: "pdh-plant-construction-progress-1404",
    section: "petrochemical",
    topic: "projects",
    jd: [1404, 5, 13],
    t: [10, 50],
    views: 24990,
    readingMinutes: 3,
    featured: false,
    breaking: false,
    author: DESK.field,
    source: SOURCE.company,
    title: {
      fa: "واحد پروپان‌زدایی از مرز ۸۰ درصد پیشرفت گذشت",
      en: "Propane-dehydrogenation plant passes 80 percent progress",
      ar: "وحدة نزع هيدروجين البروبان تتجاوز 80 بالمئة من الإنجاز",
      tr: "Propan dehidrojenasyon tesisi yüzde 80 ilerlemeyi geçti",
    },
    lead: {
      fa: "در این نمونه، ساخت یک واحد PDH با ظرفیت ۵۰۰ هزار تن پروپیلن در سال به ۸۲ درصد پیشرفت رسیده است.",
      en: "In this sample, construction of a PDH unit for 500,000 tonnes of propylene a year has reached 82 percent.",
      ar: "في هذا النموذج، بلغ بناء وحدة PDH بطاقة 500 ألف طن من البروبيلين سنوياً 82 بالمئة.",
      tr: "Bu örnekte yılda 500 bin ton propilen için bir PDH ünitesinin inşaatı yüzde 82'ye ulaştı.",
    },
    body: {
      fa: [
        "بر پایه داده‌های ساختگی این خبر، عملیات نصب راکتور اصلی و برج‌های تفکیک به پایان رسیده و کار روی واحد جانبی هیدروژن ادامه دارد. راه‌اندازی برای نیمه دوم سال ۱۴۰۴ هدف‌گذاری شده است.",
        "در همین سناریو، پروپیلن تولیدی این واحد خوراک یک مجتمع پلی‌پروپیلن مجاور خواهد بود و زنجیره ارزش محلی را کامل می‌کند.",
        "همه اعداد و زمان‌بندی‌های این متن فرضی است و تنها برای نمایش قالب خبر طرح‌های توسعه به کار رفته است.",
      ],
      en: [
        "On this item's invented data, installation of the main reactor and separation towers is done, and work continues on the hydrogen side-unit. Start-up is targeted for the second half of 1404.",
        "In the same scenario, the unit's propylene will feed a neighbouring polypropylene complex, completing the local value chain.",
        "Every number and schedule in this text is hypothetical and used only to show the project-news format.",
      ],
      ar: [
        "استناداً إلى بيانات هذا الخبر المتخيّلة، اكتمل تركيب المفاعل الرئيسي وأبراج الفصل، ويتواصل العمل على الوحدة الجانبية للهيدروجين. ويُستهدَف بدء التشغيل في النصف الثاني من عام ١٤٠٤.",
        "وفي السيناريو نفسه، سيغذّي البروبيلين الناتج عن هذه الوحدة مجمّع بولي بروبيلين مجاوراً، ما يكمل سلسلة القيمة المحلية.",
        "كل الأرقام والجداول الزمنية في هذا النص افتراضية وتُستخدم فقط لعرض صيغة خبر المشاريع.",
      ],
      tr: [
        "Bu haberin kurgusal verilerine göre ana reaktör ve ayırma kulelerinin montajı tamamlandı, hidrojen yan ünitesinde çalışmalar sürüyor. Devreye alma için 1404'ün ikinci yarısı hedefleniyor.",
        "Aynı senaryoda ünitenin propileni komşu bir polipropilen kompleksini besleyecek ve yerel değer zincirini tamamlayacak.",
        "Bu metindeki her sayı ve takvim varsayımsaldır ve yalnızca proje haberi biçimini göstermek için kullanılmıştır.",
      ],
    },
    tags: {
      fa: ["طرح‌های توسعه", "PDH", "پروپیلن", "۱۴۰۴"],
      en: ["projects", "PDH", "propylene", "1404"],
      ar: ["المشاريع", "PDH", "البروبيلين", "١٤٠٤"],
      tr: ["projeler", "PDH", "propilen", "1404"],
    },
  },

  {
    slug: "domestic-catalyst-production-share-1404",
    section: "petrochemical",
    topic: "production",
    jd: [1404, 5, 2],
    t: [13, 5],
    views: 19430,
    readingMinutes: 3,
    featured: false,
    breaking: false,
    author: DESK.energy,
    source: SOURCE.wire,
    title: {
      fa: "سهم کاتالیست‌های داخلی از نیاز صنعت بیشتر شد",
      en: "Domestic catalysts cover a bigger share of industry demand",
      ar: "الحفّازات المحلية تغطّي حصة أكبر من طلب الصناعة",
      tr: "Yerli katalizörler sanayi talebinin daha büyük bölümünü karşılıyor",
    },
    lead: {
      fa: "در این نمونه، تولید داخلی کاتالیست‌های فرایندی به پوشش ۴۰ درصد نیاز سالانه صنعت پتروشیمی رسیده است.",
      en: "In this sample, domestic production of process catalysts now covers 40 percent of the petrochemical industry's yearly need.",
      ar: "في هذا النموذج، بات الإنتاج المحلي للحفّازات الصناعية يغطّي 40 بالمئة من الحاجة السنوية لصناعة البتروكيماويات.",
      tr: "Bu örnekte proses katalizörlerinin yerli üretimi, petrokimya sanayisinin yıllık ihtiyacının yüzde 40'ını karşılıyor.",
    },
    body: {
      fa: [
        "طبق ارقام ساختگی این گزارش، سه واحد تولید کاتالیست در سال گذشته به ظرفیت اسمی رسیده‌اند و گریدهای مربوط به واحدهای متانول و آمونیاک بیشترین رشد را داشته‌اند.",
        "در همین سناریو، هدف نمونه رساندن این سهم به ۶۰ درصد تا سال ۱۴۰۷ و کاهش وابستگی ارزی مرتبط با واردات کاتالیست است.",
        "این خبر مستند نیست و صرفاً برای نمایش ساختار مطلب تولید در سرویس پتروشیمی این دمو تهیه شده است.",
      ],
      en: [
        "On this report's invented figures, three catalyst plants reached nameplate capacity last year, with grades for methanol and ammonia units growing the most.",
        "In the same scenario, the sample target is to raise this share to 60 percent by 1407 and cut the hard-currency dependence tied to catalyst imports.",
        "This story is not sourced and was prepared only to show the production article structure in this demo's petrochemical service.",
      ],
      ar: [
        "استناداً إلى الأرقام المتخيّلة في هذا التقرير، بلغت ثلاث وحدات لإنتاج الحفّازات طاقتها الاسمية العام الماضي، وسجّلت الأصناف الخاصة بوحدات الميثانول والأمونيا أكبر نمو.",
        "وفي السيناريو نفسه، يتمثّل الهدف النموذجي في رفع هذه الحصة إلى 60 بالمئة بحلول عام ١٤٠٧ وتقليل الاعتماد على العملة الصعبة المرتبط باستيراد الحفّازات.",
        "هذا الخبر غير موثّق وأُعدّ فقط لعرض هيكل مادة الإنتاج في خدمة البتروكيماويات بهذا النموذج.",
      ],
      tr: [
        "Bu raporun kurgusal rakamlarına göre üç katalizör tesisi geçen yıl anma kapasitesine ulaştı; en çok büyüme metanol ve amonyak üniteleri için üretilen sınıflarda görüldü.",
        "Aynı senaryoda örnek hedef, bu payı 1407 yılına kadar yüzde 60'a çıkarmak ve katalizör ithalatına bağlı döviz bağımlılığını azaltmak.",
        "Bu haber kaynaklı değildir ve yalnızca bu demonun petrokimya servisindeki üretim makale yapısını göstermek için hazırlanmıştır.",
      ],
    },
    tags: {
      fa: ["تولید", "کاتالیست", "بومی‌سازی", "۱۴۰۴"],
      en: ["production", "catalyst", "localization", "1404"],
      ar: ["الإنتاج", "الحفّاز", "التوطين", "١٤٠٤"],
      tr: ["üretim", "katalizör", "yerlileştirme", "1404"],
    },
  },

  {
    slug: "urea-ammonia-output-debottleneck-1404",
    section: "petrochemical",
    topic: "production",
    jd: [1404, 4, 21],
    t: [11, 20],
    views: 17820,
    readingMinutes: 2,
    featured: false,
    breaking: false,
    author: DESK.business,
    source: SOURCE.company,
    title: {
      fa: "تولید اوره و آمونیاک پس از رفع گلوگاه بالا رفت",
      en: "Urea and ammonia output rose after debottlenecking",
      ar: "ارتفاع إنتاج اليوريا والأمونيا بعد إزالة الاختناقات",
      tr: "Darboğaz giderme sonrası üre ve amonyak üretimi arttı",
    },
    lead: {
      fa: "در این نمونه، اصلاح مبدل‌های حرارتی و بخش تراکم، ظرفیت عملی دو مجتمع کود را حدود ۸ درصد افزایش داد.",
      en: "In this sample, upgrading heat exchangers and the compression section raised the effective capacity of two fertiliser complexes by about 8 percent.",
      ar: "في هذا النموذج، رفع تحديث المبادلات الحرارية وقسم الضغط الطاقة الفعلية لمجمّعَي أسمدة نحو 8 بالمئة.",
      tr: "Bu örnekte ısı eşanjörlerinin ve sıkıştırma bölümünün yenilenmesi, iki gübre kompleksinin efektif kapasitesini yaklaşık yüzde 8 artırdı.",
    },
    body: {
      fa: [
        "بر اساس متن فرضی این خبر، این اصلاحات در توقف برنامه‌ریزی‌شده ۲۰ روزه انجام شده و بازگشت واحدها بدون حادثه گزارش شده است.",
        "در همین سناریو، بخشی از افزایش تولید به تأمین کود کشاورزی داخلی و بخشی به صادرات منطقه‌ای اختصاص می‌یابد.",
        "همه ارقام این متن ساختگی است و صرفاً برای تکمیل فهرست اخبار تولید در این دمو نوشته شده است.",
      ],
      en: [
        "On this item's hypothetical text, the upgrades were done during a planned 20-day shutdown, and the units returned without incident.",
        "In the same scenario, part of the added output goes to domestic farm fertiliser and part to regional exports.",
        "All numbers in this text are fabricated and written only to complete the production news list in this demo.",
      ],
      ar: [
        "بحسب النص الافتراضي لهذا الخبر، أُجريت التحديثات خلال توقّف مخطّط له مدته 20 يوماً، وعادت الوحدات للعمل دون حوادث.",
        "وفي السيناريو نفسه، يُوجَّه جزء من الإنتاج المضاف إلى الأسمدة الزراعية المحلية وجزء إلى الصادرات الإقليمية.",
        "كل أرقام هذا النص ملفّقة وكُتبت فقط لاستكمال قائمة أخبار الإنتاج في هذا النموذج.",
      ],
      tr: [
        "Bu haberin varsayımsal metnine göre iyileştirmeler planlı 20 günlük duruş sırasında yapıldı ve üniteler olaysız şekilde devreye döndü.",
        "Aynı senaryoda eklenen üretimin bir kısmı yurt içi tarım gübresine, bir kısmı bölgesel ihracata gidiyor.",
        "Bu metindeki tüm sayılar uydurmadır ve yalnızca bu demodaki üretim haber listesini tamamlamak için yazılmıştır.",
      ],
    },
    tags: {
      fa: ["تولید", "اوره", "آمونیاک", "۱۴۰۴"],
      en: ["production", "urea", "ammonia", "1404"],
      ar: ["الإنتاج", "اليوريا", "الأمونيا", "١٤٠٤"],
      tr: ["üretim", "üre", "amonyak", "1404"],
    },
  },

  {
    slug: "petrochemical-port-logistics-upgrade-1404",
    section: "petrochemical",
    topic: "exports",
    jd: [1404, 4, 9],
    t: [14, 45],
    views: 13560,
    readingMinutes: 2,
    featured: false,
    breaking: false,
    author: DESK.business,
    source: SOURCE.wire,
    title: {
      fa: "ارتقای لجستیک بندری، زمان بارگیری محصولات پتروشیمی را کم کرد",
      en: "Port logistics upgrade cuts petrochemical loading time",
      ar: "تطوير لوجستيات الميناء يقلّص زمن تحميل المنتجات البتروكيماوية",
      tr: "Liman lojistiği iyileştirmesi petrokimya yükleme süresini kısalttı",
    },
    lead: {
      fa: "در این نمونه، افزودن دو خط کیسه‌گیری خودکار و یک انبار سرپوشیده جدید، متوسط زمان بارگیری هر کشتی را ۱۴ ساعت کاهش داد.",
      en: "In this sample, two automated bagging lines and a new covered warehouse cut average per-ship loading time by 14 hours.",
      ar: "في هذا النموذج، خفّض خطّا تعبئة آليان ومستودع مغطّى جديد متوسط زمن تحميل كل سفينة 14 ساعة.",
      tr: "Bu örnekte iki otomatik torbalama hattı ve yeni bir kapalı depo, gemi başına ortalama yükleme süresini 14 saat kısalttı.",
    },
    body: {
      fa: [
        "بر پایه ارقام ساختگی این خبر، ظرفیت جابه‌جایی روزانه پایانه محصولات جامد از ۹ به ۱۳ هزار تن رسیده و صف انتظار کامیون‌ها کوتاه‌تر شده است.",
        "در همین سناریو، بهره‌بردار می‌گوید مرحله بعدی شامل سامانه ردیابی محموله و اتصال گمرک الکترونیکی است.",
        "این خبر داده واقعی ندارد و فقط برای نمایش قالب اخبار صادرات در سرویس پتروشیمی این دمو تهیه شده است.",
      ],
      en: [
        "On this item's invented figures, the solids terminal's daily handling capacity rose from 9,000 to 13,000 tonnes, and the truck queue shortened.",
        "In the same scenario, the operator says the next phase includes a cargo-tracking system and an electronic customs link.",
        "This story has no real data and was prepared only to show the export news format in this demo's petrochemical service.",
      ],
      ar: [
        "استناداً إلى الأرقام المتخيّلة في هذا الخبر، ارتفعت الطاقة اليومية لمناولة محطة المواد الصلبة من 9,000 إلى 13,000 طن، وقصُر طابور انتظار الشاحنات.",
        "وفي السيناريو نفسه، يقول المشغّل إن المرحلة التالية تشمل نظام تتبّع الشحنات وربطاً جمركياً إلكترونياً.",
        "لا يتضمّن هذا الخبر بيانات حقيقية وأُعدّ فقط لعرض صيغة أخبار الصادرات في خدمة البتروكيماويات بهذا النموذج.",
      ],
      tr: [
        "Bu haberin kurgusal rakamlarına göre katı ürün terminalinin günlük elleçleme kapasitesi 9.000 tondan 13.000 tona çıktı ve kamyon kuyruğu kısaldı.",
        "Aynı senaryoda operatör, sonraki aşamanın bir kargo takip sistemi ve elektronik gümrük bağlantısı içerdiğini söylüyor.",
        "Bu haberin gerçek verisi yoktur ve yalnızca bu demonun petrokimya servisindeki ihracat haber biçimini göstermek için hazırlanmıştır.",
      ],
    },
    tags: {
      fa: ["صادرات", "لجستیک بندری", "بارگیری", "۱۴۰۴"],
      en: ["exports", "port logistics", "loading", "1404"],
      ar: ["الصادرات", "لوجستيات الميناء", "التحميل", "١٤٠٤"],
      tr: ["ihracat", "liman lojistiği", "yükleme", "1404"],
    },
  },

  {
    slug: "gas-feedstock-price-formula-1404",
    section: "petrochemical",
    topic: "feedstock",
    jd: [1404, 3, 27],
    t: [9, 30],
    views: 28310,
    readingMinutes: 3,
    featured: false,
    breaking: false,
    author: DESK.business,
    source: SOURCE.ministry,
    title: {
      fa: "فرمول تازه قیمت خوراک گاز واحدهای پتروشیمی اجرایی شد",
      en: "New gas-feedstock price formula takes effect for petrochemical units",
      ar: "بدء تطبيق صيغة جديدة لسعر لقيم الغاز لوحدات البتروكيماويات",
      tr: "Petrokimya üniteleri için yeni gaz hammadde fiyat formülü yürürlüğe girdi",
    },
    lead: {
      fa: "در این نمونه، قیمت خوراک گاز بر پایه میانگین متحرک چند شاخص داخلی و یک سقف فصلی تعیین می‌شود تا نوسان کمتر شود.",
      en: "In this sample, the gas-feedstock price is set from a moving average of several domestic indices plus a seasonal cap, to reduce volatility.",
      ar: "في هذا النموذج، يُحدَّد سعر لقيم الغاز من متوسط متحرك لعدة مؤشرات محلية إضافةً إلى سقف فصلي، للحدّ من التقلّب.",
      tr: "Bu örnekte gaz hammadde fiyatı, oynaklığı azaltmak için birkaç yerli endeksin hareketli ortalaması ve mevsimsel bir tavan üzerinden belirleniyor.",
    },
    body: {
      fa: [
        "بر اساس متن ساختگی این خبر، فرمول جدید یک کف و سقف مشخص دارد و بازنگری آن هر سه ماه یک‌بار انجام می‌شود. هدف اعلام‌شده، پیش‌بینی‌پذیرتر کردن بهای تمام‌شده برای واحدهای متانول و اوره است.",
        "در همین سناریو، انجمن کارفرمایی فرضی صنعت از کاهش ریسک سرمایه‌گذاری استقبال کرده اما درباره سطح سقف فصلی ابهام دارد.",
        "این مطلب مستند نیست و همه اجزای آن برای نمایش ساختار خبر خوراک در این دمو ساخته شده است.",
      ],
      en: [
        "On this item's invented text, the new formula has a defined floor and ceiling and is reviewed every three months. The stated aim is to make input costs more predictable for methanol and urea units.",
        "In the same scenario, a hypothetical industry employers' association welcomes the lower investment risk but is unsure about the level of the seasonal cap.",
        "This piece is not sourced; all its parts were built to show the feedstock news structure in this demo.",
      ],
      ar: [
        "بحسب النص المتخيّل لهذا الخبر، للصيغة الجديدة حدّ أدنى وحدّ أقصى محدَّدان وتُراجَع كل ثلاثة أشهر. والهدف المعلن هو جعل تكاليف المدخلات أكثر قابلية للتنبؤ لوحدات الميثانول واليوريا.",
        "وفي السيناريو نفسه، ترحّب رابطة أرباب عمل افتراضية في الصناعة بتراجع مخاطر الاستثمار لكنها غير متأكدة من مستوى السقف الفصلي.",
        "هذه المادة غير موثّقة؛ وكل أجزائها صُنعت لعرض هيكل خبر اللقيم في هذا النموذج.",
      ],
      tr: [
        "Bu haberin kurgusal metnine göre yeni formülün tanımlı bir taban ve tavanı var ve her üç ayda bir gözden geçiriliyor. Belirtilen amaç, metanol ve üre üniteleri için girdi maliyetlerini daha öngörülebilir kılmak.",
        "Aynı senaryoda varsayımsal bir sanayi işverenleri derneği, düşen yatırım riskini olumlu karşılıyor ancak mevsimsel tavanın düzeyi konusunda kararsız.",
        "Bu içerik kaynaklı değildir; tüm bölümleri bu demoda hammadde haber yapısını göstermek için oluşturulmuştur.",
      ],
    },
    tags: {
      fa: ["خوراک", "قیمت گاز", "سیاست‌گذاری", "۱۴۰۴"],
      en: ["feedstock", "gas price", "policy", "1404"],
      ar: ["اللقيم", "سعر الغاز", "السياسات", "١٤٠٤"],
      tr: ["hammadde", "gaz fiyatı", "politika", "1404"],
    },
  },
];

/* --------------------------------------------------------------------- */
/*  Extra breaking-only headlines (not full articles). time = [hh, mm]    */
/*  Each points at a real article slug so the ticker links resolve.       */
/* --------------------------------------------------------------------- */

export const EXTRA_BREAKING = [
  {
    slug: "grid-summer-peak-record-1404",
    section: "energy",
    t: [18, 5],
    title: {
      fa: "هشدار مصرف: بار شبکه دوباره به محدوده بحرانی نزدیک شد",
      en: "Demand alert: grid load again nears the critical band",
      ar: "تحذير الطلب: حمل الشبكة يقترب مجدداً من النطاق الحرج",
      tr: "Talep uyarısı: şebeke yükü yine kritik banda yaklaştı",
    },
  },
  {
    slug: "crude-condensate-exports-q1-1404",
    section: "oil",
    t: [12, 20],
    title: {
      fa: "نخستین محموله میعانات از پایانه جدید بارگیری شد",
      en: "First condensate cargo loads from the new terminal",
      ar: "تحميل أول شحنة مكثّفات من المحطة الجديدة",
      tr: "Yeni terminalden ilk kondensat kargosu yüklendi",
    },
  },
  {
    slug: "methanol-complex-startup-1404",
    section: "petrochemical",
    t: [9, 15],
    title: {
      fa: "واحد متانول به ظرفیت پایدار ۹۵ درصد رسید",
      en: "Methanol unit reaches a stable 95 percent of capacity",
      ar: "وحدة الميثانول تبلغ 95 بالمئة مستقرة من الطاقة",
      tr: "Metanol ünitesi kapasitenin istikrarlı yüzde 95'ine ulaştı",
    },
  },
  {
    slug: "polymer-exports-quarterly-record-1404",
    section: "petrochemical",
    t: [15, 40],
    title: {
      fa: "بورس کالا: معاملات گریدهای صادراتی پلیمر رکورد روزانه زد",
      en: "Commodity exchange: export-grade polymer trades hit a daily record",
      ar: "بورصة السلع: تداولات البوليمر بمواصفات تصديرية تسجّل رقماً يومياً قياسياً",
      tr: "Emtia borsası: ihracat sınıfı polimer işlemleri günlük rekor kırdı",
    },
  },
  {
    slug: "brent-range-analysis-late-summer-1404",
    section: "oil",
    t: [17, 55],
    title: {
      fa: "میز تحلیل: دامنه نوسان برنت باریک‌تر شد",
      en: "Analysis desk: Brent's trading range tightens further",
      ar: "منضدة التحليل: نطاق تداول برنت يزداد ضيقاً",
      tr: "Analiz masası: Brent'in işlem bandı daha da daraldı",
    },
  },
];
