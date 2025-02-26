'use client';

import { useState, useEffect } from "react";
import Header from "@/components/header";
import Chatbot from "@/components/chatbot";
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

/**
 * Tarihi yerler sayfası
 * @returns {JSX.Element} Tarihi yerler sayfası
 */
export default function HistoricalPlacesPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Sayfa yüklendiğinde loading durumunu kaldır
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const historicalPlaces = [
    {
      id: 1,
      title: "Pontus Kral Kaya Mezarları",
      period: "M.Ö. 4. Yüzyıl",
      description: `Amasya&apos;nın Yeşilırmak vadisine bakan sarp kayalıklarında yükselen Pontus Kral Kaya Mezarları, yaklaşık 2300 yıl öncesine uzanan tarihiyle kentin en görkemli yapıları arasında yer alır. M.Ö. 4. yüzyılda Pontus Krallığı döneminde inşa edilen bu mezarlar, dönemin krallarına ait anıtsal birer eser olarak günümüze ulaşmıştır.

      Kayalara oyulmuş bu devasa mezarlar, yalnızca tarihi bir miras değil, aynı zamanda Amasya&apos;nın doğal güzelliğini taçlandıran bir estetik unsurdur. Akşam ışıklandırmalarıyla birlikte, Yeşilırmak&apos;ın kıyısında büyüleyici bir manzara sunarak kente mistik bir hava katar. Tarih ve doğanın iç içe geçtiği bu eşsiz yapılar, Amasya&apos;nın kültürel dokusunu tamamlayan en önemli öğelerden biridir.`,
      images: [
        "/tarihi-yerler/pontus1.jpg",
        "/tarihi-yerler/pontus2.jpg",
        "/tarihi-yerler/pontus3.jpg"
      ],
      highlights: [
        "2300 yıllık tarih",
        "Kayalara oyulmuş anıtsal yapı",
        "Gece ışıklandırması",
        "Yeşilırmak manzarası"
      ]
    },
    {
      id: 2,
      title: "Amasya Kalesi (Harşena Kalesi)",
      period: "Hititler - Persler - Pontus Krallığı - Osmanlı",
      description: `Yeşilırmak Vadisi'ne hakim bir konumda yükselen Amasya Kalesi (Harşena Kalesi), binlerce yıllık geçmişiyle kentin en önemli tarihi yapılarından biridir. Stratejik konumu sayesinde Hititler'den Persler'e, Pontus Krallığı'ndan Osmanlı'ya kadar birçok medeniyetin hâkimiyetine giren kale, özellikle Pontus Krallığı döneminde büyük önem kazanmıştır. Adını, Pontus Kralı Mithridates'in komutanı Harşena'dan alan bu ihtişamlı yapı, Osmanlı döneminde de savunma amaçlı kullanılmıştır.

      Harşena Kalesi, yalnızca tarihi değeriyle değil, aynı zamanda şehre kattığı eşsiz manzarasıyla da büyüleyicidir. Zirvesinden bakıldığında Yeşilırmak, Pontus Kral Kaya Mezarları ve Amasya'nın tarihi evleri muhteşem bir uyum içinde gözler önüne serilir. Gün batımında altın sarısına bürünen kale ve çevresi, Amasya'nın doğal ve kültürel güzelliğini taçlandıran eşsiz bir silüet oluşturur.`,
      images: [
        "/tarihi-yerler/kale1.jpg",
        "/tarihi-yerler/kale2.jpg"
      ],
      highlights: [
        "Hititler - Persler - Pontus Krallığı - Osmanlı",
        "Stratejik konum",
        "Muhteşem manzara",
        "Tarih ve doğanın iç içe geçtiği eşsiz yapı"
      ]
    },
    {
      id: 3,
      title: "II. Bayezid Külliyesi",
      period: "1485-1486",
      description: `Osmanlı sultanlarından II. Bayezid tarafından 1485-1486 yılları arasında yaptırılan Amasya II. Bayezid Külliyesi, şehrin en önemli Osmanlı eserlerinden biridir. Cami, medrese, imaret ve kütüphaneden oluşan bu görkemli yapı, dönemin mimari zarafetini yansıtan estetik detaylarıyla dikkat çeker. Özellikle sade ve dengeli mimarisi, iç mekândaki huzurlu atmosferiyle birleşerek ziyaretçilerine tarih içinde bir yolculuk sunar.

      Yeşilırmak'ın kıyısında yer alan külliye, şehre kattığı zarafet ve tarihi dokuyla Amasya'nın siluetine ayrı bir güzellik kazandırır. Özellikle caminin iki zarif minaresi ve taş işçiliğindeki incelik, Osmanlı sanatının en güzel örneklerinden biri olarak karşımıza çıkar. Günün farklı saatlerinde değişen ışık oyunlarıyla külliye, Amasya'nın tarihî ve doğal güzelliğini tamamlayan eşsiz bir yapı olarak varlığını sürdürmektedir.`,
      images: [
        "/tarihi-yerler/bayezid1.jpg",
        "/tarihi-yerler/bayezid2.jpg"
      ],
      highlights: [
        "1485-1486",
        "Osmanlı sultanlarından II. Bayezid tarafından yaptırılan",
        "Cami, medrese, imaret ve kütüphaneden oluşan görkemli yapı",
        "Tarih ve doğanın iç içe geçtiği eşsiz yapı"
      ]
    },
    {
      id: 4,
      title: "Hazeranlar Konağı",
      period: "19. Yüzyıl",
      description: `Yeşilırmak'ın kıyısında, tarihi Yalıboyu Evleri'nin en güzel örneklerinden biri olan Hazeranlar Konağı, 19. yüzyılda Defterdar Hasan Talat Efendi tarafından inşa ettirilmiştir. Osmanlı sivil mimarisinin zarafetini yansıtan bu yapı, adını burada yaşamış olan Hazeran Hanım'dan almıştır. Ahşap işçiliği, geniş avlusu ve simetrik mimarisiyle göz kamaştıran konak, geçmişin izlerini günümüze taşıyan önemli bir kültürel mirastır.

      Bugün müze ve sanat galerisi olarak kullanılan Hazeranlar Konağı, Amasya'nın estetik ruhunu yansıtan yapılar arasında yer alır. Yeşilırmak ile tarihi dokunun kusursuz uyumu, ziyaretçilere hem görsel bir şölen sunar hem de Osmanlı döneminin günlük yaşamına dair ipuçları verir. Özellikle gece ışıklandırmalarıyla birlikte konak, şehrin siluetine nostaljik ve zarif bir güzellik katmaktadır.`,
      images: [
        "/tarihi-yerler/konak1.jpg",
        "/tarihi-yerler/konak2.jpg"
      ],
      highlights: [
        "19. Yüzyıl",
        "Defterdar Hasan Talat Efendi tarafından inşa edilmiş",
        "Osmanlı sivil mimarisinin zarafetini yansıtan yapı",
        "Gece ışıklandırması"
      ]
    },
    {
      id: 5,
      title: "Ferhat ile Şirin Su Kanalları",
      period: "Rivayet",
      description: `Amasya'nın en romantik ve efsanevi yapılarından biri olan Ferhat ile Şirin Su Kanalları, halk arasında dilden dile aktarılan büyük bir aşk hikâyesinin izlerini taşır. Rivayete göre, Ferhat isimli bir nakkaş, Amasya Sultanı'nın kızı Şirin'e âşık olur. Ancak Sultan, bu aşka karşı çıkar ve Ferhat'a Şirin'e kavuşabilmesi için dağları delip şehre su getirmesi şartını koşar. Büyük bir aşkla işe koyulan Ferhat, keski ve çekiçle dağları delerken, Şirin'in öldüğüne dair yalan bir haber alır ve bu acıya dayanamayarak hayatına son verir.

      Bugün hala görülebilen Ferhat Su Kanalları, yalnızca bir mühendislik harikası olarak değil, aynı zamanda aşkın ve azmin bir sembolü olarak Amasya'nın tarihi dokusuna katkı sunar. Dağların içinden geçen bu eski su yolu, şehrin doğal güzellikleriyle bütünleşerek ziyaretçilere hem romantik hem de mistik bir atmosfer sunar. Ferhat'ın aşkı ve emeğiyle şekillenen bu kanallar, Amasya'nın efsanelerle bezeli tarihine anlam katan en özel yapılar arasındadır.`,
      images: [
        "/tarihi-yerler/ferhatsirin1.jpg",
        "/tarihi-yerler/ferhatsirin2.jpg",
        "/tarihi-yerler/ferhatsirin3.jpg"
      ],
      highlights: [
        "Rivayet",
        "Amasya'nın en romantik ve efsanevi yapılarından biri",
        "Aşk hikâyesi",
        "Dağların içinden geçen eski su yolu"
      ]
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-theme-bg flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-32 h-32 bg-theme-primary/20 rounded-full mb-4"></div>
          <div className="h-4 w-48 bg-theme-primary/20 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-theme-bg">
      <Header />
      
      {/* Hero Section */}
      <div className="relative h-[50vh] mb-16">
        <Image
          src="/tarihi-yerler/pontus1.jpg"
          alt="Amasya Tarihi"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-center">
            Amasya&apos;nın Tarihi Hazineleri
          </h1>
          <p className="text-xl md:text-2xl text-center max-w-2xl px-4">
            Binlerce yıllık tarihin izlerini taşıyan eşsiz yapılar
          </p>
        </div>
      </div>

      {/* İçerik */}
      <div className="container mx-auto px-4 pb-16">
        <div className="space-y-24">
          {historicalPlaces.map((place, index) => (
            <div 
              key={place.id} 
              className="opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s`, animationFillMode: 'forwards' }}
            >
              <div className={`bg-white rounded-2xl shadow-2xl overflow-hidden ${index % 2 === 0 ? '' : 'md:flex-row-reverse'} md:flex transform transition-transform duration-500 hover:scale-[1.02]`}>
                {/* Görsel Slider */}
                <div className="md:w-1/2 relative h-[500px]">
                  <Swiper
                    modules={[Navigation, Pagination, Autoplay, EffectFade]}
                    effect="fade"
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 5000 }}
                    loop={true}
                    className="h-full group"
                  >
                    {place.images.map((image, i) => (
                      <SwiperSlide key={i}>
                        <Image
                          src={image}
                          alt={`${place.title} - Görsel ${i + 1}`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          priority={index === 0}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <div className="absolute top-4 left-4 z-10 bg-theme-primary/90 text-white px-4 py-2 rounded-full text-sm">
                    {place.period}
                  </div>
                </div>

                {/* İçerik */}
                <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                  <h2 className="text-3xl font-bold mb-6 text-theme-primary">
                    {place.title}
                  </h2>
                  <p className="text-theme-text whitespace-pre-line mb-8 leading-relaxed">
                    {place.description}
                  </p>
                  
                  {/* Öne Çıkan Özellikler */}
                  {place.highlights && (
                    <div className="grid grid-cols-2 gap-4">
                      {place.highlights.map((highlight, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-theme-primary rounded-full"></div>
                          <span className="text-sm text-theme-text">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Chatbot />
    </main>
  );
} 