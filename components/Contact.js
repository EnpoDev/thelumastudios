import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';

export default function Contact({ locale = 'en' }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setStatus({
          type: 'success',
          message: locale === 'tr' 
            ? 'Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.'
            : 'Your message has been sent successfully! We will get back to you soon.',
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        });
      } else {
        setStatus({
          type: 'error',
          message: locale === 'tr'
            ? data.message || 'Bir hata oluştu. Lütfen tekrar deneyin.'
            : data.message || 'An error occurred. Please try again.',
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus({
        type: 'error',
        message: locale === 'tr'
          ? 'Bir hata oluştu. Lütfen tekrar deneyin.'
          : 'An error occurred. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      titleEn: 'Email',
      titleTr: 'E-posta',
      value: 'enespoyraz380@gmail.com',
      link: 'mailto:enespoyraz380@gmail.com',
    },
    {
      icon: Phone,
      titleEn: 'Phone',
      titleTr: 'Telefon',
      value: '0546 780 59 72',
      link: 'tel:+905467805972',
    },
    {
      icon: MapPin,
      titleEn: 'Location',
      titleTr: 'Konum',
      value: 'Bursa, Türkiye',
      link: null,
    },
  ];

  return (
    <section id="contact" className="py-32 bg-[#1a1a1a] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-purple-700 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-blue-700 rounded-full filter blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-6 py-2 bg-white/10 backdrop-blur-sm rounded-lg text-white text-sm font-semibold mb-6 border border-white/20">
            {locale === 'tr' ? 'İletişime Geçin' : 'Get in Touch'}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            {locale === 'tr' ? 'Ücretsiz Danışma Talep Edin' : 'Schedule Free Consultation'}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {locale === 'tr' 
              ? 'Projeniz hakkında görüşelim. 24 saat içinde yanıt veriyoruz. Baskı yok, yükümlülük yok.'
              : "Let's discuss your project. We respond within 24 hours. No pressure, no obligations."}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-[#181818]/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 hover:border-purple-500/50 transition-all duration-300 text-center group"
              >
                <div className="mb-4 inline-flex p-4 bg-white/10 rounded-2xl group-hover:bg-purple-700/20 transition-colors">
                  <Icon className="w-8 h-8 text-white group-hover:text-purple-400 transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {locale === 'tr' ? info.titleTr : info.titleEn}
                </h3>
                {info.link ? (
                  <a
                    href={info.link}
                    className="text-gray-300 hover:text-white transition-colors text-lg"
                  >
                    {info.value}
                  </a>
                ) : (
                  <p className="text-gray-300 text-lg">{info.value}</p>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Response time badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-green-600/20 border border-green-500/30 rounded-full text-green-300">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">
              {locale === 'tr' ? '24 Saat İçinde Yanıt Veriyoruz' : 'We Respond Within 24 Hours'}
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-[#181818]/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-gray-800">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-white font-medium mb-2">
                    {locale === 'tr' ? 'Ad Soyad' : 'Full Name'}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none transition-colors"
                    placeholder={locale === 'tr' ? 'Adınız ve soyadınız' : 'Your full name'}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-white font-medium mb-2">
                    {locale === 'tr' ? 'E-posta' : 'Email'}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none transition-colors"
                    placeholder={locale === 'tr' ? 'E-posta adresiniz' : 'Your email address'}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-white font-medium mb-2">
                    {locale === 'tr' ? 'Telefon' : 'Phone'}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none transition-colors"
                    placeholder={locale === 'tr' ? 'Telefon numaranız' : 'Your phone number'}
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-white font-medium mb-2">
                    {locale === 'tr' ? 'Konu' : 'Subject'}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none transition-colors"
                    placeholder={locale === 'tr' ? 'Konu başlığı' : 'Subject line'}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-white font-medium mb-2">
                  {locale === 'tr' ? 'Mesaj' : 'Message'}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none transition-colors resize-none"
                  placeholder={locale === 'tr' ? 'Mesajınızı buraya yazın...' : 'Write your message here...'}
                />
              </div>

              {status.message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-center gap-3 p-4 rounded-lg ${
                    status.type === 'success'
                      ? 'bg-green-500/20 border border-green-500/50 text-green-400'
                      : 'bg-red-500/20 border border-red-500/50 text-red-400'
                  }`}
                >
                  {status.type === 'success' ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <AlertCircle className="w-5 h-5" />
                  )}
                  <span>{status.message}</span>
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-white text-black px-8 py-4 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-700/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    {locale === 'tr' ? 'Gönderiliyor...' : 'Sending...'}
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    {locale === 'tr' ? 'Mesaj Gönder' : 'Send Message'}
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
