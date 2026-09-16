window.Screens = {};
window.Router = {
  current: null,
  history: [],
  go: function (name, options) {
    var settings = options || {};
    var target = document.querySelector('[data-screen="' + name + '"]');
    if (!target || name === this.current) return;
    if (this.current) {
      var previous = document.querySelector('[data-screen="' + this.current + '"]');
      if (window.Screens[this.current]) window.Screens[this.current].onLeave(previous);
      previous.hidden = true;
      if (!settings.replace) this.history.push(this.current);
    }
    target.hidden = false;
    this.current = name;
    document.getElementById("stage").dataset.current = name;
    var atHome = name === "home";
    document.getElementById("back-button").hidden = atHome;
    document.getElementById("home-button").hidden = atHome;
    document.getElementById("welcome-note").hidden = !atHome;
    if (window.Screens[name]) window.Screens[name].onEnter(target);
    I18n.apply(target);
    if (!settings.initial) target.querySelector("h1").focus({ preventScroll: true });
  },
  back: function () { this.go(this.history.pop() || "home", { replace: true }); },
  home: function () { this.history = []; this.go("home", { replace: true }); }
};
window.ScreenLifecycle = {
  onEnter: function () {},
  onLeave: function (root) {
    root.querySelectorAll("video, audio").forEach(function (media) { media.pause(); });
    root.getAnimations({ subtree: true }).forEach(function (animation) { animation.cancel(); });
  }
};
