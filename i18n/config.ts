import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import en from './en/common.json'
import zh from './zh/common.json'

export const resources = {
  en: {
    translation: en,
  },
  zh: {
    translation: zh,
  },
} as const

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    resources,
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
