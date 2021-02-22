console.clear();

const elApp = document.querySelector("#app");
const losCards = elApp.querySelectorAll(".card");
const losFlippers = elApp.querySelectorAll("[data-flip]");

losCards.forEach((elCard) => {
  elCard.addEventListener("click", () => {
    flip(() => {
      let expanded =
        elCard.dataset.state === "expanded" ? "collapsed" : "expanded";
      elApp.dataset.state = expanded;
      losCards.forEach((elCard) => (elCard.dataset.state = "collapsed"));
      elCard.dataset.state = expanded;
    }, losFlippers);
  });
});

/* Helpers for FLIP (First Last Invert Play) */

function getRect(el) {
  return el.getBoundingClientRect();
}

function flip(doSomething, firstEls, getLastEls = () => firstEls) {
  const firstElsRects = Array.from(firstEls, (el) => [el, getRect(el)]);

  requestAnimationFrame(() => {
    doSomething();
    const lastElsRects = Array.from(getLastEls(), (el) => [el, getRect(el)]);

    firstElsRects.forEach(([firstEl, firstRect], i) => {
      const [lastEl, lastRect] = lastElsRects[i];
      const dx = lastRect.x - firstRect.x;
      const dy = lastRect.y - firstRect.y;
      const dw = lastRect.width / firstRect.width;
      const dh = lastRect.height / firstRect.height;
      lastEl.dataset.flipping = true;
      lastEl.style.setProperty("--dx", dx);
      lastEl.style.setProperty("--dy", dy);
      lastEl.style.setProperty("--dw", dw);
      lastEl.style.setProperty("--dh", dh);
      requestAnimationFrame(() => delete lastEl.dataset.flipping);
    });
  });
}
