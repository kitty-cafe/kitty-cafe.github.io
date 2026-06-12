import { useState, useEffect, useRef } from "react";
import "./App.css";

const translations = {
  th: {
    lang: "EN 🇬🇧",
    tagline: "ร้านอาหารและคาเฟ่",
    phone: "โทร",
    line: "ไลน์",
    findUs: "มาหาเราได้ที่",
    address: "ถนนสายหลัก, เมืองไทย",
    hours: "เวลาทำการ",
    hoursData: [
      { day: "จันทร์", open: "09:00", close: "17:00" },
      { day: "อังคาร", open: "09:00", close: "20:00" },
      { day: "พุธ", open: "10:00", close: "18:00" },
      { day: "พฤหัสบดี", open: "09:00", close: "18:00" },
      { day: "ศุกร์", open: "09:00", close: "21:00" },
      { day: "เสาร์", open: null, close: null },
      { day: "อาทิตย์", open: "10:00", close: "17:00" },
    ],
    closed: "ปิด",
    categories: {
      spaghetti: "สปาเก็ตตี้",
      rice: "ข้าว",
      basil: "ข้าวกะเพรา",
      sukiyaki: "สุกี้ & ผัดฉ่า",
      salad: "ยำรสเด็ด",
      steak: "สเต็ก",
      fish: "สเต็กปลา",
      pizza: "พิซซ่า",
    },
    items: {
      carbonara: { name: "คาร์โบนาร่า", desc: "สปาเก็ตตี้ซอสครีมเนื้อนุ่ม" },
      padKeeMaoSeafood: { name: "ผัดขี้เมาทะเล", desc: "สปาเก็ตตี้ผัดขี้เมาซีฟู้ด" },
      mincedPork: { name: "ซอสหมู", desc: "สปาเก็ตตี้ซอสหมูสับ" },
      bolognese: { name: "โบโลเนส", desc: "สปาเก็ตตี้ซอสเนื้อ" },
      driedChili: { name: "ผัดพริกแห้งเบคอน", desc: "สปาเก็ตตี้ผัดพริกแห้งและกระเทียม" },
      mamaNoodles: { name: "มาม่าผัดขี้เมาทะเล", desc: "มาม่าผัดขี้เมาซีฟู้ด" },
      yellowNoodles: { name: "หมี่เหลืองผัดหมูสับ", desc: "หมี่เหลืองผัดกับหมูสับ" },
      koreanPork: { name: "ข้าวหน้าหมูเกาหลี", desc: "ข้าวหน้าหมูสไตล์เกาหลี" },
      chickenTeriyaki: { name: "ข้าวหน้าไก่เทอริยากิ", desc: "ไก่เทอริยากิราดข้าว" },
      friedRicePork: { name: "ข้าวผัดหมู", desc: "ข้าวผัดหมูสูตรต้นตำรับ" },
      friedRiceSeafood: { name: "ข้าวผัดทะเล", desc: "ข้าวผัดซีฟู้ดรสเด็ด" },
      tomYumFriedRice: { name: "ข้าวผัดต้มยำทะเล", desc: "ข้าวผัดต้มยำซีฟู้ด" },
      basilSeafood: { name: "ผัดกะเพราทะเลราดข้าว", desc: "กะเพราซีฟู้ดราดข้าวร้อน" },
      basilMincedPork: { name: "ผัดกะเพราหมูสับราดข้าว", desc: "กะเพราหมูสับราดข้าว" },
      basilCrispyPork: { name: "ผัดกะเพราหมูกรอบราดข้าว", desc: "กะเพราหมูกรอบไข่ดาว" },
      garlicPork: { name: "หมูทอดกระเทียมพริกไทย", desc: "หมูทอดกระเทียมราดข้าว" },
      eggMincedPork: { name: "ข้าวไข่เจียวหมูสับ", desc: "ไข่เจียวหมูสับราดข้าว" },
      sukiPork: { name: "สุกี้หมู", desc: "สุกี้หมูน้ำ" },
      sukiSeafood: { name: "สุกี้ทะเล", desc: "สุกี้ซีฟู้ดน้ำ" },
      stirSeafoodRice: { name: "ผัดฉ่าทะเลราดข้าว", desc: "ผัดฉ่าซีฟู้ดเผ็ดร้อน" },
      stirDoryRice: { name: "ผัดฉ่าปลาดอลลี่ราดข้าว", desc: "ผัดฉ่าปลาดอลลี่ราดข้าว" },
      vermicellliPorkSausage: { name: "ยำวุ้นเส้น หมู + หมูยอ", desc: "ยำวุ้นเส้นหมูและหมูยอรสจัด" },
      vermicellliSeafood: { name: "ยำวุ้นเส้นทะเล", desc: "ยำวุ้นเส้นซีฟู้ดเปรี้ยวเผ็ด" },
      mixedSeafoodSalad: { name: "ยำรวมทะเล", desc: "ยำซีฟู้ดรวมรสเด็ด" },
      ribeyeBeef: { name: "ริบอายสเต็ก (สันนอก)", desc: "เนื้อสันนอก มันฝรั่งทอด สลัด" },
      tBoneBeef: { name: "ที-โบนสเต็ก (สันใน)", desc: "เนื้อสันใน มันฝรั่งทอด ผักต้ม" },
      ribeyePork: { name: "หมูริบอาย (สันนอก)", desc: "หมูสันนอก มันฝรั่งทอด สลัด" },
      tBonePork: { name: "ที-โบนหมู (สันใน)", desc: "หมูสันใน มันฝรั่งทอด ผักต้ม" },
      porkChop: { name: "พอร์คช็อป", desc: "พอร์คช็อปหมู มันฝรั่งทอด" },
      doryBreadcrumb: { name: "ปลาดอลลี่ทอดเกล็ดขนมปัง", desc: "มันฝรั่งทอด สลัดผัก" },
      seabassSteak: { name: "สเต็กปลากะพงทอด", desc: "มันฝรั่งทอด สลัดผัก" },
      doryGrilled: { name: "สเต็กปลาดอลลี่ย่าง", desc: "มันฝรั่ง สลัดผัก หรือผักต้ม" },
      salmonSteak: { name: "สเต็กปลาแซลมอน", desc: "มันฝรั่งทอด ผักสลัด" },
      salamiPizza: { name: "ซาลามี่", desc: "ซอสมะเขือเทศ มอสซาเรลล่า ซาลามี่" },
      seafoodPizza: { name: "ซีฟู้ด", desc: "ซอสเทาซัน กุ้ง ปลาหมึก ปูอัด หอย" },
      seafoodTomYumPizza: { name: "ซีฟู้ดต้มยำ", desc: "ซอสพริกเผาต้มยำ กุ้ง ปลาหมึก" },
      smokedSalmonPizza: { name: "แซลมอนรมควัน", desc: "ซอสมะเขือเทศ แซลมอนรมควัน มะกอก" },
      kittyCafePizza: { name: "คิตตี้คาเฟ่พิซซ่า", desc: "ซอสมะเขือเทศ หมูสับ กุ้ง หอมใหญ่ ซอสลาบ" },
    },
    footer: "© 2026 Kitty Cafe · สงวนลิขสิทธิ์",
    mapLabel: "แผนที่",
    openMaps: "ดูแผนที่ใน Google Maps",
  },
  en: {
    lang: "ไทย 🇹🇭",
    tagline: "Thai Restaurant & Café",
    phone: "Tel",
    line: "Line",
    findUs: "Find Us Here",
    address: "Main Road, Thailand",
    hours: "Opening Hours",
    hoursData: [
      { day: "Mon", open: "09:00", close: "17:00" },
      { day: "Tue", open: "09:00", close: "20:00" },
      { day: "Wed", open: "10:00", close: "18:00" },
      { day: "Thu", open: "09:00", close: "18:00" },
      { day: "Fri", open: "09:00", close: "21:00" },
      { day: "Sat", open: null, close: null },
      { day: "Sun", open: "10:00", close: "17:00" },
    ],
    closed: "Closed",
    categories: {
      spaghetti: "Spaghetti",
      rice: "Rice",
      basil: "Basil",
      sukiyaki: "Sukiyaki",
      salad: "Salads",
      steak: "Steak",
      fish: "Fish",
      pizza: "Pizza",
    },
    items: {
      carbonara: { name: "Carbonara", desc: "Creamy carbonara spaghetti" },
      padKeeMaoSeafood: { name: "Spicy Seafood Spaghetti", desc: "Stir-fried spaghetti pad kee mao with seafood" },
      mincedPork: { name: "Minced Pork Spaghetti", desc: "Spaghetti with minced pork sauce" },
      bolognese: { name: "Spaghetti Bolognese", desc: "Classic beef bolognese" },
      driedChili: { name: "Dried Chili & Garlic Spaghetti", desc: "Spaghetti with dried chillies and bacon" },
      mamaNoodles: { name: "Mama Noodles Pad Kee Mao Seafood", desc: "Instant noodles stir-fried pad kee mao with seafood" },
      yellowNoodles: { name: "Yellow Noodles with Minced Pork", desc: "Stir-fried yellow noodles with minced pork" },
      koreanPork: { name: "Korean Pork Rice", desc: "Korean-style pork over rice" },
      chickenTeriyaki: { name: "Chicken Teriyaki Rice", desc: "Teriyaki chicken over steamed rice" },
      friedRicePork: { name: "Pork Fried Rice", desc: "Classic Thai pork fried rice" },
      friedRiceSeafood: { name: "Seafood Fried Rice", desc: "Fried rice with mixed seafood" },
      tomYumFriedRice: { name: "Tom Yum Seafood Fried Rice", desc: "Spicy tom yum fried rice with seafood" },
      basilSeafood: { name: "Basil Seafood over Rice", desc: "Stir-fried basil with seafood on rice" },
      basilMincedPork: { name: "Basil Minced Pork over Rice", desc: "Stir-fried basil with minced pork on rice" },
      basilCrispyPork: { name: "Basil Crispy Pork over Rice", desc: "Crispy pork basil stir-fry with fried egg" },
      garlicPork: { name: "Garlic & Pepper Pork", desc: "Fried pork with garlic and black pepper" },
      eggMincedPork: { name: "Omelette with Minced Pork", desc: "Thai-style omelette with minced pork on rice" },
      sukiPork: { name: "Pork Sukiyaki", desc: "Sukiyaki soup with pork" },
      sukiSeafood: { name: "Seafood Sukiyaki", desc: "Sukiyaki soup with mixed seafood" },
      stirSeafoodRice: { name: "Stir-fried Seafood over Rice", desc: "Spicy stir-fried mixed seafood on rice" },
      stirDoryRice: { name: "Stir-fried Dory Fish over Rice", desc: "Spicy stir-fried dory fish on rice" },
      vermicellliPorkSausage: { name: "Glass Noodle Salad (Pork & Sausage)", desc: "Spicy glass noodle salad with pork and sausage" },
      vermicellliSeafood: { name: "Seafood Glass Noodle Salad", desc: "Spicy glass noodle salad with seafood" },
      mixedSeafoodSalad: { name: "Mixed Seafood Salad", desc: "Spicy mixed seafood salad" },
      ribeyeBeef: { name: "Beef Ribeye (Sirloin)", desc: "Sirloin beef, fries, and salad" },
      tBoneBeef: { name: "Beef T-Bone (Tenderloin)", desc: "Tenderloin beef, fries, and steamed veg" },
      ribeyePork: { name: "Pork Ribeye (Sirloin)", desc: "Pork sirloin, fries, and salad" },
      tBonePork: { name: "Pork T-Bone (Tenderloin)", desc: "Pork tenderloin, fries, and steamed veg" },
      porkChop: { name: "Pork Chop", desc: "Pork chop with fries" },
      doryBreadcrumb: { name: "Breaded Dory Fish Steak", desc: "Served with fries and vegetable salad" },
      seabassSteak: { name: "Seabass Steak", desc: "Served with fries and vegetable salad" },
      doryGrilled: { name: "Grilled Dory Steak", desc: "With fries, salad or steamed veg" },
      salmonSteak: { name: "Salmon Steak", desc: "Served with fries and green salad" },
      salamiPizza: { name: "Salami", desc: "Tomato sauce, mozzarella, salami" },
      seafoodPizza: { name: "Seafood", desc: "Thousand island, shrimp, squid, crab stick, mussels" },
      seafoodTomYumPizza: { name: "Seafood Tom Yum", desc: "Tom yum chili paste, shrimp, squid" },
      smokedSalmonPizza: { name: "Smoked Salmon", desc: "Tomato sauce, smoked salmon, olives, onion" },
      kittyCafePizza: { name: "Kitty Cafe Special", desc: "Tomato sauce, minced pork, shrimp, onion, laab sauce" },
    },
    footer: "© 2026 Kitty Cafe · All Rights Reserved",
    mapLabel: "Location",
    openMaps: "Open in Google Maps",
  },
};

