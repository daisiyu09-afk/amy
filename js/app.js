(function () {
  "use strict";
  document.querySelectorAll("[data-media]").forEach(function (image) {
    image.src = window.UI_MEDIA[image.dataset.media];
  });
  document.querySelectorAll("[data-go]").forEach(function (button) {
    button.addEventListener("click", function () { Router.go(button.dataset.go); });
  });
  document.querySelectorAll("[data-lang]").forEach(function (button) {
    button.addEventListener("click", function () { I18n.set(button.dataset.lang); });
  });
  document.querySelector('[data-action="back"]').addEventListener("click", function () { Router.back(); });
  document.querySelector('[data-action="home"]').addEventListener("click", function () { Router.home(); });
  I18n.apply();
  Stage.fit();
  Router.go("home", { initial: true });
}());
