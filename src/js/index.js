import "../scss/style.scss";
import Swiper, { Pagination, Navigation } from "swiper";

const burgerOpen = document.querySelector(".burger-icon");
const burgerClose = document.querySelector(".burger-close");
const burgermMenu = document.querySelector(".burger-menu");
const body = document.body;
const brendsMore = document.querySelector(".repair-brend__more-button");
const technicsMore = document.querySelector(".repair-technicals__more-button");

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

// add item list

const showMore = (name) => {
  const brendsList = document.querySelector(".brends-list");
  const technicsList = document.querySelector(".technics-list");
  let list;
  if (name === "tehnic") {
    list = technicsList;
  }
  if (name === "brend") {
    list = brendsList;
  }
  const listClone = list.cloneNode(true);
  const listItems = listClone.children;
  for (let i = 0; i < listItems.length; i++) {
    const li = listItems[i];
    li.classList.add("clone-item");
    list.appendChild(li);
  }
};

// remove item list

const removeMoreHandler = (itemList) => {
  for (let i = 0; i < itemList.length; i++) {
    itemList[i].remove();
  }
};

// togle more button
const togleMoreHandler = (button, name) => {
  if (button.classList.contains("more-button__close")) {
    button.textContent = "Показать все";
    button.classList.remove("more-button__close");
    const itemList = document.querySelectorAll(".clone-item");
    removeMoreHandler(itemList);
  } else {
    button.textContent = "Скрыть";
    button.classList.add("more-button__close");
    showMore(name);
  }
};
