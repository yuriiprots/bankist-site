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
const slideFirst = document.querySelector(".slide--1");
const slideSecond = document.querySelector(".slide--2");
const slideThird = document.querySelector(".slide--3");
const sliderBtnLeft = document.querySelector(".slider__btn--left");
const sliderBtnRight = document.querySelector(".slider__btn--right");
const dots = document.querySelectorAll(".dots__dot");

let slideIndex = 0;
const totalSlides = document.querySelectorAll(".slide").length;

const showSlide = (index) => {
  if (index >= totalSlides || index === 0) {
    slideIndex = 0;
    slides[slideIndex].style.transform = `translateX(${0}%)`;
    slides[slideIndex + 1].style.transform = `translateX(${100}%)`;
    slides[slideIndex + 2].style.transform = `translateX(${200}%)`;
  } else if (index < 0 || index === 2) {
    slideIndex = totalSlides - 1;
    slides[slideIndex - 2].style.transform = `translateX(-${200}%)`;
    slides[slideIndex - 1].style.transform = `translateX(-${100}%)`;
    slides[slideIndex].style.transform = `translateX(${0}%)`;
  } else if (index === 1) {
    slides[slideIndex - 1].style.transform = `translateX(-${100}%)`;
    slides[slideIndex].style.transform = `translateX(${0}%)`;
    slides[slideIndex + 1].style.transform = `translateX(${100}%)`;
  }

  dots.forEach((dot) => dot.classList.remove("dots__dot--active"));
  dots[slideIndex].classList.add("dots__dot--active");
};

const prevSlide = () => {
  slideIndex--;
  showSlide(slideIndex);
};

const nextSlide = () => {
  slideIndex++;
  showSlide(slideIndex);
};

sliderBtnLeft.addEventListener("click", prevSlide);
sliderBtnRight.addEventListener("click", nextSlide);

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    slideIndex = parseInt(dot.dataset.slide);
    showSlide(slideIndex);
  });
});
