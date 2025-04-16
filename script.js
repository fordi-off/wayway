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

const left_text = document.getElementById("left-text");
const right_text = document.getElementById("right-text");
const middle_right_text = document.getElementById("middle-right-text");
const middle_left_text = document.getElementById("middle-left-text");


// LEFT
left_org.addEventListener("mouseenter", () => {
  left_org.style.transform = "translateX(67vw)";
  middle_org.style.transform = "translateX(67vw)"
  right_org.style.transform = "translateX(67vw)"
  left_text.style.transform = "translateX(67vw)"
  left_text.style.opacity = "100%"
  left_org.classList.add("moving-out");
});

left_org.addEventListener("mouseleave", () => {
  left_org.style.transform = "translateX(0vw)";
  middle_org.style.transform = "translateX(0vw)"
  right_org.style.transform = "translateX(0vw)"
  left_text.style.transform = "translateX(0vw)"
  left_text.style.opacity = "0%"
  left_org.classList.remove("moving-out");
});

// MIDDLE
middle_org.addEventListener("mouseenter", () => {
  middle_org.style.clipPath = "inset(0vw 0vw 0vw 0vw)";
  right_org.style.transform = "translateX(33vw)"
  left_org.style.transform = "translateX(-33vw)"
  middle_right_text.style.transform = "translateX(-34vw)"
  middle_left_text.style.transform = "translatex(34vw)"
  middle_org.classList.add("moving-out")
});

middle_org.addEventListener("mouseleave", () => {
  middle_org.style.clipPath = "inset(0vw 33vw 0vw 33vw)";
  right_org.style.transform = "translateX(0vw)"
  left_org.style.transform = "translateX(0vw)"
  middle_right_text.style.transform = "translateX(0vw)"
  middle_left_text.style.transform = "translatex(0vw)"
  middle_org.classList.remove("moving-out")
});

// RIGHT
right_org.addEventListener("mouseenter", () => {
  right_org.style.transform = "translateX(-67vw)";
  middle_org.style.transform = "translateX(-67vw)";
  left_org.style.transform = "translateX(-67vw)";
  right_text.style.transform = "translateX(-67vw)"
  right_text.style.opacity = "100%"
  right_org.classList.add("moving-out");
});

right_org.addEventListener("mouseleave", () => {
  right_org.style.transform = "translateX(0vw)";
  left_org.style.transform = "translateX(0vw)";
  middle_org.style.transform = "translateX(0vw)";
  right_text.style.transform = "translateX(0vw)"
  right_text.style.opacity = "0%"
  right_org.classList.remove("moving-out");
});
