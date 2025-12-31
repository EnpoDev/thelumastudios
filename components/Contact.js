import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Send, CheckCircle, AlertCircle, Shield } from 'lucide-react';

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
      note: "We typically respond within 24 hours on business days."
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
      note: "Is gunlerinde genellikle 24 saat icinde yanit veriyoruz."
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

  return (
    <section id="contact" className="py-24 bg-[#0a0a0a] relative">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {text.title}
          </h2>
          <p className="text-gray-500 text-lg">
            {text.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
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
                  className="w-full px-4 py-3 bg-transparent border border-white/10 text-white focus:border-white/30 focus:outline-none transition-all"
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
                  className="w-full px-4 py-3 bg-transparent border border-white/10 text-white focus:border-white/30 focus:outline-none transition-all"
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
                  className="w-full px-4 py-3 bg-transparent border border-white/10 text-white focus:border-white/30 focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Project Type */}
            <div>
              <label className="block text-gray-400 text-sm mb-2">
                {text.fields.projectType} *
              </label>
              <select
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 text-white focus:border-white/30 focus:outline-none transition-all appearance-none cursor-pointer"
              >
                {text.projectTypes.map((type) => (
                  <option key={type.value} value={type.value} className="bg-[#0a0a0a]">
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Budget - Required */}
            <div>
              <label className="block text-gray-400 text-sm mb-2">
                {text.fields.budget} *
              </label>
              <select
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 text-white focus:border-white/30 focus:outline-none transition-all appearance-none cursor-pointer"
              >
                {text.budgets.map((budget) => (
                  <option key={budget.value} value={budget.value} className="bg-[#0a0a0a]">
                    {budget.label}
                  </option>
                ))}
              </select>
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
                className="w-full px-4 py-3 bg-transparent border border-white/10 text-white focus:border-white/30 focus:outline-none transition-all resize-none"
              />
            </div>

            {/* KVKK/GDPR Consent Checkbox */}
            <div className="border border-white/10 p-4 rounded">
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative flex-shrink-0 mt-0.5">
                  <input
                    type="checkbox"
                    checked={consentGiven}
                    onChange={(e) => setConsentGiven(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 border-2 rounded transition-all ${
                    consentGiven
                      ? 'bg-white border-white'
                      : 'border-white/30 group-hover:border-white/50'
                  }`}>
                    {consentGiven && (
                      <svg className="w-full h-full text-black p-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-white text-sm font-medium">
                    <Shield className="w-4 h-4 text-gray-400" />
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
              <div className={`flex items-center gap-3 p-4 border ${
                status.type === 'success'
                  ? 'border-green-500/30 text-green-400'
                  : 'border-red-500/30 text-red-400'
              }`}>
                {status.type === 'success' ? (
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                )}
                <span className="text-sm">{status.message}</span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting || !consentGiven}
              className="w-full py-4 bg-white text-black font-medium hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  {text.sending}
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  {text.submit}
                </>
              )}
            </button>
          </form>

          {/* Note */}
          <p className="text-center text-gray-600 text-sm mt-6">
            {text.note}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
