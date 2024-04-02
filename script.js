/* ---------------------- STICKY NAV ------------------------*/

const header = document.querySelector(".header");
const headerTop = document.querySelector(".header__top");
const headerTopHeight = headerTop.getBoundingClientRect().height;

const observerHeaderTopOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${headerTopHeight}px`,
};

const stickyNav = (entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) headerTop.classList.add("header__top--active");
    else headerTop.classList.remove("header__top--active");
  });
};

const headerObserver = new IntersectionObserver(
  stickyNav,
  observerHeaderTopOptions
);

headerObserver.observe(header);

/* ---------------- CHANGE OPACITY OF HOVER NAV LINKS ------------------------*/

const navList = document.querySelector(".nav__list");
const navLinks = document.querySelectorAll(".nav__link");

const handleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const targetLink = e.target;
    navLinks.forEach((link) => {
      if (link !== targetLink) link.style.opacity = this;
    });
  }
};

navList.addEventListener("mouseover", handleHover.bind(0.5));
navList.addEventListener("mouseout", handleHover.bind(1));

/* ---------------------- MODAL WINDOW AND OVERLAY ------------------------*/

const openAccountBtns = document.querySelectorAll(".btn__open-modal");
const closeModalBtn = document.querySelector(".btn--close-modal");

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".modal-overlay");

const openModal = () => {
  modal.style.display = "block";
  overlay.classList.add("modal-overlay--active");
};

const closeModal = () => {
  modal.style.display = "none";
  overlay.classList.remove("modal-overlay--active");
};

openAccountBtns.forEach((openAccountBtn) => {
  openAccountBtn.addEventListener("click", openModal);
});

closeModalBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && modal.style.display === "block") {
    closeModal();
  }
});

window.addEventListener("beforeunload", function (e) {
  e.preventDefault();
});

/* ---------------------- SMOOTH SCROLLING ------------------------*/

const btnScrollTo = document.querySelector(".btn__scroll-to");
const section1 = document.querySelector("#section--1");

const smoothScroll = (e) => {
  const targetId = e.target.getAttribute("href");
  document.querySelector(targetId).scrollIntoView({ behavior: "smooth" });
};

btnScrollTo.addEventListener("click", () => {
  section1.scrollIntoView({ behavior: "smooth" });
});

document.querySelector(".nav__list").addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav__link")) {
    smoothScroll(e);
  }
});

/* ---------------------- LAZY LOADING IMAGES ------------------------*/

const lazyImages = document.querySelectorAll("img[data-src]");

const loadImage = (entries) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener("load", () => {
    entry.target.classList.remove("lazy-img");
  });
  imageObserver.unobserve(entry.target);
};

const observerImagesOptions = {
  root: null,
  threshold: 0.7,
};

const imageObserver = new IntersectionObserver(
  loadImage,
  observerImagesOptions
);

lazyImages.forEach((image) => imageObserver.observe(image));

/*-------------------- EFFECT OF THE SECTIONS THAT APPEAR -------------------- */

const sections = document.querySelectorAll(".section");

const appearSection = (entries) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.add("section--active");
  sectionObserver.unobserve(entry.target);
};

const observerSectionOptions = {
  root: null,
  threshold: 0.2,
};

let sectionObserver = new IntersectionObserver(
  appearSection,
  observerSectionOptions
);

sections.forEach((section) => sectionObserver.observe(section));

/* --------------------------- TABBED COMPONENT -----------------------------*/

const operationsTabsContainer = document.querySelector(
  ".operations__tab-container"
);
const operationsTabs = document.querySelectorAll(".operations__tab");
const operationsContentDivs = document.querySelectorAll(".operations__content");

const disableAllTabsAndContent = () => {
  operationsTabs.forEach((operationsTab) =>
    operationsTab.classList.remove("operations__tab--active")
  );
  operationsContentDivs.forEach((operationsContentDiv) =>
    operationsContentDiv.classList.remove("operations__content--active")
  );
};

const addActiveTabAndContent = (clickedTab) => {
  clickedTab.classList.add("operations__tab--active");

  document
    .querySelector(`.operations__content--${clickedTab.dataset.tab}`)
    .classList.add("operations__content--active");
};

const handleOperationsTabsClick = (clickedTab) => {
  disableAllTabsAndContent();
  addActiveTabAndContent(clickedTab);
};

operationsTabsContainer.addEventListener("click", (e) => {
  const clicked = e.target.closest(".operations__tab");
  if (!clicked) return;
  handleOperationsTabsClick(clicked);
});

/* ------------------------------ SLIDER ------------------------------ */

const slides = document.querySelectorAll(".slide");
const sliderBtnLeft = document.querySelector(".slider__btn--left");
const sliderBtnRight = document.querySelector(".slider__btn--right");
const dotsContainer = document.querySelector(".dots");

let currentSlide = 0;
const totalSlides = slides.length;

const createDots = () => {
  for (let i = 0; i < totalSlides; i++) {
    dotsContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  }
};

const activateDot = (slideIndex) => {
  document
    .querySelectorAll(".dots__dot")
    .forEach((dot) => dot.classList.remove("dots__dot--active"));
  document
    .querySelector(`.dots__dot[data-slide="${slideIndex}"]`)
    .classList.add("dots__dot--active");
};

const goToSlide = (slideIndex) => {
  slides.forEach(
    (slide, i) =>
      (slide.style.transform = `translateX(${100 * (i - slideIndex)}%)`)
  );
  activateDot(slideIndex);
};

(() => {
  createDots();
  goToSlide(currentSlide);
})();

const nextSlide = () => {
  if (currentSlide === totalSlides - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  goToSlide(currentSlide);
};

const prevSlide = () => {
  if (currentSlide === 0) {
    currentSlide = totalSlides - 1;
  } else {
    currentSlide--;
  }
  goToSlide(currentSlide);
};

sliderBtnRight.addEventListener("click", nextSlide);
sliderBtnLeft.addEventListener("click", prevSlide);
dotsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("dots__dot")) {
    currentSlide = e.target.dataset.slide;
    goToSlide(currentSlide);
  }
});
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") prevSlide();
  else if (e.key === "ArrowRight") nextSlide();
});

