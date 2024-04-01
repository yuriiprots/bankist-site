const navLinks = document.querySelectorAll(".nav__link");
const btnScrollTo = document.querySelector(".btn__scroll-to");

const openAccountBtns = document.querySelectorAll(".btn__open-modal");
const modal = document.querySelector(".modal");
const closeModalBtn = document.querySelector(".btn--close-modal");

const modalOverlay = document.querySelector(".modal-overlay");

const sections = document.querySelectorAll(".section");

const operationsTabsContainer = document.querySelector(
  ".operations__tab-container"
);
const operationsTabs = document.querySelectorAll(".operations__tab");
const operationsContentDivs = document.querySelectorAll(".operations__content");

const slides = document.querySelectorAll(".slide");
const slideFirst = document.querySelector(".slide--1");
const slideSecond = document.querySelector(".slide--2");
const slideThird = document.querySelector(".slide--3");

const dots = document.querySelectorAll(".dots__dot");

const sliderBtnLeft = document.querySelector(".slider__btn--left");
const sliderBtnRight = document.querySelector(".slider__btn--right");

const lazyImages = document.querySelectorAll(".features__img");

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

/* ---------------- MODAL WINDOW AND OVERLAY ------------------------*/

const openModal = () => {
  modal.style.display = "block";
  modalOverlay.classList.add("modal-overlay--active");
};

const closeModal = () => {
  modalOverlay.classList.remove("modal-overlay--active");
  modal.style.display = "none";
};

openAccountBtns.forEach((openAccountBtn) => {
  openAccountBtn.addEventListener("click", openModal);
});

closeModalBtn.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", closeModal);

// ---------------Smooth scrolling-----------------

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

/*Lazy Loading Images*/

const handleIntersection = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      let image = entry.target;
      image.src = image.getAttribute("data-src");
      image.classList.remove("lazy-img");
      imageObserver.unobserve(image);
    }
  });
};

const observerImagesOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.7,
};

const imageObserver = new IntersectionObserver(
  handleIntersection,
  observerImagesOptions
);

lazyImages.forEach((image) => {
  imageObserver.observe(image);
});

/* ---------- */

const handleSectionIntersection = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      let section = entry.target;
      section.classList.add("section--active");
      sectionObserver.unobserve(section);
    }
  });
};

const observerSectionOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.2,
};

let sectionObserver = new IntersectionObserver(
  handleSectionIntersection,
  observerSectionOptions
);

sections.forEach((section) => {
  sectionObserver.observe(section);
});

/* --------------------------- TABBED COMPONENT -----------------------------*/
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
    .classList.add("operations__tab--active");
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

/* --------------------SLIDER------------------------------ */

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

//-----------------------------------------------

// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// document.querySelector(".nav__link").addEventListener("click", function (e) {
//   this.style.backgroundColor = randomColor();
// });

// document.querySelector(".nav__list").addEventListener("click", function (e) {
//   this.style.backgroundColor = randomColor();
// });
