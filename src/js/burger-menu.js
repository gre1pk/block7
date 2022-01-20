const burgerOpen = document.querySelector(".page-header__burger");
const burgerClose = document.querySelector(".burger-menu__close");
const burgermMenu = document.querySelector(".burger-menu");
const body = document.body;

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


