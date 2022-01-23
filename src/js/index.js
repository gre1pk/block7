import "../scss/style.scss";
import Swiper, { Pagination, Navigation } from "swiper";

const burgerOpen = document.querySelector(".page-header__burger");
const burgerClose = document.querySelector(".burger-menu__close");
const burgermMenu = document.querySelector(".burger-menu");
const body = document.body;
const brendsMore = document.querySelector(".brends__more");
const brendsList = document.querySelector(".brends__slide-list");
const technicsMore = document.querySelector(".technics__more");
const technicsList = document.querySelector(".technics__slide-list");

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
    });
  }
}

function catalogSliderDestroy() {
  if (catalogSlider) {
    catalogSlider.forEach((e) => {
      e.destroy();
    });
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

// technics more
technicsMore.onclick = () => {
  togleMore(technicsMore, "tehnic");
};

// brends more

brendsMore.onclick = () => {
  togleMore(brendsMore, "brend");
};

// add item list

function addMoreBrends(name) {
  let list;
  if (name === "tehnic") {
    list = technicsList;
  }
  if (name === "brend") {
    list = brendsList;
  }

  const brendsClone = list.cloneNode(true);
  const brendsItems = brendsClone.children;
  for (let i = 0; i < brendsItems.length; i++) {
    const li = brendsItems[i];
    li.classList.add("clone-item");
    list.appendChild(li);
  }
}

// remove item list

function removeMore(itemList) {
  for (let i = 0; i < itemList.length; i++) {
    itemList[i].remove();
  }
}

// togle more button
function togleMore(button, name) {
  if (button.classList.contains("more-button__close")) {
    button.textContent = "Показать все";
    button.classList.remove("more-button__close");
    const itemList = document.querySelectorAll(".clone-item");
    removeMore(itemList);
  } else {
    button.textContent = "Скрыть";
    button.classList.add("more-button__close");
    addMoreBrends(name);
  }
}
