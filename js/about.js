ScrollTrigger.normalizeScroll(true);
ScrollTrigger.defaults({ ignoreMobileResize: true });
gsap.registerPlugin(ScrollTrigger);
const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true,
  smoothMobile: 0.1,
  inertia: 0.3,
  multiplier: 0.9,
});
locoScroll.on("scroll", ScrollTrigger.update);
ScrollTrigger.scrollerProxy(".main", {
  scrollTop(value) {
    return arguments.length
      ? locoScroll.scrollTo(value, 0, 0)
      : locoScroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
  pinType: document.querySelector(".main").style.transform
    ? "transform"
    : "fixed",
});
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
ScrollTrigger.refresh();

addEventListener("load", () => {
  let links = document.querySelectorAll("a"); // Ensure you select correct links
  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      let targetId = link.getAttribute("href");

      // Ensure targetId is valid and corresponds to an element on the page
      if (targetId.startsWith('#')) {
        let targetElement = document.querySelector(targetId);
        if (targetElement) {
          locoScroll.scrollTo(targetElement);
        } else {
          console.error("Target element not found:", targetId);
        }
      } else {
        // If it's a URL, handle it differently, maybe open it in a new tab
        window.open(targetId, '_blank');
      }
    });
  });
});
document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll('.about-nav-r a');
  
    links.forEach(link => {
      link.addEventListener('mouseover', function(event) {
          const particleCount = 30; // Number of particles
          const particleContainer = document.createElement('div');
          particleContainer.classList.add('particle-container');
          this.appendChild(particleContainer);
  
          for (let i = 0; i < particleCount; i++) {
              const particle = document.createElement('span');
              particle.classList.add('particle');
              particle.style.left = `${Math.random() * 100}%`;
              particle.style.top = `${Math.random() * 100}%`;
              particleContainer.appendChild(particle);
          }
  
          setTimeout(() => {
              particleContainer.remove(); 
          }, 600); 
      });
    });
  });
  
  function navbar() {
    let nav = false;
    const mbnav = gsap.timeline();
    const mbnav_ = gsap.timeline();
    const right_mobile_nav = document.querySelector(".right_mobile_nav");
    const nav_line_1 = document.querySelector(".nav_line_1");
    const nav_line_2 = document.querySelector(".nav_line_2");
    const mobile_nav_ = document.querySelector(".mobile_nav_");

    // Event listener for mobile nav click
    right_mobile_nav.addEventListener("click", () => {
      if (nav) {
        nav = false;
        mbnav_
          .to(nav_line_1, { transform: "rotate(0deg)" }, "a")
          .to(nav_line_2, { transform: "rotate(0deg)" }, "a")
          .to(mobile_nav_, { right: -100 + "vw" });
      } else {
        nav = true;
        mbnav
          .to(nav_line_1, { transform: "rotate(45deg)", zIndex: 100000 }, "a")
          .to(nav_line_2, { transform: "rotate(-45deg)", zIndex: 100000 }, "a")
          .to(mobile_nav_, { right: 0, ease: "bounce.out", duration: 2.5 });
      }
    });
  }
  navbar();