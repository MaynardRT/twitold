document.addEventListener("DOMContentLoaded", () => {
  // Create or select the theme toggle button
  let themeToggle = document.querySelector(".theme-toggle");
  if (!themeToggle) themeToggle = createThemeButton();

  // Set initial theme based on local storage or system preference
  const savedTheme = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const currentTheme = savedTheme || (systemPrefersDark ? "dark" : "light");
  setTheme(currentTheme);

  // Toggle theme on button click
  themeToggle.addEventListener("click", () => {
    const newTheme =
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "light"
        : "dark";
    setTheme(newTheme);
  });

  // Apply the theme and update button icon
  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    themeToggle.innerHTML = theme === "dark" ? "☀️" : "🌙";
    localStorage.setItem("theme", theme);
  }

  // Create the theme toggle button dynamically if not present
  function createThemeButton() {
    const button = document.createElement("button");
    button.className = "theme-toggle";
    button.innerHTML = "🌙"; // Default icon for light mode
    document.body.prepend(button);
    return button;
  }
});
