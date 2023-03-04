const interactiveElements = document.querySelectorAll(
  ".wind-turbine, #pumping-oil"
);

for (let element of interactiveElements) {
  element.addEventListener("click", () => {
    element.classList.add("speed-up");

    setTimeout(() => {
      element.classList.toggle("speed-up");
    }, 4000);
  });
}
