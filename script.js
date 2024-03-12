const headerTop = document.querySelector(".header__top");
const navLinks = document.querySelectorAll(".nav__link");
const operationsTabs = document.querySelectorAll(".operations__tab");
const operationsContentDivs = document.querySelectorAll(".operations__content");

const slides = document.querySelectorAll(".slide");
const slideFirst = document.querySelector(".slide--1");
const slideSecond = document.querySelector(".slide--2");
const slideThird = document.querySelector(".slide--3");

const dots = document.querySelectorAll(".dots__dot");

const sliderBtnLeft = document.querySelector(".slider__btn--left");
const sliderBtnRight = document.querySelector(".slider__btn--right");

window.addEventListener("scroll", () => {
  if (window.scrollY > 550) {
    headerTop.classList.add("header__top--active");
  } else {
    headerTop.classList.remove("header__top--active");
  }
});

const changeOpacity = (link) => {
  navLinks.forEach((link) => {
    link.style.opacity = 0.5;
  });
  link.style.opacity = 1;
};

const defaultOpacity = () => {
  navLinks.forEach((link) => {
    link.style.opacity = 1;
  });
};

const smoothScroll = (event) => {
  event.preventDefault();
  const targetId = event.target.getAttribute("href");
  document.querySelector(targetId).scrollIntoView({ behavior: "smooth" });
};

navLinks.forEach((link) => {
  link.addEventListener("mouseover", (event) => {
    changeOpacity(event.target);
  });

  link.addEventListener("mouseout", () => {
    defaultOpacity();
  });

  link.addEventListener("click", smoothScroll);
});

/*Lazy Loading Images*/

let lazyImages = document.querySelectorAll(".features__img");

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

let observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.7,
};

let imageObserver = new IntersectionObserver(
  handleIntersection,
  observerOptions
);

lazyImages.forEach((image) => {
  imageObserver.observe(image);
});

/* ---------- */

const deactiveAllTabs = () => {
  operationsTabs.forEach((operationsTabs) =>
    operationsTabs.classList.remove("operations__tab--active")
  );
  operationsContentDivs.forEach((operationsContentDiv) =>
    operationsContentDiv.classList.remove("operations__content--active")
  );
};

const addActiveTab = (clickedTab) => {
  clickedTab.classList.add("operations__tab--active");

  const contentIndex = parseInt(clickedTab.classList[2].split("--")[1]) - 1;
  operationsContentDivs[contentIndex].classList.add(
    "operations__content--active"
  );
};
const handleOperationsTabsClick = (clickedTab) => {
  deactiveAllTabs();
  addActiveTab(clickedTab);
};

operationsTabs.forEach((operationsTab) => {
  operationsTab.addEventListener("click", () =>
    handleOperationsTabsClick(operationsTab)
  );
});

/* ---------- */

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

  dots.forEach((dot) => {
    dot.classList.remove("dots__dot--active");
  });
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
