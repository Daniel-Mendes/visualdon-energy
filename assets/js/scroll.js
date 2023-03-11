import gsap from "gsap";

const wrapper = document.querySelector("#wrapper");
const sections = document.querySelectorAll("#wrapper section");
const bullets = document.querySelectorAll(".bullet");

const clouds = document.querySelectorAll('.cloud');

let currentSection = 0;
let oldSection = 0;
let offsets = [];
let innerWidth = window.innerWidth;

let lastTouchX;

const dotAnimation = () => {
  let sectionNumber = currentSection;
  bullets.forEach((bullet) => bullet.classList.remove("active"));
  let currentBullet = document.querySelector(".section-" + sectionNumber);
  currentBullet.classList.add("active");
}

const sectionAnimation = (event) => {
  event.preventDefault();

  let target;
  oldSection = currentSection;

  if (event.type == "click") {
    target = event.target.dataset.target;
    currentSection = parseInt(target);
  } else {
    if (gsap.isTweening(wrapper)) {
      return;
    }

    currentSection =
      event.deltaY > 0 ? (currentSection += 1) : (currentSection -= 1);
    currentSection = currentSection < 0 ? 0 : currentSection;
    currentSection =
      currentSection > sections.length - 1
        ? sections.length - 1
        : currentSection;
  }

  if (oldSection === currentSection) {
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
    x: offsets[currentSection],
    onStart: dotAnimation
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

bullets.forEach((bullet) => {
  bullet.addEventListener("click", sectionAnimation);
});

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

  dotAnimation();
});

window.addEventListener("resize", sizeIt);
