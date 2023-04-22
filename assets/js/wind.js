import { gsap, Power0 } from "gsap";
import { onClassChange } from "./utils.js";

const windTurbineLeftTimeline = gsap.fromTo(
  ".wind-turbine #turbine-1",
  {
    rotation: 0,
    transformOrigin: "center 63%",
  },
  {
    rotation: 360,
    duration: 3,
    ease: Power0.easeNone,
    repeat: -1,
  }
);

const windTurbineRightTimeline = gsap
  .fromTo(
    ".wind-turbine #turbine-2",
    {
      rotation: 0,
      transformOrigin: "center 63%",
    },
    {
      rotation: 360,
      duration: 3,
      ease: Power0.easeNone,
      repeat: -1,
    }
  )
  .delay(1.5);

const windTurbineLeft = document.querySelector(".wind-turbine #turbine-1");
onClassChange(windTurbineLeft, (element) => {
  if (element.classList.contains("speed-up")) {
    windTurbineLeftTimeline.timeScale(5);
  } else {
    windTurbineLeftTimeline.timeScale(1);
  }
});

const windTurbineRight = document.querySelector(".wind-turbine #turbine-2");
onClassChange(windTurbineRight, (element) => {
  if (element.classList.contains("speed-up")) {
    windTurbineRightTimeline.timeScale(5);
  } else {
    windTurbineRightTimeline.timeScale(1);
  }
});
