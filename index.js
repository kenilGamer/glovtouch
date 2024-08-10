ScrollTrigger.normalizeScroll(true);
ScrollTrigger.defaults({ ignoreMobileResize: true });
gsap.registerPlugin(ScrollTrigger);
const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
  smoothMobile: 0.1,
  inertia: 0.6,
  multiplier: 0.7,
});
locoScroll.on("scroll", ScrollTrigger.update);
ScrollTrigger.scrollerProxy("#main", {
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
  pinType: document.querySelector("#main").style.transform
    ? "transform"
    : "fixed",
});
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
ScrollTrigger.refresh();

addEventListener("load", () => {
  let links = document.querySelectorAll("a");
  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      let targetId = link.getAttribute("href");
      let targetElement = document.querySelector(targetId);
      locoScroll.scrollTo(targetElement.offsetTop);
      gsap.to(locoScroll.scroll, {
        scrollTo: { y: targetElement.offsetTop },
        duration: 6,
        // ease: "power4.inOut",
      });
    });
  });
});
document.addEventListener("DOMContentLoaded", function () {

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

  function splitStrings() {
    function splitString(str) {
      let splittedTextHtml = "",
        generatedHTML = "";
      let string = str.textContent;
      let i;
      for (i = 0; i < string.length; i++) {
        splittedTextHtml += `
      <span char="${string[i]}" style="--totalChars:${
          string.length
        };--index:${i};--delay:${i * 100}ms;--duration:${
          string.length * 100
        }ms">
      ${string[i]}
      </span>`;
      }

      generatedHTML = `<div>${splittedTextHtml}</div>`;
      str.innerHTML = generatedHTML;
    }

    function splittingInit() {
      let splitCharArr = document.querySelectorAll(".split-text");
      splitCharArr.forEach((str) => {
        splitString(str);
      });
    }

    splittingInit();
  }
  splitStrings();
  function page1() {
    const tl = gsap.timeline();
    tl.from(".nav-l", {
      opacity: 0,
      y: -100,
      // delay: 0.5,
      duration: 1,
    });
    tl.from(".nav-r a", {
      opacity: 0,
      y: -10,
      // delay: 0.5,
      duration: 1,
      stagger: 0.1,
      // ease: "power3.out",
    });
    tl.from(".title span", {
      opacity: 0,
      y: 100,
      duration: 1,
      stagger: 0.02,
      // ease: "power3.out",
    });
    tl.from(
      ".description span",
      {
        opacity: 0,
        duration: 0.01,
        stagger: 0.01,
        // ease: "power3.out",
      },
      "-=1.2  "
    );
    tl.to(".button", {
      opacity: 1,
      y: 100,
      duration: 0.2,
      // ease: "power3.out",
    });
  }

  function page2() {}
  function splitpage2() {
    function splitString(str) {
      let splittedTextHtml = "",
        generatedHTML = "";
      let string = str.textContent;
      let i;
      for (i = 0; i < string.length; i++) {
        splittedTextHtml += `
      <span char="${string[i]}" style="--totalChars:${
          string.length
        };--index:${i};--delay:${i * 100}ms;--duration:${
          string.length * 100
        }ms">
      ${string[i]}
      </span>`;
      }

      generatedHTML = `<div>${splittedTextHtml}</div>`;
      str.innerHTML = generatedHTML;
    }

    function splittingInit() {
      let splitCharArr = document.querySelectorAll(".split-page2");
      splitCharArr.forEach((str) => {
        splitString(str);
      });
    }

    splittingInit();

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".page2",
        scroller: "#main",
        toggleActions: "restart none none reverse",
        start: "top 70%",
        end: "top 0%",
        // pin: true,
        // markers: true,
        scrub: 3,
      },
    });
    
    tl.from(".h1-l span", {
      opacity: 0,
      rotate: -45,
      x: -100,
      duration: 1,
      stagger: -0.5,
      // ease: "bounce.in",
    },"a")
    tl.from(".h1-r span", {
      opacity: 0,
      rotate:45,
      x: 100,
      duration: 1,
      stagger: 0.5,
      // ease: "bounce.in",
    },'a')
    tl.from(".img-p2",{
      opacity: 0,
      scale:2,
      duration: 1,
      stagger: 1,
      // ease: "power3.out",
    })
    tl.from(".top-p2", {
      opacity: 0,
      y: 100,
      duration: 1,
      stagger: 1,
      // ease: "power3.out",
    })
  }

  navbar();
  splitpage2();
  page1();
  page2();
});
