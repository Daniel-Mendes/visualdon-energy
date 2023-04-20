import { onClassChange } from "./utils.js";

const interactiveElements = document.querySelectorAll(".interactive");
const clouds = document.querySelectorAll(".cloud");

const speedUp = (element) => {
  element.classList.add("speed-up");

  setTimeout(() => {
    element.classList.remove("speed-up");
  }, 4000);
};

for (let element of interactiveElements) {
  element.addEventListener("click", () => speedUp(element));
}

clouds.forEach((cloud) => {
  onClassChange(cloud, (element) => {
    if (element.classList.contains("interactive")) {
      element.addEventListener("click", () => speedUp(element));
    }
  });
});
