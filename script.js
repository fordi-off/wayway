let translations = {};

function setLanguage(lang) {
  if (translations[lang]) {
    applyTranslations(translations[lang], lang);
  } else {
    fetch(`lang/${lang}.json`)
      .then(res => res.json())
      .then(data => {
        translations[lang] = data;
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
        document.title = data[key];
      } else {
        el.textContent = data[key];
      }
    }
  });

  document.documentElement.lang = lang;
}

setLanguage("en");

const flags = document.querySelectorAll('.language-selector .fi');

flags.forEach(flag => {
  flag.addEventListener('click', () => {
    const selectedLang = flag.getAttribute('data-lang');
    setLanguage(selectedLang);
  });
});

const org_image1 = document.querySelector("#org-image1");
const org_image2 = document.querySelector("#org-image2");
const org_image3 = document.querySelector("#org-image3");
const org_image4 = document.querySelector("#org-image4");

org_image1.addEventListener("mouseenter", () => {
  org_image1.style.clipPath = "inset(0 0 0 0)";
  org_image1.style.filter = "brightness(0.2)"
  org_image2.style.transform = "translateX(75vw)"
  org_image3.style.transform = "translateX(75vw)"
  org_image4.style.transform = "translateX(75vw)"
})
org_image1.addEventListener("mouseleave", () => {
  org_image1.style.clipPath = "inset(0 75vw 0 0)";
  org_image1.style.filter = "brightness(1)"
  org_image2.style.transform = "translateX(0)"
  org_image3.style.transform = "translateX(0)"
  org_image4.style.transform = "translateX(0)"
})

org_image2.addEventListener("mouseenter", () => {
  org_image2.style.clipPath = "inset(0 0 0 0)";
  org_image2.style.filter = "brightness(0.2)"
  org_image1.style.transform = "translateX(-25vw)"
  org_image3.style.transform = "translateX(50vw)"
  org_image4.style.transform = "translateX(50vw)"
})
org_image2.addEventListener("mouseleave", () => {
  org_image2.style.clipPath = "inset(0 50vw 0 25vw)";
  org_image2.style.filter = "brightness(1)"
  org_image1.style.transform = "translateX(0)"
  org_image3.style.transform = "translateX(0)"
  org_image4.style.transform = "translateX(0)"
})

org_image3.addEventListener("mouseenter", () => {
  org_image3.style.clipPath = "inset(0 0 0 0)";
  org_image3.style.filter = "brightness(0.2)"
  org_image2.style.transform = "translateX(-50vw)"
  org_image1.style.transform = "translateX(-50vw)"
  org_image4.style.transform = "translateX(25vw)"
})
org_image3.addEventListener("mouseleave", () => {
  org_image3.style.clipPath = "inset(0 25vw 0 50vw)";
  org_image3.style.filter = "brightness(1)"
  org_image2.style.transform = "translateX(0)"
  org_image1.style.transform = "translateX(0)"
  org_image4.style.transform = "translateX(0)"
})

org_image4.addEventListener("mouseenter", () => {
  org_image4.style.clipPath = "inset(0 0 0 0)";
  org_image4.style.filter = "brightness(0.2)"
  org_image2.style.transform = "translateX(-75vw)"
  org_image3.style.transform = "translateX(-75vw)"
  org_image1.style.transform = "translateX(-75vw)"
})
org_image4.addEventListener("mouseleave", () => {
  org_image4.style.clipPath = "inset(0 0 0 75vw)";
  org_image4.style.filter = "brightness(1)"
  org_image2.style.transform = "translateX(0)"
  org_image3.style.transform = "translateX(0)"
  org_image1.style.transform = "translateX(0)"
})