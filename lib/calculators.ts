// Single source of truth for the calculator catalog.
// Each calculator gets: slug (URL), title, short description, keywords, category.
// Adding a new calculator: 1) add entry here, 2) create component in components/calculators/

export type CategorySlug =
  | 'finansi'
  | 'breut'
  | 'matematika'
  | 'tarichim'
  | 'hamarot'
  | 'shonot';

export interface Category {
  slug: CategorySlug;
  name: string;
  tagline: string;
  description: string;
  accent: string;
  icon: string;
}

export interface Calculator {
  slug: string;
  category: CategorySlug;
  title: string; // H1 / page title (Hebrew)
  shortTitle: string; // for grid cards
  description: string; // meta description, ~150 chars
  keywords: string[];
  intro?: string; // longer intro paragraph for SEO
  popular?: boolean;
}

export const categories: Category[] = [
  {
    slug: 'finansi',
    name: 'פיננסי',
    tagline: 'משכנתא, הלוואות, מיסים',
    description: 'מחשבונים פיננסיים מותאמים לישראל — משכנתא, הלוואות, מס הכנסה, מע״מ ועוד.',
    accent: '#B45309',
    icon: '₪',
  },
  {
    slug: 'breut',
    name: 'בריאות וכושר',
    tagline: 'BMI, קלוריות, הריון',
    description: 'מחשבוני בריאות וכושר — BMI, צריכת קלוריות יומית, הריון, ביוץ ועוד.',
    accent: '#0F766E',
    icon: '◐',
  },
  {
    slug: 'matematika',
    name: 'מתמטיקה',
    tagline: 'אחוזים, שברים, גאומטריה',
    description: 'מחשבונים מתמטיים — אחוזים, שברים, גאומטריה, משוואות ועוד.',
    accent: '#1E3A8A',
    icon: '∑',
  },
  {
    slug: 'tarichim',
    name: 'תאריכים וזמן',
    tagline: 'גיל, הפרש תאריכים, ספירה לאחור',
    description: 'מחשבוני תאריכים וזמן — חישוב גיל מדויק, הפרש בין תאריכים, ספירה לאחור.',
    accent: '#7E22CE',
    icon: '◷',
  },
  {
    slug: 'hamarot',
    name: 'המרות יחידות',
    tagline: 'אורך, משקל, טמפרטורה',
    description: 'ממירי יחידות מדידה — אורך, משקל, נפח, טמפרטורה, מהירות, לחץ ואנרגיה.',
    accent: '#0E7490',
    icon: '⇌',
  },
  {
    slug: 'shonot',
    name: 'כללי',
    tagline: 'מחשבון מדעי, ציונים, דלק',
    description: 'מחשבונים כלליים — מחשבון רגיל, מדעי, ציון ממוצע, הוצאות דלק ועוד.',
    accent: '#525252',
    icon: '⊞',
  },
];

