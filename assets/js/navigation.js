function toggleSection(section) {
  document.querySelector("section.active")?.classList.remove("active");
  document.querySelector(`${section}`)?.classList.add("active");
}

function toggleNav(section) {
  document.querySelector("nav a.active")?.classList.remove("active");
  document.querySelector(`nav a[href="${section}"]`)?.classList.add("active");
}

function displaySection() {
  const sectionHash = window.location.hash || "#fossil";

  switch (sectionHash) {
    case "#hydraulic": {
      document.querySelectorAll(".cloud").forEach((cloud) => {
        cloud.classList.add("interactive");
      });

      break;
    }
    default: {
      document.querySelectorAll(".cloud").forEach((cloud) => {
        cloud.classList.remove("interactive");
      });

      break;
    }
  }

  // Toggle par défaut des sections et de la navigation
  toggleSection(sectionHash);
  toggleNav(sectionHash);

  // Close navigation
  document.querySelector(".navigation").classList.remove("active");

  // Scroll vers le haut de la page
  window.scrollTo({ top: 0, behavior: "smooth" });
}

window.addEventListener("hashchange", displaySection);

displaySection();

document.querySelector(".navigation button").addEventListener("click", () => {
  document.querySelector(".navigation").classList.toggle("active");
});

// Ouvrir la navigation quand on est à la fin de la page
window.addEventListener("scroll", () => {
  const { scrollHeight, clientHeight, scrollTop } = document.documentElement;

  if (scrollHeight - clientHeight - scrollTop < 1) {
    setTimeout(() => {
      document.querySelector(".navigation").classList.add("active");
    }, 500);
  } else {
    setTimeout(() => {
      document.querySelector(".navigation").classList.remove("active");
    }, 250);
  }
});
