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

const left_org = document.getElementById("left");
const middle_org = document.getElementById("middle");
const right_org = document.getElementById("right");


// LEFT
left_org.addEventListener("mouseenter", () => {
  left_org.style.transform = "translateX(67%)";
  middle_org.style.transform = "translateX(67%)"
  right_org.style.transform = "translateX(67%)"
  left_org.classList.add("moving-out");
});

left_org.addEventListener("mouseleave", () => {
  left_org.style.transform = "translateX(0)";
  middle_org.style.transform = "translateX(0%)"
  right_org.style.transform = "translateX(0%)"
  left_org.classList.remove("moving-out");
});

// MIDDLE
middle_org.addEventListener("mouseenter", () => {
  middle_org.style.clipPath = "inset(0% 0% 0% 0%)";
  right_org.style.transform = "translateX(33%)"
  left_org.style.transform = "translateX(-33%)"
  middle_org.classList.add("moving-out")
});

middle_org.addEventListener("mouseleave", () => {
  middle_org.style.clipPath = "inset(0% 33% 0% 33%)";
  right_org.style.transform = "translateX(0%)"
  left_org.style.transform = "translateX(0%)"
  middle_org.classList.remove("moving-out")
});

// RIGHT
right_org.addEventListener("mouseenter", () => {
  right_org.style.transform = "translateX(-67%)";
  middle_org.style.transform = "translateX(-67%)";
  left_org.style.transform = "translateX(-67%)";
  right_org.classList.add("moving-out");
});

right_org.addEventListener("mouseleave", () => {
  right_org.style.transform = "translateX(0)";
  left_org.style.transform = "translateX(0)";
  middle_org.style.transform = "translateX(0)";
  right_org.classList.remove("moving-out");
});
