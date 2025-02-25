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
      <div className="container mx-auto px-4">
        <nav className="flex h-16 items-center justify-between">
          {/* Logo ve Site Adı */}
          <Link href="/" className="flex items-center space-x-2 transition-colors hover:opacity-90">
            <span className="text-xl font-bold bg-gradient-to-r from-theme-primary to-theme-primary-hover bg-clip-text text-transparent">
              {t('common.siteName')}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <NavigationMenu>
              <NavigationMenuList className="flex items-center gap-4">
                {/* Üniversitemiz */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="h-10 px-5 py-2 text-theme-text hover:bg-theme-primary/10 hover:text-theme-primary-hover">
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
                  <NavigationMenuTrigger className="h-10 px-5 py-2 text-theme-text hover:bg-theme-primary/10 hover:text-theme-primary-hover">
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
                        <NavigationMenuLink asChild>
                          <Link href="/yurt-ulasim/sefer-saatleri" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-theme-primary/10 hover:text-theme-primary-hover">
                            <div className="text-sm font-medium leading-none text-theme-text">
                              {t('common.menu.busSchedule')}
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-theme-text-muted">
                              {t('common.menu.busScheduleDesc')}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Amasyamız */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="h-10 px-5 py-2 text-theme-text hover:bg-theme-primary/10 hover:text-theme-primary-hover">
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
                        <NavigationMenuLink asChild>
                          <Link href="/amasya/gezi-rotalari" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-theme-primary/10 hover:text-theme-primary-hover">
                            <div className="text-sm font-medium leading-none text-theme-text">
                              {t('common.menu.tourRoutes')}
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-theme-text-muted">
                              {t('common.menu.tourRoutesDesc')}
                            </p>
                          </Link>
                        </NavigationMenuLink>
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
                  <Link href="/not-paylasimi" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-theme-primary px-5 py-2 text-sm font-medium text-theme-bg transition-colors hover:bg-theme-primary-hover hover:text-theme-bg focus:bg-theme-primary-hover focus:text-theme-bg focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    <BookCopy className="w-4 h-4 mr-2" />
                    {t('common.menu.notes')}
                  </Link>
                </NavigationMenuItem>

                {/* Etkinlikler */}
                <NavigationMenuItem>
                  <Link href="/etkinlikler" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-theme-primary px-5 py-2 text-sm font-medium text-theme-bg transition-colors hover:bg-theme-primary-hover hover:text-theme-bg focus:bg-theme-primary-hover focus:text-theme-bg focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    <Calendar className="w-4 h-4 mr-2" />
                    {t('common.menu.events')}
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>

              <NavigationMenuViewport className="absolute top-[100%] left-0 w-full origin-top-center overflow-hidden rounded-md border border-theme-primary/20 bg-theme-bg text-theme-text shadow-lg animate-in data-[motion=from-start]:animate-in data-[motion=from-end]:animate-out data-[motion=to-end]:animate-in" />
            </NavigationMenu>

            <div className="flex items-center gap-6">
              <LanguageSwitcher />
              
              {status === 'authenticated' ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={session.user.image} alt={session.user.name} />
                        <AvatarFallback>{session.user.name?.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        {session.user.name && (
                          <p className="font-medium text-theme-text">{session.user.name}</p>
                        )}
                        {session.user.email && (
                          <p className="w-[200px] truncate text-sm text-theme-text-muted">
                            {session.user.email}
                          </p>
                        )}
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profil">Profil</Link>
                    </DropdownMenuItem>
                    {session.user.role === 'ADMIN' && (
                      <DropdownMenuItem asChild>
                        <Link href="/admin">Yönetim Paneli</Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-red-500 focus:text-red-500"
                      onSelect={() => signOut()}
                    >
                      Çıkış Yap
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center gap-2">
                  <Button variant="ghost" asChild>
                    <Link href="/giris">Giriş Yap</Link>
                  </Button>
                  <Button className="bg-theme-primary hover:bg-theme-primary-hover text-white" asChild>
                    <Link href="/kayit">Kayıt Ol</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-theme-text hover:bg-theme-primary/10">
                <span className="sr-only">{t('common.menu.openMenu')}</span>
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-theme-bg border-l border-theme-primary/20">
              <SheetHeader>
                <SheetTitle className="text-theme-text">{t('common.menu.menu')}</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-4 mt-6">
                <Link 
                  href="/universite/genel-bilgi" 
                  className="text-lg font-medium text-theme-text transition-colors hover:text-theme-primary-hover inline-flex items-center"
                >
                  <Building2 className="w-5 h-5 mr-2" />
                  {t('common.menu.university')}
                </Link>
                <Link 
                  href="/yurt-ulasim/yurtlar" 
                  className="text-lg font-medium text-theme-text transition-colors hover:text-theme-primary-hover inline-flex items-center"
                >
                  <Bus className="w-5 h-5 mr-2" />
                  {t('common.menu.dormitory')}
                </Link>
                <Link 
                  href="/not-paylasimi" 
                  className="text-lg font-medium text-theme-text transition-colors hover:text-theme-primary-hover inline-flex items-center"
                >
                  <BookCopy className="w-5 h-5 mr-2" />
                  {t('common.menu.notes')}
                </Link>
                <Link 
                  href="/etkinlikler" 
                  className="text-lg font-medium text-theme-text transition-colors hover:text-theme-primary-hover inline-flex items-center"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  {t('common.menu.events')}
                </Link>
                <Link 
                  href="/amasya/tarihi-yerler" 
                  className="text-lg font-medium text-theme-text transition-colors hover:text-theme-primary-hover inline-flex items-center"
                >
                  <Landmark className="w-5 h-5 mr-2" />
                  {t('common.menu.amasya')}
                </Link>
                <div className="pt-4">
                  <LanguageSwitcher />
                </div>
                {status === 'authenticated' ? (
                  <div className="space-y-4 pt-4 border-t border-theme-primary/20">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={session.user.image} alt={session.user.name} />
                        <AvatarFallback>{session.user.name?.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-theme-text">{session.user.name}</span>
                        <span className="text-xs text-theme-text-muted">{session.user.email}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Link 
                        href="/profil"
                        className="block text-sm text-theme-text hover:text-theme-primary-hover"
                      >
                        Profil
                      </Link>
                      {session.user.role === 'ADMIN' && (
                        <Link 
                          href="/admin"
                          className="block text-sm text-theme-text hover:text-theme-primary-hover"
                        >
                          Yönetim Paneli
                        </Link>
                      )}
                      <button
                        onClick={() => signOut()}
                        className="block w-full text-left text-sm text-red-500 hover:text-red-600"
                      >
                        Çıkış Yap
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 pt-4 border-t border-theme-primary/20">
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <Link href="/giris">Giriş Yap</Link>
                    </Button>
                    <Button className="w-full justify-start bg-theme-primary hover:bg-theme-primary-hover text-white" asChild>
                      <Link href="/kayit">Kayıt Ol</Link>
                    </Button>
                  </div>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  );
}

                    