import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Send, CheckCircle, AlertCircle, Shield, User, MapPin, Mail, Phone, Sparkles } from 'lucide-react';

export default function Contact({ locale = 'en' }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    description: '',
  });
  const [consentGiven, setConsentGiven] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Legal contact info required by Turkish Law 5651
  const legalContact = {
    name: "Enes POYRAZ",
    address: "Cumhuriyet Mah. Başak Sok. Yükselen Park Nilüfer Sitesi H Blok Kat 7 Daire 18 Nilüfer/Bursa",
    email: "enespoyraz380@gmail.com",
    phone: "0546 780 59 72"
  };

  const content = {
    en: {
      title: "Start a Project",
      subtitle: "Serious inquiries only. Budget field is required.",
      fields: {
        name: "Name",
        email: "Email",
        phone: "Phone",
        projectType: "Project Type",
        budget: "Budget Range",
        description: "Brief Description"
      },
      projectTypes: [
        { value: "", label: "Select..." },
        { value: "web-app", label: "Web Application" },
        { value: "ecommerce", label: "Online Store" },
        { value: "subscription", label: "Subscription Platform" },
        { value: "admin-panel", label: "Admin Panel / Dashboard" },
        { value: "other", label: "Other" }
      ],
      budgets: [
        { value: "", label: "Select your budget..." },
        { value: "2500-5000", label: "$2,500 - $5,000" },
        { value: "5000-10000", label: "$5,000 - $10,000" },
        { value: "10000-25000", label: "$10,000 - $25,000" },
        { value: "25000+", label: "$25,000+" }
      ],
      consent: {
        label: "I agree to the processing of my personal data",
        description: "Your data will be processed in accordance with our Privacy Policy and retained for 365 days.",
        required: "You must agree to the privacy policy to submit this form."
      },
      submit: "Send Request",
      sending: "Sending...",
      success: "Request received. We'll respond within 24 hours.",
      error: "Something went wrong. Please try again.",
      note: "We typically respond within 24 hours on business days.",
      contactInfoTitle: "Contact Information"
    },
    tr: {
      title: "Proje Baslat",
      subtitle: "Sadece ciddi talepler. Butce alani zorunludur.",
      fields: {
        name: "Isim",
        email: "E-posta",
        phone: "Telefon",
        projectType: "Proje Turu",
        budget: "Butce Araligi",
        description: "Kisa Aciklama"
      },
      projectTypes: [
        { value: "", label: "Secin..." },
        { value: "web-app", label: "Web Uygulamasi" },
        { value: "ecommerce", label: "Online Magaza" },
        { value: "subscription", label: "Abonelik Platformu" },
        { value: "admin-panel", label: "Admin Panel / Yonetim Paneli" },
        { value: "other", label: "Diger" }
      ],
      budgets: [
        { value: "", label: "Butcenizi secin..." },
        { value: "75000-150000", label: "75.000 TL - 150.000 TL" },
        { value: "150000-300000", label: "150.000 TL - 300.000 TL" },
        { value: "300000-750000", label: "300.000 TL - 750.000 TL" },
        { value: "750000+", label: "750.000 TL+" }
      ],
      consent: {
        label: "Kisisel verilerimin islenmesini kabul ediyorum",
        description: "Verileriniz Gizlilik Politikamiz dogrultusunda islenir ve 365 gun saklanir.",
        required: "Formu gondermek icin gizlilik politikasini kabul etmelisiniz."
      },
      submit: "Talep Gonder",
      sending: "Gonderiliyor...",
      success: "Talep alindi. 24 saat icinde donus yapacagiz.",
      error: "Bir sorun olustu. Lutfen tekrar deneyin.",
      note: "Is gunlerinde genellikle 24 saat icinde yanit veriyoruz.",
      contactInfoTitle: "Iletisim Bilgileri"
    }
  };

  const text = content[locale];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate consent
    if (!consentGiven) {
      setStatus({ type: 'error', message: text.consent.required });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          consent: {
            contact_form: true,
            timestamp: new Date().toISOString(),
          },
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus({ type: 'success', message: text.success });
        setFormData({
          name: '',
          email: '',
          phone: '',
          projectType: '',
          budget: '',
          description: '',
        });
        setConsentGiven(false);
      } else {
        setStatus({ type: 'error', message: data.message || text.error });
      }
    } catch (error) {
      setStatus({ type: 'error', message: text.error });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = `
    w-full px-4 py-3 rounded-lg
    bg-cyber-card/50 backdrop-blur-sm
    border border-white/10
    text-white placeholder-gray-500
    focus:border-neon-cyan/50 focus:outline-none focus:ring-1 focus:ring-neon-cyan/20
    focus:shadow-[0_0_20px_rgba(0,255,255,0.1)]
    transition-all duration-300
  `;

  const selectClasses = `
    w-full px-4 py-3 rounded-lg
    bg-cyber-card/50 backdrop-blur-sm
    border border-white/10
    text-white
    focus:border-neon-cyan/50 focus:outline-none focus:ring-1 focus:ring-neon-cyan/20
    transition-all duration-300
    appearance-none cursor-pointer
  `;

  return (
    <section id="contact" className="py-24 bg-cyber-dark relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-neon-cyan/5 rounded-full blur-3xl" />
      <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-neon-pink/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ type: 'spring', delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-pink/10 border border-neon-pink/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-neon-pink" />
            <span className="text-sm text-neon-pink">Request Demo</span>
          </motion.div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            <span className="neon-text">{text.title}</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            {text.subtitle}
          </p>
        </motion.div>

        {/* Contact Information Card - Required by Turkish Law 5651 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="max-w-xl mx-auto mb-12"
        >
          <div className="rounded-xl bg-cyber-card/50 backdrop-blur-sm border border-neon-cyan/10 p-6">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-neon-cyan/10 flex items-center justify-center">
                <User className="w-4 h-4 text-neon-cyan" />
              </span>
              {text.contactInfoTitle}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
                <User className="w-4 h-4 text-neon-cyan mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">{legalContact.name}</span>
              </div>
              <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
                <MapPin className="w-4 h-4 text-neon-pink mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">{legalContact.address}</span>
              </div>
              <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors group">
                <Mail className="w-4 h-4 text-neon-purple mt-0.5 flex-shrink-0" />
                <a href={`mailto:${legalContact.email}`} className="text-gray-400 group-hover:text-neon-purple transition-colors">
                  {legalContact.email}
                </a>
              </div>
              <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors group">
                <Phone className="w-4 h-4 text-neon-green mt-0.5 flex-shrink-0" />
                <a href={`tel:${legalContact.phone.replace(/\s/g, '')}`} className="text-gray-400 group-hover:text-neon-green transition-colors">
                  {legalContact.phone}
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name & Email & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-400 text-sm mb-2">
                  {text.fields.name} *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">
                  {text.fields.email} *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">
                  {text.fields.phone} *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                />
              </div>
            </div>

            {/* Project Type */}
            <div>
              <label className="block text-gray-400 text-sm mb-2">
                {text.fields.projectType} *
              </label>
              <div className="relative">
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  required
                  className={selectClasses}
                  style={{ backgroundColor: 'rgba(26, 26, 46, 0.5)' }}
                >
                  {text.projectTypes.map((type) => (
                    <option key={type.value} value={type.value} style={{ backgroundColor: '#1a1a2e' }}>
                      {type.label}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Budget - Required */}
            <div>
              <label className="block text-gray-400 text-sm mb-2">
                {text.fields.budget} *
              </label>
              <div className="relative">
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  required
                  className={selectClasses}
                  style={{ backgroundColor: 'rgba(26, 26, 46, 0.5)' }}
                >
                  {text.budgets.map((budget) => (
                    <option key={budget.value} value={budget.value} style={{ backgroundColor: '#1a1a2e' }}>
                      {budget.label}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-400 text-sm mb-2">
                {text.fields.description}
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className={`${inputClasses} resize-none`}
              />
            </div>

            {/* KVKK/GDPR Consent Checkbox */}
            <div className="rounded-xl bg-cyber-card/30 border border-white/5 p-4">
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative flex-shrink-0 mt-0.5">
                  <input
                    type="checkbox"
                    checked={consentGiven}
                    onChange={(e) => setConsentGiven(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded border-2 transition-all ${
                    consentGiven
                      ? 'bg-neon-cyan border-neon-cyan shadow-neon-cyan-sm'
                      : 'border-white/30 group-hover:border-neon-cyan/50'
                  }`}>
                    {consentGiven && (
                      <svg className="w-full h-full text-cyber-dark p-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-white text-sm font-medium">
                    <Shield className="w-4 h-4 text-neon-cyan" />
                    {text.consent.label} *
                  </div>
                  <p className="text-gray-500 text-xs mt-1">
                    {text.consent.description}
                  </p>
                </div>
              </label>
            </div>

            {/* Status message */}
            {status.message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-center gap-3 p-4 rounded-lg border ${
                  status.type === 'success'
                    ? 'border-neon-green/30 bg-neon-green/10 text-neon-green'
                    : 'border-red-500/30 bg-red-500/10 text-red-400'
                }`}
              >
                {status.type === 'success' ? (
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                )}
                <span className="text-sm">{status.message}</span>
              </motion.div>
            )}

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={isSubmitting || !consentGiven}
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              className={`
                w-full py-4 rounded-lg font-medium
                flex items-center justify-center gap-3
                transition-all duration-300
                ${consentGiven && !isSubmitting
                  ? 'bg-gradient-to-r from-neon-cyan to-neon-pink text-cyber-dark hover:shadow-neon-glow'
                  : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                }
              `}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-cyber-dark/30 border-t-cyber-dark rounded-full animate-spin" />
                  {text.sending}
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  {text.submit}
                </>
              )}
            </motion.button>
          </form>

          {/* Note */}
          <p className="text-center text-gray-500 text-sm mt-6">
            {text.note}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
