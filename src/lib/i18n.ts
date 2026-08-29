import type { Locale, SectionSlug } from "./types";
import { LOCALES, RTL_LOCALES } from "./types";

export function isLocale(value: string): value is Locale {
  return (LOCALES as string[]).includes(value);
}

export const dir = (locale: Locale): "rtl" | "ltr" =>
  (RTL_LOCALES as string[]).includes(locale) ? "rtl" : "ltr";

export const localeNames: Record<Locale, string> = {
  fa: "فارسی",
  en: "English",
  ar: "العربية",
  tr: "Türkçe",
};

type Dict = {
  siteName: string;
  tagline: string;
  nav: {
    home: string;
  } & Record<SectionSlug, string>;
  common: {
    breaking: string;
    latestNews: string;
    mostViewed: string;
    photoNews: string;
    readMore: string;
    loadMore: string;
    loading: string;
    error: string;
    retry: string;
    views: string;
    minRead: string;
    source: string;
    publishedOn: string;
    relatedNews: string;
    topics: string;
    allTopics: string;
    noResults: string;
    backToSection: string;
    page: string;
    of: string;
    language: string;
  };
  footer: {
    about: string;
    aboutText: string;
    quickLinks: string;
    contact: string;
    address: string;
    rights: string;
    disclaimer: string;
  };
};

