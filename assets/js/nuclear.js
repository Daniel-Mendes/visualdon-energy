import { gsap, Power1 } from "gsap";
import { onClassChange } from "./utils.js";

const bubblesTimeline = gsap
  .fromTo(
    "#bubbleGroup > *",
    {
      x: 0,
      y: 0,
      scale: "random(0.1, 0.6)",
    },
    {
      y: -1000,
      stagger: {
        repeatRefresh: true,
        each: 0.8,
        repeat: -1,
      },
      duration: "random(50, 80)",
      ease: Power1.easeOut,
      x: "random(-350, 300)",
    }
  )
  .seek(1000);

const nuclearReactor = document.querySelector("#nuclear #nuclear-reactor");

onClassChange(nuclearReactor, (element) => {
  if (element.classList.contains("speed-up")) {
    bubblesTimeline.timeScale(5);
  } else {
    bubblesTimeline.timeScale(1);
  }
});
