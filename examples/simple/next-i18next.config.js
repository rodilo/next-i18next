/* eslint-disable max-len */
/* eslint-disable sort-keys */

const path = require("path");
const Backend = require("i18next-locize-backend/cjs");
const locizeLastUsed = require("locize-lastused/cjs");
const isProduction = process.env.NODE_ENV === "production";
const useDev = !isProduction ? [Backend, locizeLastUsed] : [];
const supportedLanguages = ["de", "en", "fr"];

module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "de", "fr"],
    localeDetection: true,
  },
  returnObjects: true,
  serializeConfig: false,
  use: useDev,
  react: {
    useSuspense: false,
    bindI18n: "languageChanged loaded editorSaved", // which events trigger a re-render, can be set to false or string of events
    bindStore: "added removed",
  },
  ns: ["common", "formfields", "views", "components"],
  backend: {
    // eslint-disable-next-line max-len
    // All options: https://github.com/locize/i18next-locize-backend/blob/master/index.d.ts
    projectId: "28fb5b10-79e4-441f-8c91-ca4626834717",
    apiKey:
      process.env.LOCIZE_API_KEY || "d477f699-ad90-44a0-9162-b32f3fe9eed0",
    referenceLng: "de",
    allowedHosts: ["localhost"],
    allowedAddOrUpdateHosts: ["localhost"],
    onSaved: (lng, ns) => {
      console.warn(`Locize saved. Language: ${lng}, Namespace: ${ns}`);
    },
    // reloadInterval: 100000,
  },
  locizeLastUsed: {
    referenceLng: "de",
    projectId: "28fb5b10-79e4-441f-8c91-ca4626834717",
    apiKey: process.env.LOCIZE_API_KEY,
  },
  wait: true, // delay rendering until translations are loaded - wait can be set globally on i18next init too
  // initImmediate: false,
  debug: false,
  supportedLngs: supportedLanguages,
  saveMissing: !isProduction,
  // saveMissingTo: 'all',
  // initImmediate: false,
  // preload: ['de', 'en', 'fr'],
  lng: "de",
  fallbackLng: "de",
  nsSeparator: ":", // Default
  interpolation: {
    escapeValue: false, // not needed for react!!
  },
  ...(isProduction ? { localePath: path.resolve("./public/locales") } : {}), // Needs to be set for production
};