export const dictionaries: Record<Locale, Dict> = {
  fa: {
    siteName: "نفت فوری",
    tagline: "پوشش لحظه‌ای اخبار نفت، انرژی و پتروشیمی",
    nav: {
      home: "صفحه نخست",
      energy: "انرژی",
      oil: "نفت",
      petrochemical: "پتروشیمی",
    },
    common: {
      breaking: "فوری",
      latestNews: "آخرین اخبار",
      mostViewed: "پربازدیدترین‌ها",
      photoNews: "عکس خبری",
      readMore: "ادامه مطلب",
      loadMore: "اخبار بیشتر",
      loading: "در حال بارگذاری…",
      error: "خطا در دریافت اطلاعات",
      retry: "تلاش دوباره",
      views: "بازدید",
      minRead: "دقیقه مطالعه",
      source: "منبع",
      publishedOn: "تاریخ انتشار",
      relatedNews: "اخبار مرتبط",
      topics: "موضوعات",
      allTopics: "همه موضوعات",
      noResults: "خبری برای نمایش وجود ندارد",
      backToSection: "بازگشت به سرویس",
      page: "صفحه",
      of: "از",
      language: "زبان",
    },
    footer: {
      about: "درباره ما",
      aboutText:
        "«نفت فوری» یک نمونه آزمایشی (دمو) است؛ همه اخبار، ارقام و منابع ساختگی‌اند و تنها برای نمایش ساختار صفحه در سال ۱۴۰۴ تهیه شده‌اند.",
      quickLinks: "دسترسی سریع",
      contact: "ارتباط با ما",
      address: "تهران، خیابان ولیعصر، پلاک ۱۴۰۴",
      rights: "کلیه حقوق این نسخه نمایشی محفوظ است.",
      disclaimer: "داده‌ها ساختگی است و ارزش خبری ندارد.",
    },
  },
  en: {
    siteName: "Naft Fouri",
    tagline: "Breaking coverage of oil, energy and petrochemicals",
    nav: {
      home: "Home",
      energy: "Energy",
      oil: "Oil",
      petrochemical: "Petrochemical",
    },
    common: {
      breaking: "Breaking",
      latestNews: "Latest news",
      mostViewed: "Most viewed",
      photoNews: "Photo news",
      readMore: "Read more",
      loadMore: "Load more",
      loading: "Loading…",
      error: "Failed to load data",
      retry: "Try again",
      views: "views",
      minRead: "min read",
      source: "Source",
      publishedOn: "Published",
      relatedNews: "Related news",
      topics: "Topics",
      allTopics: "All topics",
      noResults: "No articles to show",
      backToSection: "Back to section",
      page: "Page",
      of: "of",
      language: "Language",
    },
    footer: {
      about: "About",
      aboutText:
        "“Naft Fouri” is a demo. Every headline, figure and source is fabricated and exists only to show the page structure for the year 1404 (2025–2026).",
      quickLinks: "Quick links",
      contact: "Contact",
      address: "No. 1404, Valiasr St., Tehran",
      rights: "All rights reserved for this demo build.",
      disclaimer: "Data is fictional and has no news value.",
    },
  },
  ar: {
    siteName: "نفط فوري",
    tagline: "تغطية فورية لأخبار النفط والطاقة والبتروكيماويات",
    nav: {
      home: "الصفحة الرئيسية",
      energy: "الطاقة",
      oil: "النفط",
      petrochemical: "البتروكيماويات",
    },
    common: {
      breaking: "عاجل",
      latestNews: "آخر الأخبار",
      mostViewed: "الأكثر مشاهدة",
      photoNews: "أخبار مصوّرة",
      readMore: "اقرأ المزيد",
      loadMore: "أخبار أكثر",
      loading: "جارٍ التحميل…",
      error: "تعذّر جلب البيانات",
      retry: "إعادة المحاولة",
      views: "مشاهدة",
      minRead: "دقيقة قراءة",
      source: "المصدر",
      publishedOn: "تاريخ النشر",
      relatedNews: "أخبار ذات صلة",
      topics: "الموضوعات",
      allTopics: "كل الموضوعات",
      noResults: "لا توجد أخبار للعرض",
      backToSection: "العودة إلى القسم",
      page: "صفحة",
      of: "من",
      language: "اللغة",
    },
    footer: {
      about: "من نحن",
      aboutText:
        "«نفط فوري» نسخة تجريبية (ديمو)؛ جميع الأخبار والأرقام والمصادر متخيّلة، وُضعت فقط لعرض هيكل الصفحة لعام ١٤٠٤ الشمسي (2025–2026).",
      quickLinks: "روابط سريعة",
      contact: "اتصل بنا",
      address: "طهران، شارع ولي العصر، رقم ١٤٠٤",
      rights: "جميع الحقوق محفوظة لهذه النسخة التجريبية.",
      disclaimer: "البيانات متخيّلة ولا قيمة خبرية لها.",
    },
  },
  tr: {
    siteName: "Naft Fouri",
    tagline: "Petrol, enerji ve petrokimyada anlık haber akışı",
    nav: {
      home: "Ana sayfa",
      energy: "Enerji",
      oil: "Petrol",
      petrochemical: "Petrokimya",
    },
    common: {
      breaking: "Son dakika",
      latestNews: "Son haberler",
      mostViewed: "En çok okunanlar",
      photoNews: "Fotoğraflı haber",
      readMore: "Devamını oku",
      loadMore: "Daha fazla",
      loading: "Yükleniyor…",
      error: "Veriler alınamadı",
      retry: "Tekrar dene",
      views: "görüntülenme",
      minRead: "dk okuma",
      source: "Kaynak",
      publishedOn: "Yayın tarihi",
      relatedNews: "İlgili haberler",
      topics: "Konular",
      allTopics: "Tüm konular",
      noResults: "Gösterilecek haber yok",
      backToSection: "Bölüme dön",
      page: "Sayfa",
      of: "/",
      language: "Dil",
    },
    footer: {
      about: "Hakkımızda",
      aboutText:
        "“Naft Fouri” bir demodur. Tüm başlıklar, rakamlar ve kaynaklar kurgusaldır; yalnızca 1404 (2025–2026) yılı için sayfa yapısını göstermek amacıyla hazırlanmıştır.",
      quickLinks: "Hızlı bağlantılar",
      contact: "İletişim",
      address: "No. 1404, Valiasr Cad., Tahran",
      rights: "Bu demo sürümün tüm hakları saklıdır.",
      disclaimer: "Veriler kurgusaldır ve haber değeri taşımaz.",
    },
  },
};

export function getDictionary(locale: Locale): Dict {
  return dictionaries[locale];
}
