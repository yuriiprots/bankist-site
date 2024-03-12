const headerTop = document.querySelector(".header__top");
const navLinks = document.querySelectorAll(".nav__link");

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
