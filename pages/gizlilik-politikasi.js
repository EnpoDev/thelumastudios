import { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function GizlilikPolitikasi() {
  const [locale, setLocale] = useState('tr');

  useEffect(() => {
    const cookieLocale = document.cookie.split('; ').find(row => row.startsWith('locale='))?.split('=')[1];
    if (cookieLocale === 'tr' || cookieLocale === 'en') {
      setLocale(cookieLocale);
    }
  }, []);

  const content = {
    tr: {
      title: "Gizlilik Politikası",
      metaDescription: "Luma Studios gizlilik politikası ve kişisel verilerin korunması hakkında bilgi.",
      lastUpdate: "Son güncelleme: 10 Ocak 2026",
      sections: [
        {
          title: "1. Giriş",
          content: "Luma Studios olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında kişisel verilerinizin güvenliği konusunda azami hassasiyet göstermekteyiz. Bu gizlilik politikası, web sitemizi ziyaret ettiğinizde ve hizmetlerimizi kullandığınızda kişisel verilerinizin nasıl toplandığını, kullanıldığını ve korunduğunu açıklamaktadır."
        },
        {
          title: "2. Veri Sorumlusu",
          content: "Kişisel verileriniz bakımından veri sorumlusu:\n\nEnes POYRAZ\nAdres: Cumhuriyet Mah. Başak Sok. Yükselen Park Nilüfer Sitesi H Blok Kat 7 Daire 18 Nilüfer/Bursa\nE-posta: enespoyraz380@gmail.com\nTelefon: 0546 780 59 72\nVKN: 7330923351\nKEP: enes.poyraz@hs01.kep.tr\n\nGVK Mükerrer 20/B kapsamında vergiden muaftır."
        },
        {
          title: "3. Toplanan Kişisel Veriler",
          content: "Web sitemiz aracılığıyla aşağıdaki kişisel verileriniz toplanabilmektedir:\n\n• Ad ve Soyad\n• E-posta adresi\n• Telefon numarası\n• Şirket adı (opsiyonel)\n• IP adresi\n• Tarayıcı ve cihaz bilgileri\n• Çerez verileri"
        },
        {
          title: "4. Kişisel Verilerin İşlenme Amaçları",
          content: "Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:\n\n• İletişim taleplerinin yanıtlanması\n• Hizmetlerimiz hakkında bilgi verilmesi\n• Teklif ve proje süreçlerinin yürütülmesi\n• Yasal yükümlülüklerin yerine getirilmesi\n• Hizmet kalitesinin iyileştirilmesi\n• Web sitesi güvenliğinin sağlanması"
        },
        {
          title: "5. Kişisel Verilerin Aktarımı",
          content: "Kişisel verileriniz, yasal zorunluluklar ve hizmet gereklilikleri dışında üçüncü taraflarla paylaşılmamaktadır. Verileriniz yalnızca:\n\n• Yasal mercilerin talepleri doğrultusunda\n• Hizmet sağlayıcılarımızla (hosting, e-posta hizmetleri)\n• Ödeme işlemleri için iyzico ile\n\npaylaşılabilmektedir."
        },
        {
          title: "6. Çerezler (Cookies)",
          content: "Web sitemiz, kullanıcı deneyimini iyileştirmek için çerezler kullanmaktadır. Çerezler, tarayıcınız tarafından cihazınıza kaydedilen küçük metin dosyalarıdır. Tarayıcı ayarlarınızdan çerezleri devre dışı bırakabilirsiniz, ancak bu durumda web sitesinin bazı özellikleri düzgün çalışmayabilir."
        },
        {
          title: "7. Veri Güvenliği",
          content: "Kişisel verilerinizin güvenliği için gerekli teknik ve idari tedbirler alınmaktadır:\n\n• SSL sertifikası ile şifreli veri iletimi\n• Güvenli sunucu altyapısı\n• Düzenli güvenlik güncellemeleri\n• Erişim kontrolü ve yetkilendirme"
        },
        {
          title: "8. Veri Saklama Süresi",
          content: "Kişisel verileriniz, işlenme amaçlarının gerektirdiği süre boyunca ve yasal saklama sürelerine uygun olarak muhafaza edilmektedir. İşleme amacı ortadan kalktığında, yasal bir zorunluluk olmadığı sürece verileriniz silinir, yok edilir veya anonim hale getirilir."
        },
        {
          title: "9. KVKK Kapsamındaki Haklarınız",
          content: "6698 sayılı KVKK'nın 11. maddesi kapsamında aşağıdaki haklara sahipsiniz:\n\n• Kişisel verilerinizin işlenip işlenmediğini öğrenme\n• Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme\n• Kişisel verilerinizin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme\n• Yurt içinde veya yurt dışında kişisel verilerinizin aktarıldığı üçüncü kişileri bilme\n• Kişisel verilerinizin eksik veya yanlış işlenmiş olması halinde bunların düzeltilmesini isteme\n• Kişisel verilerinizin silinmesini veya yok edilmesini isteme\n• Yapılan işlemlerin, kişisel verilerinizin aktarıldığı üçüncü kişilere bildirilmesini isteme\n• İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme\n• Kişisel verilerinizin kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız halinde zararın giderilmesini talep etme"
        },
        {
          title: "10. İletişim",
          content: "KVKK kapsamındaki haklarınızı kullanmak için veya gizlilik politikamız hakkında sorularınız için bizimle iletişime geçebilirsiniz:\n\nE-posta: enespoyraz380@gmail.com\nTelefon: 0546 780 59 72"
        },
        {
          title: "11. Değişiklikler",
          content: "Bu gizlilik politikası, gerekli görüldüğünde güncellenebilir. Yapılan değişiklikler web sitemizde yayınlandığı tarihten itibaren geçerli olacaktır. Politikamızı düzenli olarak kontrol etmenizi öneririz."
        }
      ]
    },
    en: {
      title: "Privacy Policy",
      metaDescription: "Luma Studios privacy policy and information about personal data protection.",
      lastUpdate: "Last updated: January 10, 2026",
      sections: [
        {
          title: "1. Introduction",
          content: "At Luma Studios, we take the security of your personal data very seriously in accordance with the Turkish Personal Data Protection Law (KVKK) No. 6698. This privacy policy explains how your personal data is collected, used, and protected when you visit our website and use our services."
        },
        {
          title: "2. Data Controller",
          content: "The data controller for your personal data:\n\nEnes POYRAZ\nAddress: Cumhuriyet Mah. Başak Sok. Yükselen Park Nilüfer Sitesi H Blok Kat 7 Daire 18 Nilüfer/Bursa, Turkey\nEmail: enespoyraz380@gmail.com\nPhone: +90 546 780 59 72\nTax ID (VKN): 7330923351\nRegistered Email (KEP): enes.poyraz@hs01.kep.tr\n\nTax exempt under Income Tax Law Article 20/B."
        },
        {
          title: "3. Personal Data Collected",
          content: "The following personal data may be collected through our website:\n\n• Name and Surname\n• Email address\n• Phone number\n• Company name (optional)\n• IP address\n• Browser and device information\n• Cookie data"
        },
        {
          title: "4. Purposes of Processing Personal Data",
          content: "Your personal data is processed for the following purposes:\n\n• Responding to contact requests\n• Providing information about our services\n• Managing proposals and project processes\n• Fulfilling legal obligations\n• Improving service quality\n• Ensuring website security"
        },
        {
          title: "5. Transfer of Personal Data",
          content: "Your personal data is not shared with third parties except for legal requirements and service necessities. Your data may only be shared:\n\n• In accordance with requests from legal authorities\n• With our service providers (hosting, email services)\n• With iyzico for payment transactions"
        },
        {
          title: "6. Cookies",
          content: "Our website uses cookies to improve user experience. Cookies are small text files stored on your device by your browser. You can disable cookies through your browser settings, but some features of the website may not work properly in this case."
        },
        {
          title: "7. Data Security",
          content: "Necessary technical and administrative measures are taken to ensure the security of your personal data:\n\n• Encrypted data transmission with SSL certificate\n• Secure server infrastructure\n• Regular security updates\n• Access control and authorization"
        },
        {
          title: "8. Data Retention Period",
          content: "Your personal data is retained for the duration required by the processing purposes and in accordance with legal retention periods. When the processing purpose ceases, your data is deleted, destroyed, or anonymized unless there is a legal obligation."
        },
        {
          title: "9. Your Rights Under KVKK",
          content: "Under Article 11 of KVKK No. 6698, you have the following rights:\n\n• To learn whether your personal data is being processed\n• To request information if your personal data has been processed\n• To learn the purpose of processing your personal data and whether they are used in accordance with their purpose\n• To know the third parties to whom your personal data is transferred domestically or abroad\n• To request correction of your personal data if it is incomplete or incorrectly processed\n• To request deletion or destruction of your personal data\n• To request notification of operations carried out to third parties to whom your personal data has been transferred\n• To object to a result arising against you by analyzing processed data exclusively through automated systems\n• To claim compensation if you suffer damage due to unlawful processing of your personal data"
        },
        {
          title: "10. Contact",
          content: "To exercise your rights under KVKK or for questions about our privacy policy, you can contact us:\n\nEmail: enespoyraz380@gmail.com\nPhone: +90 546 780 59 72"
        },
        {
          title: "11. Changes",
          content: "This privacy policy may be updated when necessary. Changes will be effective from the date they are published on our website. We recommend checking our policy regularly."
        }
      ]
    }
  };

  const text = content[locale];

  return (
    <>
      <Head>
        <title>{text.title} | Luma Studios</title>
        <meta name="description" content={text.metaDescription} />
        <meta name="robots" content="index, follow" />
      </Head>
      <Header locale={locale} />
      <main className="min-h-screen bg-[#0a0a0a] pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{text.title}</h1>
          <p className="text-gray-500 text-sm mb-12">{text.lastUpdate}</p>

          <div className="space-y-8">
            {text.sections.map((section, index) => (
              <div key={index} className="border-b border-white/10 pb-8 last:border-0">
                <h2 className="text-xl font-semibold text-white mb-4">{section.title}</h2>
                <p className="text-gray-400 leading-relaxed whitespace-pre-line">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
