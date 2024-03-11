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

