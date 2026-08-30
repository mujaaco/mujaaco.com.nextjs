import type { Metadata } from "next";
import { localeLanguages } from "@/app/lib/seo";
import { type Locale, locales } from "@/i18n/config";
import { BreadcrumbStructuredData } from "../../components/BreadcrumbJsonLd";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale)
    ? (locale as Locale)
    : "en";

  return {
    title:
      validLocale === "ar"
        ? "الآن | موجا — مجاهد صيام"
        : "Now | Mujaa (Mujahid Siyam)",
    description:
      validLocale === "ar"
        ? "ما يركز عليه موجا — مجاهد صيام حالياً من عمل وتعلم واهتمامات."
        : "What Mujahid Siyam (Mujaa) is focused on right now — work, learning, and current interests.",
    alternates: {
      canonical: `https://mujaaco.com/${validLocale}/now`,
      languages: localeLanguages("now"),
    },
    openGraph: {
      title:
        validLocale === "ar"
          ? "الآن | موجا — مجاهد صيام"
          : "Now | Mujaa (Mujahid Siyam)",
      description:
        validLocale === "ar"
          ? "ما يركز عليه موجا — مجاهد صيام حالياً."
          : "What Mujahid Siyam (Mujaa) is focused on right now.",
      url: `https://mujaaco.com/${validLocale}/now`,
      type: "website",
      images: [
        {
          url: "https://mujaaco.com/img/profile-engineer-1200x630.png",
          width: 1200,
          height: 630,
          alt: "Mujahid Siyam",
        },
      ],
      siteName: "Mujaa",
    },
    twitter: {
      card: "summary_large_image",
      title:
        validLocale === "ar"
          ? "الآن | موجا — مجاهد صيام"
          : "Now | Mujaa (Mujahid Siyam)",
      description:
        validLocale === "ar"
          ? "ما يركز عليه موجا — مجاهد صيام حالياً."
          : "What Mujahid Siyam (Mujaa) is focused on right now.",
      images: ["https://mujaaco.com/img/profile-engineer-1200x630.png"],
      site: "@mujaaco",
      creator: "@mujaaco",
    },
  };
}

const workItems = [
  {
    en: {
      title: "Software & AI at Zaroxi Studio",
      description:
        "Building tools and systems. Working on AI integrations, developer utilities, and infrastructure. Most of my day-to-day involves writing Rust, TypeScript, or Python — whichever makes the most sense for the problem.",
    },
    ar: {
      title: "البرمجيات والذكاء الاصطناعي في Zaroxi Studio",
      description:
        "بناء أدوات وأنظمة. العمل على تكاملات الذكاء الاصطناعي وأدوات المطورين والبنية التحتية. معظم يومي أكتب Rust أو TypeScript أو Python — اللي يناسب المشكلة.",
    },
    fr: {
      title: "Logiciels & IA chez Zaroxi Studio",
      description:
        "Construction d'outils et de systèmes. Travail sur les intégrations IA, les utilitaires développeur et l'infrastructure. La majeure partie de mon quotidien consiste à écrire du Rust, du TypeScript ou du Python — selon ce qui convient le mieux au problème.",
    },
  },
  {
    en: {
      title: "Open source maintenance",
      description:
        "Maintaining a few projects, mostly around NixOS productivity tools. Contributing where I can. I'm not trying to be everywhere — just trying to keep my own things working and help out when something breaks.",
    },
    ar: {
      title: "صيانة المصادر المفتوحة",
      description:
        "صيانة بعض المشاريع، غالباً حول أدوات NixOS. المساهمة حيث أقدر. مو شغلي أني أكون في كل مكان — بس أحاول أخلي أشيائي تشتغل وأساعد لما ينكسر شيء.",
    },
    fr: {
      title: "Maintenance open source",
      description:
        "Maintenance de quelques projets, principalement autour des outils de productivité NixOS. Contribution là où je peux. Je n'essaie pas d'être partout — juste de faire fonctionner mes propres projets et d'aider quand quelque chose casse.",
    },
  },
  {
    en: {
      title: "Music — Rockstar EP",
      description:
        "Working on my second EP, Rockstar, set for release in August 2026. It's the next chapter after KAKASHI — bigger, more focused, and a deeper expression of where I am now. Recording, producing, mixing. Making music isn't a side project — it's part of who I am, and I'm taking my time to get this one right.",
    },
    ar: {
      title: "الموسيقى — Rockstar EP",
      description:
        "أشتغل على EP الثاني، Rockstar، المقرر إصداره في أغسطس ٢٠٢٦. هو الفصل التالي بعد KAKASHI — أكبر وأكثر تركيزاً وتعبير أعمق عن مكاني الحالي. تسجيل وإنتاج ومكساج. الموسيقى مو مشروع جانبي — هي جزء من هويتي، وآخذ وقتي عشان أوصل هذي صح.",
    },
    fr: {
      title: "Musique — EP Rockstar",
      description:
        "Travail sur mon deuxième EP, Rockstar, prévu pour août 2026. C'est le chapitre suivant après KAKASHI — plus grand, plus concentré, une expression plus profonde de là où j'en suis. Enregistrement, production, mixage. La musique n'est pas un projet secondaire — elle fait partie de qui je suis, et je prends mon temps pour bien faire celui-ci.",
    },
  },
];

