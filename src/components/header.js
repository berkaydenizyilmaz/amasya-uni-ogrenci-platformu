import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import Link from "next/link";
import Image from "next/image";

/**
 * Ana sayfa header bileşeni
 * @returns {JSX.Element} Header bileşeni
 */
export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-theme-primary/20 bg-theme-bg/95 backdrop-blur supports-[backdrop-filter]:bg-theme-bg/60">
      <div className="container mx-auto px-4">
        <nav className="flex h-16 items-center justify-between">
          {/* Logo ve Site Adı */}
          <Link href="/" className="flex items-center space-x-2 transition-colors hover:opacity-90">
            <Image src="/logo.png" alt="Logo" width={32} height={32} />
            <span className="text-xl font-bold bg-gradient-to-r from-theme-primary to-theme-primary-hover bg-clip-text text-transparent">
              AÜ Öğrenci Platformu
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex">
            <NavigationMenu>
              <NavigationMenuList className="space-x-1">
                {/* Üniversitemiz */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="h-9 px-4 py-2 text-theme-text hover:bg-theme-primary/10 hover:text-theme-primary-hover">
                    Üniversitemiz
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 bg-theme-bg border border-theme-primary/20">
                      <li className="row-span-3">
                        <Link href="/universite/genel-bilgi" legacyBehavior passHref>
                          <NavigationMenuLink className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-theme-primary/20 to-theme-primary/10 p-6 no-underline outline-none focus:shadow-md">
                            <div className="mb-2 mt-4 text-lg font-medium text-theme-text">
                              Genel Bilgi
                            </div>
                            <p className="text-sm leading-tight text-theme-text-muted">
                              Üniversitemiz hakkında detaylı bilgi alın
                            </p>
                          </NavigationMenuLink>
                        </Link>
                      </li>
                      <li>
                        <Link href="/universite/fakulteler" legacyBehavior passHref>
                          <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-theme-primary/10 hover:text-theme-primary-hover">
                            <div className="text-sm font-medium leading-none text-theme-text">Fakülteler</div>
                            <p className="line-clamp-2 text-sm leading-snug text-theme-text-muted">
                              Fakültelerimiz ve bölümlerimiz
                            </p>
                          </NavigationMenuLink>
                        </Link>
                      </li>
                      <li>
                        <Link href="/universite/akademik-takvim" legacyBehavior passHref>
                          <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#06B6D4]/10 hover:text-[#0891B2]">
                            <div className="text-sm font-medium leading-none text-[#334155]">Akademik Takvim</div>
                            <p className="line-clamp-2 text-sm leading-snug text-[#334155]/70">
                              Akademik yıl planı ve önemli tarihler
                            </p>
                          </NavigationMenuLink>
                        </Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Yurt ve Ulaşım */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="h-9 px-4 py-2 text-[#334155] hover:bg-[#06B6D4]/10 hover:text-[#0891B2]">
                    Yurt ve Ulaşım
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 bg-[#F9F7F4] border border-[#06B6D4]/20">
                      <li className="row-span-3">
                        <Link href="/yurt-ulasim/yurtlar" legacyBehavior passHref>
                          <NavigationMenuLink className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-[#06B6D4]/20 to-[#06B6D4]/10 p-6 no-underline outline-none focus:shadow-md">
                            <div className="mb-2 mt-4 text-lg font-medium text-[#334155]">
                              Yurtlar
                            </div>
                            <p className="text-sm leading-tight text-[#334155]/70">
                              Yurt imkanları ve konaklama seçenekleri
                            </p>
                          </NavigationMenuLink>
                        </Link>
                      </li>
                      <li>
                        <Link href="/yurt-ulasim/otobus-guzergahlari" legacyBehavior passHref>
                          <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#06B6D4]/10 hover:text-[#0891B2]">
                            <div className="text-sm font-medium leading-none text-[#334155]">Otobüs Güzergahları</div>
                            <p className="line-clamp-2 text-sm leading-snug text-[#334155]/70">
                              Kampüs ulaşım hatları
                            </p>
                          </NavigationMenuLink>
                        </Link>
                      </li>
                      <li>
                        <Link href="/yurt-ulasim/sefer-saatleri" legacyBehavior passHref>
                          <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#06B6D4]/10 hover:text-[#0891B2]">
                            <div className="text-sm font-medium leading-none text-[#334155]">Sefer Saatleri</div>
                            <p className="line-clamp-2 text-sm leading-snug text-[#334155]/70">
                              Güncel otobüs saatleri
                            </p>
                          </NavigationMenuLink>
                        </Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Not Paylaşımı */}
                <NavigationMenuItem>
                  <Link href="/not-paylasimi" legacyBehavior passHref>
                    <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-[#06B6D4] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0891B2] hover:text-white focus:bg-[#0891B2] focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                      Not Paylaşımı
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                {/* Etkinlikler */}
                <NavigationMenuItem>
                  <Link href="/etkinlikler" legacyBehavior passHref>
                    <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-[#06B6D4] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0891B2] hover:text-white focus:bg-[#0891B2] focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                      Etkinlikler
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                {/* Amasyamız */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="h-9 px-4 py-2 text-[#334155] hover:bg-[#06B6D4]/10 hover:text-[#0891B2]">
                    Amasyamız
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 bg-[#F9F7F4] border border-[#06B6D4]/20">
                      <li className="row-span-3">
                        <Link href="/amasya/tarihi-yerler" legacyBehavior passHref>
                          <NavigationMenuLink className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-[#06B6D4]/20 to-[#06B6D4]/10 p-6 no-underline outline-none focus:shadow-md">
                            <div className="mb-2 mt-4 text-lg font-medium text-[#334155]">
                              Tarihi Yerler
                            </div>
                            <p className="text-sm leading-tight text-[#334155]/70">
                              Amasya&apos;nın tarihi ve kültürel mirası
                            </p>
                          </NavigationMenuLink>
                        </Link>
                      </li>
                      <li>
                        <Link href="/amasya/gezi-rotalari" legacyBehavior passHref>
                          <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#06B6D4]/10 hover:text-[#0891B2]">
                            <div className="text-sm font-medium leading-none text-[#334155]">Gezi Rotaları</div>
                            <p className="line-clamp-2 text-sm leading-snug text-[#334155]/70">
                              Önerilen gezi güzergahları
                            </p>
                          </NavigationMenuLink>
                        </Link>
                      </li>
                      <li>
                        <Link href="/amasya/yoresel-lezzetler" legacyBehavior passHref>
                          <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#06B6D4]/10 hover:text-[#0891B2]">
                            <div className="text-sm font-medium leading-none text-[#334155]">Yöresel Lezzetler</div>
                            <p className="line-clamp-2 text-sm leading-snug text-[#334155]/70">
                              Amasya&apos;nın eşsiz mutfağı
                            </p>
                          </NavigationMenuLink>
                        </Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-[#334155] hover:bg-[#06B6D4]/10">
                <span className="sr-only">Menüyü aç</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#F9F7F4] border-l border-[#06B6D4]/20">
              <SheetHeader>
                <SheetTitle className="text-[#334155]">Menü</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-4 mt-6">
                <Link 
                  href="/universite/genel-bilgi" 
                  className="text-lg font-medium text-[#334155] transition-colors hover:text-[#0891B2]"
                >
                  Üniversitemiz
                </Link>
                <Link 
                  href="/yurt-ulasim/yurtlar" 
                  className="text-lg font-medium text-[#334155] transition-colors hover:text-[#0891B2]"
                >
                  Yurt ve Ulaşım
                </Link>
                <Link 
                  href="/not-paylasimi" 
                  className="text-lg font-medium text-[#334155] transition-colors hover:text-[#0891B2]"
                >
                  Not Paylaşımı
                </Link>
                <Link 
                  href="/etkinlikler" 
                  className="text-lg font-medium text-[#334155] transition-colors hover:text-[#0891B2]"
                >
                  Etkinlikler
                </Link>
                <Link 
                  href="/amasya/tarihi-yerler" 
                  className="text-lg font-medium text-[#334155] transition-colors hover:text-[#0891B2]"
                >
                  Amasyamız
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  );
}

                    