export const calculators: Calculator[] = [
  // ============ פיננסי ============
  {
    slug: 'mashkanta',
    category: 'finansi',
    title: 'מחשבון משכנתא',
    shortTitle: 'משכנתא',
    description: 'מחשבון משכנתא חינמי — חישוב החזר חודשי, סך תשלומי ריבית וטבלת סילוקין מלאה. מותאם למשכנתא בישראל.',
    keywords: ['מחשבון משכנתא', 'החזר משכנתא', 'משכנתא חישוב', 'טבלת סילוקין'],
    popular: true,
  },
  {
    slug: 'halvaa',
    category: 'finansi',
    title: 'מחשבון הלוואה',
    shortTitle: 'הלוואה',
    description: 'מחשבון הלוואה — חישוב החזר חודשי, סך הריבית והעלות הכוללת של ההלוואה לכל סוג ומשך.',
    keywords: ['מחשבון הלוואה', 'החזר הלוואה', 'ריבית הלוואה'],
    popular: true,
  },
  {
    slug: 'ribit-deribit',
    category: 'finansi',
    title: 'מחשבון ריבית דריבית',
    shortTitle: 'ריבית דריבית',
    description: 'חישוב ריבית דריבית — כמה ייצבר חיסכון או השקעה לאורך זמן עם הפקדה התחלתית והפקדות חודשיות.',
    keywords: ['ריבית דריבית', 'מחשבון ריבית דריבית', 'חיסכון לטווח ארוך'],
    popular: true,
  },
  {
    slug: 'maam',
    category: 'finansi',
    title: 'מחשבון מע״מ',
    shortTitle: 'מע״מ',
    description: 'מחשבון מע״מ — חישוב מע״מ 17% (השיעור הנוכחי בישראל), הוספה והפחתה של מע״מ ממחיר.',
    keywords: ['מחשבון מעמ', 'מעמ 17 אחוז', 'חישוב מעמ', 'הוספת מעמ למחיר'],
    popular: true,
  },
  {
    slug: 'tip',
    category: 'finansi',
    title: 'מחשבון טיפ',
    shortTitle: 'טיפ',
    description: 'מחשבון טיפ למסעדה — חישוב סכום הטיפ, חלוקה בין סועדים והסכום הסופי לתשלום.',
    keywords: ['מחשבון טיפ', 'חישוב טיפ', 'טיפ מסעדה'],
  },
  {
    slug: 'hisachon',
    category: 'finansi',
    title: 'מחשבון חיסכון חודשי',
    shortTitle: 'חיסכון',
    description: 'כמה צריך לחסוך כל חודש כדי להגיע ליעד פיננסי? מחשבון חיסכון עם ריבית.',
    keywords: ['מחשבון חיסכון', 'חיסכון חודשי', 'יעד חיסכון'],
  },
  {
    slug: 'pikadon',
    category: 'finansi',
    title: 'מחשבון פיקדון',
    shortTitle: 'פיקדון',
    description: 'מחשבון פיקדון בנקאי — חישוב הריבית והסכום הסופי בפיקדון לפי משך וריבית.',
    keywords: ['מחשבון פיקדון', 'ריבית על פיקדון', 'פיקדון בנקאי'],
  },
  {
    slug: 'teshuah',
    category: 'finansi',
    title: 'מחשבון תשואה (ROI)',
    shortTitle: 'תשואה',
    description: 'חישוב תשואה על השקעה — תשואה כוללת, תשואה שנתית ממוצעת ורווח נטו.',
    keywords: ['מחשבון תשואה', 'ROI', 'תשואה על השקעה', 'רווח השקעה'],
  },
  {
    slug: 'mas-hachnasa',
    category: 'finansi',
    title: 'מחשבון מס הכנסה',
    shortTitle: 'מס הכנסה',
    description: 'חישוב מס הכנסה לפי מדרגות המס בישראל לשנת 2026 — שכירים, עצמאים ונקודות זיכוי.',
    keywords: ['מחשבון מס הכנסה', 'מדרגות מס', 'מס הכנסה ישראל'],
    popular: true,
  },
  {
    slug: 'sachar-neto',
    category: 'finansi',
    title: 'מחשבון שכר נטו',
    shortTitle: 'שכר נטו',
    description: 'חישוב שכר נטו מברוטו — לאחר מס הכנסה, ביטוח לאומי, מס בריאות והפרשות.',
    keywords: ['מחשבון שכר נטו', 'שכר ברוטו לנטו', 'חישוב משכורת'],
    popular: true,
  },
  {
    slug: 'pitzuyey-piturin',
    category: 'finansi',
    title: 'מחשבון פיצויי פיטורים',
    shortTitle: 'פיצויי פיטורים',
    description: 'חישוב פיצויי פיטורים — משכורת אחרונה כפול ותק (חודש לכל שנה) לפי חוק הפיצויים.',
    keywords: ['מחשבון פיצויי פיטורים', 'פיצויים', 'חישוב פיצויי פיטורים'],
  },
  {
    slug: 'mas-rechisha',
    category: 'finansi',
    title: 'מחשבון מס רכישה',
    shortTitle: 'מס רכישה',
    description: 'חישוב מס רכישה על דירה — דירה יחידה ודירה נוספת לפי מדרגות 2026.',
    keywords: ['מחשבון מס רכישה', 'מס רכישה דירה', 'מדרגות מס רכישה'],
  },

  // ============ בריאות ============
  {
    slug: 'bmi',
    category: 'breut',
    title: 'מחשבון BMI',
    shortTitle: 'BMI',
    description: 'מחשבון BMI (מדד מסת גוף) — חישוב יחס הגובה למשקל וקטגוריית המשקל לפי תקני ארגון הבריאות העולמי.',
    keywords: ['מחשבון BMI', 'מדד מסת גוף', 'BMI חישוב'],
    popular: true,
  },
  {
    slug: 'bmr',
    category: 'breut',
    title: 'מחשבון BMR',
    shortTitle: 'BMR',
    description: 'מחשבון BMR — חישוב קצב חילוף החומרים הבסיסי, כמה קלוריות הגוף שורף במנוחה מוחלטת.',
    keywords: ['מחשבון BMR', 'חילוף חומרים', 'קלוריות במנוחה'],
  },
  {
    slug: 'caloriot',
    category: 'breut',
    title: 'מחשבון קלוריות יומיות',
    shortTitle: 'קלוריות יומיות',
    description: 'כמה קלוריות צריך ביום? חישוב TDEE לפי גובה, משקל, גיל ורמת פעילות — לירידה, עלייה או שמירה.',
    keywords: ['מחשבון קלוריות', 'קלוריות יומיות', 'TDEE', 'דיאטה'],
    popular: true,
  },
  {
    slug: 'mishkal-ideali',
    category: 'breut',
    title: 'מחשבון משקל אידיאלי',
    shortTitle: 'משקל אידיאלי',
    description: 'מהו המשקל האידיאלי שלך? חישוב לפי נוסחאות Devine, Robinson ו־Hamwi המקובלות ברפואה.',
    keywords: ['משקל אידיאלי', 'מחשבון משקל אידיאלי', 'משקל בריא'],
  },
  {
    slug: 'achuz-shuman',
    category: 'breut',
    title: 'מחשבון אחוז שומן',
    shortTitle: 'אחוז שומן',
    description: 'חישוב אחוזי השומן בגוף לפי שיטת חיל הים האמריקני (היקפים) — מדויק ולא דורש ציוד.',
    keywords: ['אחוז שומן', 'מחשבון אחוז שומן', 'הרכב גוף'],
  },
  {
    slug: 'shtiyat-mayim',
    category: 'breut',
    title: 'מחשבון שתיית מים',
    shortTitle: 'שתיית מים',
    description: 'כמה מים לשתות ביום? חישוב מותאם אישית לפי משקל, גיל ורמת פעילות.',
    keywords: ['כמה מים לשתות', 'מחשבון מים', 'שתיית מים יומית'],
  },
  {
    slug: 'herayon',
    category: 'breut',
    title: 'מחשבון הריון ותאריך לידה משוער',
    shortTitle: 'הריון',
    description: 'חישוב שבוע ההריון ותאריך הלידה המשוער לפי תאריך הווסת האחרונה.',
    keywords: ['מחשבון הריון', 'שבוע הריון', 'תאריך לידה משוער'],
    popular: true,
  },
  {
    slug: 'biyutz',
    category: 'breut',
    title: 'מחשבון ביוץ',
    shortTitle: 'ביוץ',
    description: 'מחשבון ביוץ וימי פוריות — חיזוי ימי הביוץ והחלון הפורה לפי מחזור החודשי.',
    keywords: ['מחשבון ביוץ', 'ימי פוריות', 'חיזוי ביוץ'],
  },
  {
    slug: 'dofek',
    category: 'breut',
    title: 'מחשבון דופק מטרה',
    shortTitle: 'דופק',
    description: 'חישוב אזורי דופק לאימון — דופק מטרה לאימון אירובי, שריפת שומנים, סיבולת ועצימות מקסימלית.',
    keywords: ['דופק מטרה', 'אזורי דופק', 'מחשבון דופק'],
  },
  {
    slug: 'macro',
    category: 'breut',
    title: 'מחשבון מאקרו',
    shortTitle: 'מאקרו',
    description: 'חישוב חלוקת מאקרו־נוטריינטים יומית — חלבונים, פחמימות ושומנים לפי מטרה תזונתית.',
    keywords: ['מחשבון מאקרו', 'מאקרו', 'חלבונים פחמימות שומנים'],
  },

  // ============ מתמטיקה ============
  {
    slug: 'achuzim',
    category: 'matematika',
    title: 'מחשבון אחוזים',
    shortTitle: 'אחוזים',
    description: 'מחשבון אחוזים — כמה אחוזים מ־X, אחוז שינוי בין שני מספרים, הוספה והפחתה של אחוזים.',
    keywords: ['מחשבון אחוזים', 'חישוב אחוזים', 'אחוזים'],
    popular: true,
  },
  {
    slug: 'shvarim',
    category: 'matematika',
    title: 'מחשבון שברים',
    shortTitle: 'שברים',
    description: 'מחשבון שברים — חיבור, חיסור, כפל וחילוק של שברים, צמצום ופישוט אוטומטי.',
    keywords: ['מחשבון שברים', 'חיבור שברים', 'צמצום שברים'],
  },
  {
    slug: 'memutza',
    category: 'matematika',
    title: 'מחשבון ממוצע',
    shortTitle: 'ממוצע',
    description: 'חישוב ממוצע, חציון, שכיח, סטיית תקן וטווח של סדרת מספרים.',
    keywords: ['מחשבון ממוצע', 'חישוב ממוצע', 'ממוצע סטטיסטי'],
  },
  {
    slug: 'yachas',
    category: 'matematika',
    title: 'מחשבון יחסים ופרופורציות',
    shortTitle: 'יחס',
    description: 'מחשבון יחסים — מציאת ערך נעלם בפרופורציה, פישוט יחס וחלוקה לפי יחס.',
    keywords: ['מחשבון יחס', 'פרופורציה', 'יחסים'],
  },
  {
    slug: 'meshulash',
    category: 'matematika',
    title: 'מחשבון משולש',
    shortTitle: 'משולש',
    description: 'מחשבון משולש — חישוב צלעות, זוויות, שטח והיקף לפי משפט הקוסינוסים והסינוסים.',
    keywords: ['מחשבון משולש', 'שטח משולש', 'משפט קוסינוסים'],
  },
  {
    slug: 'shetach',
    category: 'matematika',
    title: 'מחשבון שטח',
    shortTitle: 'שטח',
    description: 'חישוב שטח — ריבוע, מלבן, מעגל, משולש, טרפז ומקבילית. עם נוסחאות והסבר.',
    keywords: ['מחשבון שטח', 'שטח צורות', 'חישוב שטח'],
  },
  {
    slug: 'nefach',
    category: 'matematika',
    title: 'מחשבון נפח',
    shortTitle: 'נפח',
    description: 'חישוב נפח — קובייה, תיבה, גליל, כדור, חרוט ופירמידה.',
    keywords: ['מחשבון נפח', 'נפח גופים', 'חישוב נפח'],
  },
  {
    slug: 'eksponent',
    category: 'matematika',
    title: 'מחשבון חזקות',
    shortTitle: 'חזקות',
    description: 'מחשבון חזקות — חישוב x בחזקת n לכל בסיס ומעריך, כולל מעריכים שליליים ושבריים.',
    keywords: ['מחשבון חזקות', 'חזקה', 'אקספוננט'],
  },
  {
    slug: 'lograitm',
    category: 'matematika',
    title: 'מחשבון לוגריתם',
    shortTitle: 'לוגריתם',
    description: 'חישוב לוגריתם בכל בסיס — לוג טבעי (ln), לוג עשרוני (log10) ולוגריתם בבסיס שרירותי.',
    keywords: ['מחשבון לוגריתם', 'log', 'ln', 'לוגריתם טבעי'],
  },
  {
    slug: 'mishvaa-rivuit',
    category: 'matematika',
    title: 'פותר משוואה ריבועית',
    shortTitle: 'משוואה ריבועית',
    description: 'פותר משוואה ריבועית מהצורה ax² + bx + c = 0 — שורשים, דיסקרימיננטה וגרף.',
    keywords: ['משוואה ריבועית', 'פותר משוואות', 'דיסקרימיננטה'],
  },

  // ============ תאריכים ============
  {
    slug: 'gil',
    category: 'tarichim',
    title: 'מחשבון גיל',
    shortTitle: 'גיל',
    description: 'חישוב גיל מדויק לפי תאריך לידה — שנים, חודשים, ימים, שעות ואפילו שניות.',
    keywords: ['מחשבון גיל', 'חישוב גיל', 'גיל מדויק'],
    popular: true,
  },
  {
    slug: 'hefresh-tarichim',
    category: 'tarichim',
    title: 'מחשבון הפרש תאריכים',
    shortTitle: 'הפרש תאריכים',
    description: 'חישוב הפרש בין שני תאריכים בימים, שבועות, חודשים ושנים. הוספה או הפחתה של ימים מתאריך.',
    keywords: ['הפרש תאריכים', 'חישוב ימים בין תאריכים', 'מחשבון תאריכים'],
  },
  {
    slug: 'yemei-avoda',
    category: 'tarichim',
    title: 'מחשבון ימי עבודה',
    shortTitle: 'ימי עבודה',
    description: 'חישוב ימי עבודה בין שני תאריכים — ללא סופי שבוע ועם אפשרות להחריג חגים.',
    keywords: ['ימי עבודה', 'מחשבון ימי עסקים', 'חישוב ימי עבודה'],
  },
  {
    slug: 'shaot-avoda',
    category: 'tarichim',
    title: 'מחשבון שעות עבודה',
    shortTitle: 'שעות עבודה',
    description: 'חישוב שעות עבודה — חיבור שעות, חישוב שעות נוספות וסיכום שכר לפי שעה.',
    keywords: ['מחשבון שעות עבודה', 'שעות נוספות', 'חיבור שעות'],
  },
  {
    slug: 'sefirah-leachor',
    category: 'tarichim',
    title: 'ספירה לאחור לתאריך',
    shortTitle: 'ספירה לאחור',
    description: 'כמה זמן נותר עד תאריך — ימים, שעות, דקות ושניות בזמן אמת.',
    keywords: ['ספירה לאחור', 'כמה זמן נשאר', 'countdown'],
  },
  {
    slug: 'yom-bashavua',
    category: 'tarichim',
    title: 'איזה יום בשבוע',
    shortTitle: 'יום בשבוע',
    description: 'באיזה יום בשבוע נפל תאריך מסוים? חישוב מהיר לכל תאריך עבר או עתיד.',
    keywords: ['איזה יום בשבוע', 'יום מתאריך', 'חישוב יום'],
  },

  // ============ המרות ============
  {
    slug: 'orech',
    category: 'hamarot',
    title: 'ממיר יחידות אורך',
    shortTitle: 'אורך',
    description: 'המרת יחידות אורך — מטר, ס״מ, מ״מ, ק״מ, אינץ׳, רגל, יארד ומייל.',
    keywords: ['המרת אורך', 'מטר לאינץ', 'ק״מ למייל'],
  },
  {
    slug: 'mishkal',
    category: 'hamarot',
    title: 'ממיר יחידות משקל',
    shortTitle: 'משקל',
    description: 'המרת יחידות משקל — קילוגרם, גרם, טון, ליברה, אונקיה.',
    keywords: ['המרת משקל', 'קילו לליברה', 'גרם לאונקיה'],
  },
  {
    slug: 'temperatura',
    category: 'hamarot',
    title: 'ממיר טמפרטורה',
    shortTitle: 'טמפרטורה',
    description: 'המרת טמפרטורה — צלזיוס, פרנהייט וקלווין.',
    keywords: ['המרת טמפרטורה', 'צלזיוס לפרנהייט', 'פרנהייט לצלזיוס'],
    popular: true,
  },
  {
    slug: 'nefach-conv',
    category: 'hamarot',
    title: 'ממיר נפח',
    shortTitle: 'נפח (המרה)',
    description: 'המרת יחידות נפח — ליטר, מ״ל, גלון, פינט, כוס וכף.',
    keywords: ['המרת נפח', 'ליטר לגלון', 'מ״ל לכוס'],
  },
  {
    slug: 'mehirut',
    category: 'hamarot',
    title: 'ממיר מהירות',
    shortTitle: 'מהירות',
    description: 'המרת יחידות מהירות — קמ״ש, מייל לשעה, מטר לשנייה וקשר.',
    keywords: ['המרת מהירות', 'קמש למייל לשעה', 'קשר'],
  },
  {
    slug: 'shetach-conv',
    category: 'hamarot',
    title: 'ממיר שטח',
    shortTitle: 'שטח (המרה)',
    description: 'המרת יחידות שטח — מ״ר, דונם, אקר, הקטר ורגל מרובעת.',
    keywords: ['המרת שטח', 'דונם למטר רבוע', 'אקר'],
  },
  {
    slug: 'lachatz',
    category: 'hamarot',
    title: 'ממיר לחץ',
    shortTitle: 'לחץ',
    description: 'המרת יחידות לחץ — בר, פסקל, פאונד לאינץ׳ מרובע (PSI), אטמוספרה.',
    keywords: ['המרת לחץ', 'בר ל־PSI', 'אטמוספרה'],
  },
  {
    slug: 'enrgia',
    category: 'hamarot',
    title: 'ממיר אנרגיה',
    shortTitle: 'אנרגיה',
    description: 'המרת יחידות אנרגיה — ג׳אול, קילו־קלוריה, וואט־שעה, BTU.',
    keywords: ['המרת אנרגיה', 'קלוריה לג׳אול', 'BTU'],
  },

  // ============ שונות ============
  {
    slug: 'machshev-ragil',
    category: 'shonot',
    title: 'מחשבון רגיל',
    shortTitle: 'מחשבון רגיל',
    description: 'מחשבון רגיל אונליין — חיבור, חיסור, כפל, חילוק ואחוזים. עם תמיכה במקלדת.',
    keywords: ['מחשבון רגיל', 'מחשבון אונליין', 'מחשבון חינם'],
    popular: true,
  },
  {
    slug: 'machshev-madai',
    category: 'shonot',
    title: 'מחשבון מדעי',
    shortTitle: 'מחשבון מדעי',
    description: 'מחשבון מדעי אונליין עם פונקציות טריגונומטריות, לוגריתמים, חזקות ושורשים.',
    keywords: ['מחשבון מדעי', 'מחשבון מדעי אונליין', 'sin cos tan'],
  },
  {
    slug: 'delek',
    category: 'shonot',
    title: 'מחשבון הוצאות דלק',
    shortTitle: 'דלק',
    description: 'חישוב עלות דלק לנסיעה — לפי מרחק, צריכה ממוצעת ומחיר ליטר.',
    keywords: ['מחשבון דלק', 'הוצאות דלק', 'עלות נסיעה'],
  },
  {
    slug: 'tziyun-memutza',
    category: 'shonot',
    title: 'מחשבון ציון ממוצע',
    shortTitle: 'ציון ממוצע',
    description: 'חישוב ציון ממוצע משוקלל לפי יחידות לימוד או נקודות זכות.',
    keywords: ['ציון ממוצע', 'ממוצע משוקלל', 'מחשבון ציונים'],
  },
  {
    slug: 'mispar-ekrai',
    category: 'shonot',
    title: 'מחולל מספרים אקראיים',
    shortTitle: 'מספר אקראי',
    description: 'יצירת מספר אקראי בטווח שתבחר — להגרלות, משחקים והחלטות.',
    keywords: ['מספר אקראי', 'הגרלה', 'random'],
  },
];

// ---- Helpers ----

export function getCalculator(slug: string): Calculator | undefined {
  return calculators.find((c) => c.slug === slug);
}

export function getCategoryCalculators(category: CategorySlug): Calculator[] {
  return calculators.filter((c) => c.category === category);
}

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getPopularCalculators(): Calculator[] {
  return calculators.filter((c) => c.popular);
}

export function getRelatedCalculators(calc: Calculator, limit = 4): Calculator[] {
  return calculators
    .filter((c) => c.category === calc.category && c.slug !== calc.slug)
    .slice(0, limit);
}

export const SITE = {
  name: 'כל המחשבונים',
  tagline: 'כל המחשבונים. במקום אחד.',
  domain: 'allcalc.co.il',
  url: 'https://allcalc.co.il',
  description: 'כל המחשבונים. במקום אחד. מאגר מחשבונים חינמי בעברית — פיננסיים, בריאות, מתמטיקה, תאריכים והמרות, מותאמים לישראל.',
};
