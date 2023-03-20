import gsap from "gsap";
import { onClassChange } from "./utils.js";

const bubblesTimeline = gsap.fromTo('#bubbleGroup > *',
  {
    x: 'random(-25, 25)',
    y: 0,
    scale: 'random(0.1, 1)',
    transformOrigin: "50% 50%"
  }, { 
    y: -1000, 
    stagger: {
      repeatRefresh: true,
      each: 0.8,
      repeat: -1
    },
    transformOrigin: "50% 50%",
    duration: 'random(30, 50)',
    ease: 'power1.out',
    x: 'random(-350, 300)'
}).seek(1000);

const nuclearReactor = document.querySelector('#nuclear #nuclear-reactor');

onClassChange(nuclearReactor, (element) => {
    if (element.classList.contains('speed-up')) {
        bubblesTimeline.timeScale(5);
    } else {
        bubblesTimeline.timeScale(1);
    }
});