const learnItems = [
  {
    en: {
      title: "Rust — going deeper",
      description:
        "I've been using Rust for a while, but there's always more to learn. Currently exploring async internals, embedded development, and performance optimization patterns.",
    },
    ar: {
      title: "Rust — أعمق",
      description:
        "لي فترة أستخدم Rust، لكن دايم فيه شيء جديد أتعلمه. حالياً أستكشف الأعمال الداخلية للـ async والأنظمة المدمجة وأنماط تحسين الأداء.",
    },
    fr: {
      title: "Rust — aller plus loin",
      description:
        "J'utilise Rust depuis un moment, mais il y a toujours plus à apprendre. En ce moment, j'explore les internes de l'async, le développement embarqué et les patterns d'optimisation.",
    },
  },
  {
    en: {
      title: "How LLMs actually work",
      description:
        "Not just using them — understanding the architecture, training dynamics, and what happens under the hood. Reading papers, running experiments, trying to build intuition.",
    },
    ar: {
      title: "كيف تشتغل النماذج اللغوية فعلاً",
      description:
        "مو بس استخدامها — فهم المعمارية وديناميكيات التدريب وإيش يصير تحت الغطاء. أقرأ أوراق بحثية وأجري تجارب وأحاول أبني فهم حدسي.",
    },
    fr: {
      title: "Comment fonctionnent vraiment les LLMs",
      description:
        "Pas seulement les utiliser — comprendre l'architecture, la dynamique d'entraînement et ce qui se passe sous le capot. Je lis des articles, je fais des expériences, j'essaie de construire une intuition.",
    },
  },
  {
    en: {
      title: "Distributed systems",
      description:
        "Consensus, fault tolerance, consistency models. The kind of problems where you can't just add more servers and hope for the best. Reading papers and building small experiments.",
    },
    ar: {
      title: "الأنظمة الموزعة",
      description:
        "الإجماع، تحمل الأخطاء، نماذج الاتساق. النوع من المشاكل اللي ما تقدر بس تضيف خوادم وتأمل الأفضل. أقرأ أوراق وأبني تجارب صغيرة.",
    },
    fr: {
      title: "Systèmes distribués",
      description:
        "Consensus, tolérance aux pannes, modèles de cohérence. Le genre de problèmes où on ne peut pas juste ajouter des serveurs et espérer que ça marche. Je lis des articles et construis de petites expériences.",
    },
  },
];

const readingItems = [
  {
    en: {
      title: "On my shelf right now",
      description:
        "Re-reading Designing Data-Intensive Applications. Also working through Crafting Interpreters and the Rust Performance Book.",
    },
    ar: {
      title: "على رفي حالياً",
      description:
        "أعيد قراءة تصميم التطبيقات كثيفة البيانات. وأشتغل على صياغة المفسرات وكتاب أداء Rust.",
    },
    fr: {
      title: "Sur mon étagère en ce moment",
      description:
        "Je relis Designing Data-Intensive Applications. Je travaille aussi sur Crafting Interpreters et le Rust Performance Book.",
    },
  },
  {
    en: {
      title: "Blogs and papers",
      description:
        "Engineering blogs from Cloudflare, Oxide Computer, and Figma. Research from Anthropic and DeepMind when I have the energy for it.",
    },
    ar: {
      title: "مدونات وأوراق",
      description:
        "مدونات هندسية من Cloudflare وOxide Computer وFigma. أبحاث من Anthropic وDeepMind لما يكون عندي طاقة لها.",
    },
    fr: {
      title: "Blogs et articles",
      description:
        "Blogs d'ingénierie de Cloudflare, Oxide Computer et Figma. Recherches d'Anthropic et DeepMind quand j'ai l'énergie pour ça.",
    },
  },
];

