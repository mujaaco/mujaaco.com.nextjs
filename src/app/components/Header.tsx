"use client";

import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import LocaleSwitcher from "./LocaleSwitcher";
import MobileMenu from "./MobileMenu";
import ModeToggle from "./ModeToggle";
import Search from "./Search";
import { Button } from "./ui/Button";

interface HeaderProps {
  locale: string;
  dict: { blog: { authorBio: string } };
  nav: {
    projects: string;
    blog: string;
    music: string;
    videos: string;
    about: string;
    contact: string;
    search: string;
    menu: string;
    now: string;
  };
}

export default function Header({ locale, dict, nav }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { href: `/${locale}/about`, label: nav.about },
    { href: `/${locale}/projects`, label: nav.projects },
    { href: `/${locale}/blog`, label: nav.blog },
    { href: `/${locale}/music`, label: nav.music },
    { href: `/${locale}/videos`, label: nav.videos },
    { href: `/${locale}/now`, label: nav.now },
    { href: `/${locale}/contact`, label: nav.contact },
  ];

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl bg-background/95 border-b border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.1)]"
        suppressHydrationWarning
      >
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3 md:py-4">
            <Link href={`/${locale}`} className="flex items-center gap-3 group">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-primary/30 shadow-md">
                <Image
                  src="/img/profile.png"
                  alt={locale === "ar" ? "مجاهد صيام" : "Mujahid Siyam"}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              <span className="text-xl md:text-2xl font-extrabold bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent">
                {locale === "ar" ? "مجاهد صيام" : "Mujahid Siyam"}
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <ul className="flex gap-6">
                {navigationItems.map((item) => (
                  <li key={item.href}>
                    <Button
                      variant="ghost"
                      size="md"
                      asChild
                      className="text-foreground font-bold text-base"
                      suppressHydrationWarning
                    >
                      <Link href={item.href}>{item.label}</Link>
                    </Button>
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search />
                </div>
                <div>
                  <ModeToggle />
                </div>
                <LocaleSwitcher locale={locale} />
              </div>
            </nav>

            <div className="flex md:hidden items-center gap-2">
              <div>
                <Search />
              </div>
              <div>
                <ModeToggle />
              </div>
              <LocaleSwitcher locale={locale} />
              <Button
                variant="default"
                size="sm"
                onClick={() => setIsMobileMenuOpen(true)}
                className="h-9 w-9 flex items-center justify-center p-0"
                aria-label={nav.menu}
                suppressHydrationWarning
              >
                <Menu className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navigationItems={navigationItems}
        locale={locale}
        menuLabel={nav.menu}
        authorName={locale === "ar" ? "مجاهد صيام" : "Mujahid Siyam"}
        authorBio={dict.blog.authorBio}
      />
    </>
  );
}
