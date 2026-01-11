import { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function TeslimatVeIade() {
  const [locale, setLocale] = useState('tr');

  useEffect(() => {
    const cookieLocale = document.cookie.split('; ').find(row => row.startsWith('locale='))?.split('=')[1];
    if (cookieLocale === 'tr' || cookieLocale === 'en') {
      setLocale(cookieLocale);
    }
  }, []);

  const content = {
    tr: {
      title: "Teslimat ve İade Şartları",
      metaDescription: "Luma Studios teslimat süreleri ve iade koşulları hakkında bilgi.",
      lastUpdate: "Son güncelleme: 10 Ocak 2026",
      sections: [
        {
          title: "1. Teslimat Bilgileri",
          content: "Luma Studios olarak sunduğumuz tüm hizmetler dijital hizmetlerdir. Fiziksel ürün teslimatı bulunmamaktadır. Hizmetlerimiz aşağıdaki şekillerde teslim edilmektedir:\n\n• Kaynak kod (GitHub, GitLab veya benzeri platformlar üzerinden)\n• Canlı web sitesi/uygulama erişimi\n• Admin panel ve yönetim erişim bilgileri\n• Teknik dokümantasyon\n• Veritabanı yedekleri"
        },
        {
          title: "2. Teslimat Süreleri",
          content: "Teslimat süreleri, seçilen hizmet paketine göre değişmektedir:\n\n• Starter Paket: 7-10 iş günü\n• Business Paket: 3-4 hafta\n• Enterprise Paket: Proje kapsamına göre belirlenir (genellikle 6-12 hafta)\n\nTeslimat süreleri, projenin karmaşıklığına ve müşteri tarafından sağlanan içerik/geri bildirimlere bağlı olarak değişebilir. Gecikmeler için taraflar karşılıklı olarak bilgilendirilir."
        },
        {
          title: "3. Teslimat Süreci",
          content: "3.1. Proje Başlangıcı:\n• Sipariş onayı ve %50 kapora ödemesinin ardından proje başlar.\n• Proje kapsamı ve teslimat tarihi yazılı olarak belirlenir.\n\n3.2. Geliştirme Süreci:\n• Düzenli ilerleme güncellemeleri sağlanır.\n• Müşteri onayı gerektiren aşamalarda geri bildirim alınır.\n\n3.3. Teslimat:\n• Proje tamamlandığında test ortamında demo sunulur.\n• Müşteri onayının ardından canlıya alınır.\n• Kaynak kod ve erişim bilgileri, son ödemenin ardından teslim edilir."
        },
        {
          title: "4. Ödeme Koşulları",
          content: "• %50 Kapora: Proje başlangıcında alınır.\n• %50 Kalan Ödeme: Teslimat sırasında talep edilir.\n\nÖdemeler iyzico güvenli ödeme altyapısı üzerinden yapılmaktadır. Kredi kartı, banka kartı ve havale/EFT ile ödeme kabul edilmektedir.\n\nTaksit seçenekleri için iyzico koşulları geçerlidir."
        },
        {
          title: "5. Revizyon Hakları",
          content: "Her hizmet paketine 2 (iki) revizyon hakkı dahildir.\n\n• Revizyon talepleri, ilk teslimat tarihinden itibaren 7 iş günü içinde iletilmelidir.\n• Revizyon süreleri, talebin kapsamına göre 1-5 iş günü arasında değişir.\n• Ek revizyonlar, kapsam ve iş yüküne göre ayrıca fiyatlandırılır.\n• Proje kapsamı dışındaki talepler revizyon olarak değerlendirilmez ve yeni bir teklif gerektirir."
        },
        {
          title: "6. İade Politikası",
          content: "6.1. Cayma Hakkı:\n14 gün içinde cayma hakkınız bulunmaktadır. Ancak aşağıdaki durumlarda cayma hakkı kullanılamaz:\n\n• Özel olarak müşteriye özel hazırlanan hizmetler\n• İfa edilmeye başlanmış hizmetler\n• Tamamlanmış projeler\n\n6.2. Web Geliştirme Hizmetleri:\nYazılım ve web geliştirme hizmetleri, müşteriye özel hazırlandığından ve hizmetin ifasına başlandıktan sonra iadenin mümkün olmadığını hatırlatırız.\n\n6.3. Kapora İadesi:\n• Proje başlamadan önce iptal: Kapora iade edilir.\n• Proje başladıktan sonra iptal: Yapılan iş miktarına göre değerlendirilir.\n• Tamamlanan projelerde iade yapılmaz."
        },
        {
          title: "7. Proje İptali",
          content: "7.1. Müşteri Tarafından İptal:\n• Proje başlamadan iptal: Tam iade\n• Proje %25'e kadar tamamlanmış: %25 kesinti ile iade\n• Proje %50'ye kadar tamamlanmış: %50 kesinti ile iade\n• Proje %50'den fazla tamamlanmış: İade yapılmaz\n\n7.2. Luma Studios Tarafından İptal:\nMücbir sebepler (doğal afet, sağlık sorunları vb.) dışında proje iptal edilmez. İptal durumunda tüm ödemeler tam olarak iade edilir."
        },
        {
          title: "8. Garanti ve Destek",
          content: "• Tüm projelerimiz teslimat tarihinden itibaren 30 gün boyunca ücretsiz hata düzeltme garantisi kapsamındadır.\n• Bu süre zarfında ortaya çıkan teknik hatalar ücretsiz olarak giderilir.\n• Kullanıcı hataları, üçüncü parti değişiklikler veya hosting sorunları garanti kapsamı dışındadır.\n• Uzun vadeli bakım ve destek için ayrı anlaşmalar yapılabilir."
        },
        {
          title: "9. Mücbir Sebepler",
          content: "Aşağıdaki durumlar mücbir sebep sayılır ve bu durumlarda teslimat süreleri uzatılabilir:\n\n• Doğal afetler\n• Savaş, terör, sivil kargaşa\n• Yasal düzenlemeler\n• Salgın hastalıklar\n• İnternet altyapı sorunları\n• Enerji kesintileri\n\nMücbir sebep durumunda taraflar derhal birbirini bilgilendirir."
        },
        {
          title: "10. İletişim",
          content: "Teslimat ve iade şartları hakkında sorularınız için bizimle iletişime geçebilirsiniz:\n\nEnes POYRAZ (Luma Studios)\nAdres: Cumhuriyet Mah. Başak Sok. Yükselen Park Nilüfer Sitesi H Blok Kat 7 Daire 18 Nilüfer/Bursa\nE-posta: enespoyraz380@gmail.com\nTelefon: 0546 780 59 72\nVKN: 7330923351\nKEP: enes.poyraz@hs01.kep.tr\n\nGVK Mükerrer 20/B kapsamında vergiden muaftır.\n\nİletişim Saatleri: Hafta içi 10:00 - 18:00 (GMT+3)"
        }
      ]
    },
    en: {
      title: "Delivery & Returns",
      metaDescription: "Luma Studios delivery times and return conditions information.",
      lastUpdate: "Last updated: January 10, 2026",
      sections: [
        {
          title: "1. Delivery Information",
          content: "All services offered by Luma Studios are digital services. There is no physical product delivery. Our services are delivered in the following ways:\n\n• Source code (via GitHub, GitLab or similar platforms)\n• Live website/application access\n• Admin panel and management access information\n• Technical documentation\n• Database backups"
        },
        {
          title: "2. Delivery Times",
          content: "Delivery times vary according to the selected service package:\n\n• Starter Package: 7-10 business days\n• Business Package: 3-4 weeks\n• Enterprise Package: Determined according to project scope (usually 6-12 weeks)\n\nDelivery times may vary depending on the complexity of the project and content/feedback provided by the customer. Parties are mutually informed of delays."
        },
        {
          title: "3. Delivery Process",
          content: "3.1. Project Start:\n• The project starts after order confirmation and 50% deposit payment.\n• Project scope and delivery date are determined in writing.\n\n3.2. Development Process:\n• Regular progress updates are provided.\n• Feedback is obtained at stages requiring customer approval.\n\n3.3. Delivery:\n• When the project is completed, a demo is presented in the test environment.\n• It goes live after customer approval.\n• Source code and access information are delivered after the final payment."
        },
        {
          title: "4. Payment Terms",
          content: "• 50% Deposit: Collected at project start.\n• 50% Remaining Payment: Requested upon delivery.\n\nPayments are made through the iyzico secure payment infrastructure. Credit card, debit card, and wire transfer/EFT payments are accepted.\n\niyzico terms apply for installment options."
        },
        {
          title: "5. Revision Rights",
          content: "2 (two) revision rights are included in each service package.\n\n• Revision requests must be submitted within 7 business days from the first delivery date.\n• Revision times vary between 1-5 business days depending on the scope of the request.\n• Additional revisions are priced separately according to scope and workload.\n• Requests outside the project scope are not considered as revisions and require a new proposal."
        },
        {
          title: "6. Return Policy",
          content: "6.1. Right of Withdrawal:\nYou have the right of withdrawal within 14 days. However, the right of withdrawal cannot be exercised in the following cases:\n\n• Services specially prepared for the customer\n• Services that have started to be performed\n• Completed projects\n\n6.2. Web Development Services:\nWe remind you that refunds are not possible after software and web development services are specially prepared for the customer and the service has begun.\n\n6.3. Deposit Refund:\n• Cancellation before project starts: Deposit is refunded.\n• Cancellation after project starts: Evaluated based on the amount of work done.\n• No refunds for completed projects."
        },
        {
          title: "7. Project Cancellation",
          content: "7.1. Cancellation by Customer:\n• Cancellation before project starts: Full refund\n• Project up to 25% completed: Refund with 25% deduction\n• Project up to 50% completed: Refund with 50% deduction\n• Project more than 50% completed: No refund\n\n7.2. Cancellation by Luma Studios:\nThe project is not cancelled except for force majeure (natural disasters, health issues, etc.). In case of cancellation, all payments are fully refunded."
        },
        {
          title: "8. Warranty and Support",
          content: "• All our projects are covered by free bug fix warranty for 30 days from the delivery date.\n• Technical errors that occur during this period are fixed free of charge.\n• User errors, third-party changes, or hosting issues are not covered by the warranty.\n• Separate agreements can be made for long-term maintenance and support."
        },
        {
          title: "9. Force Majeure",
          content: "The following situations are considered force majeure and delivery times may be extended in these cases:\n\n• Natural disasters\n• War, terrorism, civil unrest\n• Legal regulations\n• Epidemics\n• Internet infrastructure problems\n• Power outages\n\nIn case of force majeure, parties immediately inform each other."
        },
        {
          title: "10. Contact",
          content: "For questions about delivery and return terms, you can contact us:\n\nEnes POYRAZ (Luma Studios)\nAddress: Cumhuriyet Mah. Başak Sok. Yükselen Park Nilüfer Sitesi H Blok Kat 7 Daire 18 Nilüfer/Bursa, Turkey\nEmail: enespoyraz380@gmail.com\nPhone: +90 546 780 59 72\nTax ID (VKN): 7330923351\nRegistered Email (KEP): enes.poyraz@hs01.kep.tr\n\nTax exempt under Income Tax Law Article 20/B.\n\nContact Hours: Weekdays 10:00 - 18:00 (GMT+3)"
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
