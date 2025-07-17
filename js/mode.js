document.addEventListener("DOMContentLoaded", function () {
  try {
    // Create or select theme toggle button with better error handling
    const themeToggle =
      document.querySelector(".theme-toggle") || createThemeToggle();

    // Theme management functions
    const setTheme = (theme) => {
      if (theme === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
        themeToggle.textContent = "☀️ Light Mode";
      } else {
        document.documentElement.removeAttribute("data-theme");
        themeToggle.textContent = "🌙 Dark Mode";
      }
      localStorage.setItem("theme", theme);
    };

    const getSystemPreference = () => {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    };

    // Initialize theme
    const initTheme = () => {
      const savedTheme = localStorage.getItem("theme");
      const systemTheme = getSystemPreference();
      setTheme(savedTheme || systemTheme);
    };

    // Toggle between themes
    const handleThemeToggle = () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      setTheme(currentTheme === "dark" ? "light" : "dark");
    };

    // Create button if it doesn't exist
    function createThemeToggle() {
      const btn = document.createElement("button");
      btn.className = "theme-toggle";
      btn.setAttribute("aria-label", "Toggle dark mode");
      document.body.insertAdjacentElement("afterbegin", btn);
      return btn;
    }

    // Initialize and set up event listener
    initTheme();
    themeToggle.addEventListener("click", handleThemeToggle);

    // Optional: Watch for system theme changes
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        if (!localStorage.getItem("theme")) {
          setTheme(e.matches ? "dark" : "light");
        }
      });
  } catch (error) {
    console.error("Theme toggle initialization failed:", error);
  }
});
