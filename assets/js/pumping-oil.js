import gsap from "gsap";
import { onClassChange } from "./utils.js";

const pumpingBaselineTimeline = gsap.fromTo('#pumping-oil #baseline',
  {
    rotation: 0,
    transformOrigin: 'center'
  },
  {
    rotation: -20,
    duration: 3,
    yoyo: true,
    ease: 'power1.inOut',
    repeat: -1,
  }
);

const pumpingWeightTimeline = gsap.fromTo('#pumping-oil #weight',
    {
        translateX: 0,
        translateY: 0
    },
    {
        translateX: 0.4,
        translateY: 12.8,
        duration: 3,
        yoyo: true,
        ease: 'power1.inOut',
        repeat: -1,
    }
);

const pumpingOilTimeline = gsap.fromTo('#pumping-oil #oil-pipe circle',
    {
        translateY: 0
    },
    {
        translateY: -55,
        duration: 3,
        ease: 'power1.linear',
        repeat: -1,
    }
);

const pumpingOil = document.querySelector('#pumping-oil');

onClassChange(pumpingOil, (element) => {
    if (element.classList.contains('speed-up')) {
        pumpingBaselineTimeline.timeScale(5);
        pumpingWeightTimeline.timeScale(5);
        pumpingOilTimeline.timeScale(5);
    } else {
        pumpingBaselineTimeline.timeScale(1);
        pumpingWeightTimeline.timeScale(1);
        pumpingOilTimeline.timeScale(1);
    }
});