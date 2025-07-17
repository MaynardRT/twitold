document.addEventListener("DOMContentLoaded", function () {
  // Create or select theme toggle button more reliably
  let themeToggle = document.querySelector(".theme-toggle");
  if (!themeToggle) {
    themeToggle = document.createElement("button");
    themeToggle.className = "theme-toggle";
    document.body.prepend(themeToggle); // Add at start of body
  }

  // Theme management functions
  function setTheme(theme) {
    if (theme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
      themeToggle.textContent = "☀️ Light Mode";
    } else {
      document.documentElement.removeAttribute("data-theme");
      themeToggle.textContent = "🌙 Dark Mode";
    }
    localStorage.setItem("theme", theme);
  }

  function getSystemPreference() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  // Initialize theme
  function initTheme() {
    const savedTheme = localStorage.getItem("theme");
    const systemTheme = getSystemPreference();
    const initialTheme = savedTheme || systemTheme;
    setTheme(initialTheme);
  }

  // Toggle between themes
  function handleThemeToggle() {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  }

  // System theme change listener
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      if (!localStorage.getItem("theme")) {
        setTheme(e.matches ? "dark" : "light");
      }
    });

  // Initialize and set up event listener
  initTheme();
  themeToggle.addEventListener("click", handleThemeToggle);
});
