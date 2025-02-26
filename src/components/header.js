'use client';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import Link from "next/link";
import { Building2, Bus, BookCopy, Calendar, Landmark, MapPin, UtensilsCrossed, Menu } from "lucide-react";
import LanguageSwitcher from "@/components/language-switcher";
import { t } from "@/lib/i18n";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

/**
 * Ana sayfa header bileşeni
 * @returns {JSX.Element} Header bileşeni
 */
export default function Header() {
  const [mounted, setMounted] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-theme-primary/20 bg-theme-bg/95 backdrop-blur supports-[backdrop-filter]:bg-theme-bg/60">
      <div className="container mx-auto">
        <nav className="flex h-16 items-center justify-between">
          {/* Logo ve Site Adı */}
          <Link href="/" className="flex items-center space-x-2 transition-colors hover:opacity-90">
            <span className="text-xl font-bold bg-gradient-to-r from-theme-primary to-theme-primary-hover bg-clip-text text-transparent">
              {t('common.siteName')}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <NavigationMenu>
              <NavigationMenuList className="flex items-center gap-3">
                {/* Admin Menüsü */}
                {session?.user?.role === "ADMIN" && (
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Admin</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[200px] gap-3 p-4">
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              href="/admin/etkinlikler"
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-medium leading-none">
                                Etkinlik Yönetimi
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Etkinlikleri onayla veya reddet
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                )}

                {/* Üniversitemiz */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="h-9 px-3 py-2 text-theme-text hover:bg-theme-primary/10 hover:text-theme-primary-hover">
                    <Building2 className="w-4 h-4 mr-2" />
                    {t('common.menu.university')}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                      <div className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link href="/universite/genel-bilgi" className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-theme-primary/20 to-theme-primary/10 p-6 no-underline outline-none focus:shadow-md">
                            <div className="mb-2 mt-4 text-lg font-medium text-theme-text">
                              {t('common.menu.generalInfo')}
                            </div>
                            <p className="text-sm leading-tight text-theme-text-muted">
                              {t('common.menu.generalInfoDesc')}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </div>
                      <div>
                        <NavigationMenuLink asChild>
                          <Link href="/universite/fakulteler" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-theme-primary/10 hover:text-theme-primary-hover">
                            <div className="text-sm font-medium leading-none text-theme-text">
                              {t('common.menu.faculties')}
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-theme-text-muted">
                              {t('common.menu.facultiesDesc')}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </div>
                      <div>
                        <NavigationMenuLink asChild>
                          <Link href="/universite/akademik-takvim" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-theme-primary/10 hover:text-theme-primary-hover">
                            <div className="text-sm font-medium leading-none text-theme-text">
                              {t('common.menu.calendar')}
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-theme-text-muted">
                              {t('common.menu.calendarDesc')}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Yurt ve Ulaşım */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="h-9 px-3 py-2 text-theme-text hover:bg-theme-primary/10 hover:text-theme-primary-hover">
                    <Bus className="w-4 h-4 mr-2" />
                    {t('common.menu.dormitory')}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                      <div className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link href="/yurt-ulasim/yurtlar" className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-theme-primary/20 to-theme-primary/10 p-6 no-underline outline-none focus:shadow-md">
                            <div className="mb-2 mt-4 text-lg font-medium text-theme-text">
                              {t('common.menu.dorms')}
                            </div>
                            <p className="text-sm leading-tight text-theme-text-muted">
                              {t('common.menu.dormsDesc')}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </div>
                      <div>
                        <NavigationMenuLink asChild>
                          <Link href="/yurt-ulasim/otobus-guzergahlari" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-theme-primary/10 hover:text-theme-primary-hover">
                            <div className="text-sm font-medium leading-none text-theme-text">
                              {t('common.menu.busRoutes')}
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-theme-text-muted">
                              {t('common.menu.busRoutesDesc')}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </div>
                      <div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Amasyamız */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="h-9 px-3 py-2 text-theme-text hover:bg-theme-primary/10 hover:text-theme-primary-hover">
                    <Landmark className="w-4 h-4 mr-2" />
                    {t('common.menu.amasya')}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                      <div className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link href="/amasya/tarihi-yerler" className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-theme-primary/20 to-theme-primary/10 p-6 no-underline outline-none focus:shadow-md">
                            <div className="mb-2 mt-4 text-lg font-medium text-theme-text">
                              {t('common.menu.historicalPlaces')}
                            </div>
                            <p className="text-sm leading-tight text-theme-text-muted">
                              {t('common.menu.historicalPlacesDesc')}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </div>
                      <div>
                        
                      </div>
                      <div>
                        <NavigationMenuLink asChild>
                          <Link href="/amasya/yoresel-lezzetler" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-theme-primary/10 hover:text-theme-primary-hover">
                            <div className="text-sm font-medium leading-none text-theme-text">
                              {t('common.menu.localFood')}
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-theme-text-muted">
                              {t('common.menu.localFoodDesc')}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Not Paylaşımı */}
                <NavigationMenuItem>
                  <Link href="/not-paylasimi" className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-theme-primary px-3 py-2 text-sm font-medium text-theme-bg transition-colors hover:bg-theme-primary-hover hover:text-theme-bg focus:bg-theme-primary-hover focus:text-theme-bg focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    <BookCopy className="w-4 h-4 mr-2" />
                    {t('common.menu.notes')}
                  </Link>
                </NavigationMenuItem>

                {/* Etkinlikler */}
                <NavigationMenuItem>
                  <Link href="/etkinlikler" className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-theme-primary px-3 py-2 text-sm font-medium text-theme-bg transition-colors hover:bg-theme-primary-hover hover:text-theme-bg focus:bg-theme-primary-hover focus:text-theme-bg focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    <Calendar className="w-4 h-4 mr-2" />
                    {t('common.menu.events')}
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>

              <NavigationMenuViewport className="absolute top-[100%] left-0 w-full origin-top-center overflow-hidden rounded-md border border-theme-primary/20 bg-theme-bg text-theme-text shadow-lg animate-in data-[motion=from-start]:animate-in data-[motion=from-end]:animate-out data-[motion=to-end]:animate-in" />
            </NavigationMenu>
          </div>

          {/* Sağ Bölüm - Dil Seçici ve Giriş/Profil */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            
            {/* Mobil Menü */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="hover:bg-theme-primary/10">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">{t('common.menu.openMenu')}</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] border-l border-theme-primary/20">
                <SheetHeader className="border-b border-theme-primary/10 pb-4">
                  <SheetTitle className="text-left text-lg font-semibold text-theme-text">
                    {t('common.menu.navigation')}
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-4 py-6">
                  {session?.user?.role === "ADMIN" && (
                    <div className="flex flex-col gap-2">
                      <div className="font-medium">Admin</div>
                      <Link href="/admin/etkinlikler" className="flex items-center gap-2 px-4 py-2 text-sm rounded-md hover:bg-theme-primary/10">
                        {t('common.menu.eventManagement')}
                      </Link>
                    </div>
                  )}
                  
                  <div className="flex flex-col gap-2">
                    <div className="font-medium">{t('common.menu.university')}</div>
                    <Link href="/universite/genel-bilgi" className="flex items-center gap-2 px-4 py-2 text-sm rounded-md hover:bg-theme-primary/10">
                      <Building2 className="w-4 h-4" />
                      {t('common.menu.generalInfo')}
                    </Link>
                    <Link href="/universite/fakulteler" className="flex items-center gap-2 px-4 py-2 text-sm rounded-md hover:bg-theme-primary/10">
                      <Landmark className="w-4 h-4" />
                      {t('common.menu.faculties')}
                    </Link>
                    <Link href="/universite/akademik-takvim" className="flex items-center gap-2 px-4 py-2 text-sm rounded-md hover:bg-theme-primary/10">
                      <Calendar className="w-4 h-4" />
                      {t('common.menu.calendar')}
                    </Link>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="font-medium">{t('common.menu.dormitory')}</div>
                    <Link href="/yurt-ulasim/yurtlar" className="flex items-center gap-2 px-4 py-2 text-sm rounded-md hover:bg-theme-primary/10">
                      <Building2 className="w-4 h-4" />
                      {t('common.menu.dorms')}
                    </Link>
                    <Link href="/yurt-ulasim/otobus-guzergahlari" className="flex items-center gap-2 px-4 py-2 text-sm rounded-md hover:bg-theme-primary/10">
                      <Bus className="w-4 h-4" />
                      {t('common.menu.busRoutes')}
                    </Link>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="font-medium">{t('common.menu.amasya')}</div>
                    <Link href="/amasya/tarihi-yerler" className="flex items-center gap-2 px-4 py-2 text-sm rounded-md hover:bg-theme-primary/10">
                      <Landmark className="w-4 h-4" />
                      {t('common.menu.historicalPlaces')}
                    </Link>
                    <Link href="/amasya/yoresel-lezzetler" className="flex items-center gap-2 px-4 py-2 text-sm rounded-md hover:bg-theme-primary/10">
                      <UtensilsCrossed className="w-4 h-4" />
                      {t('common.menu.localFood')}
                    </Link>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Link 
                      href="/not-paylasimi" 
                      className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-theme-bg bg-theme-primary rounded-md hover:bg-theme-primary-hover transition-colors"
                    >
                      <BookCopy className="w-4 h-4" />
                      {t('common.menu.notes')}
                    </Link>
                    <Link 
                      href="/etkinlikler" 
                      className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-theme-bg bg-theme-primary rounded-md hover:bg-theme-primary-hover transition-colors"
                    >
                      <Calendar className="w-4 h-4" />
                      {t('common.menu.events')}
                    </Link>
                  </div>

                  {/* Mobil Giriş/Kayıt */}
                  {status !== "authenticated" && (
                    <div className="flex flex-col gap-2 pt-4 mt-4 border-t border-theme-primary/20">
                      <Button 
                        asChild 
                        variant="ghost" 
                        className="w-full justify-start px-4 py-2.5 text-theme-text hover:bg-theme-primary/10"
                      >
                        <Link href="/giris">{t('common.auth.login')}</Link>
                      </Button>
                      <Button 
                        asChild 
                        className="w-full justify-start px-4 py-2.5 bg-theme-primary text-theme-bg hover:bg-theme-primary-hover"
                      >
                        <Link href="/kayit">{t('common.auth.register')}</Link>
                      </Button>
                    </div>
                  )}
                </nav>
              </SheetContent>
            </Sheet>

            {/* Giriş/Kayıt veya Profil */}
            {status === "authenticated" ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full ring-offset-background transition-colors hover:bg-theme-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-theme-primary focus-visible:ring-offset-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={session?.user?.image} alt={session?.user?.name} />
                      <AvatarFallback className="bg-theme-primary text-theme-bg font-medium">
                        {session?.user?.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuItem className="flex flex-col items-start p-2 focus:bg-theme-primary/5">
                    <div className="text-sm font-medium text-theme-text">{session?.user?.name}</div>
                    <div className="text-xs text-theme-text-muted">{session?.user?.email}</div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-theme-primary/10" />
                  <DropdownMenuItem 
                    className="text-red-500 hover:text-red-600 focus:text-red-600 cursor-pointer focus:bg-red-50" 
                    onClick={() => signOut()}
                  >
                    Çıkış Yap
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <Button 
                  asChild 
                  variant="ghost" 
                  className="h-9 px-3 text-theme-text hover:bg-theme-primary/10 hover:text-theme-primary-hover transition-colors"
                >
                  <Link href="/giris">{t('common.auth.login')}</Link>
                </Button>
                <Button 
                  asChild 
                  className="h-9 px-3 bg-theme-primary text-theme-bg hover:bg-theme-primary-hover transition-colors"
                >
                  <Link href="/kayit">{t('common.auth.register')}</Link>
                </Button>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

                    