import gsap from "gsap";

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

const onClassChange = (element, callback) => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'class'
        ) {
          callback(mutation.target);
        }
      });
    });
    observer.observe(element, { attributes: true });
    return observer.disconnect;
}

const nuclearReactor = document.querySelector('#nuclear #nuclear-reactor');

onClassChange(nuclearReactor, (element) => {
    if (element.classList.contains('speed-up')) {
        bubblesTimeline.timeScale(5);
    } else {
        bubblesTimeline.timeScale(1);
    }
});