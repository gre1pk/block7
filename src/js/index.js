import "../scss/style.scss";
import Swiper, { Pagination, Navigation } from "swiper";

const burgerOpen = document.querySelector(".page-header__burger");
const burgerClose = document.querySelector(".burger-menu__close");
const burgermMenu = document.querySelector(".burger-menu");
const body = document.body;

//burger
burgerOpen.onclick = () => {
  burgermMenu.classList.add("active");
};

burgerClose.onclick = () => {
  burgermMenu.classList.remove("active");
};

body.onclick = ({ target }) => {
  if (
    !target.closest(".burger-menu") &&
    burgermMenu.classList.contains("active") &&
    !target.closest(".page-header__burger")
  ) {
    burgermMenu.classList.remove("active");
  }
};

// slider
Swiper.use([Navigation, Pagination]);

let catalogSlider = null;
const mediaQuerySize = 767;

function catalogSliderInit() {
  if (!catalogSlider) {
    catalogSlider = new Swiper(".swiper", {
      slidesPerView: "auto",
      spaceBetween: 30,
      // Optional parameters
      loop: true,

      // If we need pagination
      pagination: {
        el: ".swiper-pagination",
      },
      // And if we need scrollbar
      scrollbar: {
        el: ".swiper-scrollbar",
      },
    });
  }
}

function catalogSliderDestroy() {
  if (catalogSlider) {
    catalogSlider.destroy();
    catalogSlider = null;
  }
}

window.addEventListener("resize", renderSwiper);

renderSwiper();

function renderSwiper() {
  let windowWidth = document.body.clientWidth;

  // Если ширина экрана меньше или равна mediaQuerySize(1024)
  if (windowWidth <= mediaQuerySize) {
    // Инициализировать слайдер если он ещё не был инициализирован
    catalogSliderInit();
  } else {
    // Уничтожить слайдер если он был инициализирован
    catalogSliderDestroy();
  }
}
