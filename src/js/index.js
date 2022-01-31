import "../scss/style.scss";
import Swiper, { Pagination, Navigation } from "swiper";

const burgerOpen = document.querySelector(".burger-icon");
const burgerClose = document.querySelector(".burger-menu__close-btn");
const burgermMenu = document.querySelector(".burger-menu");
const body = document.body;
const brendsMore = document.querySelector(".repair-brend__more-button");
const technicsMore = document.querySelector(".repair-technicals__more-button");
const aboutMoreBtn = document.querySelector(".about__more-button");
const feedbackMsgBtn = document.querySelector(".feedback-icon__item--message");
const feedbackPhoneBtn = document.querySelector(".feedback-icon__item--phone");
const feedbackMsg = document.querySelector("#feedback");
const feedbackPhone = document.querySelector("#feedback-phone");
const modalClose = document.querySelector("#closefbmsg");
const mdalClosePhone = document.querySelector("#closefbphone");


//modal feed-back
feedbackMsgBtn.onclick = () => {
  feedbackMsg.classList.add("active");
  burgermMenu.classList.remove("active");
};

feedbackPhoneBtn.onclick = () => {
  feedbackPhone.classList.add("active");
  burgermMenu.classList.remove("active");
};

modalClose.onclick = () => {
  feedback.classList.remove("active");
};

mdalClosePhone.onclick = () => {
  feedbackPhone.classList.remove("active");
};

//about more text
aboutMoreBtn.onclick = () => {
  moreTextHandler();
};

const moreTextHandler = () => {
  const textContainer = document.querySelector(".about__text");
  const p = document.createElement("p");
  p.classList.add("about__text--top");
  p.textContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Est sit amet facilisis magna etiam tempor orci eu lobortis. Vitae sapien pellentesque habitant morbi tristique senectus et netus. Dignissim diam quis enim lobortis scelerisque fermentum dui. Feugiat sed lectus vestibulum mattis. Hac habitasse platea dictumst quisque sagittis purus. Eget lorem dolor sed";
  textContainer.appendChild(p);
  aboutMoreBtn.remove();
};

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
    !target.closest(".burger-icon")
  ) {
    burgermMenu.classList.remove("active");
  }
};

// slider

Swiper.use([Navigation, Pagination]);

let catalogSlider = null;

const catalogSliderInit = () => {
  if (!catalogSlider) {
    catalogSlider = new Swiper(".swiper", {
      slidesPerView: "auto",
      spaceBetween: 16,
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

      slideClass: "swiper__slide",

      wrapperClass: "swiper__wrapper",
    });
  }
};

const renderSwiper = () => {
  let windowWidth = document.body.clientWidth;
  const mediaQuerySize = 767;

  if (windowWidth <= mediaQuerySize) {
    // Инициализировать слайдер если он ещё не был инициализирован
    catalogSliderInit();
  } else {
    // Уничтожить слайдер если он был инициализирован
    catalogSliderDestroy();
  }
};

const catalogSliderDestroy = () => {
  if (catalogSlider) {
    catalogSlider.forEach((e) => {
      e.destroy();
    });
    catalogSlider = null;
  }
};

window.addEventListener("resize", renderSwiper);

renderSwiper();

// technics more
technicsMore.onclick = () => {
  togleMoreHandler(technicsMore, "tehnic");
};

// brends more

brendsMore.onclick = () => {
  togleMoreHandler(brendsMore, "brend");
};

// show more item

const showMore = (name, active) => {
  const brendsList = document.querySelectorAll(".brends-list__more-item");
  const technicsList = document.querySelectorAll(".technics-list__more-item");
  let list;
  if (name === "tehnic") {
    list = technicsList;
  }
  if (name === "brend") {
    list = brendsList;
  }

  if (active) {
    list.forEach((e) => {
      e.style.display = "block";
    });
  } else {
    list.forEach((e) => {
      e.style.display = "none";
    });
  }
};

// togle more button
const togleMoreHandler = (button, name) => {
  let active = false;
  if (button.classList.contains("more-button__close")) {
    button.textContent = "Показать все";
    button.classList.remove("more-button__close");
    active = false;
  } else {
    button.textContent = "Cвернуть ";
    button.classList.add("more-button__close");
    active = true;
  }
  showMore(name, active);
};
