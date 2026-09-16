(function () {
  "use strict";
  function fitStage() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    var scale = Math.min(width / 1920, height / 1080);
    var x = (width - 1920 * scale) / 2;
    var y = (height - 1080 * scale) / 2;
    document.getElementById("stage").style.transform = "translate(" + x + "px," + y + "px) scale(" + scale + ")";
  }
  window.Stage = { fit: fitStage };
  window.addEventListener("resize", fitStage);
  window.addEventListener("orientationchange", fitStage);
}());
