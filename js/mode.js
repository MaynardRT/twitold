document.addEventListener("DOMContentLoaded", function () {
  // Get or create the theme toggle button
  const themeToggle =
    document.querySelector(".theme-toggle") || createThemeButton();

  // Set initial theme
  const currentTheme =
    localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");
  setTheme(currentTheme);

  // Toggle theme on button click
  themeToggle.addEventListener("click", () => {
    const newTheme =
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "light"
        : "dark";
    setTheme(newTheme);
  });

  // Helper functions
  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    themeToggle.textContent =
      theme === "dark" ? "☀️" : "🌙";
    localStorage.setItem("theme", theme);
  }

  function createThemeButton() {
    const button = document.createElement("button");
    button.className = "theme-toggle";
    button.textContent = "🌙";
    document.body.prepend(button);
    return button;
  }
});
