window.I18n = {
  lang: "en",
  t: function (key) {
    return (window.UI_TEXT[key] || {})[this.lang] || "[" + key + "]";
  },
  apply: function (root) {
    var area = root || document;
    var self = this;
    area.querySelectorAll("[data-i18n]").forEach(function (element) {
      element.textContent = self.t(element.dataset.i18n);
    });
    area.querySelectorAll("[data-i18n-alt]").forEach(function (element) {
      element.alt = self.t(element.dataset.i18nAlt);
    });
    area.querySelectorAll("[data-i18n-aria]").forEach(function (element) {
      element.setAttribute("aria-label", self.t(element.dataset.i18nAria));
    });
    document.querySelectorAll("[data-lang]").forEach(function (button) {
      button.setAttribute("aria-pressed", String(button.dataset.lang === self.lang));
    });
    document.documentElement.lang = this.lang === "zh" ? "zh-Hans" : "en";
    document.title = this.t("project.title");
  },
  set: function (language) {
    if (language !== "en" && language !== "zh") return;
    this.lang = language;
    this.apply();
  },
  toggle: function () { this.set(this.lang === "en" ? "zh" : "en"); }
};
