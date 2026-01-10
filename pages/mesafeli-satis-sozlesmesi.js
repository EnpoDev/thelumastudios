import { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function MesafeliSatisSozlesmesi() {
  const [locale, setLocale] = useState('tr');

  useEffect(() => {
    const cookieLocale = document.cookie.split('; ').find(row => row.startsWith('locale='))?.split('=')[1];
    if (cookieLocale === 'tr' || cookieLocale === 'en') {
      setLocale(cookieLocale);
    }
  }, []);

  const content = {
    tr: {
      title: "Mesafeli Satış Sözleşmesi",
      metaDescription: "Luma Studios mesafeli satış sözleşmesi ve satın alma koşulları.",
      lastUpdate: "Son güncelleme: 10 Ocak 2026",
      sections: [
        {
          title: "Madde 1 - Taraflar",
          content: "1.1. SATICI:\nÜnvan: Enes POYRAZ (Luma Studios)\nAdres: Cumhuriyet Mah. Başak Sok. Yükselen Park Nilüfer Sitesi H Blok Kat 7 Daire 18 Nilüfer/Bursa\nTelefon: 0546 780 59 72\nE-posta: enespoyraz380@gmail.com\n\n1.2. ALICI:\nSipariş sürecinde belirtilen ad, adres ve iletişim bilgilerine sahip gerçek veya tüzel kişi."
        },
        {
          title: "Madde 2 - Sözleşmenin Konusu",
          content: "İşbu sözleşmenin konusu, ALICI'nın SATICI'ya ait www.lumastudios.com web sitesinden elektronik ortamda siparişini verdiği aşağıda nitelikleri ve satış fiyatı belirtilen hizmetin satışı ve teslimi ile ilgili olarak 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği hükümleri gereğince tarafların hak ve yükümlülüklerinin belirlenmesidir."
        },
        {
          title: "Madde 3 - Hizmet Bilgileri",
          content: "3.1. Hizmetlerimiz web geliştirme, yazılım geliştirme ve dijital çözümler sunmaktadır.\n\n3.2. Hizmetin temel nitelikleri, kapsamı ve fiyatı sipariş onayında ve teklifte detaylı olarak belirtilmektedir.\n\n3.3. Listelenen ve sitede ilan edilen fiyatlar satış fiyatıdır. İlan edilen fiyatlar ve vaatler güncelleme yapılana kadar geçerlidir.\n\n3.4. Hizmet bedeline KDV dahildir."
        },
        {
          title: "Madde 4 - Genel Hükümler",
          content: "4.1. ALICI, SATICI'ya ait web sitesinde sözleşme konusu hizmetin temel nitelikleri, satış fiyatı ve ödeme şekli ile teslimata ilişkin ön bilgileri okuyup, bilgi sahibi olduğunu ve elektronik ortamda gerekli teyidi verdiğini kabul, beyan ve taahhüt eder.\n\n4.2. ALICI, sözleşmeyi kabul etmekle, sözleşme konusu siparişi onayladığı takdirde sipariş konusu bedeli ve varsa kargo ücreti, vergi gibi belirtilen ek ücretleri ödeme yükümlülüğü altına gireceğini kabul ve taahhüt eder.\n\n4.3. SATICI, sözleşme konusu hizmeti eksiksiz, siparişte belirtilen niteliklere uygun şekilde teslim etmeyi kabul ve taahhüt eder."
        },
        {
          title: "Madde 5 - Ödeme ve Teslimat",
          content: "5.1. Ödemeler, iyzico güvenli ödeme altyapısı üzerinden kredi kartı veya banka kartı ile gerçekleştirilmektedir.\n\n5.2. Sipariş onayı ile birlikte toplam bedelin %50'si kapora olarak alınır.\n\n5.3. Kalan %50 ödeme, hizmetin tesliminde talep edilir.\n\n5.4. Teslimat süreleri, hizmet paketine göre değişmektedir:\n• Starter Paket: 7-10 iş günü\n• Business Paket: 3-4 hafta\n• Enterprise Paket: Proje kapsamına göre belirlenir\n\n5.5. Teslimat, dijital olarak (kaynak kod, erişim bilgileri vb.) gerçekleştirilir."
        },
        {
          title: "Madde 6 - Cayma Hakkı",
          content: "6.1. ALICI, sözleşme konusu hizmetin kendisine veya gösterdiği adresteki kişi/kuruluşa teslim tarihinden itibaren 14 (on dört) gün içerisinde cayma hakkını kullanabilir.\n\n6.2. Cayma hakkının kullanılması için bu süre içinde SATICI'ya yazılı olarak bildirimde bulunulması şarttır.\n\n6.3. Aşağıdaki durumlarda cayma hakkı kullanılamaz:\n• Özel olarak ALICI'nın talepleri doğrultusunda hazırlanan hizmetler\n• İfa edilmiş (tamamlanmış) hizmetler\n• ALICI'nın onayı ile ifa edilmeye başlanan hizmetler\n\n6.4. Yazılım ve web geliştirme hizmetleri, özel olarak müşteriye özel hazırlandığından ve hizmetin ifasına başlandıktan sonra, cayma hakkı kapsamı dışındadır."
        },
        {
          title: "Madde 7 - Revizyon Hakları",
          content: "7.1. Her hizmet paketine 2 (iki) revizyon hakkı dahildir.\n\n7.2. Ek revizyonlar ayrıca ücretlendirilir.\n\n7.3. Revizyon talepleri, teslimat tarihinden itibaren 7 (yedi) iş günü içinde iletilmelidir.\n\n7.4. Kapsam dışı talepler (proje başlangıcında belirlenen kapsamın dışındaki işler) yeni bir teklif gerektirir."
        },
        {
          title: "Madde 8 - Fikri Mülkiyet",
          content: "8.1. Proje kapsamında geliştirilen özgün kaynak kodlar, son ödemenin yapılmasının ardından ALICI'ya devredilir.\n\n8.2. SATICI, portföy ve referans amaçlı olarak proje hakkında genel bilgi paylaşma hakkını saklı tutar.\n\n8.3. Üçüncü parti lisanslar (framework, kütüphane vb.) kendi lisans koşullarına tabidir."
        },
        {
          title: "Madde 9 - Gizlilik",
          content: "9.1. SATICI, ALICI'ya ait tüm bilgileri gizli tutmayı taahhüt eder.\n\n9.2. Bu bilgiler, yasal zorunluluklar dışında üçüncü kişilerle paylaşılmaz.\n\n9.3. Gizlilik politikamız hakkında detaylı bilgi için web sitemizdeki Gizlilik Politikası sayfasını inceleyebilirsiniz."
        },
        {
          title: "Madde 10 - Uyuşmazlık Çözümü",
          content: "10.1. İşbu sözleşmenin uygulanmasından doğacak uyuşmazlıklarda, Türkiye Cumhuriyeti kanunları uygulanır.\n\n10.2. Uyuşmazlıklarda Bursa Mahkemeleri ve İcra Daireleri yetkilidir.\n\n10.3. Tüketici şikayetleri için Tüketici Hakem Heyetleri ve Tüketici Mahkemeleri yetkilidir."
        },
        {
          title: "Madde 11 - Yürürlük",
          content: "11.1. ALICI, işbu sözleşmede yazılı tüm koşulları kabul etmiş sayılır.\n\n11.2. SATICI, siparişin gerçekleşmesi öncesinde işbu sözleşme hükümlerinin ALICI tarafından okunduğunu ve kabul edildiğini kabul eder.\n\n11.3. İşbu sözleşme, taraflarca okunarak, tarihinde, elektronik ortamda karşılıklı olarak kabul edilerek yürürlüğe girmiştir."
        }
      ]
    },
    en: {
      title: "Distance Sales Agreement",
      metaDescription: "Luma Studios distance sales agreement and purchase terms.",
      lastUpdate: "Last updated: January 10, 2026",
      sections: [
        {
          title: "Article 1 - Parties",
          content: "1.1. SELLER:\nName: Enes POYRAZ (Luma Studios)\nAddress: Cumhuriyet Mah. Başak Sok. Yükselen Park Nilüfer Sitesi H Blok Kat 7 Daire 18 Nilüfer/Bursa, Turkey\nPhone: +90 546 780 59 72\nEmail: enespoyraz380@gmail.com\n\n1.2. BUYER:\nNatural or legal person with the name, address, and contact information specified during the order process."
        },
        {
          title: "Article 2 - Subject of the Agreement",
          content: "The subject of this agreement is to determine the rights and obligations of the parties regarding the sale and delivery of the service, the characteristics and sales price of which are specified below, ordered by the BUYER electronically from the website www.lumastudios.com belonging to the SELLER, in accordance with the provisions of the Consumer Protection Law No. 6502 and the Distance Contracts Regulation."
        },
        {
          title: "Article 3 - Service Information",
          content: "3.1. Our services include web development, software development, and digital solutions.\n\n3.2. The basic characteristics, scope, and price of the service are detailed in the order confirmation and proposal.\n\n3.3. Listed and advertised prices on the website are sales prices. Advertised prices and promises are valid until updated.\n\n3.4. VAT is included in the service fee."
        },
        {
          title: "Article 4 - General Provisions",
          content: "4.1. The BUYER accepts, declares, and undertakes that they have read and acknowledged the preliminary information regarding the basic characteristics, sales price, payment method, and delivery of the service subject to the contract on the SELLER's website and have given the necessary confirmation electronically.\n\n4.2. By accepting the agreement, the BUYER accepts and undertakes that they will be obligated to pay the order amount and any specified additional fees such as shipping and taxes if they confirm the order.\n\n4.3. The SELLER accepts and undertakes to deliver the service subject to the agreement completely and in accordance with the characteristics specified in the order."
        },
        {
          title: "Article 5 - Payment and Delivery",
          content: "5.1. Payments are made by credit card or debit card through the iyzico secure payment infrastructure.\n\n5.2. 50% of the total amount is taken as a deposit upon order confirmation.\n\n5.3. The remaining 50% payment is requested upon delivery of the service.\n\n5.4. Delivery times vary according to the service package:\n• Starter Package: 7-10 business days\n• Business Package: 3-4 weeks\n• Enterprise Package: Determined according to project scope\n\n5.5. Delivery is made digitally (source code, access information, etc.)."
        },
        {
          title: "Article 6 - Right of Withdrawal",
          content: "6.1. The BUYER may exercise the right of withdrawal within 14 (fourteen) days from the date of delivery of the service to themselves or to the person/organization at the address they have indicated.\n\n6.2. To exercise the right of withdrawal, written notification must be made to the SELLER within this period.\n\n6.3. The right of withdrawal cannot be exercised in the following cases:\n• Services prepared specifically in accordance with the BUYER's requests\n• Services that have been performed (completed)\n• Services that have started to be performed with the BUYER's approval\n\n6.4. Software and web development services are outside the scope of the right of withdrawal as they are specially prepared for the customer and after the performance of the service has begun."
        },
        {
          title: "Article 7 - Revision Rights",
          content: "7.1. 2 (two) revision rights are included in each service package.\n\n7.2. Additional revisions are charged separately.\n\n7.3. Revision requests must be submitted within 7 (seven) business days from the delivery date.\n\n7.4. Out-of-scope requests (work outside the scope determined at the beginning of the project) require a new proposal."
        },
        {
          title: "Article 8 - Intellectual Property",
          content: "8.1. Original source codes developed within the scope of the project are transferred to the BUYER after the final payment is made.\n\n8.2. The SELLER reserves the right to share general information about the project for portfolio and reference purposes.\n\n8.3. Third-party licenses (framework, library, etc.) are subject to their own license terms."
        },
        {
          title: "Article 9 - Confidentiality",
          content: "9.1. The SELLER undertakes to keep all information belonging to the BUYER confidential.\n\n9.2. This information will not be shared with third parties except for legal obligations.\n\n9.3. For detailed information about our privacy policy, you can review the Privacy Policy page on our website."
        },
        {
          title: "Article 10 - Dispute Resolution",
          content: "10.1. The laws of the Republic of Turkey shall apply to disputes arising from the application of this agreement.\n\n10.2. Bursa Courts and Enforcement Offices are authorized for disputes.\n\n10.3. Consumer Arbitration Committees and Consumer Courts are authorized for consumer complaints."
        },
        {
          title: "Article 11 - Validity",
          content: "11.1. The BUYER is deemed to have accepted all conditions written in this agreement.\n\n11.2. The SELLER accepts that the provisions of this agreement have been read and accepted by the BUYER before the order is placed.\n\n11.3. This agreement has entered into force by being mutually accepted electronically by the parties after being read on this date."
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
