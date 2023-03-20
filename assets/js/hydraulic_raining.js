import gsap from "gsap";
import { onClassChange } from "./utils.js";

gsap.set(".rain2, .rain4", {
    y: -800
});
gsap.to(".rain1 , .rain2, .rain3, .rain4", {
    y: "+=800",
    repeat: -1,
    duration: 2,
    ease: "none"
});

const rainingContainer = document.querySelector("#raining-container");
const clouds = document.querySelectorAll('.cloud');

clouds.forEach((cloud) => {
    onClassChange(cloud, (element) => {
        if (element.classList.contains('speed-up')) {
            rainingContainer.style.visibility = "visible";
        } else {
            rainingContainer.style.visibility = "hidden";
        }
    });
});