// ── Replace with your real Line ID ──────────────────────────────────────────
const LINE_ID = "meyou2801";
const LINE_URL = `https://line.me/ti/p/~${LINE_ID}`;
const SHOW_LINE = false; // ← set to true when you have the Line link ready
// ────────────────────────────────────────────────────────────────────────────

const LineIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    style={{ flexShrink: 0 }}
  >
    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.105.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
  </svg>
);

type Lang = "th" | "en";
type Theme = "light" | "dark";

const menuData = [
  {
    id: "spaghetti",
    emoji: "🍝",
    color: "#6B1A1A",
    items: [
      { key: "carbonara", price: "89.-", tag: null },
      { key: "padKeeMaoSeafood", price: "89.-", tag: null },
      { key: "mincedPork", price: "79.-", tag: null },
      { key: "bolognese", price: "99.-", tag: null },
      { key: "driedChili", price: "89.-", tag: null },
      { key: "mamaNoodles", price: "69.-", tag: null },
      { key: "yellowNoodles", price: "55.-", tag: null },
    ],
  },
  {
    id: "rice",
    emoji: "🍚",
    color: "#2D5A27",
    items: [
      { key: "koreanPork", price: "89.-", tag: "🇰🇷" },
      { key: "chickenTeriyaki", price: "79.-", tag: "🇰🇷" },
      { key: "friedRicePork", price: "50.-", tag: null },
      { key: "friedRiceSeafood", price: "55.-", tag: null },
      { key: "tomYumFriedRice", price: "60.-", tag: "🌶" },
    ],
  },
  {
    id: "basil",
    emoji: "🌿",
    color: "#2D5A27",
    items: [
      { key: "basilSeafood", price: "60.-", tag: "🌶" },
      { key: "basilMincedPork", price: "45.-", tag: "🌶" },
      { key: "basilCrispyPork", price: "55.-", tag: "🌶" },
      { key: "garlicPork", price: "55.-", tag: null },
      { key: "eggMincedPork", price: "50.-", tag: null },
    ],
  },
  {
    id: "sukiyaki",
    emoji: "🥘",
    color: "#2D5A27",
    items: [
      { key: "sukiPork", price: "45.-", tag: null },
      { key: "sukiSeafood", price: "55.-", tag: null },
      { key: "stirSeafoodRice", price: "60.-", tag: "🌶" },
      { key: "stirDoryRice", price: "65.-", tag: "🌶" },
    ],
  },
  {
    id: "salad",
    emoji: "🥗",
    color: "#2D5A27",
    items: [
      { key: "vermicellliPorkSausage", price: "70.-", tag: "🌶" },
      { key: "vermicellliSeafood", price: "80–100.-", tag: "🌶" },
      { key: "mixedSeafoodSalad", price: "80–100.-", tag: "🌶" },
    ],
  },
  {
    id: "steak",
    emoji: "🥩",
    color: "#6B1A1A",
    items: [
      { key: "ribeyeBeef", price: "199.-", tag: "🐄" },
      { key: "tBoneBeef", price: "199.-", tag: "🐄" },
      { key: "ribeyePork", price: "129.-", tag: "🐷" },
      { key: "tBonePork", price: "129.-", tag: "🐷" },
      { key: "porkChop", price: "159.-", tag: "🐷" },
    ],
  },
  {
    id: "fish",
    emoji: "🐟",
    color: "#6B1A1A",
    items: [
      { key: "doryBreadcrumb", price: "120.-", tag: null },
      { key: "seabassSteak", price: "139.-", tag: null },
      { key: "doryGrilled", price: "120.-", tag: null },
      { key: "salmonSteak", price: "179.-", tag: null },
    ],
  },
  {
    id: "pizza",
    emoji: "🍕",
    color: "#6B1A1A",
    items: [
      { key: "salamiPizza", price: "S 139 / M 169 / L 259", tag: null },
      { key: "seafoodPizza", price: "S 149 / M 189 / L 259", tag: null },
      { key: "seafoodTomYumPizza", price: "S 149 / M 189 / L 259", tag: "🌶" },
      { key: "smokedSalmonPizza", price: "S 169 / M 199 / L 269", tag: null },
      { key: "kittyCafePizza", price: "S 149 / M 189 / L 259", tag: "🌶" },
    ],
  },
];

