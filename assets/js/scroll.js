import gsap from "gsap";

const wrapper = document.querySelector("#wrapper");
const sections = document.querySelectorAll("#wrapper section");

const clouds = document.querySelectorAll('.cloud');

let currentSection = 0;
let oldSection = 0;
let offsets = [];
let innerWidth = window.innerWidth;

let lastTouchX;

const sectionAnimation = (event) => {
  event.preventDefault();

  oldSection = currentSection;

  if (gsap.isTweening(wrapper)) {
    return;
  }

  if (sections[currentSection].id === 'hydraulic') {
    clouds.forEach((cloud) => {
      cloud.classList.add('interactive');
    });
  } else {
    clouds.forEach((cloud) => {
      cloud.classList.remove('interactive');
    });
  }

  gsap.to(wrapper, {
    duration: 1.5,
    ease: "expo.out",
    x: offsets[currentSection]
  });
};

const sizeIt = () => {
  offsets = [];
  innerWidth = window.innerWidth;
  gsap.set(wrapper, { width: sections.length * innerWidth });
  gsap.set(sections, { width: innerWidth });
  for (let i = 0; i < sections.length; i++) {
    offsets.push(-sections[i].offsetLeft);
  }
  gsap.set(wrapper, { x: offsets[currentSection] });
};

sizeIt();

wrapper.addEventListener("touchstart", (event) => {
  lastTouchX = event.touches[0].clientX;
});

wrapper.addEventListener("touchend", (event) => {
  let touchX = event.changedTouches[0].clientX;

  if (lastTouchX > touchX + 50) {
    currentSection = currentSection < sections.length - 1 ? currentSection + 1 : currentSection;
  } else if (lastTouchX < touchX - 50) {
    currentSection = currentSection > 0 ? currentSection - 1 : currentSection;
  }

  sectionAnimation(event);
});

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    event.preventDefault();

    currentSection = currentSection < sections.length - 1 ? currentSection + 1 : currentSection;
    sectionAnimation(event);
  } else if (event.key === "ArrowLeft") {
    event.preventDefault();
    
    currentSection = currentSection > 0 ? currentSection - 1 : currentSection;
    sectionAnimation(event);
  }
});

window.addEventListener("click", (event) => {
  if (event.clientX < 50) {
    event.preventDefault();

    currentSection = currentSection > 0 ? currentSection - 1 : currentSection;
    sectionAnimation(event);
  } else if (event.clientX > innerWidth - 100) {
    event.preventDefault();
    
    currentSection = currentSection < sections.length - 1 ? currentSection + 1 : currentSection;
    sectionAnimation(event);
  }
});

window.addEventListener("resize", sizeIt);

document.body.addEventListener("mousemove", (event) => {
  if (event.clientX < 50 && currentSection > 0) {
    document.body.style.cursor = getComputedStyle(document.documentElement).getPropertyValue('--cursor-hand-left');
  } else if (event.clientX > innerWidth - 100 && currentSection < sections.length - 1) {
    document.body.style.cursor = getComputedStyle(document.documentElement).getPropertyValue('--cursor-hand-right');
  } else if (event.pageY < innerHeight) {
    document.body.style.cursor = getComputedStyle(document.documentElement).getPropertyValue('--cursor-magnifying-glass');
  } else {
    document.body.style.cursor = getComputedStyle(document.documentElement).getPropertyValue('--cursor-default');
  }
});