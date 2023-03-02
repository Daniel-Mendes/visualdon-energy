import * as d3 from "d3";

const elements = document.querySelectorAll(".wind-turbine");

for (let element of elements) {
  element.addEventListener("click", () => {
    console.log("click");
    element.classList.add("speed-up");

    setTimeout(() => {
      element.classList.toggle("speed-up");
    }
    , 4000);
  });
}

const pumpingOil = document.querySelector("#pumping-oil");

pumpingOil.addEventListener("click", () => {
  pumpingOil.classList.add("speed-up");

  setTimeout(() => {
    pumpingOil.classList.toggle("speed-up");
  }
  , 4000);
});