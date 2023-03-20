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


const clouds = document.querySelectorAll('.cloud');
const rainingLeft = document.querySelector(".raining-left");
const rainingRight = document.querySelector(".raining-right");

clouds.forEach((cloud) => {
    onClassChange(cloud, (element) => {
        if (element.classList.contains('speed-up')) {
            if (element.classList.contains('cloud-left')) {
                rainingLeft.style.visibility = "visible";
            } else {
                rainingRight.style.visibility = "visible";
            }
        } else {
            if (element.classList.contains('cloud-left')) {
                rainingLeft.style.visibility = "hidden";
            } else {
                rainingRight.style.visibility = "hidden";
            }
        }
    });
});