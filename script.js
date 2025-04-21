import jsyaml from 'https://cdn.skypack.dev/js-yaml';

let translations = {};

function setLanguage(lang) {
  if (translations[lang]) {
    applyTranslations(translations[lang], lang);
  } else {
    fetch(`lang/${lang}.yaml`)
      .then(res => res.text())
      .then(yamlText => {
        const data = jsyaml.load(yamlText);
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

setLanguage("no");

const flags = document.querySelectorAll('.language-selector .fi');

flags.forEach(flag => {
  flag.addEventListener('click', () => {
    const selectedLang = flag.getAttribute('data-lang');
    setLanguage(selectedLang);
  });
});

let feedbacks = [];

function loadFeedbacks() {
  fetch('/content/data/feedbacks.json')
    .then(response => response.json())
    .then(data => {
      feedbacks = data;
      showNextFeedback(); // First one immediately

      // Then every 15 seconds
      setInterval(showNextFeedback, 15000);
    })
    .catch(error => console.error('Error loading feedbacks:', error));
}

let currentIndex = 0;

function showNextFeedback() {
  if (feedbacks.length === 0) return;

  const [name, feedbackText] = feedbacks[currentIndex];

  const feedbackTextEl = document.getElementById('feedback-text');
  const feedbackNameEl = document.getElementById('feedback-name');

  feedbackTextEl.textContent = `"${feedbackText}"`;
  feedbackNameEl.textContent = `— ${name}`;

  currentIndex = (currentIndex + 1) % feedbacks.length;

  // Show feedback
  feedbackTextEl.style.opacity = "1";
  feedbackNameEl.style.opacity = "1";

  // Hide it after 13 seconds
  setTimeout(() => {
    feedbackTextEl.style.opacity = "0";
    feedbackNameEl.style.opacity = "0";
  }, 13000);
}

loadFeedbacks();

const images = document.querySelectorAll('.other-org-section .org img');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    }
  });
}, {
  threshold: 0.7
});

images.forEach(img => observer.observe(img));


const isMobile = /Mobi|Android/i.test(navigator.userAgent);

const org_image1 = document.getElementById("org-image1");
const org_image2 = document.getElementById("org-image2");
const org_image3 = document.getElementById("org-image3");
const org_image4 = document.getElementById("org-image4");

const text_left = document.getElementById("text-left");
const text_leftish = document.getElementById("text-leftish");
const text_rightish = document.getElementById("text-rightish");
const text_right = document.getElementById("text-right");

const allImages = [
  { img: org_image1, text: text_left, clip: "inset(0 75vw 0 0)" },
  { img: org_image2, text: text_leftish, clip: "inset(0 50vw 0 25vw)" },
  { img: org_image3, text: text_rightish, clip: "inset(0 25vw 0 50vw)" },
  { img: org_image4, text: text_right, clip: "inset(0 0 0 75vw)" }
];

function resetImages() {
  allImages.forEach(({ img, text, clip }) => {
    img.style.clipPath = clip;
    img.style.filter = "brightness(1)";
    img.style.transform = "translateX(0)";
    text.style.opacity = "0";
  });

  text_left.style.clipPath = "inset(0 75vw 0 0)";
  text_leftish.style.clipPath = "inset(0 66vw 0 0)";
  text_rightish.style.clipPath = "inset(0 0 0 66vw)";
  text_right.style.clipPath = "inset(0 0 0 75vw)";
}

function activateImage1() {
  resetImages();
  org_image1.style.clipPath = "inset(0 0 0 0)";
  org_image1.style.filter = "brightness(0.2)";
  text_left.style.clipPath = "inset(0 0 0 0)";
  text_left.style.opacity = "1";

  org_image2.style.transform = "translateX(75vw)";
  org_image3.style.transform = "translateX(50vw)";
  org_image4.style.transform = "translateX(25vw)";
}

function activateImage2() {
  resetImages();
  org_image2.style.clipPath = "inset(0 0 0 0)";
  org_image2.style.filter = "brightness(0.2)";
  text_leftish.style.clipPath = "inset(0 0 0 0)";
  text_leftish.style.opacity = "1";

  org_image1.style.transform = "translateX(-25vw)";
  org_image3.style.transform = "translateX(50vw)";
  org_image4.style.transform = "translateX(25vw)";
}


function activateImage3() {
  resetImages();
  org_image3.style.clipPath = "inset(0 0 0 0)";
  org_image3.style.filter = "brightness(0.2)";
  text_rightish.style.clipPath = "inset(0 0 0 0)";
  text_rightish.style.opacity = "1";

  org_image1.style.transform = "translateX(-25vw)";
  org_image2.style.transform = "translateX(-50vw)";
  org_image4.style.transform = "translateX(25vw)";
}

function activateImage4() {
  resetImages();
  org_image4.style.clipPath = "inset(0 0 0 0)";
  org_image4.style.filter = "brightness(0.2)";
  text_right.style.clipPath = "inset(0 0 0 0)";
  text_right.style.opacity = "1";

  org_image1.style.transform = "translateX(-25vw)";
  org_image2.style.transform = "translateX(-50vw)";
  org_image3.style.transform = "translateX(-75vw)";
}

// Mobile logic
if (isMobile) {
  let index = 0;
  activateImage1();

  setInterval(() => {
    index = (index + 1) % 4;
    if (index === 0) activateImage1();
    else if (index === 1) activateImage2();
    else if (index === 2) activateImage3();
    else if (index === 3) activateImage4();
  }, 15000);
} else {
  // Desktop hover version
  allImages.forEach(({ img, text, clip }, index) => {
    img.addEventListener("mouseenter", () => {
      if (index === 0) activateImage1();
      else if (index === 1) activateImage2();
      else if (index === 2) activateImage3();
      else if (index === 3) activateImage4();
      img.onclick = () => {
        window.location.href = "_blank"; // You can customize the link per image
      };
    });

    img.addEventListener("mouseleave", () => {
      resetImages();
      img.style.clipPath = clip;
      img.style.filter = "brightness(1)";
    });
  });
}
