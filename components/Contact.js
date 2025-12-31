import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

export default function Contact({ locale = 'en' }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    description: '',
  });
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
      submit: "Send Request",
      sending: "Sending...",
      success: "Request received. We'll respond within 24 hours.",
      error: "Something went wrong. Please try again.",
      note: "We typically respond within 24 hours on business days."
    },
    tr: {
      title: "Proje Başlat",
      subtitle: "Sadece ciddi talepler. Bütçe alanı zorunludur.",
      fields: {
        name: "İsim",
        email: "E-posta",
        phone: "Telefon",
        projectType: "Proje Türü",
        budget: "Bütçe Aralığı",
        description: "Kısa Açıklama"
      },
      projectTypes: [
        { value: "", label: "Seçin..." },
        { value: "web-app", label: "Web Uygulaması" },
        { value: "ecommerce", label: "Online Mağaza" },
        { value: "subscription", label: "Abonelik Platformu" },
        { value: "admin-panel", label: "Admin Panel / Yönetim Paneli" },
        { value: "other", label: "Diğer" }
      ],
      budgets: [
        { value: "", label: "Bütçenizi seçin..." },
        { value: "75000-150000", label: "₺75.000 - ₺150.000" },
        { value: "150000-300000", label: "₺150.000 - ₺300.000" },
        { value: "300000-750000", label: "₺300.000 - ₺750.000" },
        { value: "750000+", label: "₺750.000+" }
      ],
      submit: "Talep Gönder",
      sending: "Gönderiliyor...",
      success: "Talep alındı. 24 saat içinde dönüş yapacağız.",
      error: "Bir sorun oluştu. Lütfen tekrar deneyin.",
      note: "İş günlerinde genellikle 24 saat içinde yanıt veriyoruz."
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
        setStatus({ type: 'success', message: text.success });
        setFormData({
          name: '',
          email: '',
          phone: '',
          projectType: '',
          budget: '',
          description: '',
        });
      } else {
        setStatus({ type: 'error', message: text.error });
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
              disabled={isSubmitting}
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
