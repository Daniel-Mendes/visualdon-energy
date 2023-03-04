import gsap from "gsap";

const wrapper = document.querySelector("#wrapper");
const sections = document.querySelectorAll("section");

let currentSection = 0;
let oldSection = 0;
let offsets = [];
let innerWidth = window.innerWidth;

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

  gsap.to(wrapper, {
    duration: 1.5,
    ease: "expo.out",
    x: offsets[currentSection],
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
wrapper.addEventListener("wheel", sectionAnimation);
window.addEventListener("resize", sizeIt);