export default async function NowPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale)
    ? (locale as Locale)
    : "en";
  const dir = validLocale === "ar" ? "rtl" : "ltr";

  const isAr = validLocale === "ar";
  const isFr = validLocale === "fr";

  function t(item: {
    en: { title: string; description: string };
    ar: { title: string; description: string };
    fr: { title: string; description: string };
  }) {
    if (isAr) return item.ar;
    if (isFr) return item.fr;
    return item.en;
  }

  const sectionTitle = isAr ? "الآن" : isFr ? "Maintenant" : "Now";
  const subtitle = isAr
    ? "ما أركز عليه حالياً"
    : isFr
      ? "Ce sur quoi je me concentre en ce moment"
      : "What I'm focused on right now";

  return (
    <>
      <BreadcrumbStructuredData
        items={[
          {
            name: validLocale === "ar" ? "الرئيسية" : "Home",
            url: `https://mujaaco.com/${validLocale}`,
          },
          {
            name: sectionTitle,
            url: `https://mujaaco.com/${validLocale}/now`,
          },
        ]}
      />

      <div dir={dir} className="min-h-screen pt-20 pb-20">
        <div className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-16">
              <p className="inline-block text-xs font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-6 border border-primary/10 bg-primary/5 text-primary/60">
                {sectionTitle}
              </p>
              <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent">
                {sectionTitle}
              </h1>
              <p className="text-lg text-foreground/60 max-w-2xl mx-auto font-light">
                {subtitle}
              </p>
            </div>

            <div className="space-y-16">
              {/* Working On */}
              <section>
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-[2px] flex-1 bg-gradient-to-r from-[var(--color-primary)]/30 to-transparent" />
                  <h2 className="text-2xl font-bold text-foreground whitespace-nowrap">
                    {isAr
                      ? "ما أعمل عليه"
                      : isFr
                        ? "Sur quoi je travaille"
                        : "What I'm Working On"}
                  </h2>
                  <div className="h-[2px] flex-1 bg-gradient-to-l from-[var(--color-primary)]/30 to-transparent" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {workItems.map((item) => {
                    const localized = t(item);
                    return (
                      <div key={localized.title} className="card-premium group">
                        <div className="absolute inset-0 rounded-[20px] bg-gradient-to-br from-[var(--color-primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        <div className="relative z-10">
                          <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center mb-4 group-hover:bg-[var(--color-primary)]/20 transition-colors duration-300">
                            <span className="text-lg">⚡</span>
                          </div>
                          <h3 className="text-lg font-bold text-foreground mb-3">
                            {localized.title}
                          </h3>
                          <p className="text-sm text-foreground/60 leading-relaxed">
                            {localized.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Learning */}
              <section>
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-[2px] flex-1 bg-gradient-to-r from-[var(--color-secondary)]/30 to-transparent" />
                  <h2 className="text-2xl font-bold text-foreground whitespace-nowrap">
                    {isAr
                      ? "ما أتعلمه"
                      : isFr
                        ? "Ce que j'apprends"
                        : "What I'm Learning"}
                  </h2>
                  <div className="h-[2px] flex-1 bg-gradient-to-l from-[var(--color-secondary)]/30 to-transparent" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {learnItems.map((item) => {
                    const localized = t(item);
                    return (
                      <div key={localized.title} className="card-premium group">
                        <div className="absolute inset-0 rounded-[20px] bg-gradient-to-br from-[var(--color-secondary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        <div className="relative z-10">
                          <div className="w-10 h-10 rounded-xl bg-[var(--color-secondary)]/10 flex items-center justify-center mb-4 group-hover:bg-[var(--color-secondary)]/20 transition-colors duration-300">
                            <span className="text-lg">🧠</span>
                          </div>
                          <h3 className="text-lg font-bold text-foreground mb-3">
                            {localized.title}
                          </h3>
                          <p className="text-sm text-foreground/60 leading-relaxed">
                            {localized.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Reading */}
              <section>
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-[2px] flex-1 bg-gradient-to-r from-[var(--color-accent)]/30 to-transparent" />
                  <h2 className="text-2xl font-bold text-foreground whitespace-nowrap">
                    {isAr
                      ? "ما أقرأه"
                      : isFr
                        ? "Ce que je lis"
                        : "What I'm Reading"}
                  </h2>
                  <div className="h-[2px] flex-1 bg-gradient-to-l from-[var(--color-accent)]/30 to-transparent" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {readingItems.map((item) => {
                    const localized = t(item);
                    return (
                      <div key={localized.title} className="card-premium group">
                        <div className="absolute inset-0 rounded-[20px] bg-gradient-to-br from-[var(--color-accent)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        <div className="relative z-10">
                          <div className="w-10 h-10 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center mb-4 group-hover:bg-[var(--color-accent)]/20 transition-colors duration-300">
                            <span className="text-lg">📚</span>
                          </div>
                          <h3 className="text-lg font-bold text-foreground mb-3">
                            {localized.title}
                          </h3>
                          <p className="text-sm text-foreground/60 leading-relaxed">
                            {localized.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              <div className="text-center pt-8">
                <p className="text-xs text-foreground/40 font-mono">
                  {isAr
                    ? "آخر تحديث: يوليو ٢٠٢٦"
                    : isFr
                      ? "Dernière mise à jour : juillet 2026"
                      : "Last updated: July 2026"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
