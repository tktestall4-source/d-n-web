/* ===================================================================
 * Luther 1.0.0 - Main JS
 *
 * ------------------------------------------------------------------- */

(function (html) {
  "use strict";

  html.className = html.className.replace(/\bno-js\b/g, "") + " js ";

  if (document.fonts && document.fonts.ready) {
    document.documentElement.classList.add("fonts-loading");
    document.fonts.ready.then(() => {
      document.documentElement.classList.add("fonts-loaded");
      document.documentElement.classList.remove("fonts-loading");
    });
  } else {
    document.documentElement.classList.add("fonts-loaded");
  }

  document.addEventListener("DOMContentLoaded", () => {
    const nav = document.querySelector(".main-nav");
    if (!nav) return;

    const path = (
      location.pathname.split("/").pop() || "index.html"
    ).toLowerCase();
    const link = nav.querySelector(`a[href$="${path}"]`);
    if (link) {
      nav
        .querySelectorAll("li.current")
        .forEach((x) => x.classList.remove("current"));
      const li = link.closest("li");
      if (li) li.classList.add("current");
    }
  });

  /* Animations
   * -------------------------------------------------- */
  const tl = anime
    .timeline({
      easing: "easeInOutCubic",
      duration: 800,
      autoplay: false,
    })
    .add({
      targets: "#loader",
      opacity: 0,
      duration: 1000,
      begin: function (anim) {
        window.scrollTo(0, 0);
      },
    })
    .add({
      targets: "#preloader",
      opacity: 0,
      complete: function (anim) {
        document.querySelector("#preloader").style.visibility = "hidden";
        document.querySelector("#preloader").style.display = "none";
      },
    })
    .add(
      {
        targets: ".s-header",
        translateY: [-100, 0],
        opacity: [0, 1],
      },
      "-=200"
    )
    .add({
      targets: [".s-intro .text-pretitle", ".s-intro .text-huge-title"],
      translateX: [100, 0],
      opacity: [0, 1],
      delay: anime.stagger(400),
    })
    .add({
      targets: ".circles span",
      keyframes: [
        { opacity: [0, 0.3] },
        {
          opacity: [0.3, 0.1],
          delay: anime.stagger(100, { direction: "reverse" }),
        },
      ],
      delay: anime.stagger(100, { direction: "reverse" }),
      complete: function () {
        document.documentElement.classList.add("intro-circles-done");
      },
    })

    .add({
      targets: ".intro-social li",
      translateX: [-50, 0],
      opacity: [0, 1],
      delay: anime.stagger(100, { direction: "reverse" }),
    })
    .add(
      {
        targets: ".intro-scrolldown",
        translateY: [100, 0],
        opacity: [0, 1],
      },
      "-=800"
    );

  /* Preloader
   * -------------------------------------------------- */
  const ssPreloader = function () {
    const preloader = document.querySelector("#preloader");
    if (!preloader) return;

    window.addEventListener("load", function () {
      document.querySelector("html").classList.remove("ss-preload");
      document.querySelector("html").classList.add("ss-loaded");

      document.querySelectorAll(".ss-animated").forEach(function (item) {
        item.classList.remove("ss-animated");
      });

      tl.play();
    });

    // force page scroll position to top at page refresh
    // window.addEventListener('beforeunload' , function () {
    //     // window.scrollTo(0, 0);
    // });
  }; // end ssPreloader

  /* Animate elements if in viewport
   * ------------------------------------------------------ */
  const ssViewAnimate = function () {
    const blocks = document.querySelectorAll("[data-animate-block]");

    window.addEventListener("scroll", viewportAnimation);

    function viewportAnimation() {
      let scrollY = window.pageYOffset;

      blocks.forEach(function (current) {
        const viewportHeight = window.innerHeight;
        const triggerTop =
          current.offsetTop + viewportHeight * 0.2 - viewportHeight;
        const blockHeight = current.offsetHeight;
        const blockSpace = triggerTop + blockHeight;
        const inView = scrollY > triggerTop && scrollY <= blockSpace;
        const isAnimated = current.classList.contains("ss-animated");

        if (inView && !isAnimated) {
          anime({
            targets: current.querySelectorAll("[data-animate-el]"),
            opacity: [0, 1],
            translateY: [100, 0],
            delay: anime.stagger(400, { start: 200 }),
            duration: 800,
            easing: "easeInOutCubic",
            begin: function (anim) {
              current.classList.add("ss-animated");
            },
          });
        }
      });
    }
  }; // end ssViewAnimate

  /* Initialize
   * ------------------------------------------------------ */
  (function ssInit() {
    ssPreloader();
    ssViewAnimate();
  })();
})(document.documentElement);
