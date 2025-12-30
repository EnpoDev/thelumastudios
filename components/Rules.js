import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function Rules({ locale = 'en' }) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const content = {
    en: {
      title: "How We Work",
      subtitle: "Clear rules. No surprises.",
      rules: [
        {
          title: "50% Upfront",
          description: "Projects start with 50% deposit. Remaining 50% upon delivery."
        },
        {
          title: "2 Revision Rounds",
          description: "Each package includes 2 revision rounds. Additional revisions are billed separately."
        },
        {
          title: "Fixed Delivery Date",
          description: "Delivery date is set at project start. We deliver on time."
        },
        {
          title: "Communication Hours",
          description: "Weekdays 10:00 - 18:00 (GMT+3). Responses within 24 hours."
        },
        {
          title: "Scope Changes",
          description: "Mid-project scope changes require a new quote and may affect timeline."
        },
        {
          title: "Source Code",
          description: "Full source code is delivered after final payment."
        }
      ],
      channels: {
        title: "Communication",
        items: ["WhatsApp", "Email", "Slack (upon request)"]
      }
    },
    tr: {
      title: "Nasıl Çalışıyoruz",
      subtitle: "Net kurallar. Sürpriz yok.",
      rules: [
        {
          title: "%50 Kapora",
          description: "Projeler %50 kapora ile başlar. Kalan %50 teslimatta ödenir."
        },
        {
          title: "2 Revize Hakkı",
          description: "Her pakete 2 revize hakkı dahildir. Ek revizeler ayrıca ücretlendirilir."
        },
        {
          title: "Net Teslim Tarihi",
          description: "Teslim tarihi proje başında belirlenir. Zamanında teslim ederiz."
        },
        {
          title: "İletişim Saatleri",
          description: "Hafta içi 10:00 - 18:00. 24 saat içinde yanıt."
        },
        {
          title: "Kapsam Değişikliği",
          description: "Proje ortasında kapsam değişiklikleri yeni teklif gerektirir ve süreyi etkileyebilir."
        },
        {
          title: "Kaynak Kod",
          description: "Tam kaynak kod, son ödeme sonrası teslim edilir."
        }
      ],
      channels: {
        title: "İletişim Kanalları",
        items: ["WhatsApp", "E-posta", "Slack (talep üzerine)"]
      }
    }
  };

  const text = content[locale];

  return (
    <section id="rules" className="py-24 bg-[#0f0f0f] relative">
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

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {text.rules.map((rule, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="border border-white/10 p-6 hover:border-white/30 transition-all"
              >
                <div className="flex items-start gap-4">
                  <span className="text-gray-600 text-sm font-mono">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-white font-semibold mb-2">
                      {rule.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {rule.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Communication channels */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 text-center"
          >
            <p className="text-gray-600 text-sm mb-4">
              {text.channels.title}
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              {text.channels.items.map((item, index) => (
                <span
                  key={index}
                  className="px-4 py-2 border border-white/10 text-gray-400 text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
