'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { t } from "@/lib/i18n";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      setError("Şifreler eşleşmiyor");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Kayıt işlemi başarısız");
      }

      router.push("/giris");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-theme-primary/5 via-theme-bg to-theme-primary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo ve Başlık */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-theme-text mb-2">
            Aramıza Katılın
          </h1>
          <p className="text-theme-text-muted">
            Yeni bir hesap oluşturarak platformumuza üye olun
          </p>
        </div>

        {/* Kayıt Formu */}
        <Card className="border-theme-primary/10 shadow-lg shadow-theme-primary/5">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-theme-text">
                  Ad Soyad
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Ad Soyad"
                  className="border-theme-primary/20 focus:border-theme-primary"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-theme-text">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="ornek@email.com"
                  className="border-theme-primary/20 focus:border-theme-primary"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-theme-text">
                  Şifre
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  className="border-theme-primary/20 focus:border-theme-primary"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium text-theme-text">
                  Şifre Tekrar
                </label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  placeholder="••••••••"
                  className="border-theme-primary/20 focus:border-theme-primary"
                />
              </div>
              {error && (
                <div className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-lg">
                  {error}
                </div>
              )}
              <Button
                type="submit"
                className="w-full bg-theme-primary hover:bg-theme-primary-hover text-white transition-colors"
                disabled={loading}
              >
                {loading ? "Kayıt yapılıyor..." : "Kayıt Ol"}
              </Button>
              <div className="text-center text-sm text-theme-text-muted">
                Zaten hesabınız var mı?{" "}
                <Link
                  href="/giris"
                  className="text-theme-primary hover:text-theme-primary-hover font-medium"
                >
                  Giriş Yap
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Alt Bilgi */}
        <div className="mt-8 text-center text-sm text-theme-text-muted">
          <Link href="/" className="hover:text-theme-primary transition-colors">
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </main>
  );
} 