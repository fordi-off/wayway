let translations = {};

function setLanguage(lang) {
  if (translations[lang]) {
    applyTranslations(translations[lang], lang);
  } else {
    fetch(`lang/${lang}.json`)
      .then(res => res.json())
      .then(data => {
        translations[lang] = data; // Cache it
        applyTranslations(data, lang);
      })
      .catch(err => console.error("Translation error:", err));
  }
}

function applyTranslations(data, lang) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (data[key]) {
      if (el.tagName === "TITLE") {
        document.title = data[key]; // Special case
      } else {
        el.textContent = data[key];
      }
    }
  });

  document.documentElement.lang = lang;
}

// Default language
setLanguage("en");
