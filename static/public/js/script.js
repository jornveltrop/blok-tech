// Toggle favorite
const starUnfilled = document.querySelector("header ul a:first-of-type");
const starFilled = document.querySelector("header ul a:last-of-type");

starUnfilled.addEventListener("click", favorite);
starFilled.addEventListener("click", favorite);

function favorite() {
  starFilled.classList.toggle("display");
  starUnfilled.classList.toggle("display");
};