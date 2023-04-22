import gsap from "gsap";
import { onClassChange } from "./utils.js";

gsap.set(".rain2, .rain4", {
  y: -800,
});
gsap.to(".rain1 , .rain2, .rain3, .rain4", {
  y: "+=800",
  repeat: -1,
  duration: 2,
  ease: "none",
});

const waterTimeline = gsap.timeline();

waterTimeline.fromTo(
  "#water",
  {
    y: 0,
  },
  {
    y: -100,
    duration: 2,
    ease: "power1.inOut",
  }
);
waterTimeline.delay(1);
waterTimeline.fromTo(
  "#water",
  {
    y: -100,
  },
  {
    y: 0,
    duration: 2,
    ease: "power1.inOut",
  }
);
waterTimeline.repeat(-1);

const clouds = document.querySelectorAll(".cloud");
const rainingLeft = document.querySelector(".raining-left");
const rainingRight = document.querySelector(".raining-right");

clouds.forEach((cloud) => {
  onClassChange(cloud, (element) => {
    if (element.classList.contains("speed-up")) {
      waterTimeline.timeScale(1);
      if (element.classList.contains("cloud-left")) {
        rainingLeft.style.visibility = "visible";
      } else {
        rainingRight.style.visibility = "visible";
      }
    } else {
      waterTimeline.timeScale(0);
      if (element.classList.contains("cloud-left")) {
        rainingLeft.style.visibility = "hidden";
      } else {
        rainingRight.style.visibility = "hidden";
      }
    }
  });
});
