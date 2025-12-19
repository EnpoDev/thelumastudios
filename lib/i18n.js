const translations = {
  en: require('../locales/en.json'),
  tr: require('../locales/tr.json')
};

function getTranslation(locale, key) {
  const keys = key.split('.');
  let value = translations[locale] || translations.en;
  
  for (const k of keys) {
    value = value?.[k];
    if (!value) {
      // Fallback to English
      value = translations.en;
      for (const k2 of keys) {
        value = value?.[k2];
      }
      break;
    }
  }
  
  return value || key;
}

function detectLocale(req) {
  // Check query parameter first
  if (req?.query?.lang) {
    return req.query.lang === 'tr' ? 'tr' : 'en';
  }
  
  // Check cookie
  if (req?.cookies?.locale) {
    return req.cookies.locale === 'tr' ? 'tr' : 'en';
  }
  
  // Check Accept-Language header
  if (req?.headers?.['accept-language']) {
    const lang = req.headers['accept-language'].split(',')[0].split('-')[0];
    return lang === 'tr' ? 'tr' : 'en';
  }
  
  return 'en';
}

module.exports = {
  getTranslation,
  detectLocale,
  translations
};