export default function App() {
  const [lang, setLang] = useState<Lang>("th");
  const [activeCategory, setActiveCategory] = useState("spaghetti");
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set(["spaghetti"])
  );

  // ── Theme: detect system preference, allow manual override ──
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "light";
  });

  // Apply theme to <html> data attribute
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Set page title and emoji favicon once on mount
  useEffect(() => {
    document.title = "Kitty Cafe";
    const favicon = document.querySelector<HTMLLinkElement>("link[rel~='icon']")
      ?? (() => {
        const el = document.createElement("link");
        el.rel = "icon";
        document.head.appendChild(el);
        return el;
      })();
    favicon.href =
      "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🐱</text></svg>";
  }, []);

  // Keep in sync with OS changes (if user hasn't manually overridden)
  const [manualOverride, setManualOverride] = useState(false);
  useEffect(() => {
    if (manualOverride) return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) =>
      setTheme(e.matches ? "dark" : "light");
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [manualOverride]);

  const toggleTheme = () => {
    setManualOverride(true);
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  };

  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const t = translations[lang];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.id);
            setVisibleSections((prev) => {
              if (prev.has(entry.target.id)) return prev;
              const next = new Set(prev);
              next.add(entry.target.id);
              return next;
            });
          }
        });
      },
      { rootMargin: "-15% 0px -55% 0px" }
    );
    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = sectionRefs.current[id];
    if (el) {
      const hdr = document.querySelector<HTMLElement>(".site-header");
      const nav = document.querySelector<HTMLElement>(".cat-nav");
      const offset =
        (hdr?.offsetHeight ?? 88) + (nav?.offsetHeight ?? 100) + 12;
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="app">
      {/* Sticky wrapper — keeps header and nav flush together */}
      <div className="sticky-top">
        <header className="site-header">
          <div className="header-inner">
            {/* Row 1: Brand */}
            <div className="header-brand">
              <span className="brand-icon">🐱</span>
              <h1 className="brand-name">Kitty Cafe</h1>
            </div>

            {/* Row 2: Contact + toggles */}
            <div className="header-contact">
              <a href="tel:+66981902677" className="contact-pill">
                📞 <span>{t.phone}: 098-190-2677</span>
              </a>
              {SHOW_LINE && (
              <a
                href={LINE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-pill line-pill"
              >
                <LineIcon size={14} />
                <span>{t.line}: @KittyCafe</span>
              </a>
              )}
              <button
                className="theme-toggle"
                onClick={toggleTheme}
                aria-label="Toggle dark/light mode"
              >
                {theme === "dark" ? "☀️" : "🌙"}
              </button>
              <button
                className="lang-toggle"
                onClick={() => setLang(lang === "th" ? "en" : "th")}
              >
                {t.lang}
              </button>
            </div>
          </div>
        </header>

        {/* Category Nav — flush below header, no gap */}
        <nav className="cat-nav">
        <div className="cat-nav-inner">
          {menuData.map((cat) => (
            <button
              key={cat.id}
              className={`cat-pill${activeCategory === cat.id ? " active" : ""}`}
              onClick={() => scrollTo(cat.id)}
            >
              <span className="cat-emoji">{cat.emoji}</span>
              <span className="cat-label">
                {t.categories[cat.id as keyof typeof t.categories]}
              </span>
            </button>
          ))}
        </div>
      </nav>
      </div>{/* /sticky-top */}

      {/* Menu Sections */}
      <main className="menu-main">
        {menuData.map((cat) => (
          <section
            key={cat.id}
            id={cat.id}
            ref={(el) => {
              sectionRefs.current[cat.id] = el;
            }}
            className={`menu-section${
              visibleSections.has(cat.id) ? " visible" : ""
            }`}
          >
            <div
              className="section-header"
              style={{ "--accent": cat.color } as React.CSSProperties}
            >
              <span className="section-emoji">{cat.emoji}</span>
              <h2 className="section-title">
                {t.categories[cat.id as keyof typeof t.categories]}
              </h2>
            </div>
            <div className="items-grid">
              {cat.items.map((item, idx) => {
                const itemData = t.items[item.key as keyof typeof t.items];
                return (
                  <div
                    key={item.key}
                    className="menu-card"
                    style={
                      { "--delay": `${idx * 55}ms` } as React.CSSProperties
                    }
                  >
                    <div className="card-body">
                      <div className="card-title-row">
                        <span className="card-name">{itemData.name}</span>
                        {item.tag && (
                          <span className="card-tag">{item.tag}</span>
                        )}
                      </div>
                      <p className="card-desc">{itemData.desc}</p>
                    </div>
                    <div className="card-footer">
                      <span className="card-price">{item.price}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-contact-block">
            <h3 className="footer-heading">🐱 Kitty Cafe</h3>
            <p className="footer-tagline">{t.tagline}</p>
            <div className="footer-info-row">
              <span>📞 098-190-2677</span>
            </div>
            {SHOW_LINE && (
            <div className="footer-info-row">
              <a
                href={LINE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-line-link"
              >
                <LineIcon size={14} />
                <span>@KittyCafe</span>
              </a>
            </div>
            )}
            <div className="footer-info-row">
              <span>📍 {t.address}</span>
            </div>
            <div className="footer-info-row">
              <span>🕐 {t.hours}</span>
            </div>
            <div className="hours-table">
              {t.hoursData.map((row) => (
                <div key={row.day} className={`hours-row${row.open === null ? " hours-closed" : ""}`}>
                  <span className="hours-day">{row.day}</span>
                  <span className="hours-time">
                    {row.open === null ? t.closed : `${row.open} – ${row.close}`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="footer-map-block">
            <p className="map-label">{t.mapLabel}</p>
            <div className="map-embed">
              <iframe
                title="Kitty Cafe Map"
                src="https://maps.google.com/maps?q=15.6770486,103.1122792&z=16&output=embed"
                width="100%"
                height="320"
                style={{ border: 0, borderRadius: "12px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a
              href="https://maps.app.goo.gl/FvZzHEtoL2BGGBZ88"
              target="_blank"
              rel="noopener noreferrer"
              className="directions-btn"
            >
              🗺 {t.openMaps}
            </a>
          </div>
        </div>
        <div className="footer-bottom">{t.footer}</div>
      </footer>
    </div>
  );
}