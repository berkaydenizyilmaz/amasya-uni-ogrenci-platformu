'use client';

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { t } from "@/lib/i18n";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      setError("Giriş işlemi başarısız");
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
            Hoş Geldiniz
          </h1>
          <p className="text-theme-text-muted">
            Hesabınıza giriş yaparak devam edin
          </p>
        </div>

        {/* Giriş Formu */}
        <Card className="border-theme-primary/10 shadow-lg shadow-theme-primary/5">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
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
                {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
              </Button>
              <div className="text-center text-sm text-theme-text-muted">
                Hesabınız yok mu?{" "}
                <Link
                  href="/kayit"
                  className="text-theme-primary hover:text-theme-primary-hover font-medium"
                >
                  Kayıt Ol
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