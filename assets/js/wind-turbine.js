import { gsap, Power0 } from "gsap";
import { onClassChange } from "./utils.js";

const windTurbineTimeline = gsap.fromTo('.wind-turbine .turbine',
    {
        rotation: 0,
        transformOrigin: 'center 63%'
    },
    {
        rotation: 360,
        duration: 3,
        ease: Power0.easeNone,
        repeat: -1,
    }
);

const windTurbines = document.querySelector('.wind-turbine');
    onClassChange(windTurbines, (element) => {
        if (element.classList.contains('speed-up')) {
            windTurbineTimeline.timeScale(5);
        } else {
            windTurbineTimeline.timeScale(1);
        }
    });
